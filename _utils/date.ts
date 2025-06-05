import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export function formatDate(value?: string | null, fallback = "-") {
  if (!value) return fallback;
  const date = dayjs.utc(value);
  return date.isValid() ? date.format("DD/MM/YYYY") : fallback;
}

export function toLocalDateOnly(dateString: string) {
  const [year, month, day] = dateString.split("T")[0].split("-");
  return new Date(Number(year), Number(month) - 1, Number(day));
}