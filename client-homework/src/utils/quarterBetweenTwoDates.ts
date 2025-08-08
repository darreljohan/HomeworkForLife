import dayjs, { Dayjs } from "dayjs";
import quarterOfYear from "dayjs/plugin/quarterOfYear";

export default function quartersBetweenTwoDates(
  start: Dayjs,
  end: Dayjs
): number {
  dayjs.extend(quarterOfYear);
  const startYear = start.year();
  const endYear = end.year();

  const startQuarter = start.quarter();
  const endQuarter = end.quarter();

  return (endYear - startYear) * 4 + (endQuarter - startQuarter);
}
