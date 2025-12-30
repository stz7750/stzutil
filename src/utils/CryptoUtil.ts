/**
 * ═════════════════════════════════════════════════════════════
 * 📄 FILE     : cryptoUtil.ts
 * 📁 PACKAGE  : stz-utils
 * 👤 AUTHOR   : stz
 * 🕒 CREATED  : 2025/12/30
 * ═════════════════════════════════════════════════════════════
 * ═════════════════════════════════════════════════════════════
 * 📝 DESCRIPTION
 *   - Cryptography utility functions
 * ═════════════════════════════════════════════════════════════
 * ═════════════════════════════════════════════════════════════
 * 🔄 CHANGE LOG
 *   - DATE : 2025/12/30 | Author : stz | 최초 생성
 * ═════════════════════════════════════════════════════════════
 */

import { createHash, randomBytes } from 'crypto';

export class CryptoUtil {
    /**
     * SHA-256 해시 생성
     */
    static encryptSHA256(data: string, salt: string = ''): string {
        const hash = createHash('sha256');
        if (salt) {
            hash.update(salt, 'utf8');
        }
        hash.update(data, 'utf8');
        return hash.digest('hex');
    }

    /**
     * 랜덤 솔트 생성
     */
    static makeSalt(bytes: number = 16): string {
        return randomBytes(bytes).toString('hex');
    }

    /**
     * 기본 해시 함수 (알고리즘 선택 가능)
     */
    static hash(data: string, algorithm: 'md5' | 'sha1' | 'sha256' | 'sha512' = 'sha256'): string {
        return createHash(algorithm).update(data, 'utf8').digest('hex');
    }

    /**
     * Base64 인코딩
     */
    static encodeBase64(data: string): string {
        return Buffer.from(data, 'utf-8').toString('base64');
    }

    /**
     * Base64 디코딩
     */
    static decodeBase64(data: string): string {
        return Buffer.from(data, 'base64').toString('utf-8');
    }
}
