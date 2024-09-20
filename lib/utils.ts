import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function isValid_ProjectName(str: string) {
  return /^[a-z0-9_-]+$/.test(str);
}

export function formatTime(dateString: string) {

  const date = new Date(dateString);

  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${hour}:${minute}:${seconds}`;
}
