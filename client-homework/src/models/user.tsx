import { Dayjs } from "dayjs";
import { Note } from "./note.tsx";
import { percentageCounter } from "../utils/percentageCounter.ts";

export class User {
  public notes: Note[] = [];
  public lifePercentage: number = 0;

  public constructor(
    public uid: string, // Firebase UID
    public email: string | null, // User email
    public displayName: string | undefined, // User's display name
    public birthDate: Dayjs,
    public ageExpentancy: number // Custom metadata field
  ) {
    this.lifePercentage = percentageCounter(birthDate, ageExpentancy);
  }

  public setUserConfig(
    displayName: string | undefined,
    birthDate: Dayjs,
    ageExpentancy: number
  ) {
    this.displayName = displayName;
    this.birthDate = birthDate;
    this.ageExpentancy = ageExpentancy;
    this.lifePercentage = percentageCounter(birthDate, ageExpentancy);
  }
}
