export type Note = {
  id: string;
  owner: string;
  dateWritten: string;
  note: string;
};

export type NoteRequest = {
  dateWritten: string;
  note: string;
};

export type ReadNoteRequest = {
  fromDate: string;
  toDate: string;
};

export type NoteResponse = {
  id: string;
  owner: string;
  dateWritten: string;
  note: string;
};

export type UpdateNoteRequest = {
  id: string;
  note: string;
};
