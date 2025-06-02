export interface LyricLine {
  text: string
  isHightlight: boolean
  toneText?: string
  toneText2?: string
}

export function formatLyricsLines(lyricsBody: string): LyricLine[] {
  const TIME_LINE_PATTERN = /^\[\d{2}:\d{2}(\.\d+)?\]/
  const TONE_TEXT_PATTERN = /\[([^\]]+)\]$/

  const lyricLines = lyricsBody.split('\n').map((lineText: string) => {
    const rawText = lineText.replace(TIME_LINE_PATTERN, '').trim()
    const isHighlightLine = rawText.startsWith('!')
    const toneTextRaw = rawText.match(TONE_TEXT_PATTERN)?.[1]
    const hasToneText2 = toneTextRaw?.includes('|')
    const toneText = hasToneText2 ? toneTextRaw?.split('|')[0] : toneTextRaw
    const toneText2 = hasToneText2 ? toneTextRaw?.split('|')[1] : undefined
    const line = rawText.replace(TONE_TEXT_PATTERN, '').replace(/^\!/, '').trim()

    return {
      text: line,
      isHightlight: isHighlightLine,
      toneText: toneText,
      toneText2: toneText2,
    } as LyricLine
  })

  if (lyricLines.length > 0 && lyricLines[0].text.trim() === '') {
    lyricLines.shift()
  }

  if (lyricLines.length > 0 && lyricLines[lyricLines.length - 1].text.trim() === '') {
    lyricLines.pop()
  }

  return lyricLines
}
