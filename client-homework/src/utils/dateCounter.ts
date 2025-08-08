import dayjs, { Dayjs } from "dayjs";

export function DateCounter(birthDate: Dayjs, ageExpentancy: number) {
  const now = dayjs();
  const deathDate = birthDate.add(ageExpentancy, "year");
  const diff = deathDate.diff(now, "day");
  return diff;
}
