import { getCollection } from 'astro:content'
import { songCollectionSchema } from '@/content.config'
import { defaultLang } from '@/i18n/ui'
import type { ui } from '@/i18n/ui'
import { useTranslations } from '@/i18n/utils'
import { durationToHms } from '@/utils'
import type { APIRoute } from 'astro'
import dayjs from 'dayjs'

type SongInfoKey = keyof typeof songCollectionSchema.shape

export const GET: APIRoute = async () => {
  const t = useTranslations(defaultLang)

  const contentSegments: string[] = []

  const songInfoIgnoreKeys: SongInfoKey[] = ['hasBanlamTone']

  contentSegments.push('# 焦安溥歌曲')
  const songs = await getCollection('song', (song) => {
    const [songLanguage] = song.id.split('/')
    return songLanguage === defaultLang
  })

  for (const song of songs) {
    contentSegments.push(`## ${song.data.title}`)
    if (song.body) {
      contentSegments.push('### 歌词')
      contentSegments.push(song.body)
    }
    contentSegments.push('### 歌曲信息')
    for (const key in songCollectionSchema.shape) {
      if (Object.prototype.hasOwnProperty.call(songCollectionSchema.shape, key)) {
        const typedKey = key as SongInfoKey
        const fieldSchema = songCollectionSchema.shape[typedKey]
        const description = fieldSchema.description
        if (!songInfoIgnoreKeys.includes(typedKey)) {
          if (song.data[typedKey]) {
            const typedLabel = (description || key) as keyof (typeof ui)[typeof defaultLang]
            if (typedKey === 'extra') {
              for (const extraInfo of song.data[typedKey]) {
                contentSegments.push(`- ${extraInfo.title}: ${extraInfo.value}`)
              }
            } else if (typedKey === 'duration') {
              contentSegments.push(`- ${t(typedLabel)}: ${durationToHms(song.data[typedKey])}`)
            } else {
              if (song.data[typedKey] instanceof Date) {
                contentSegments.push(`- ${t(typedLabel)}: ${dayjs(song.data[typedKey] as Date).format('YYYY-MM-DD')}`)
              } else {
                contentSegments.push(`- ${t(typedLabel)}: ${song.data[typedKey]}`)
              }
            }
          }
        }
      }
    }
    contentSegments.push('')
  }

  return new Response(contentSegments.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
