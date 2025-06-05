import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export function formatDate(value?: string | null, fallback = "-") {
  if (!value) return fallback;
  const date = dayjs.utc(value);
  return date.isValid() ? date.format("DD/MM/YYYY") : fallback;
}
