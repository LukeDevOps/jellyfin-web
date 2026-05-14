import { useQuery } from '@tanstack/react-query';
import { useApi } from 'hooks/useApi';
import { shGet } from './streamHubClient';
import type { TraktRecommendationItem } from '../types';

export const useTraktRecommendations = (type: 'movies' | 'shows', limit = 30, enabled = true) => {
    const { api } = useApi();
    return useQuery({
        queryKey: ['StreamHub', 'trakt', 'recommendations', type, limit],
        queryFn: () =>
            shGet<TraktRecommendationItem[]>(api!, 'StreamHub/trakt/recommendations', { params: { type, limit } }).then(r => r.data),
        enabled: !!api && enabled,
        staleTime: 1000 * 60 * 30
    });
};
