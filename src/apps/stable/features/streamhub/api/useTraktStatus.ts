import { useQuery } from '@tanstack/react-query';
import { useApi } from 'hooks/useApi';
import type { TraktAuthPollResponse } from '../types';

export const useTraktStatus = () => {
    const { api } = useApi();

    return useQuery({
        queryKey: ['StreamHub', 'trakt', 'status'],
        queryFn: async () => {
            const response = await api!.axiosInstance.get<TraktAuthPollResponse>(
                `${api!.basePath}/StreamHub/trakt/status`
            );
            return response.data;
        },
        enabled: !!api,
        staleTime: Infinity
    });
};
