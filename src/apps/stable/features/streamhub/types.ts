export interface DebridSearchResult {
    title: string;
    infoHash: string;
    magnetUrl: string;
    size: number;
    seeders: number;
    indexer: string;
    quality: string;
}

export interface StreamResponse {
    url: string;
}

export interface TraktAuthStartResponse {
    userCode: string;
    verificationUrl: string;
    deviceCode: string;
    interval: number;
}

export interface TraktAuthPollResponse {
    authenticated: boolean;
}

export interface TraktIds {
    trakt: number;
    slug: string;
    imdb?: string;
    tmdb?: number;
}

export interface TraktMovie {
    title: string;
    year: number;
    ids: TraktIds;
}

export interface TraktShow {
    title: string;
    year: number;
    ids: TraktIds;
}

export interface TraktEpisode {
    season: number;
    number: number;
    title: string;
}

export interface TraktRecommendationItem {
    title: string;
    year: number;
    ids: TraktIds;
}

export interface TraktHistoryItem {
    id: number;
    watchedAt: string;
    type: 'movie' | 'episode';
    movie?: TraktMovie;
    show?: TraktShow;
    episode?: TraktEpisode;
}
