import { useQuery } from '@tanstack/react-query';
import { useApi } from 'hooks/useApi';
import { shGet } from './streamHubClient';
import type { TraktHistoryItem } from '../types';

export const useTraktHistory = (limit = 5, enabled = true) => {
    const { api } = useApi();

    return useQuery({
        queryKey: ['StreamHub', 'trakt', 'history', limit],
        queryFn: () =>
            shGet<TraktHistoryItem[]>(api!, 'StreamHub/trakt/history', { params: { limit } }).then(r => r.data),
        enabled: !!api && enabled,
        staleTime: 1000 * 60 * 5
    });
};
