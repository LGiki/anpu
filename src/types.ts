export type ContentGroupItem<T> = T & {
    url: string;
};

export interface ContentGroup<T> {
    key: string;
    list: ContentGroupItem<T>[];
}