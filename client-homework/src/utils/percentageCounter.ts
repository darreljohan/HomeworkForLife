import dayjs, { Dayjs } from "dayjs";

export function percentageCounter(birthDate: Dayjs, ageExpentancy: number) {
  const today = dayjs();
  const endDate = birthDate.add(ageExpentancy, "year");
  const totalDays = endDate.diff(birthDate, "day");
  const daysLived = today.diff(birthDate, "day");
  let percentageLived = (daysLived / totalDays) * 100;
  if (percentageLived > 100) {
    percentageLived = 100;
  }
  percentageLived = Math.floor(percentageLived);
  return percentageLived;
}
