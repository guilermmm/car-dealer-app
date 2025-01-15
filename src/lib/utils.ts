import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getYears() {
  const currentYear = new Date().getFullYear();
  return Array.from(
    { length: currentYear - 2015 + 1 },
    (_, i) => currentYear - i
  );
}

export function googleSearchLink(search: string) {
  const query = search.replace(/\s/g, "+");
  return `https://www.google.com/search?tbm=isch&as_q=${query}&tbs=isz:lt,islt:4mp,sur:fmc`;
}
