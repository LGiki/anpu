import type { CollectionEntry } from 'astro:content'
import type { ContentGroup, ContentGroupItem } from '@/types'
import { type ClassValue, clsx } from 'clsx'
import limax from 'limax'
import { twMerge } from 'tailwind-merge'
import { ui } from '../i18n/ui'

export function getCollectionNameFromUrl(url: URL) {
  // URL 可能为 /album/my-life-will 或 /zh-hant/album/my-life-will
  const [, segment1, segment2] = url.pathname.split('/')

  // 如果 urlSegment1 为 i18n locale，说明 urlSegment2 就是 collection name
  if (segment1 in ui) {
    return segment2 || 'song'
  }

  return segment1 || 'song'
}

export function slugify(title: string) {
  return limax(
    title
      .replaceAll(' ', '-')
      .replace('關於', 'guan-yu')
      .replace('模樣', 'mu-yang')
      .replace('妳怎麼', 'ni-zen-me')
      .replace('怎麼', 'zen-me')
      .replace('妳', 'ni'),
    {
      tone: false,
      custom: {
        '-': '-',
        ',': '',
      },
    }
  )
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function durationToHms(duration: number): string {
  const hours = Math.floor(duration / 3600)
  const minutes = Math.floor((duration % 3600) / 60)
  const seconds = Math.floor((duration % 3600) % 60)

  return `${hours > 0 ? `${hours.toString().padStart(2, '0')}:` : ''}${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

export function generateContentGroupsByFirstLetter<T extends CollectionEntry<'song'>>(
  items: T[],
  getSlugSegments: (item: T) => string[],
  defaultLang: string
): ContentGroup<T>[] {
  const groupDict = {} as Record<string, ContentGroupItem<T>[]>

  for (const item of items) {
    const [lyricLanguage, ...slugSegments] = getSlugSegments(item)
    const slug = slugify(slugSegments.join())
    const urlPrefix = lyricLanguage === defaultLang ? '' : `/${lyricLanguage}`
    const url = `${urlPrefix}/song/${slug}`

    if (slug.length > 0) {
      const firstLetter = slug[0].toUpperCase()
      const key = Number.isInteger(Number(firstLetter)) ? '#' : firstLetter

      if (!(key in groupDict)) {
        groupDict[key] = []
      }
      groupDict[key].push({
        ...item,
        url,
      })
    } else {
      if (!('#' in groupDict)) {
        groupDict['#'] = []
      }
      groupDict['#'].push({
        ...item,
        url,
      })
    }
  }

  const groups: ContentGroup<T>[] = Object.entries(groupDict).map(([key, list]) => ({
    key,
    list: key === '#' ? sortBySlug(list) : list,
  }))

  return groups.sort((a, b) => a.key.localeCompare(b.key))
}

export function sortBySlug<T extends CollectionEntry<'song'>>(list: ContentGroupItem<T>[]): ContentGroupItem<T>[] {
  return [...list].sort((a, b) => {
    const aSlugify = slugify(a.data.title)
    const bSlugify = slugify(b.data.title)
    if (aSlugify.length === 0 || bSlugify.length === 0) {
      return 0
    }
    return aSlugify[0].toUpperCase().localeCompare(bSlugify[0].toUpperCase())
  })
}

export function joinIfArray(value: string | string[] | number | number[], separator?: string): string | number {
  return Array.isArray(value) ? value.join(separator || "、") : value
}