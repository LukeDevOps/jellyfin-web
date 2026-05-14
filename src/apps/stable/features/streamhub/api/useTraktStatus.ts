import { useQuery } from '@tanstack/react-query';
import { useApi } from 'hooks/useApi';
import { shGet } from './streamHubClient';
import type { TraktAuthPollResponse } from '../types';

export const useTraktStatus = () => {
    const { api } = useApi();

    return useQuery({
        queryKey: ['StreamHub', 'trakt', 'status'],
        queryFn: () =>
            shGet<TraktAuthPollResponse>(api!, 'StreamHub/trakt/status').then(r => r.data),
        enabled: !!api,
        staleTime: Infinity
    });
};
