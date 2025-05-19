import { getCollection } from 'astro:content'
import { concertCollectionSchema } from '@/content.config'
import { defaultLang } from '@/i18n/ui'
import type { APIRoute } from 'astro'
import dayjs from 'dayjs'

type ConcertInfoKey = keyof typeof concertCollectionSchema.shape

export const GET: APIRoute = async () => {
  const contentSegments: string[] = []

  const concertInfoIgnoreKeys: ConcertInfoKey[] = ['list', 'talkingPageSlug']

  contentSegments.push('# 焦安溥演出')
  const concerts = await getCollection('concert', (concert) => {
    const [concertLanguage] = concert.id.split('/')
    return concertLanguage === defaultLang
  })

  // Order concerts by date desc
  const sortedConcerts = concerts.sort((a, b) => {
    return dayjs(b.data.date).diff(dayjs(a.data.date))
  })

  for (const concert of sortedConcerts) {
    contentSegments.push(`## ${concert.data.title}`)
    contentSegments.push('### 曲目列表')
    let isMeetEncoreSign = false
    for (let song of concert.data.list) {
      if (!song.startsWith('Talking #')) {
        if (song === '*Encore') {
          isMeetEncoreSign = true
          continue
        }
        if (song.startsWith('*')) {
          continue
        }
        song = song.replace(/^!+/g, '')
        if (song.includes('|')) {
          song = song
            .split('|')
            .map((segment, index) => (index !== 0 ? `(${segment})` : segment))
            .join(' ')
        }
        contentSegments.push(isMeetEncoreSign ? `- ${song} (Encore)` : `- ${song}`)
      }
    }
    contentSegments.push('### 演出信息')
    for (const key in concertCollectionSchema.shape) {
      if (Object.prototype.hasOwnProperty.call(concertCollectionSchema.shape, key)) {
        const typedKey = key as ConcertInfoKey
        const fieldSchema = concertCollectionSchema.shape[typedKey]
        const description = fieldSchema.description
        if (!concertInfoIgnoreKeys.includes(typedKey)) {
          if (concert.data[typedKey]) {
            const label = description || key
            if (concert.data[typedKey] instanceof Date) {
              contentSegments.push(`- ${label}: ${dayjs(concert.data[typedKey] as Date).format('YYYY-MM-DD')}`)
            } else {
              contentSegments.push(`- ${label}: ${concert.data[typedKey]}`)
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
