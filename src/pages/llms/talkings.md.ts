import { getCollection } from 'astro:content'
import { talkingCollectionSchema } from '@/content.config'
import { defaultLang } from '@/i18n/ui'
import type { ui } from '@/i18n/ui'
import { useTranslations } from '@/i18n/utils'
import type { APIRoute } from 'astro'
import dayjs from 'dayjs'

type TalkingInfoKey = keyof typeof talkingCollectionSchema.shape

export const GET: APIRoute = async () => {
  const t = useTranslations(defaultLang)
  const contentSegments: string[] = []
  const talkingInfoIgnoreKeys: TalkingInfoKey[] = ['concertPageSlug', 'previousSong', 'nextSong', 'references']

  contentSegments.push('# 焦安溥 Talkings')
  const talkings = await getCollection('talking', (talking) => {
    const [talkingLanguage] = talking.id.split('/')
    return talkingLanguage === defaultLang
  })

  const talkingsGroupById = talkings.reduce(
    (acc, talking) => {
      const [_, talkingId] = talking.id.replace(/(\.md)+$/, '').split('/')
      if (!acc[talkingId]) {
        acc[talkingId] = []
      }
      acc[talkingId].push(talking)
      return acc
    },
    {} as Record<string, typeof talkings>
  )

  const sortedTalkingIds = talkings
    .sort((a, b) => {
      return dayjs(b.data.date).diff(a.data.date)
    })
    .map((talking) => {
      const [_, talkingId] = talking.id.replace(/(\.md)+$/, '').split('/')
      return talkingId
    })
    .reduce((acc, talkingId) => {
      if (!acc.includes(talkingId)) {
        acc.push(talkingId)
      }
      return acc
    }, [] as string[])

  for (const talkingId of sortedTalkingIds) {
    if (talkingsGroupById[talkingId].length === 0) {
      continue
    }
    const concertTalkings = talkingsGroupById[talkingId].sort((a, b) => {
      const [, , aFilename] = a.id.replace(/(\.md)+$/, '').split('/')
      const [, , bFilename] = b.id.replace(/(\.md)+$/, '').split('/')
      return Number.parseInt(aFilename) - Number.parseInt(bFilename)
    })
    if (concertTalkings.length > 0) {
      const firstTalking = concertTalkings[0]
      contentSegments.push(`## ${firstTalking.data.concertTitle}`)
      contentSegments.push('### Talking 段落')
      for (let talkingIndex = 0; talkingIndex < concertTalkings.length; talkingIndex++) {
        const talking = concertTalkings[talkingIndex]
        if (talking.body) {
          contentSegments.push(`#### 第 ${talkingIndex + 1} 段`)
          contentSegments.push(talking.body)
        }
      }
      contentSegments.push('### Talking 信息')
      for (const key in talkingCollectionSchema.shape) {
        if (Object.prototype.hasOwnProperty.call(talkingCollectionSchema.shape, key)) {
          const typedKey = key as TalkingInfoKey
          const fieldSchema = talkingCollectionSchema.shape[typedKey]
          const description = fieldSchema.description
          if (!talkingInfoIgnoreKeys.includes(typedKey)) {
            if (firstTalking.data[typedKey]) {
              const typedLabel = (description || key) as keyof (typeof ui)[typeof defaultLang]
              if (firstTalking.data[typedKey] instanceof Date) {
                contentSegments.push(
                  `- ${t(typedLabel)}: ${dayjs(firstTalking.data[typedKey] as Date).format('YYYY-MM-DD')}`
                )
              } else {
                contentSegments.push(`- ${t(typedLabel)}: ${firstTalking.data[typedKey]}`)
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
