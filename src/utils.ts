import limax from 'limax'
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function slugify(title: string) {
  return limax(title, {
    tone: false,
    custom: ['/', '-']
  })
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function durationToHms(duration: number): string {
  var hours = Math.floor(duration / 3600);
  var minutes = Math.floor(duration % 3600 / 60);
  var seconds = Math.floor(duration % 3600 % 60);

  return `${hours > 0 ? `${hours.toString().padStart(2, '0')}:` : ''}${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}