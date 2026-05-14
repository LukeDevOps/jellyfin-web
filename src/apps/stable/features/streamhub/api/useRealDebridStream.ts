import { useMutation } from '@tanstack/react-query';
import { useApi } from 'hooks/useApi';
import { shPost } from './streamHubClient';
import type { StreamResponse } from '../types';

export const useRealDebridStream = () => {
    const { api } = useApi();

    return useMutation({
        mutationFn: (magnetUrl: string) =>
            shPost<StreamResponse>(api!, 'StreamHub/stream', { magnetUrl }).then(r => r.data)
    });
};
