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