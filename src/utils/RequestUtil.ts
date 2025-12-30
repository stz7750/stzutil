/**
 * ═════════════════════════════════════════════════════════════
 * 📄 FILE     : RequestUtil.ts
 * 📁 PACKAGE  : stz-utils
 * 👤 AUTHOR   : stz
 * 🕒 CREATED  : 2025/12/30
 * ═════════════════════════════════════════════════════════════
 * ═════════════════════════════════════════════════════════════
 * 📝 DESCRIPTION
 *   - HTTP Request 관련 유틸리티 (클라이언트 정보 추출)
 *   - IP, OS, Browser, User-Agent 파싱
 * ═════════════════════════════════════════════════════════════
 * ═════════════════════════════════════════════════════════════
 * 🔄 CHANGE LOG
 *   - DATE : 2025/12/30 | Author : stz | 최초 생성
 * ═════════════════════════════════════════════════════════════
 */

/**
 * HTTP 요청 인터페이스 (Express Request와 호환)
 */
export interface HttpRequest {
    headers: Record<string, string | string[] | undefined>;
    connection?: {
        remoteAddress?: string;
    };
    socket?: {
        remoteAddress?: string;
    };
    ip?: string;
}

/**
 * 브라우저 정보 인터페이스
 */
export interface BrowserInfo {
    ip: string;
    header: string;
    os: string;
    browser: string;
}

export class RequestUtil {
    /**
     * 클라이언트의 브라우저 정보를 객체로 반환
     * @param request HttpRequest
     * @returns BrowserInfo (ip, header, os, browser)
     */
    static getBrowserInfo(request: HttpRequest): BrowserInfo {
        const userAgent = this.getHeader(request, 'user-agent') || '';

        const os = this.getClientOS(userAgent);
        const browser = this.getClientBrowser(userAgent);
        const ip = this.getClientIp(request);

        return {
            ip,
            header: userAgent,
            os,
            browser
        };
    }

    /**
     * 클라이언트의 실제 IP 주소를 추출
     * Proxy, Load Balancer 환경 대응
     * @param request HttpRequest
     * @returns IP 주소
     */
    static getClientIp(request: HttpRequest): string {
        // X-Forwarded-For 헤더 확인 (프록시 환경)
        let ip = this.getHeader(request, 'x-forwarded-for');

        if (ip && typeof ip === 'string') {
            // X-Forwarded-For는 여러 IP가 콤마로 구분될 수 있음
            ip = ip.split(',')[0].trim();
        }

        if (!ip || ip === '' || ip.toLowerCase() === 'unknown') {
            ip = this.getHeader(request, 'proxy-client-ip');
        }
        if (!ip || ip === '' || ip.toLowerCase() === 'unknown') {
            ip = this.getHeader(request, 'wl-proxy-client-ip');
        }
        if (!ip || ip === '' || ip.toLowerCase() === 'unknown') {
            ip = this.getHeader(request, 'http_client_ip');
        }
        if (!ip || ip === '' || ip.toLowerCase() === 'unknown') {
            ip = this.getHeader(request, 'http_x_forwarded_for');
        }
        if (!ip || ip === '' || ip.toLowerCase() === 'unknown') {
            // Express의 경우
            ip = request.ip ||
                 request.connection?.remoteAddress ||
                 request.socket?.remoteAddress ||
                 '';
        }

        // IPv6 localhost를 IPv4로 변환
        if (ip === '::1' || ip === '::ffff:127.0.0.1') {
            ip = '127.0.0.1';
        }

        // IPv6 형식에서 IPv4 추출 (::ffff:192.168.1.1)
        if (ip.startsWith('::ffff:')) {
            ip = ip.substring(7);
        }

        return ip || 'Unknown';
    }

    /**
     * User-Agent로부터 클라이언트 OS 감지
     * @param userAgent User-Agent 문자열
     * @returns OS 이름
     */
    static getClientOS(userAgent: string): string {
        if (!userAgent) {
            return 'Unknown';
        }

        const ua = userAgent.toLowerCase();

        // Windows
        if (ua.includes('windows nt 10.0')) return 'Windows 10';
        if (ua.includes('windows nt 11.0')) return 'Windows 11';
        if (ua.includes('windows nt 6.3')) return 'Windows 8.1';
        if (ua.includes('windows nt 6.2')) return 'Windows 8';
        if (ua.includes('windows nt 6.1')) return 'Windows 7';
        if (ua.includes('windows nt 6.0')) return 'Windows Vista';
        if (ua.includes('windows nt 5.1')) return 'Windows XP';
        if (ua.includes('windows nt 5.0')) return 'Windows 2000';
        if (ua.includes('windows nt 4.0')) return 'Windows NT';
        if (ua.includes('windows 98')) return 'Windows 98';
        if (ua.includes('windows 95')) return 'Windows 95';

        // Mobile
        if (ua.includes('iphone')) return 'iPhone';
        if (ua.includes('ipad')) return 'iPad';
        if (ua.includes('ipod')) return 'iPod';
        if (ua.includes('android')) return 'Android';

        // Desktop
        if (ua.includes('mac os x')) return 'Mac OS X';
        if (ua.includes('mac')) return 'Mac';
        if (ua.includes('linux')) return 'Linux';
        if (ua.includes('ubuntu')) return 'Ubuntu';
        if (ua.includes('fedora')) return 'Fedora';
        if (ua.includes('debian')) return 'Debian';

        return 'Other';
    }

    /**
     * User-Agent로부터 브라우저 종류 감지
     * @param userAgent User-Agent 문자열
     * @returns 브라우저 이름
     */
    static getClientBrowser(userAgent: string): string {
        if (!userAgent) {
            return 'Unknown';
        }

        const ua = userAgent.toLowerCase();

        // 순서 중요! Edge는 Chrome과 유사하므로 먼저 체크
        if (ua.includes('edg/')) return 'Edge';
        if (ua.includes('edge/')) return 'Edge Legacy';

        // IE
        if (ua.includes('trident/7.0')) return 'IE 11';
        if (ua.includes('msie 10')) return 'IE 10';
        if (ua.includes('msie 9')) return 'IE 9';
        if (ua.includes('msie 8')) return 'IE 8';
        if (ua.includes('msie 7')) return 'IE 7';
        if (ua.includes('msie 6')) return 'IE 6';

        // Modern browsers
        if (ua.includes('opr/') || ua.includes('opera/')) return 'Opera';
        if (ua.includes('chrome/')) return 'Chrome';
        if (ua.includes('safari/') && !ua.includes('chrome')) return 'Safari';
        if (ua.includes('firefox/')) return 'Firefox';
        if (ua.includes('samsung')) return 'Samsung Internet';
        if (ua.includes('ucbrowser')) return 'UC Browser';

        return 'Other';
    }

    /**
     * Authorization 헤더에서 Bearer 토큰 추출
     * @param request HttpRequest
     * @returns Bearer 토큰 (접두사 제거됨), 없거나 형식이 잘못된 경우 null
     */
    static getBearerToken(request: HttpRequest): string | null {
        const authHeader = this.getHeader(request, 'authorization');

        if (authHeader && typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
            return authHeader.replace('Bearer ', '');
        }

        return null;
    }

    /**
     * 모바일 기기에서의 요청인지 확인
     * @param request HttpRequest
     * @returns 모바일 요청이면 true, 아니면 false
     */
    static isMobileRequest(request: HttpRequest): boolean {
        const userAgent = this.getHeader(request, 'user-agent');

        if (!userAgent || typeof userAgent !== 'string') {
            return false;
        }

        const ua = userAgent.toLowerCase();

        return ua.includes('mobile') ||
               ua.includes('iphone') ||
               ua.includes('ipad') ||
               ua.includes('ipod') ||
               ua.includes('android') ||
               ua.includes('blackberry') ||
               ua.includes('windows phone') ||
               ua.includes('webos') ||
               ua.includes('opera mini') ||
               ua.includes('iemobile') ||
               ua.includes('mobile safari');
    }

    /**
     * 태블릿 기기에서의 요청인지 확인
     * @param request HttpRequest
     * @returns 태블릿 요청이면 true, 아니면 false
     */
    static isTabletRequest(request: HttpRequest): boolean {
        const userAgent = this.getHeader(request, 'user-agent');

        if (!userAgent || typeof userAgent !== 'string') {
            return false;
        }

        const ua = userAgent.toLowerCase();

        return (ua.includes('ipad') ||
                (ua.includes('android') && !ua.includes('mobile')) ||
                ua.includes('tablet'));
    }

    /**
     * 봇/크롤러 요청인지 확인
     * @param request HttpRequest
     * @returns 봇 요청이면 true, 아니면 false
     */
    static isBotRequest(request: HttpRequest): boolean {
        const userAgent = this.getHeader(request, 'user-agent');

        if (!userAgent || typeof userAgent !== 'string') {
            return false;
        }

        const ua = userAgent.toLowerCase();

        return ua.includes('bot') ||
               ua.includes('crawl') ||
               ua.includes('spider') ||
               ua.includes('slurp') ||
               ua.includes('googlebot') ||
               ua.includes('bingbot') ||
               ua.includes('yandex') ||
               ua.includes('baidu');
    }

    /**
     * 헤더 값을 가져오는 헬퍼 함수 (대소문자 무관)
     * @param request HttpRequest
     * @param headerName 헤더 이름
     * @returns 헤더 값 또는 undefined
     */
    private static getHeader(request: HttpRequest, headerName: string): string | undefined {
        const headers = request.headers;

        // 헤더 이름을 소문자로 변환하여 검색
        const normalizedName = headerName.toLowerCase();

        // 직접 접근 시도
        let value = headers[normalizedName];

        // 못 찾으면 모든 헤더를 순회하며 대소문자 무관 검색
        if (value === undefined) {
            for (const key in headers) {
                if (key.toLowerCase() === normalizedName) {
                    value = headers[key];
                    break;
                }
            }
        }

        // 배열인 경우 첫 번째 값 반환
        if (Array.isArray(value)) {
            return value[0];
        }

        return value;
    }

    /**
     * 모든 요청 헤더를 객체로 반환
     * @param request HttpRequest
     * @returns 헤더 객체
     */
    static getAllHeaders(request: HttpRequest): Record<string, string> {
        const result: Record<string, string> = {};

        for (const [key, value] of Object.entries(request.headers)) {
            if (value !== undefined) {
                result[key] = Array.isArray(value) ? value[0] : value;
            }
        }

        return result;
    }

    /**
     * 특정 헤더 존재 여부 확인
     * @param request HttpRequest
     * @param headerName 헤더 이름
     * @returns 존재하면 true, 아니면 false
     */
    static hasHeader(request: HttpRequest, headerName: string): boolean {
        return this.getHeader(request, headerName) !== undefined;
    }
}
