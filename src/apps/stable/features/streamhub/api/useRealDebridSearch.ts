import { useQuery } from '@tanstack/react-query';
import { useApi } from 'hooks/useApi';
import { shGet } from './streamHubClient';
import type { DebridSearchResult } from '../types';

export const CATEGORY_MOVIES = 2000;
export const CATEGORY_TV = 5000;

export const useRealDebridSearch = (query: string, category: number) => {
    const { api } = useApi();

    return useQuery({
        queryKey: ['RealDebrid', 'search', query, category],
        queryFn: ({ signal }) =>
            shGet<DebridSearchResult[]>(api!, 'StreamHub/search', { params: { query, category }, signal })
                .then(r => r.data),
        enabled: !!api && query.trim().length > 0,
        staleTime: 1000 * 60 * 5
    });
};
