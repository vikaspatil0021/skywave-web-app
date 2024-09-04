import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function isValidString(str: string) {
  return /^[a-z0-9_-]+$/.test(str);
}