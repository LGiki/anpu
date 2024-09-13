import limax from 'limax'
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { AnyEntryMap, CollectionEntry } from 'astro:content'
import type { ContentGroup, ContentGroupItem } from '@/types'

export function slugify(title: string) {
  return limax(title, {
    tone: false,
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

export function generateContentGroups<T extends CollectionEntry<keyof AnyEntryMap>>(
  items: T[],
  getSlugSegments: (item: T) => string[],
  defaultLang: string
): ContentGroup<T>[] {
  const groupDict = {} as Record<string, ContentGroupItem<T>[]>;

  items.forEach((item) => {
    const [lyricLanguage, ...slugSegments] = getSlugSegments(item);
    const slug = slugify(slugSegments.join());
    const urlPrefix = lyricLanguage === defaultLang ? "" : `/${lyricLanguage}`;
    const url = `${urlPrefix}/song/${slug}`;

    if (slug.length > 0) {
      const firstLetter = slug[0].toUpperCase();
      const key = Number.isInteger(Number(firstLetter)) ? "#" : firstLetter;

      if (!(key in groupDict)) {
        groupDict[key] = [];
      }
      groupDict[key].push({
        ...item,
        url,
      });
    } else {
      if (!("#" in groupDict)) {
        groupDict["#"] = [];
      }
      groupDict["#"].push({
        ...item,
        url,
      });
    }
  });

  const groups: ContentGroup<T>[] = Object.entries(groupDict).map(([key, list]) => ({
    key,
    list: key === "#" ? sortBySlug(list) : list,
  }));

  return groups.sort((a, b) => a.key.localeCompare(b.key));
}

export function sortBySlug<T extends { data: { title: string } }>(list: ContentGroupItem<T>[]): ContentGroupItem<T>[] {
  return [...list].sort((a, b) => {
    const aSlugify = slugify(a.data.title);
    const bSlugify = slugify(b.data.title);
    if (aSlugify.length === 0 || bSlugify.length === 0) {
      return 0;
    }
    return aSlugify[0].toUpperCase().localeCompare(bSlugify[0].toUpperCase());
  });
}