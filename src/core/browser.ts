/**
 * ═════════════════════════════════════════════════════════════
 * 📄 FILE     : core/browser.ts
 * 📁 PACKAGE  : stz-utils
 * 👤 AUTHOR   : stz
 * 🕒 CREATED  : 2025/12/30
 * ═════════════════════════════════════════════════════════════
 * ═════════════════════════════════════════════════════════════
 * 📝 DESCRIPTION
 *   - Browser-compatible core utility aggregator
 *   - Only includes utilities that work in browser environment
 * ═════════════════════════════════════════════════════════════
 * ═════════════════════════════════════════════════════════════
 * 🔄 CHANGE LOG
 *   - DATE : 2025/12/30 | Author : stz | Browser용 StzCore 생성
 * ═════════════════════════════════════════════════════════════
 */

import { StzUtils } from '../utils/StzUtils';
import { FetchUtil } from '../utils/FetchUtil';

/**
 * 통합 유틸리티 클래스 (Browser 전용)
 *
 * @example
 * ```typescript
 * import { stzCore } from 'stz-utils/browser';
 *
 * // Frontend utilities
 * stzCore.stzUtils.isEmpty(value);
 * stzCore.stzUtils.isArray(value);
 *
 * // Request utilities
 * await stzCore.requestUtil.get('https://api.example.com/data');
 * ```
 */
export class StzCore {
    /**
     * Frontend utility functions
     * - Type checking (isNull, isUndefined, isString, isNumber, etc.)
     * - Type conversion (toInt, toFloat, toBoolean, etc.)
     * - String manipulation (capitalize, toSnakeCase, toCamelCase, etc.)
     * - Array utilities (chunk, unique, shuffle, etc.)
     * - Object utilities (merge, cloneDeep, isEmpty, etc.)
     * - Color utilities (hexToRgba, rgbToHex, etc.)
     */
    public stzUtils = StzUtils;

    /**
     * HTTP Request utilities
     * - REST methods (get, post, put, delete, patch)
     * - Query string utilities (buildQueryString, appendQueryString)
     */
    public requestUtil = FetchUtil;
}

/**
 * 싱글톤 인스턴스 (Browser 전용)
 *
 * @example
 * ```typescript
 * import { stzCore } from 'stz-utils/browser';
 *
 * const isEmpty = stzCore.stzUtils.isEmpty('');
 * await stzCore.requestUtil.get('https://api.example.com');
 * ```
 */
export const stzCore = new StzCore();