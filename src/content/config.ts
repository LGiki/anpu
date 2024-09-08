import { defineCollection, z } from "astro:content";

const songCollection = defineCollection({
    type: 'content',
    schema: z.object({
        // 标题
        title: z.string(),
        // 专辑
        album: z.string().optional(),
        // 长度（秒）
        duration: z.number().optional(),
        // 歌手
        artist: z.string().optional(),
        // 作词者
        lyricist: z.string().optional(),
        // 编曲者
        arranger: z.string().optional(),
        // 作曲者
        composer: z.string().optional(),
        // 制作人
        producer: z.string().optional(),
        // 发布日期
        releaseDate: z.date().optional(),
        // ISRC, see <https://en.wikipedia.org/wiki/International_Standard_Recording_Code>.
        isrc: z.string().optional(),
        // 混音师
        maxingEngineer: z.string().optional(),
        // 是否有台语
        hasBanlamTone: z.boolean().optional().default(false),
    })
})

export const collections = {
    'song': songCollection,
}