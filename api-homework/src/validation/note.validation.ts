import { z, ZodType } from "zod";
import dayjs from "dayjs";

export class NoteValidationService {
  static readonly CREATE: ZodType = z.object({
    dateWritten: z.string().datetime(),
    note: z.string().max(1000),
  });

  static readonly READ: ZodType = z.object({
    fromDate: z
      .string()
      .datetime()
      .default(dayjs().subtract(7, "day").startOf("day").toISOString()),
    toDate: z.string().datetime().default(dayjs().endOf("day").toISOString()),
  });

  static readonly UPDATE: ZodType = z.object({
    id: z.string(),
    note: z.string().max(1000),
  });
}
