import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function addToLocalStorageArray(key: string, value: string) {
  let existingArray: string[] = JSON.parse(localStorage.getItem(key) || "[]");
  
  existingArray.push(value);

  localStorage.setItem(key, JSON.stringify(existingArray));
}
