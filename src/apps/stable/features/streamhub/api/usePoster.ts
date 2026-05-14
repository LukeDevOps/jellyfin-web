import { useQuery } from '@tanstack/react-query';
import { useApi } from 'hooks/useApi';

export const usePoster = (isMovie: boolean, tmdbId: number | undefined) => {
    const { api } = useApi();
    return useQuery({
        queryKey: ['trakt-poster', isMovie ? 'movie' : 'show', tmdbId],
        queryFn: async () => {
            const endpoint = isMovie
                ? `${api!.basePath}/Items/RemoteSearch/Movie`
                : `${api!.basePath}/Items/RemoteSearch/Series`;
            const res = await api!.axiosInstance.post<Array<{ ImageUrl?: string }>>(
                endpoint,
                { SearchInfo: { ProviderIds: { Tmdb: String(tmdbId) } } },
                { headers: { Authorization: api!.authorizationHeader } }
            );
            return res.data?.[0]?.ImageUrl ?? null;
        },
        enabled: !!api && !!tmdbId,
        staleTime: 1000 * 60 * 60
    });
};
