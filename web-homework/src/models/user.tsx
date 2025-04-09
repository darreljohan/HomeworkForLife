import { Note } from "./note.tsx";

export class User {
  public notes: Note[] = [];
  public constructor(
    public uid: string, // Firebase UID
    public email: string | null, // User email
    public displayName: string | null, // User's display name
    public birthDate: Date,
    public ageExpentancy: number // Custom metadata field
  ) {}
}
