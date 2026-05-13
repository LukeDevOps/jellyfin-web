import type { AxiosInstance } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useApi } from 'hooks/useApi';
import type { DebridSearchResult } from '../types';

export const CATEGORY_MOVIES = 2000;
export const CATEGORY_TV = 5000;

const fetchRealDebridSearch = async (
    basePath: string,
    axiosInstance: AxiosInstance,
    query: string,
    category: number,
    signal?: AbortSignal
): Promise<DebridSearchResult[]> => {
    const response = await axiosInstance.get<DebridSearchResult[]>(
        `${basePath}/StreamHub/search`,
        {
            params: { query, category },
            signal
        }
    );
    return response.data;
};

export const useRealDebridSearch = (query: string, category: number) => {
    const { api } = useApi();

    return useQuery({
        queryKey: ['RealDebrid', 'search', query, category],
        queryFn: ({ signal }) => fetchRealDebridSearch(
            api!.basePath,
            api!.axiosInstance,
            query,
            category,
            signal
        ),
        enabled: !!api && query.trim().length > 0,
        staleTime: 1000 * 60 * 5
    });
};
