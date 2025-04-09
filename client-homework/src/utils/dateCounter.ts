import dayjs, { Dayjs } from "dayjs";

export function DateCounter(birthDate: Dayjs, ageExpentancy: number) {
  const now = dayjs();
  const deathDate = now.add(ageExpentancy, "year");
  const diff = deathDate.diff(birthDate, "day");
  return diff;
}
