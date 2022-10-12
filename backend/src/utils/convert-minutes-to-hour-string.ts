const padStart = (number: number) => String(number).padStart(2, "0");

export function convertMinutesToHourString(minutesAmount: number): string {
  const hours = Math.floor(minutesAmount / 60);
  const minutes = minutesAmount % 60;

  return `${padStart(hours)}:${padStart(minutes)}`;
}
