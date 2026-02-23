/**
 * ═════════════════════════════════════════════════════════════
 * 📄 FILE     : browser.ts
 * 📁 PACKAGE  : stz-utils
 * 👤 AUTHOR   : stz
 * 🕒 CREATED  : 2025/12/30
 * ═════════════════════════════════════════════════════════════
 * ═════════════════════════════════════════════════════════════
 * 📝 DESCRIPTION
 *   - Browser-compatible entry point
 *   - Only exports utilities that work in browser environment
 * ═════════════════════════════════════════════════════════════
 * ═════════════════════════════════════════════════════════════
 * 🔄 CHANGE LOG
 *   - DATE : 2025/12/30 | Author : stz | 최초 생성
 * ═════════════════════════════════════════════════════════════
 */

// Browser-compatible core
export { StzCore, stzCore } from './core/browser';

// Browser-compatible utilities only
export { StzUtils } from './utils/StzUtils';
export { FetchUtil, FetchHttpError } from './utils/FetchUtil';
export { Chronos } from './utils/ChronosUtil';

export type {
  RequestOptions,
  RequestRuntimeOptions,
  RequestResponse,
  ResponseParseMode,
  HttpMethod,
  QueryParams,
  QueryValue,
} from './utils/FetchUtil';
export type { ChronosUnit } from './utils/ChronosUtil';
