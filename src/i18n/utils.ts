import { ui, defaultLang, showDefaultLang, languages } from './ui';

export function getLangFromUrl(url: URL) {
    const [, lang] = url.pathname.split('/');
    if (lang in ui) return lang as keyof typeof ui;
    return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
    return function t(key: keyof typeof ui[typeof defaultLang]) {
        return ui[lang][key] || ui[defaultLang][key];
    }
}

export function useTranslatedPath(lang: keyof typeof ui) {
    return function translatePath(path: string, l: string = lang) {
        return !showDefaultLang && l === defaultLang ? path : `/${l}${path}`
    }
}

export function stripTrailingSlash(href: string) {
    if (href[href.length - 1] === '/') {
        href = href.slice(0, -1)
    };
    return href;
}

export function localizedUrl(url: URL, targetLocale: string): URL {
    url = new URL(url);
    const base = stripTrailingSlash(import.meta.env.BASE_URL);
    const hasBase = url.pathname.startsWith(base);
    if (hasBase) {
        url.pathname = url.pathname.replace(base, '');
    }

    // url.pathname be like: `/song/bi-jing` or `/zh-hant/song/bi-jing`
    // so, currentLanguageSegment will be `song` or `zh-hant`
    const [_, currentLanguageSegment] = url.pathname.split('/');

    if (currentLanguageSegment && currentLanguageSegment in languages) {
        if (targetLocale === defaultLang) {
            // If the target locale is the default language, remove the current language segment
            url.pathname = url.pathname.replace(`/${currentLanguageSegment}`, '');
        } else {
            // If the target locale is not the default language, replace the current language segment with the target language segment
            url.pathname = url.pathname.replace(`/${currentLanguageSegment}`, `/${targetLocale}`);
        }
    } else if (targetLocale !== defaultLang) {
        url.pathname = `/${targetLocale}` + url.pathname;
    }

    if (hasBase) {
        url.pathname = base + url.pathname
    };
    return url;
}
