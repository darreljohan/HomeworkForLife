import supabase from "../application/database";
import { Validation } from "../application/validation";
import {
  NoteRequest,
  NoteResponse,
  ReadNoteRequest,
  UpdateNoteRequest,
} from "../model/note.model";
import { UserAuth } from "../model/user.model";
import { NoteValidationService } from "../validation/note.validation";
import { ResponseError } from "../error/response.error";
import { logger } from "../application/log";

export class NoteService {
  static async create(user: UserAuth, req: NoteRequest): Promise<NoteResponse> {
    const noteValidate = Validation.validate(NoteValidationService.CREATE, req);

    logger.info({
      location: "userService.create",
      message: "contacting supabase to create note",
      body: req,
    });

    const { data, error } = await supabase
      .from("notes")
      .insert({
        owner: user.id,
        date_written: noteValidate.dateWritten,
        note: noteValidate.note,
      })
      .select();

    if (error) {
      throw new ResponseError(400, error.message);
    }

    if (!data) {
      throw new ResponseError(400, "No returned data");
    }

    logger.info({
      location: "userService.create",
      message: "Success creating note",
      body: data,
    });

    const response: NoteResponse = {
      id: data[0].id,
      owner: data[0].owner,
      dateWritten: data[0].date_written + "Z",
      note: data[0].note,
    };

    return response;
  }

  static async read(
    user: UserAuth,
    req: ReadNoteRequest
  ): Promise<Array<NoteResponse>> {
    const noteValidate = Validation.validate(NoteValidationService.READ, req);

    logger.info({
      location: "userService.read",
      message: "contacting supabase to read note",
      body: req,
    });

    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .eq("owner", user.id)
      .gte("date_written", noteValidate.fromDate)
      .lte("date_written", noteValidate.toDate)
      .order("date_written", { ascending: true });

    if (error) {
      throw new ResponseError(400, error.message);
    }

    logger.info({
      location: "userService.read",
      message: "Success read note from supabase",
      body: data,
    });

    const response = data.map((note) => ({
      id: note.id,
      owner: note.owner,
      dateWritten: note.date_written + "Z",
      note: note.note,
    }));

    return response;
  }

  static async update(
    user: UserAuth,
    req: UpdateNoteRequest
  ): Promise<NoteResponse> {
    const noteValidate = Validation.validate(NoteValidationService.UPDATE, req);

    logger.info({
      location: "userService.update",
      message: "contacting supabase to update note",
      body: req,
    });

    const { data, error } = await supabase
      .from("notes")
      .update({
        note: noteValidate.note,
      })
      .eq("owner", user.id)
      .eq("id", req.id)
      .select();

    if (error) {
      throw new ResponseError(400, error.message);
    }

    if (!data) {
      throw new ResponseError(400, "No returned data");
    }

    logger.info({
      location: "userService.update",
      message: "Success updating note on supabase",
      body: req,
    });

    const response: NoteResponse = {
      id: data[0].id,
      owner: data[0].owner,
      dateWritten: data[0].date_written,
      note: data[0].note,
    };

    return response;
  }
}
