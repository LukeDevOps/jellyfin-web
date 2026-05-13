import { useMutation } from '@tanstack/react-query';
import { useApi } from 'hooks/useApi';
import type { StreamResponse } from '../types';

export const useRealDebridStream = () => {
    const { api } = useApi();

    return useMutation({
        mutationFn: async (magnetUrl: string): Promise<StreamResponse> => {
            const response = await api!.axiosInstance.post<StreamResponse>(
                `${api!.basePath}/StreamHub/stream`,
                { magnetUrl }
            );
            return response.data;
        }
    });
};
