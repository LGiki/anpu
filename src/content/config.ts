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
        // 吉他
        guitar: z.array(z.string()).or(z.string()).optional(),
        // 电吉他
        electricGuitar: z.array(z.string()).or(z.string()).optional(),
        // 贝斯
        bass: z.array(z.string()).or(z.string()).optional(),
        // 鼓
        drums: z.array(z.string()).or(z.string()).optional(),
        // 键盘
        keyboard: z.array(z.string()).or(z.string()).optional(),
        // 木吉他
        acousticGuitar: z.array(z.string()).or(z.string()).optional(),
        // 钢琴
        piano: z.array(z.string()).or(z.string()).optional(),
        // 电子钢琴
        digitalPiano: z.array(z.string()).or(z.string()).optional(),
        // 录音工程师
        recordingEngineer: z.array(z.string()).or(z.string()).optional(),
        // 钢琴录制
        pianoRecording: z.array(z.string()).or(z.string()).optional(),
        // 母带工程师
        masteringEngineer: z.array(z.string()).or(z.string()).optional(),
        // 录音室
        recordingStudio: z.array(z.string()).or(z.string()).optional(),
        // 联合制作人
        coProducer: z.array(z.string()).or(z.string()).optional(),
        // 统筹
        coordinator: z.array(z.string()).or(z.string()).optional(),
        // 大提琴
        cello: z.array(z.string()).or(z.string()).optional(),
        // 尼龙吉他
        nylonGuitar: z.array(z.string()).or(z.string()).optional(),
        // 低音提琴
        doubleBass: z.array(z.string()).or(z.string()).optional(),
        // 和声编写
        backingVocalArranger: z.array(z.string()).or(z.string()).optional(),
        // 和声
        backingVocal: z.array(z.string()).or(z.string()).optional(),
        // 大提琴编曲
        celloArranger: z.array(z.string()).or(z.string()).optional(),
        // 合成器
        synthesizer: z.array(z.string()).or(z.string()).optional(),
        // 口琴
        harmonica: z.array(z.string()).or(z.string()).optional(),
        // 小号
        trumpet: z.array(z.string()).or(z.string()).optional(),
        // 其他
        extra: z.array(z.object({
            title: z.string(),
            value: z.array(z.string()).or(z.string())
        })).optional(),
        // 是否有台语
        hasBanlamTone: z.boolean().optional().default(false),
        // 备注
        notes: z.array(z.string()).or(z.string()).optional(),
    })
})

const talkingCollection = defineCollection({
    type: 'content',
    schema: z.object({
        // 演唱会标题
        concertTitle: z.string().optional(),
        // 巡演
        concertTour: z.string().optional(),
        // 地点
        place: z.string().optional(),
        // 地点
        location: z.string().optional(),
        // 日期
        date: z.date().optional(),
        // 演出歌单页面的 slug
        concertPageSlug: z.string().optional(),
        // 引用
        references: z.array(z.object({
            title: z.string().optional(),
            url: z.string().optional(),
        })).optional(),
    })
})

const concertCollection = defineCollection({
    type: 'data',
    schema: z.object({
        // 标题
        title: z.string().optional(),
        // 巡演
        tour: z.string().optional(),
        // 开始时间
        startTime: z.string().optional(),
        // 结束时间
        endTime: z.string().optional(),
        // 嘉宾
        guests: z.array(z.string()).or(z.string()).optional(),
        // 地点
        place: z.string().optional(),
        // 地址
        location: z.string().optional(),
        // 日期
        date: z.date(),
        // Talking 页面的 Slug
        talkingPageSlug: z.string().optional(),
        // 演唱会曲目列表
        list: z.array(z.string()),
    })
})

const albumCollection = defineCollection({
    type: 'data',
    schema: z.object({
        // 标题
        title: z.string(),
        // 英文标题
        englishTitle: z.string().optional(),
        // 发布日期
        releaseDate: z.date().optional(),
        // 总监制
        chiefExecutiveProducer: z.string().optional(),
        // 音乐总监
        musicDirector: z.string().optional(),
        // 制作人
        producer: z.array(z.string()).or(z.string()).optional(),
        // 专辑格式
        albumFormat: z.union([
            // 光盘
            z.literal('CD'),
            // 黑胶
            z.literal('Vinyl'),
            // 数字格式
            z.literal('Digital'),
            // 磁带
            z.literal('Cassette'),
            // 流媒体，不提供下载，仅通过网络播放的音乐格式
            z.literal('Streaming'),
        ]).optional(),
        // 专辑类型
        albumType: z.union([
            // Extended Play
            z.literal('EP'),
            // Long Play
            z.literal('LP'),
            // Maxtape
            z.literal('Mixtape'),
            // 单曲
            z.literal('Single'),
            // 精选集
            z.literal('Compilation'),
            // 现场专辑
            z.literal('LiveAlbum'),
            // 混音专辑
            z.literal('RemixAlbum'),
        ]).optional(),
        // 歌曲列表
        list: z.array(z.string()),
        // 备注
        notes: z.array(z.string()).or(z.string()).optional(),
        // 联合制作人
        coProducer: z.array(z.string()).or(z.string()).optional(),
        // 统筹
        coordinator: z.array(z.string()).or(z.string()).optional(),
        // Slug
        slug: z.string().optional(),
    })
})

const aboutCollection = defineCollection({})

export const collections = {
    'song': songCollection,
    'album': albumCollection,
    'concert': concertCollection,
    'talking': talkingCollection,
    'about': aboutCollection,
}