import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from 'hooks/useApi';
import { shGet, shPost } from './streamHubClient';
import type { TraktAuthStartResponse, TraktAuthPollResponse } from '../types';

export const useStartTraktAuth = () => {
    const { api } = useApi();

    return useMutation({
        mutationFn: () =>
            shPost<TraktAuthStartResponse>(api!, 'StreamHub/trakt/auth/start').then(r => r.data)
    });
};

export const usePollTraktAuth = (deviceCode: string | null, intervalSeconds: number) => {
    const { api } = useApi();
    const queryClient = useQueryClient();

    return useQuery({
        queryKey: ['StreamHub', 'trakt', 'poll', deviceCode],
        queryFn: () =>
            shPost<TraktAuthPollResponse>(api!, 'StreamHub/trakt/auth/poll', { deviceCode })
                .then(r => r.data),
        enabled: !!api && !!deviceCode,
        refetchInterval: (query) => {
            if (query.state.data?.authenticated) return false;
            return intervalSeconds * 1000;
        },
        select: (data) => {
            if (data.authenticated) {
                void queryClient.invalidateQueries({ queryKey: ['StreamHub', 'trakt', 'status'] });
                void queryClient.invalidateQueries({ queryKey: ['StreamHub', 'trakt', 'history'] });
            }
            return data;
        }
    });
};
