/**
 * ═════════════════════════════════════════════════════════════
 * 📄 FILE     : core/index.ts
 * 📁 PACKAGE  : stz-utils
 * 👤 AUTHOR   : stz
 * 🕒 CREATED  : 2025/12/30
 * ═════════════════════════════════════════════════════════════
 * ═════════════════════════════════════════════════════════════
 * 📝 DESCRIPTION
 *   - Core utility aggregator class
 * ═════════════════════════════════════════════════════════════
 * ═════════════════════════════════════════════════════════════
 * 🔄 CHANGE LOG
 *   - DATE : 2025/12/30 | Author : stz | 최초 생성
 * ═════════════════════════════════════════════════════════════
 */

import { StzUtils } from '../utils/StzUtils';
import { ExecUtil } from '../utils/ExecUtil';
import { CryptoUtil } from '../utils/CryptoUtil';
import { FetchUtil } from '../utils/FetchUtil';

/**
 * 통합 유틸리티 클래스
 *
 * @example
 * ```typescript
 * import { stzCore } from 'stz-utils';
 *
 * // Frontend utilities
 * stzCore.stzUtils.isEmpty(value);
 * stzCore.stzUtils.isArray(value);
 *
 * // Process utilities
 * stzCore.execUtil.execute('ls -la');
 * stzCore.execUtil.mkDir('./test');
 *
 * // Crypto utilities
 * stzCore.cryptoUtil.encryptSHA256('password', 'salt');
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
     * Process execution & file system utilities
     * - Command execution (execute)
     * - Directory operations (mkDir, rmDir)
     * - File operations (copyFile, moveFile, readFile, readJson)
     * - File search (listFiles, findFiles, exists)
     */
    public execUtil = ExecUtil;

    /**
     * Cryptography utilities
     * - Hashing (encryptSHA256, hash, makeSalt)
     * - Encoding (encodeBase64, decodeBase64)
     */
    public cryptoUtil = CryptoUtil;

    /**
     * HTTP Request utilities
     * - REST methods (get, post, put, delete, patch)
     * - Query string utilities (buildQueryString, appendQueryString)
     */
    public requestUtil = FetchUtil;
}

/**
 * 싱글톤 인스턴스
 *
 * @example
 * ```typescript
 * import { stzCore } from 'stz-utils';
 *
 * const isEmpty = stzCore.stzUtils.isEmpty('');
 * ```
 */
export const stzCore = new StzCore();
