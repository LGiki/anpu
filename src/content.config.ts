import { defineCollection, z } from 'astro:content'

import { glob } from 'astro/loaders'

export const songCollectionSchema = z.object({
  // 标题
  title: z.string().describe('title'),
  // 英文标题
  englishTitle: z.string().optional().describe('englishTitle'),
  // 专辑
  album: z.array(z.string()).or(z.string()).optional().describe('album'),
  // 发布日期
  releaseDate: z.date().optional().describe('releaseDate'),
  // 时长（秒）
  duration: z.number().optional().describe('songMetadata.duration'),
  // 歌手
  artist: z.array(z.string()).or(z.string()).optional().describe('songMetadata.artist'),
  // 作词
  lyricist: z.array(z.string()).or(z.string()).optional().describe('songMetadata.lyricist'),
  // 编曲
  arranger: z.array(z.string()).or(z.string()).optional().describe('songMetadata.arranger'),
  // 作曲
  composer: z.array(z.string()).or(z.string()).optional().describe('songMetadata.composer'),
  // 制作人
  producer: z.array(z.string()).or(z.string()).optional().describe('songMetadata.producer'),
  // 混音
  mixingEngineer: z.array(z.string()).or(z.string()).optional().describe('songMetadata.mixingEngineer'),
  // 吉他
  guitar: z.array(z.string()).or(z.string()).optional().describe('songMetadata.guitar'),
  // 电吉他
  electricGuitar: z.array(z.string()).or(z.string()).optional().describe('songMetadata.electricGuitar'),
  // 贝斯
  bass: z.array(z.string()).or(z.string()).optional().describe('songMetadata.bass'),
  // 鼓
  drums: z.array(z.string()).or(z.string()).optional().describe('songMetadata.drums'),
  // 键盘
  keyboard: z.array(z.string()).or(z.string()).optional().describe('songMetadata.keyboard'),
  // 木吉他
  acousticGuitar: z.array(z.string()).or(z.string()).optional().describe('songMetadata.acousticGuitar'),
  // 钢琴
  piano: z.array(z.string()).or(z.string()).optional().describe('songMetadata.piano'),
  // 电子钢琴
  digitalPiano: z.array(z.string()).or(z.string()).optional().describe('songMetadata.digitalPiano'),
  // 录音工程师
  recordingEngineer: z.array(z.string()).or(z.string()).optional().describe('songMetadata.recordingEngineer'),
  // 钢琴录制
  pianoRecording: z.array(z.string()).or(z.string()).optional().describe('songMetadata.pianoRecording'),
  // 母带工程师
  masteringEngineer: z.array(z.string()).or(z.string()).optional().describe('songMetadata.masteringEngineer'),
  // 录音室
  recordingStudio: z.array(z.string()).or(z.string()).optional().describe('songMetadata.recordingStudio'),
  // 联合制作人
  coProducer: z.array(z.string()).or(z.string()).optional().describe('albumMetadata.coProducer'),
  // 统筹
  coordinator: z.array(z.string()).or(z.string()).optional().describe('songMetadata.coordinator'),
  // 大提琴
  cello: z.array(z.string()).or(z.string()).optional().describe('songMetadata.cello'),
  // 尼龙吉他
  nylonGuitar: z.array(z.string()).or(z.string()).optional().describe('songMetadata.nylonGuitar'),
  // 低音提琴
  doubleBass: z.array(z.string()).or(z.string()).optional().describe('songMetadata.doubleBass'),
  // 和声编写
  backingVocalArranger: z.array(z.string()).or(z.string()).optional().describe('songMetadata.backingVocalArranger'),
  // 和声
  backingVocal: z.array(z.string()).or(z.string()).optional().describe('songMetadata.backingVocal'),
  // 大提琴编曲
  celloArranger: z.array(z.string()).or(z.string()).optional().describe('songMetadata.celloArranger'),
  // 合成器
  synthesizer: z.array(z.string()).or(z.string()).optional().describe('songMetadata.synthesizer'),
  // 口琴
  harmonica: z.array(z.string()).or(z.string()).optional().describe('songMetadata.harmonica'),
  // 小号
  trumpet: z.array(z.string()).or(z.string()).optional().describe('songMetadata.trumpet'),
  // 单曲制作人
  songProducer: z.array(z.string()).or(z.string()).optional().describe('songMetadata.songProducer'),
  // 专辑制作人
  albumProducer: z.array(z.string()).or(z.string()).optional().describe('songMetadata.albumProducer'),
  // ISRC, see <https://en.wikipedia.org/wiki/International_Standard_Recording_Code>.
  isrc: z.string().optional().describe('isrc'),
  // 其他额外信息
  extra: z
    .array(
      z.object({
        title: z.string(),
        value: z.array(z.string()).or(z.string()),
      })
    )
    .optional(),
  // 是否有台语
  hasBanlamTone: z.boolean().optional().default(false),
  // 备注
  notes: z.array(z.string()).or(z.string()).optional().describe('notes'),
})

const songCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/song' }),
  schema: songCollectionSchema,
})

export const talkingCollectionSchema = z.object({
  // 演唱会标题
  concertTitle: z.string().optional().describe('talkingMetadata.concertTitle'),
  // 巡演
  concertTour: z.string().optional().describe('tour'),
  // 地点
  place: z.string().optional().describe('place'),
  // 地址
  location: z.string().optional().describe('location'),
  // 日期
  date: z.date().optional().describe('date'),
  // 演出歌单页面的 Slug
  concertPageSlug: z.string().optional(),
  // Talking 的前一首歌
  previousSong: z.string().optional(),
  // Talking 的后一首歌
  nextSong: z.string().optional(),
  // 引用
  references: z
    .array(
      z.object({
        title: z.string().optional(),
        url: z.string().optional(),
      })
    )
    .optional()
    .describe('references'),
})

const talkingCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/talking' }),
  schema: talkingCollectionSchema,
})

export const concertCollectionSchema = z.object({
  // 标题
  title: z.string().optional().describe('title'),
  // 巡演
  tour: z.string().optional().describe('tour'),
  // 日期
  date: z.date().describe('date'),
  // 开始时间
  startTime: z.string().optional().describe('concertMetadata.startTime'),
  // 结束时间
  endTime: z.string().optional().describe('concertMetadata.endTime'),
  // 嘉宾
  guests: z.array(z.string()).or(z.string()).optional().describe('concertMetadata.guests'),
  // Talking 页面的 Slug
  talkingPageSlug: z.string().optional(),
  // 演出曲目列表
  list: z.array(z.string()),
  // 地点
  place: z.string().optional().describe('place'),
  // 地址
  location: z.string().optional().describe('location'),
})

const concertCollection = defineCollection({
  loader: glob({ pattern: '**/*.yml', base: './src/content/concert' }),
  schema: concertCollectionSchema,
})

export const albumCollectionSchema = z.object({
  // 标题
  title: z.string().describe('title'),
  // 英文标题
  englishTitle: z.string().optional().describe('englishTitle'),
  // 发布日期
  releaseDate: z.date().optional().describe('releaseDate'),
  // 总监制
  chiefExecutiveProducer: z.string().optional().describe('albumMetadata.chiefExecutiveProducer'),
  // 音乐总监
  musicDirector: z.string().optional().describe('albumMetadata.musicDirector'),
  // 制作人
  producer: z.array(z.string()).or(z.string()).optional().describe('albumMetadata.producer'),
  // 专辑格式
  albumFormat: z
    .union([
      // 光盘
      z
        .literal('CD')
        .describe('光盘'),
      // 黑胶
      z
        .literal('Vinyl')
        .describe('黑胶'),
      // 数字格式
      z
        .literal('Digital')
        .describe('数字格式'),
      // 磁带
      z
        .literal('Cassette')
        .describe('磁带'),
      // 流媒体，不提供下载，仅通过网络播放的音乐格式
      z
        .literal('Streaming')
        .describe('流媒体'),
    ])
    .optional()
    .describe('albumMetadata.albumFormat'),
  // 专辑类型
  albumType: z
    .union([
      z.literal('EP').describe('Extended Play'),
      z.literal('LP').describe('Long Play'),
      z.literal('Mixtape').describe('Maxtape'),
      z.literal('Single').describe('单曲'),
      z.literal('Compilation').describe('精选集'),
      z.literal('LiveAlbum').describe('现场专辑'),
      z.literal('RemixAlbum').describe('混音专辑'),
    ])
    .optional()
    .describe('albumMetadata.albumType'),
  // 曲目列表
  list: z.array(z.string()),
  // 备注
  notes: z.array(z.string()).or(z.string()).optional().describe('notes'),
  // 联合制作人
  coProducer: z.array(z.string()).or(z.string()).optional().describe('albumMetadata.coProducer'),
  // 统筹
  coordinator: z.array(z.string()).or(z.string()).optional().describe('albumMetadata.coordinator'),
  // 自定义 Slug
  customSlug: z.string().optional(),
})

const albumCollection = defineCollection({
  loader: glob({ pattern: '**/*.yml', base: './src/content/album' }),
  schema: albumCollectionSchema,
})

export const collections = {
  song: songCollection,
  album: albumCollection,
  concert: concertCollection,
  talking: talkingCollection,
}
