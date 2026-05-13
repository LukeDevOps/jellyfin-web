import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from 'hooks/useApi';
import type { TraktAuthStartResponse, TraktAuthPollResponse } from '../types';

export const useStartTraktAuth = () => {
    const { api } = useApi();

    return useMutation({
        mutationFn: async (): Promise<TraktAuthStartResponse> => {
            const response = await api!.axiosInstance.post<TraktAuthStartResponse>(
                `${api!.basePath}/StreamHub/trakt/auth/start`
            );
            return response.data;
        }
    });
};

export const usePollTraktAuth = (deviceCode: string | null, intervalSeconds: number) => {
    const { api } = useApi();
    const queryClient = useQueryClient();

    return useQuery({
        queryKey: ['StreamHub', 'trakt', 'poll', deviceCode],
        queryFn: async (): Promise<TraktAuthPollResponse> => {
            const response = await api!.axiosInstance.post<TraktAuthPollResponse>(
                `${api!.basePath}/StreamHub/trakt/auth/poll`,
                { deviceCode }
            );
            return response.data;
        },
        enabled: !!api && !!deviceCode,
        refetchInterval: (query) => {
            if (query.state.data?.authenticated) return false;
            return intervalSeconds * 1000;
        },
        select: (data) => {
            if (data.authenticated) {
                // Invalidate status so the page re-renders with auth confirmed
                void queryClient.invalidateQueries({ queryKey: ['StreamHub', 'trakt', 'status'] });
                void queryClient.invalidateQueries({ queryKey: ['StreamHub', 'trakt', 'history'] });
            }
            return data;
        }
    });
};
