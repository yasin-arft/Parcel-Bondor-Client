import { format } from "date-fns";

export function dateFormat(dateString) {
  const formattedDate = format(new Date(dateString), 'dd/MM/yyyy');

  return formattedDate
}

