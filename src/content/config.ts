import { defineCollection, z } from "astro:content";

const songCollection = defineCollection({
    type: 'content',
    schema: z.object({
        // 标题
        title: z.string(),
        // 英文标题
        englishTitle: z.string().optional(),
        // 专辑
        album: z.string().optional(),
        // 长度（秒）
        duration: z.number().optional(),
        // 歌手
        artist: z.array(z.string()).or(z.string()).optional(),
        // 作词者
        lyricist: z.array(z.string()).or(z.string()).optional(),
        // 编曲者
        arranger: z.array(z.string()).or(z.string()).optional(),
        // 作曲者
        composer: z.array(z.string()).or(z.string()).optional(),
        // 制作人
        producer: z.array(z.string()).or(z.string()).optional(),
        // 发布日期
        releaseDate: z.date().optional(),
        // ISRC, see <https://en.wikipedia.org/wiki/International_Standard_Recording_Code>.
        isrc: z.string().optional(),
        // 混音师
        mixingEngineer: z.array(z.string()).or(z.string()).optional(),
        // 电吉他
        electricGuitar: z.array(z.string()).or(z.string()).optional(),
        // 贝斯
        bass: z.array(z.string()).or(z.string()).optional(),
        // 鼓
        drums: z.array(z.string()).or(z.string()).optional(),
        // 键盘
        keyboard: z.array(z.string()).or(z.string()).optional(),
        // 吉他
        guitar: z.array(z.string()).or(z.string()).optional(),
        // 钢琴
        piano: z.array(z.string()).or(z.string()).optional(),
        // 录音工程师
        recordingEngineer: z.array(z.string()).or(z.string()).optional(),
        // 母带工程师
        masteringEngineer: z.array(z.string()).or(z.string()).optional(),
        // 录音室
        recordingStudio: z.array(z.string()).or(z.string()).optional(),
        // 是否有台语
        hasBanlamTone: z.boolean().optional().default(false),
    })
})

export const collections = {
    'song': songCollection,
}