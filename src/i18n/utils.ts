import { defaultLang, languages, showDefaultLang, ui } from './ui'

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/')
  if (lang in ui) return lang as keyof typeof ui
  return defaultLang
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key]
  }
}

export function useTranslatedPath(lang: keyof typeof ui) {
  return function translatePath(path: string, l: string = lang) {
    return !showDefaultLang && l === defaultLang ? path : `/${l}${path}`
  }
}

export function stripTrailingSlash(href: string) {
  if (href[href.length - 1] === '/') {
    return href.slice(0, -1)
  }
  return href
}

export function localizedUrl(url: URL, targetLocale: string): URL {
  const newUrl = new URL(url)
  const base = stripTrailingSlash(import.meta.env.BASE_URL)
  const hasBase = newUrl.pathname.startsWith(base)
  if (hasBase) {
    newUrl.pathname = newUrl.pathname.replace(base, '')
  }

  // url.pathname be like: `/song/bi-jing` or `/zh-hant/song/bi-jing`
  // so, currentLanguageSegment will be `song` or `zh-hant`
  const [_, currentLanguageSegment] = newUrl.pathname.split('/')

  if (currentLanguageSegment && currentLanguageSegment in languages) {
    if (targetLocale === defaultLang) {
      // If the target locale is the default language, remove the current language segment
      newUrl.pathname = newUrl.pathname.replace(`/${currentLanguageSegment}`, '')
    } else {
      // If the target locale is not the default language, replace the current language segment with the target language segment
      newUrl.pathname = newUrl.pathname.replace(`/${currentLanguageSegment}`, `/${targetLocale}`)
    }
  } else if (targetLocale !== defaultLang) {
    newUrl.pathname = `/${targetLocale}${newUrl.pathname}`
  }

  if (hasBase) {
    newUrl.pathname = base + newUrl.pathname
  }
  return newUrl
}
