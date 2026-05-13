export interface DebridSearchResult {
    title: string;
    infoHash: string;
    magnetUrl: string;
    size: number;
    seeders: number;
    indexer: string;
}

export interface StreamResponse {
    url: string;
}
