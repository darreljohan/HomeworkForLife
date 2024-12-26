import dayjs from "dayjs";

function calcRatioDeath(birthDate: Date, deathDate: Date): number {
  const currentDate = dayjs();

  const birth = dayjs(birthDate);
  const death = dayjs(deathDate);

  // Ensure that the birth date is before the death date
  if (birth.isAfter(death)) {
    throw new Error("Birth date must be before death date.");
  }

  // Calculate the total lifespan in milliseconds
  const totalLifespan = death.diff(birth);

  // Calculate the elapsed time from birth to now in milliseconds
  const elapsedTime = currentDate.diff(birth);

  // Ensure elapsedTime does not exceed totalLifespan
  const lifeLived = Math.min(elapsedTime, totalLifespan);

  // Calculate the ratio (percentage) of life lived
  const ratio = (lifeLived / totalLifespan) * 100;

  // Return the result as an integer (no decimals)
  return Math.floor(ratio);
}

export default calcRatioDeath;
