import type { Api } from '@jellyfin/sdk';
import type { AxiosRequestConfig } from 'axios';

const authHeaders = (api: Api): AxiosRequestConfig => ({
    headers: {
        Authorization: api.authorizationHeader,
        Accept: 'application/json; profile="CamelCase"'
    }
});

export const shGet = <T>(api: Api, path: string, config?: AxiosRequestConfig) =>
    api.axiosInstance.get<T>(`${api.basePath}/${path}`, { ...authHeaders(api), ...config });

export const shPost = <T>(api: Api, path: string, data?: unknown) =>
    api.axiosInstance.post<T>(`${api.basePath}/${path}`, data, authHeaders(api));
