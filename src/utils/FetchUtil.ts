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
export type ResponseParseMode = 'auto' | 'json' | 'text';

export interface RequestOptions {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
  query?: QueryParams;
}

export interface RequestRuntimeOptions {
  headers?: Record<string, string>;
  timeout?: number;
  signal?: AbortSignal;
  parseAs?: ResponseParseMode;
}

export interface RequestResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

export class FetchHttpError extends Error {
  method: HttpMethod;
  status: number;
  statusText: string;
  url: string;
  responseText: string;
  headers: Record<string, string>;

  constructor(params: {
    method: HttpMethod;
    status: number;
    statusText: string;
    url: string;
    responseText?: string;
    headers?: Record<string, string>;
  }) {
    const { method, status, statusText, url, responseText = '', headers = {} } = params;
    super(`HTTP ${status} ${statusText} (${method} ${url})`);
    this.name = 'FetchHttpError';
    this.method = method;
    this.status = status;
    this.statusText = statusText;
    this.url = url;
    this.responseText = responseText;
    this.headers = headers;
  }
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
        value.forEach((item) => {
          if (item !== null && item !== undefined && item !== '') {
            searchParams.append(key, String(item));
          }
        });
      } else {
        searchParams.set(key, String(value));
      }
    });

    const searchString = searchParams.toString();
    if (!searchString) return url;

    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}${searchString}`;
  }

  private static hasHeader(headers: Record<string, string>, key: string): boolean {
    const target = key.toLowerCase();
    return Object.keys(headers).some((name) => name.toLowerCase() === target);
  }

  private static shouldSkipBody(method: HttpMethod): boolean {
    return ['GET', 'DELETE', 'HEAD', 'OPTIONS'].includes(method);
  }

  private static prepareBody(
    body: unknown,
    headers: Record<string, string>
  ): { body?: BodyInit; headers: Record<string, string> } {
    if (body === null || body === undefined) {
      return { body: undefined, headers };
    }

    if (typeof FormData !== 'undefined' && body instanceof FormData) {
      return { body, headers };
    }

    if (typeof Blob !== 'undefined' && body instanceof Blob) {
      return { body, headers };
    }

    if (typeof URLSearchParams !== 'undefined' && body instanceof URLSearchParams) {
      return { body, headers };
    }

    if (typeof body === 'string') {
      return { body, headers };
    }

    if (typeof ArrayBuffer !== 'undefined' && body instanceof ArrayBuffer) {
      return { body, headers };
    }

    if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView(body)) {
      return { body: body as unknown as BodyInit, headers };
    }

    if (!this.hasHeader(headers, 'Content-Type')) {
      headers['Content-Type'] = 'application/json';
    }

    return {
      body: JSON.stringify(body),
      headers,
    };
  }

  private static toHeaderRecord(headers?: HeadersInit): Record<string, string> {
    const result: Record<string, string> = {};
    if (!headers) return result;

    if (typeof Headers !== 'undefined' && headers instanceof Headers) {
      headers.forEach((value, key) => {
        result[key] = value;
      });
      return result;
    }

    if (Array.isArray(headers)) {
      headers.forEach(([key, value]) => {
        result[key] = value;
      });
      return result;
    }

    return Object.entries(headers as Record<string, string>).reduce<Record<string, string>>(
      (acc, [key, value]) => {
        acc[key] = String(value);
        return acc;
      },
      {}
    );
  }

  private static responseToText(data: unknown): string {
    if (typeof data === 'string') return data;
    if (data == null) return '';

    try {
      return JSON.stringify(data);
    } catch {
      return String(data);
    }
  }

  private static async parseResponse(
    response: Response,
    parseAs: ResponseParseMode,
    method: HttpMethod
  ): Promise<unknown> {
    if (method === 'HEAD' || [204, 205, 304].includes(response.status)) {
      return undefined;
    }

    const rawText = await response.text();
    if (rawText === '') {
      return undefined;
    }

    if (parseAs === 'text') {
      return rawText;
    }

    const contentType = response.headers.get('content-type') || '';
    const looksLikeJson = contentType.includes('application/json') || contentType.includes('+json');
    const shouldParseJson = parseAs === 'json' || (parseAs === 'auto' && looksLikeJson);

    if (!shouldParseJson) {
      return rawText;
    }

    try {
      return JSON.parse(rawText);
    } catch {
      throw new Error(`Invalid JSON response: ${response.status} ${response.statusText}`);
    }
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
    options?: RequestRuntimeOptions
  ): Promise<RequestResponse<T>> {
    const controller = new AbortController();
    const timeout = options?.timeout && options.timeout > 0 ? options.timeout : null;
    const timeoutId = timeout ? setTimeout(() => controller.abort(), timeout) : null;

    const normalizedMethod = String(method || 'GET').toUpperCase() as HttpMethod;
    const isMethodWithoutBody = this.shouldSkipBody(normalizedMethod);
    const normalizedUrl = isMethodWithoutBody
      ? this.normalizeUrl(url, dataOrParams as QueryParams)
      : url;

    const externalSignal = options?.signal;
    const onAbort = () => controller.abort();
    if (externalSignal) {
      if (externalSignal.aborted) {
        controller.abort();
      } else {
        externalSignal.addEventListener('abort', onAbort, { once: true });
      }
    }

    const baseHeaders = this.toHeaderRecord(options?.headers);
    const prepared = isMethodWithoutBody
      ? { body: undefined, headers: baseHeaders }
      : this.prepareBody(dataOrParams, baseHeaders);

    try {
      const response = await fetch(normalizedUrl, {
        method: normalizedMethod,
        headers: prepared.headers,
        body: prepared.body,
        signal: controller.signal,
      });

      const data = await this.parseResponse(response, options?.parseAs || 'auto', normalizedMethod);
      const headers = Object.fromEntries(response.headers.entries());

      if (!response.ok) {
        throw new FetchHttpError({
          method: normalizedMethod,
          url: normalizedUrl,
          status: response.status,
          statusText: response.statusText,
          responseText: this.responseToText(data),
          headers,
        });
      }

      return {
        data: data as T,
        status: response.status,
        statusText: response.statusText,
        headers,
      };
    } catch (error) {
      if (error instanceof FetchHttpError) {
        throw error;
      }

      if (error instanceof Error && error.name === 'AbortError') {
        if (timeout && !externalSignal?.aborted) {
          throw new Error(`Request timeout after ${timeout}ms (${normalizedMethod} ${normalizedUrl})`);
        }
        throw new Error(`Request aborted (${normalizedMethod} ${normalizedUrl})`);
      }

      throw error;
    } finally {
      if (timeoutId) clearTimeout(timeoutId);
      if (externalSignal) {
        externalSignal.removeEventListener('abort', onAbort);
      }
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
    options?: RequestRuntimeOptions
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
    options?: RequestRuntimeOptions
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
    options?: RequestRuntimeOptions
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
    options?: RequestRuntimeOptions
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
    options?: RequestRuntimeOptions
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
    options?: RequestRuntimeOptions
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
    options?: RequestRuntimeOptions
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
