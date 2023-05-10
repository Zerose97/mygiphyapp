export interface GifTrendingDataApi {
    data: GifItem[];
    meta: Meta;
    pagination: Pagination;
}

export interface GifItem {
    type: string;
    id: string;
    slug: string;
    url: string;
    bitly_url: string;
    embed_url: string;
    username: string;
    source: string;
    rating: string;
    content_url: string;
    user: User;
    source_tld: string;
    source_post_url: string;
    update_datetime: string;
    create_datetime: string;
    import_datetime: string;
    trending_datetime: string;
    images: any;
    title: string;
    alt_text: string;
    properties: Properties;
}

export interface Properties {
    ogGif: string;
    preGif: string;
    size: string;
    height: string;
    width: string;
}

export interface User {
    avatar_url: string;
    banner_url: string;
    profile_url: string;
    username: string;
    display_name: string
}

export interface Meta {
    msg: string;
    status: number;
    response_id: string;
}

export interface Pagination {
    offset: number;
    total_count: number;
    count: number;
}