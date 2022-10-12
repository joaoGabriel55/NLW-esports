import { Ad } from "@prisma/client";
import { convertMinutesToHourString } from "../../utils/convert-minutes-to-hour-string";

export function adParser(ad: Partial<Ad>) {
  return {
    ...ad,
    weekDays: ad.weekDays?.split(",").map(Number),
    hourStart: convertMinutesToHourString(ad.hourStart || 0),
    hourEnd: convertMinutesToHourString(ad.hourEnd || 0),
  };
}
