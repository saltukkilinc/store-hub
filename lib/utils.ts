import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomHslColor() {
  return `hsl(${getRandomNumber(0, 360)} ${getRandomNumber(
    50,
    100
  )}% ${getRandomNumber(50, 70)}%)`;
}
