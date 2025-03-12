import { differenceInMinutes } from "date-fns";

export const totalMinutesInDaysGap = (start: Date, end: Date): number => {
  const total = differenceInMinutes(end, start);
  return total > 0 ? total : 1;
};

export const calculateLeftOffset = (
  taskStart: Date,
  startOfDay: Date,
  endOfDay: Date,
  containerWidth: number
): number => {
  const totalDuration = endOfDay.getTime() - startOfDay.getTime();
  const taskOffset = taskStart.getTime() - startOfDay.getTime();

  // Calcula a proporção da task em relação ao tempo total
  const proportion = taskOffset / totalDuration;

  // Multiplica pela largura do container para obter o deslocamento em pixels
  const offsetInPixels = proportion * containerWidth;

  return offsetInPixels;
};

export const calculateWidth = (
  taskStart: Date,
  taskEnd: Date,
  startOfDay: Date,
  endOfDay: Date,
  containerWidth: number
): number => {
  const totalDuration = endOfDay.getTime() - startOfDay.getTime();
  const taskDuration = taskEnd.getTime() - taskStart.getTime();

  const proportion = taskDuration / totalDuration;
  const widthInPixels = proportion * containerWidth;

  return widthInPixels;
};

export const calculateDurationText = (start: Date, end: Date): string => {
  const durationSeconds = Math.abs((end.getTime() - start.getTime()) / 1000);
  const minutes = Math.floor(durationSeconds / 60);
  const seconds = Math.floor(durationSeconds % 60);

  if (minutes === 0) return `${seconds} segundo${seconds !== 1 ? "s" : ""}`;

  return `${minutes} minuto${minutes > 1 ? "s" : ""}${
    seconds > 0 ? ` e ${seconds} segundo${seconds !== 1 ? "s" : ""}` : ""
  }`;
};
