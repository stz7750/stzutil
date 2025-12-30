/**
 * ═════════════════════════════════════════════════════════════
 * 📄 FILE     : fetchUtil.ts
 * 📁 PACKAGE  : stz-utils
 * 👤 AUTHOR   : stz
 * 🕒 CREATED  : 2025/12/30
 * ═════════════════════════════════════════════════════════════
 * ═════════════════════════════════════════════════════════════
 * 📝 DESCRIPTION
 *   - HTTP Request utility functions
 * ═════════════════════════════════════════════════════════════
 * ═════════════════════════════════════════════════════════════
 * 🔄 CHANGE LOG
 *   - DATE : 2025/12/30 | Author : stz | 최초 생성
 * ═════════════════════════════════════════════════════════════
 */

export type QueryValue = string | number | boolean | null | undefined;
export type QueryParams = Record<string, QueryValue | QueryValue[]>;
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';

export interface RequestOptions {
    method?: HttpMethod;
    headers?: Record<string, string>;
    body?: any;
    timeout?: number;
    query?: QueryParams;
}

export interface RequestResponse<T = any> {
    data: T;
    status: number;
    statusText: string;
    headers: Record<string, string>;
}

export class FetchUtil {
    /**
     * URL과 쿼리 파라미터를 결합하고 정규화합니다
     * - null, undefined, 빈 문자열 자동 제거
     * - 배열 파라미터 지원 (key=val1&key=val2)
     * - 기존 쿼리스트링과 병합
     */
    private static normalizeUrl(url: string, query?: QueryParams): string {
        if (!query) return url;

        const searchParams = new URLSearchParams();

        Object.entries(query).forEach(([key, value]) => {
            if (value === null || value === undefined || value === '') {
                return;
            }

            if (Array.isArray(value)) {
                value.forEach(item => {
                    if (item !== null && item !== undefined && item !== '') {
                        searchParams.append(key, String(item));
                    }
                });
            } else {
                // 단일 값
                searchParams.set(key, String(value));
            }
        });

        const searchString = searchParams.toString();
        if (!searchString) return url;
        
        const separator = url.includes('?') ? '&' : '?';
        return `${url}${separator}${searchString}`;
    }

    /**
     * 기본 fetch 래퍼
     * @param method HTTP 메서드 (GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS)
     * @param url 요청 URL
     * @param dataOrParams GET/DELETE/HEAD/OPTIONS는 query params, POST/PUT/PATCH는 body
     * @param options 헤더 및 타임아웃 설정
     */
    static async request<T = any>(
        method: HttpMethod,
        url: string,
        dataOrParams?: any | QueryParams,
        options?: { headers?: Record<string, string>, timeout?: number }
    ): Promise<RequestResponse<T>> {
        const controller = new AbortController();
        const timeoutId = options?.timeout
            ? setTimeout(() => controller.abort(), options.timeout)
            : null;
        
        const methodsWithoutBody = ['GET', 'DELETE', 'HEAD', 'OPTIONS'];
        const isMethodWithoutBody = methodsWithoutBody.includes(method);
        const normalizedUrl = isMethodWithoutBody
            ? this.normalizeUrl(url, dataOrParams as QueryParams)
            : url;

        try {
            const response = await fetch(normalizedUrl, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    ...options?.headers,
                },
                body: isMethodWithoutBody
                    ? undefined
                    : dataOrParams ? JSON.stringify(dataOrParams) : undefined,
                signal: controller.signal,
            });

            const data = await response.json();

            return {
                data,
                status: response.status,
                statusText: response.statusText,
                headers: Object.fromEntries(response.headers.entries()),
            };
        } finally {
            if (timeoutId) clearTimeout(timeoutId);
        }
    }

    /**
     * GET 요청
     * @param url 요청 URL
     * @param params 쿼리 파라미터
     * @param options 헤더 및 타임아웃 설정
     */
    static async get<T = any>(
        url: string,
        params?: QueryParams,
        options?: { headers?: Record<string, string>, timeout?: number }
    ): Promise<RequestResponse<T>> {
        return this.request<T>('GET', url, params, options);
    }

    /**
     * POST 요청
     * @param url 요청 URL
     * @param body 요청 본문
     * @param options 헤더 및 타임아웃 설정
     */
    static async post<T = any>(
        url: string,
        body?: any,
        options?: { headers?: Record<string, string>, timeout?: number }
    ): Promise<RequestResponse<T>> {
        return this.request<T>('POST', url, body, options);
    }

    /**
     * PUT 요청
     * @param url 요청 URL
     * @param body 요청 본문
     * @param options 헤더 및 타임아웃 설정
     */
    static async put<T = any>(
        url: string,
        body?: any,
        options?: { headers?: Record<string, string>, timeout?: number }
    ): Promise<RequestResponse<T>> {
        return this.request<T>('PUT', url, body, options);
    }

    /**
     * DELETE 요청
     * @param url 요청 URL
     * @param params 쿼리 파라미터
     * @param options 헤더 및 타임아웃 설정
     */
    static async delete<T = any>(
        url: string,
        params?: QueryParams,
        options?: { headers?: Record<string, string>, timeout?: number }
    ): Promise<RequestResponse<T>> {
        return this.request<T>('DELETE', url, params, options);
    }

    /**
     * PATCH 요청
     * @param url 요청 URL
     * @param body 요청 본문
     * @param options 헤더 및 타임아웃 설정
     */
    static async patch<T = any>(
        url: string,
        body?: any,
        options?: { headers?: Record<string, string>, timeout?: number }
    ): Promise<RequestResponse<T>> {
        return this.request<T>('PATCH', url, body, options);
    }

    /**
     * HEAD 요청
     * @param url 요청 URL
     * @param params 쿼리 파라미터
     * @param options 헤더 및 타임아웃 설정
     */
    static async head<T = any>(
        url: string,
        params?: QueryParams,
        options?: { headers?: Record<string, string>, timeout?: number }
    ): Promise<RequestResponse<T>> {
        return this.request<T>('HEAD', url, params, options);
    }

    /**
     * OPTIONS 요청
     * @param url 요청 URL
     * @param params 쿼리 파라미터
     * @param options 헤더 및 타임아웃 설정
     */
    static async options<T = any>(
        url: string,
        params?: QueryParams,
        options?: { headers?: Record<string, string>, timeout?: number }
    ): Promise<RequestResponse<T>> {
        return this.request<T>('OPTIONS', url, params, options);
    }

    /**
     * Query string 생성
     */
    static buildQueryString(params: Record<string, any>): string {
        const queryParams = new URLSearchParams();

        Object.entries(params).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                queryParams.append(key, String(value));
            }
        });

        return queryParams.toString();
    }

    /**
     * URL에 query string 추가
     */
    static appendQueryString(url: string, params: Record<string, any>): string {
        const queryString = this.buildQueryString(params);
        if (!queryString) return url;

        const separator = url.includes('?') ? '&' : '?';
        return `${url}${separator}${queryString}`;
    }
}
