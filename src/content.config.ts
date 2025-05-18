import { defineCollection, z } from 'astro:content';

import { glob } from 'astro/loaders';

export const songCollectionSchema = z.object({
    title: z.string().describe('标题'),
    englishTitle: z.string().optional().describe('英文标题'),
    album: z.string().optional().describe('专辑'),
    duration: z.number().optional().describe('长度（秒）'),
    artist: z.array(z.string()).or(z.string()).optional().describe('歌手'),
    lyricist: z.array(z.string()).or(z.string()).optional().describe('作词者'),
    arranger: z.array(z.string()).or(z.string()).optional().describe('编曲者'),
    composer: z.array(z.string()).or(z.string()).optional().describe('作曲者'),
    producer: z.array(z.string()).or(z.string()).optional().describe('制作人'),
    releaseDate: z.date().optional().describe('发布日期'),
    // ISRC, see <https://en.wikipedia.org/wiki/International_Standard_Recording_Code>.
    isrc: z.string().optional().describe('ISRC'),
    mixingEngineer: z.array(z.string()).or(z.string()).optional().describe('混音师'),
    guitar: z.array(z.string()).or(z.string()).optional().describe('吉他'),
    electricGuitar: z.array(z.string()).or(z.string()).optional().describe('电吉他'),
    bass: z.array(z.string()).or(z.string()).optional().describe('贝斯'),
    drums: z.array(z.string()).or(z.string()).optional().describe('鼓'),
    keyboard: z.array(z.string()).or(z.string()).optional().describe('键盘'),
    acousticGuitar: z.array(z.string()).or(z.string()).optional().describe('木吉他'),
    piano: z.array(z.string()).or(z.string()).optional().describe('钢琴'),
    digitalPiano: z.array(z.string()).or(z.string()).optional().describe('电子钢琴'),
    recordingEngineer: z.array(z.string()).or(z.string()).optional().describe('录音工程师'),
    pianoRecording: z.array(z.string()).or(z.string()).optional().describe('钢琴录制'),
    masteringEngineer: z.array(z.string()).or(z.string()).optional().describe('母带工程师'),
    recordingStudio: z.array(z.string()).or(z.string()).optional().describe('录音室'),
    coProducer: z.array(z.string()).or(z.string()).optional().describe('联合制作人'),
    coordinator: z.array(z.string()).or(z.string()).optional().describe('统筹'),
    cello: z.array(z.string()).or(z.string()).optional().describe('大提琴'),
    nylonGuitar: z.array(z.string()).or(z.string()).optional().describe('尼龙吉他'),
    doubleBass: z.array(z.string()).or(z.string()).optional().describe('低音提琴'),
    backingVocalArranger: z.array(z.string()).or(z.string()).optional().describe('和声编写'),
    backingVocal: z.array(z.string()).or(z.string()).optional().describe('和声'),
    celloArranger: z.array(z.string()).or(z.string()).optional().describe('大提琴编曲'),
    synthesizer: z.array(z.string()).or(z.string()).optional().describe('合成器'),
    harmonica: z.array(z.string()).or(z.string()).optional().describe('口琴'),
    trumpet: z.array(z.string()).or(z.string()).optional().describe('小号'),
    songProducer: z.array(z.string()).or(z.string()).optional().describe('单曲制作人'),
    albumProducer: z.array(z.string()).or(z.string()).optional().describe('专辑制作人'),
    extra: z.array(z.object({
        title: z.string(),
        value: z.array(z.string()).or(z.string())
    })).optional(),
    hasBanlamTone: z.boolean().optional().default(false).describe('是否有台语'),
    notes: z.array(z.string()).or(z.string()).optional().describe('备注'),
})

const songCollection = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/song" }),
    schema: songCollectionSchema,
})

export const talkingCollectionSchema = z.object({
    concertTitle: z.string().optional().describe('演唱会标题'),
    concertTour: z.string().optional().describe('巡演'),
    place: z.string().optional().describe('地点'),
    location: z.string().optional().describe('地址'),
    date: z.date().optional().describe('日期'),
    concertPageSlug: z.string().optional().describe('演出歌单页面的 Slug'),
    previousSong: z.string().optional().describe('Talking 的前一首歌'),
    nextSong: z.string().optional().describe('Talking 的后一首歌'),
    references: z.array(z.object({
        title: z.string().optional(),
        url: z.string().optional(),
    })).optional().describe('引用'),
})

const talkingCollection = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/talking" }),
    schema: talkingCollectionSchema,
})

export const concertCollectionSchema = z.object({
    title: z.string().optional().describe('标题'),
    tour: z.string().optional().describe('巡演'),
    startTime: z.string().optional().describe('开始时间'),
    endTime: z.string().optional().describe('结束时间'),
    guests: z.array(z.string()).or(z.string()).optional().describe('嘉宾'),
    place: z.string().optional().describe('地点'),
    location: z.string().optional().describe('地址'),
    date: z.date().describe('日期'),
    talkingPageSlug: z.string().optional().describe('Talking 页面的 Slug'),
    list: z.array(z.string()).describe('演出曲目列表'),
})

const concertCollection = defineCollection({
    loader: glob({ pattern: "**/*.yml", base: "./src/content/concert" }),
    schema: concertCollectionSchema,
})

export const albumCollectionSchema = z.object({
    title: z.string().describe('标题'),
    englishTitle: z.string().optional().describe('英文标题'),
    releaseDate: z.date().optional().describe('发布日期'),
    chiefExecutiveProducer: z.string().optional().describe('总监制'),
    musicDirector: z.string().optional().describe('音乐总监'),
    producer: z.array(z.string()).or(z.string()).optional().describe('制作人'),
    albumFormat: z.union([
        z.literal('CD').describe('光盘'),
        z.literal('Vinyl').describe('黑胶'),
        z.literal('Digital').describe('数字格式'),
        z.literal('Cassette').describe('磁带'),
        // 流媒体，不提供下载，仅通过网络播放的音乐格式
        z.literal('Streaming').describe('流媒体'),
    ]).optional().describe('专辑格式'),
    albumType: z.union([
        z.literal('EP').describe('Extended Play'),
        z.literal('LP').describe('Long Play'),
        z.literal('Mixtape').describe('Maxtape'),
        z.literal('Single').describe('单曲'),
        z.literal('Compilation').describe('精选集'),
        z.literal('LiveAlbum').describe('现场专辑'),
        z.literal('RemixAlbum').describe('混音专辑'),
    ]).optional().describe('专辑类型'),
    list: z.array(z.string()).describe('曲目列表'),
    notes: z.array(z.string()).or(z.string()).optional().describe('备注'),
    coProducer: z.array(z.string()).or(z.string()).optional().describe('联合制作人'),
    coordinator: z.array(z.string()).or(z.string()).optional().describe('统筹'),
    customSlug: z.string().optional().describe('自定义 Slug'),
})

const albumCollection = defineCollection({
    loader: glob({ pattern: "**/*.yml", base: "./src/content/album" }),
    schema: albumCollectionSchema,
})

export const collections = {
    'song': songCollection,
    'album': albumCollection,
    'concert': concertCollection,
    'talking': talkingCollection,
};