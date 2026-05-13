import { useQuery } from '@tanstack/react-query';
import { useApi } from 'hooks/useApi';
import type { TraktHistoryItem } from '../types';

export const useTraktHistory = (limit = 5, enabled = true) => {
    const { api } = useApi();

    return useQuery({
        queryKey: ['StreamHub', 'trakt', 'history', limit],
        queryFn: async (): Promise<TraktHistoryItem[]> => {
            const response = await api!.axiosInstance.get<TraktHistoryItem[]>(
                `${api!.basePath}/StreamHub/trakt/history`,
                { params: { limit } }
            );
            return response.data;
        },
        enabled: !!api && enabled,
        staleTime: 1000 * 60 * 5
    });
};
