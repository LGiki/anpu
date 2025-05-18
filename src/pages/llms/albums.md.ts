import { albumCollectionSchema } from "@/content.config";
import type { APIRoute } from "astro";
import dayjs from "dayjs";
import { getCollection } from "astro:content";
import { defaultLang } from "@/i18n/ui";

type AlbumInfoKey = keyof (typeof albumCollectionSchema.shape)

export const GET: APIRoute = async () => {
    const contentSegments: string[] = []

    // albumInfoIgnoreKeys 为不出现在 Markdown 中的 key 列表，list 和 customSlug 用于内部
    const albumInfoIgnoreKeys: AlbumInfoKey[] = ['list', 'customSlug']

    contentSegments.push('# 焦安溥专辑')
    const albums = await getCollection("album", album => {
        const [albumLanguage] = album.id.split("/");
        return albumLanguage === defaultLang;
    })
    for (const album of albums) {
        contentSegments.push(`## ${album.data.title}`)
        contentSegments.push('### 曲目列表')
        let isMeetDiscSign = false
        for (const song of album.data.list) {
            if (song.startsWith("*Disc")) {
                isMeetDiscSign = true
                contentSegments.push(`- ${song}`)
                continue
            }
            contentSegments.push(isMeetDiscSign
                ? `  - ${song}`
                : `- ${song}`)
        }
        contentSegments.push('### 专辑信息')
        for (const key in albumCollectionSchema.shape) {
            if (Object.prototype.hasOwnProperty.call(albumCollectionSchema.shape, key)) {
                const typedKey = key as AlbumInfoKey
                const fieldSchema = albumCollectionSchema.shape[typedKey]
                const description = fieldSchema.description
                if (!albumInfoIgnoreKeys.includes(typedKey)) {
                    if (album.data[typedKey]) {
                        const label = description || key
                        if (album.data[typedKey] instanceof Date) {
                            contentSegments.push(`- ${label}: ${dayjs(album.data[typedKey] as Date).format('YYYY-MM-DD')}`)
                        } else {
                            contentSegments.push(`- ${label}: ${album.data[typedKey]}`)
                        }
                    }
                }
            }
        }
        contentSegments.push('')
    }
    return new Response(
        contentSegments.join('\n'),
        {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8'
            }
        }
    )
}