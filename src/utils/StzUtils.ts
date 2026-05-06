/**
 * ═════════════════════════════════════════════════════════════
 * 📄 FILE     : stzUtil
 * 📁 PACKAGE  : stz-utils-
 * 👤 AUTHOR   : stz
 * 🕒 CREATED  : 25. 11. 8.
 * ═════════════════════════════════════════════════════════════
 * ═════════════════════════════════════════════════════════════
 * 📝 DESCRIPTION
 *   -
 * ═════════════════════════════════════════════════════════════
 * ═════════════════════════════════════════════════════════════
 * 🔄 CHANGE LOG
 *   - DATE : 25. 11. 8. | Author : stz | 최초 생성
 * ═════════════════════════════════════════════════════════════
 */

export class StzUtils {
	/**
	 * 주어진 값이 null 또는 undefined인지 확인합니다.
	 * @param value 확인할 값
	 * @returns null 또는 undefined이면 true, 그렇지 않으면 false
	 */
	static isNullOrUndefined(value: any): value is null | undefined {
		return value === null || value === undefined;
	}

	/**
	 * 주어진 값이 null인지 확인합니다.
	 * @param value 확인할 값
	 * @returns null이면 true, 그렇지 않으면 false
	 */
	static isNull(value: unknown): value is null {
		return this.getType(value) === 'Null';
	}

	/**
	 * 주어진 값이 undefined인지 확인합니다.
	 * @param value 확인할 값
	 * @returns undefined이면 true, 그렇지 않으면 false
	 */
	static isUndefined(value: unknown): value is undefined {
		return this.getType(value) === 'Undefined';
	}

	/**
	 * 주어진 값이 문자열인지 확인합니다.
	 * @param value 확인할 값
	 * @returns 문자열이면 true, 그렇지 않으면 false
	 */
	static isString(value: unknown): value is string {
		return this.getType(value) === 'String';
	}

	/**
	 * 주어진 값이 숫자인지 확인합니다.
	 * @param value 확인할 값
	 * @returns 숫자이면 true, 그렇지 않으면 false
	 */
	static isNumber(value: unknown): value is number {
		return this.getType(value) === 'Number';
	}

	/**
	 * 주어진 값이 불린인지 확인합니다.
	 * @param value 확인할 값
	 * @returns 불린이면 true, 그렇지 않으면 false
	 */
	static isBoolean(value: unknown): value is boolean {
		return this.getType(value) === 'Boolean';
	}

	/**
	 * 주어진 값이 배열인지 확인합니다.
	 * @param value 확인할 값
	 * @returns 배열이면 true, 그렇지 않으면 false
	 */
	static isArray(value: unknown): value is any[] {
		return this.getType(value) === 'Array';
	}

	/**
	 * 주어진 값이 순수 객체인지 확인합니다.
	 * @param value 확인할 값
	 * @returns 순수 객체이면 true, 그렇지 않으면 false
	 */
	static isObject(value: unknown): value is Record<string, any> {
		return this.getType(value) === 'Object';
	}

	/**
	 * 주어진 값이 Date 객체인지 확인합니다.
	 * @param value 확인할 값
	 * @returns Date 객체이면 true, 그렇지 않으면 false
	 */
	static isDate(value: unknown): value is Date {
		return this.getType(value) === 'Date';
	}

	/**
	 * 주어진 값이 정규표현식인지 확인합니다.
	 * @param value 확인할 값
	 * @returns 정규표현식이면 true, 그렇지 않으면 false
	 */
	static isRegExp(value: unknown): value is RegExp {
		return this.getType(value) === 'RegExp';
	}

	/**
	 * 주어진 값이 함수인지 확인합니다.
	 * @param value 확인할 값
	 * @returns 함수이면 true, 그렇지 않으면 false
	 */
	static isFunction(value: unknown): value is Function {
		return this.getType(value) === 'Function';
	}

	/**
	 * 주어진 문자열이 유효한 URL인지 확인합니다.
	 * @param value 확인할 값
	 * @returns 유효한 URL이면 true, 그렇지 않으면 false
	 */
	static isUrl(value: string): boolean {
		if (!this.isString(value)) return false;

		const urlPattern = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(:\d+)?(\/[^\s]*)?$/i;

		try {
			const url = new URL(value.startsWith('http') ? value : `https://${value}`);
			return urlPattern.test(value) && !!url.hostname;
		} catch {
			return false;
		}
	}

	/**
	 * 이메일 형식이 유효한지 확인합니다.
	 * @param email 확인할 이메일 문자열
	 * @returns 유효한 이메일 형식이면 true
	 */
	static isValidEmail(email: string): boolean {
		if (!this.isString(email) || this.isBlank(email)) return false;

		const pattern = new RegExp('^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$');
		return pattern.test(email.trim());
	}

	/**
	 * 비밀번호 형식이 유효한지 확인합니다.
	 * 영문/숫자/특수문자를 각각 1개 이상 포함하고 8~20자여야 합니다.
	 * @param str 확인할 비밀번호 문자열
	 * @returns 유효한 비밀번호 형식이면 true
	 */
	static isValidPassword(str: string): boolean {
		if (!this.isString(str)) return false;

		const pattern = new RegExp(
			'^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8,20}$'
		);
		return pattern.test(str);
	}

	/**
	 * 비밀번호 강도 기준으로 유효성을 확인합니다.
	 * normal: 기존 정책(8~20, 영문/숫자/특수문자 포함)
	 * strict: 10~20, 대문자/소문자/숫자/특수문자 각각 포함
	 * @param str 확인할 비밀번호 문자열
	 * @param level 강도 레벨 (기본: normal)
	 * @returns 정책을 만족하면 true
	 */
	static isStrongPasswordLevel(str: string, level: 'normal' | 'strict' = 'normal'): boolean {
		if (!this.isString(str) || this.isBlank(str)) return false;

		const value = str.trim();
		if (level === 'normal') return this.isValidPassword(value);

		const strictPattern = new RegExp(
			'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{10,20}$'
		);
		return strictPattern.test(value);
	}

	/**
	 * 일회용 이메일 도메인 여부를 확인합니다.
	 * @param email 확인할 이메일 문자열
	 * @returns 일회용 이메일 도메인이면 true
	 */
	static isDisposableEmail(email: string): boolean {
		if (!this.isValidEmail(email)) return false;

		const domain = email.trim().toLowerCase().split('@')[1];
		const disposableDomains = [
			'10minutemail.com',
			'dispostable.com',
			'guerrillamail.com',
			'maildrop.cc',
			'mailinator.com',
			'temp-mail.org',
			'tempmail.com',
			'trashmail.com',
			'yopmail.com',
		];

		return disposableDomains.some(d => domain === d || domain.endsWith(`.${d}`));
	}

	/**
	 * 로그인 아이디 형식이 유효한지 확인합니다.
	 * 영문/숫자/밑줄만 허용하며 기본 4~20자입니다.
	 * @param str 확인할 아이디 문자열
	 * @param minLength 최소 길이 (기본: 4)
	 * @param maxLength 최대 길이 (기본: 20)
	 * @returns 유효한 아이디 형식이면 true
	 */
	static isValidUserId(str: string, minLength: number = 4, maxLength: number = 20): boolean {
		if (!this.isString(str)) return false;

		const value = str.trim();
		if (value.length < minLength || value.length > maxLength) return false;

		const pattern = new RegExp('^[a-zA-Z0-9_]+$');
		return pattern.test(value);
	}

	/**
	 * 로그인 아이디 허용 여부를 확인합니다.
	 * 숫자만/금칙어 포함/반복문자/연속문자를 차단합니다.
	 * @param id 확인할 아이디 문자열
	 * @returns 사용 가능한 아이디이면 true
	 */
	static isAllowedLoginId(id: string): boolean {
		if (!this.isValidUserId(id)) return false;

		const value = id.trim().toLowerCase();
		const bannedWords = [
			'admin',
			'administrator',
			'guest',
			'manager',
			'master',
			'operator',
			'root',
			'staff',
			'support',
			'system',
			'test',
		];

		if (bannedWords.some(word => this.containsTrimLowercase(value, word))) return false;
		if (new RegExp('^[0-9]+$').test(value)) return false;
		if (new RegExp('(.)\\1{3,}').test(value)) return false;

		const hasSequentialChars = (target: string, seqLength: number = 4): boolean => {
			if (target.length < seqLength) return false;

			for (let i = 0; i <= target.length - seqLength; i++) {
				let isAsc = true;
				let isDesc = true;

				for (let j = 1; j < seqLength; j++) {
					const prev = target.charCodeAt(i + j - 1);
					const curr = target.charCodeAt(i + j);
					const diff = curr - prev;

					if (diff !== 1) isAsc = false;
					if (diff !== -1) isDesc = false;
				}

				if (isAsc || isDesc) return true;
			}

			return false;
		};

		if (hasSequentialChars(value)) return false;
		return true;
	}

	/**
	 * 닉네임 형식이 유효한지 확인합니다.
	 * 한글/영문/숫자/밑줄만 허용하며 기본 2~20자입니다.
	 * @param str 확인할 닉네임 문자열
	 * @param minLength 최소 길이 (기본: 2)
	 * @param maxLength 최대 길이 (기본: 20)
	 * @returns 유효한 닉네임 형식이면 true
	 */
	static isValidNickname(str: string, minLength: number = 2, maxLength: number = 20): boolean {
		if (!this.isString(str)) return false;

		const value = str.trim();
		if (value.length < minLength || value.length > maxLength) return false;

		const pattern = new RegExp('^[a-zA-Z0-9가-힣_]+$');
		return pattern.test(value);
	}

	/**
	 * 전화번호 형식이 유효한지 확인합니다. (대한민국 번호 기준)
	 * 공백/하이픈은 무시하고 검사합니다.
	 * @param phone 확인할 전화번호 문자열
	 * @returns 유효한 전화번호 형식이면 true
	 */
	static isValidPhoneNumber(phone: string): boolean {
		if (!this.isString(phone)) return false;

		const normalized = phone.replace(/[\s-]/g, '');
		const pattern = new RegExp('^(01[016789]|02|0[3-9][0-9])[0-9]{7,8}$');
		return pattern.test(normalized);
	}

	/**
	 * 인증번호 형식이 유효한지 확인합니다.
	 * @param code 확인할 인증번호 문자열
	 * @param length 인증번호 길이 (기본: 6)
	 * @returns 숫자만으로 구성된 지정 길이 인증번호면 true
	 */
	static isValidVerificationCode(code: string, length: number = 6): boolean {
		if (!this.isString(code) || length <= 0) return false;

		const pattern = new RegExp(`^[0-9]{${length}}$`);
		return pattern.test(code.trim());
	}

	/**
	 * 비밀번호와 비밀번호 확인 값이 일치하는지 확인합니다.
	 * @param password 비밀번호
	 * @param confirmPassword 비밀번호 확인
	 * @returns 두 값이 모두 문자열이며 동일하면 true
	 */
	static isPasswordConfirmed(password: string, confirmPassword: string): boolean {
		if (!this.isString(password) || !this.isString(confirmPassword)) return false;
		return password === confirmPassword;
	}

	/**
	 * 문자열 내 모든 공백 문자를 제거합니다.
	 * @param str 원본 문자열
	 * @returns 공백이 제거된 문자열
	 */
	static removeWhitespace(str: string): string {
		if (!this.isString(str)) return '';
		return str.replace(/\s+/g, '');
	}

	/**
	 * 생년월일 형식이 유효한지 확인합니다.
	 * YYYYMMDD 또는 YYYY-MM-DD 형식을 지원합니다.
	 * @param birthDate 확인할 생년월일 문자열
	 * @returns 유효한 생년월일이면 true
	 */
	static isValidBirthDate(birthDate: string): boolean {
		if (!this.isString(birthDate)) return false;

		const normalized = birthDate.replace(/-/g, '').trim();
		const pattern = new RegExp('^(19|20)\\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\\d|3[01])$');
		if (!pattern.test(normalized)) return false;

		const year = Number(normalized.slice(0, 4));
		const month = Number(normalized.slice(4, 6));
		const day = Number(normalized.slice(6, 8));

		const date = new Date(year, month - 1, day);
		return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
	}

	/**
	 * isValidBirthDate 오타 호환 메서드입니다.
	 * @param birthDate 확인할 생년월일 문자열
	 * @returns 유효한 생년월일이면 true
	 */
	static isValidBirtDate(birthDate: string): boolean {
		return this.isValidBirthDate(birthDate);
	}

	/**
	 * 성인 여부를 확인합니다.
	 * @param birthDate 생년월일 문자열(YYYYMMDD 또는 YYYY-MM-DD)
	 * @param adultAge 성인 기준 나이 (기본: 19)
	 * @param referenceDate 기준일 (기본: 오늘)
	 * @returns 성인이면 true
	 */
	static isAdult(birthDate: string, adultAge: number = 19, referenceDate: Date = new Date()): boolean {
		if (!this.isValidBirthDate(birthDate) || adultAge < 0) return false;

		const normalized = birthDate.replace(/-/g, '').trim();
		const year = Number(normalized.slice(0, 4));
		const month = Number(normalized.slice(4, 6));
		const day = Number(normalized.slice(6, 8));
		const birth = new Date(year, month - 1, day);

		let age = referenceDate.getFullYear() - birth.getFullYear();
		const hasBirthdayPassed =
			referenceDate.getMonth() > birth.getMonth() ||
			(referenceDate.getMonth() === birth.getMonth() && referenceDate.getDate() >= birth.getDate());

		if (!hasBirthdayPassed) age -= 1;
		return age >= adultAge;
	}

	/**
	 * 미성년자 여부를 확인합니다.
	 * @param birthDate 생년월일 문자열(YYYYMMDD 또는 YYYY-MM-DD)
	 * @param adultAge 성인 기준 나이 (기본: 19)
	 * @param referenceDate 기준일 (기본: 오늘)
	 * @returns 미성년자면 true
	 */
	static isMinor(birthDate: string, adultAge: number = 19, referenceDate: Date = new Date()): boolean {
		if (!this.isValidBirthDate(birthDate) || adultAge < 0) return false;
		return !this.isAdult(birthDate, adultAge, referenceDate);
	}

	static str(value: number | string | object): string {
		if (this.getType(value) === 'Object') return JSON.stringify(value);
		if (this.getType(value) === 'Number') return value.toString();
		if (this.getType(value) === 'String') return value as string;

		if (this.isNullOrUndefined(value)) return '';
		return String(value);
	}

	static convertNullToZero<T>(value: T): T | 0 {
		if (this.isNullOrUndefined(value)) {
			return 0;
		}
		return value;
	}

	/**
	 * 값이 null 또는 undefined이면 대체 값을 반환합니다.
	 * @param value 원본 값
	 * @param fallback 대체 값
	 * @returns value가 null 또는 undefined이면 fallback, 아니면 value
	 */
	static coalesce<T, U>(value: T, fallback: U): T | U {
		return this.isNullOrUndefined(value) ? fallback : value;
	}

	static convertEmptyToTarget(value: string | number, target: string | number): string | number {
		if (this.isEmpty(value)) {
			return target;
		}
		return value;
	}

	/**
	 * null, undefined, "null" 문자열을 0으로 변환하고, 그 외에는 정수로 파싱합니다.
	 * @param value 변환할 값
	 * @param defaultValue 파싱 실패 시 반환할 기본값 (기본: 0)
	 * @returns 정수 값
	 */
	static zeroConvert(value: any, defaultValue: number = 0): number {
		if (this.isNullOrUndefined(value) || value === 'null' || value === '') {
			return 0;
		}

		if (this.isNumber(value)) {
			return Math.floor(value);
		}

		if (this.isString(value)) {
			const parsed = parseInt(value.trim(), 10);
			return isNaN(parsed) ? defaultValue : parsed;
		}

		return defaultValue;
	}

	/**
	 * 안전하게 정수로 변환합니다.
	 * @param value 변환할 값
	 * @param defaultValue 변환 실패 시 기본값 (기본: 0)
	 * @returns 정수 값
	 */
	static toInt(value: any, defaultValue: number = 0): number {
		if (this.isNullOrUndefined(value)) return defaultValue;

		if (this.isNumber(value)) {
			return Math.floor(value);
		}

		if (this.isString(value)) {
			const parsed = parseInt(value.trim(), 10);
			return isNaN(parsed) ? defaultValue : parsed;
		}

		return defaultValue;
	}

	/**
	 * 안전하게 실수로 변환합니다.
	 * @param value 변환할 값
	 * @param defaultValue 변환 실패 시 기본값 (기본: 0)
	 * @returns 실수 값
	 */
	static toFloat(value: any, defaultValue: number = 0): number {
		if (this.isNullOrUndefined(value)) return defaultValue;

		if (this.isNumber(value)) {
			return value;
		}

		if (this.isString(value)) {
			const parsed = parseFloat(value.trim());
			return isNaN(parsed) ? defaultValue : parsed;
		}

		return defaultValue;
	}

	/**
	 * 숫자 문자열에 천 단위 콤마를 추가합니다.
	 * @param value 숫자 또는 숫자 문자열
	 * @returns 천 단위 콤마가 적용된 문자열
	 */
	static addComma(value: string | number): string {
		if (this.isNullOrUndefined(value)) return '';

		const input = String(value).trim();
		if (input === '' || input === '-' || input === '+') return input;

		const sign = input.startsWith('-') ? '-' : input.startsWith('+') ? '+' : '';
		const unsigned = sign ? input.slice(1) : input;
		const normalized = unsigned.replace(/,/g, '');

		if (!/^\d+(\.\d+)?$/.test(normalized)) return input;

		const [integerPart, decimalPart] = normalized.split('.');
		const integerWithComma = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

		return decimalPart !== undefined ? `${sign}${integerWithComma}.${decimalPart}` : `${sign}${integerWithComma}`;
	}

	/**
	 * 값을 boolean으로 변환합니다.
	 * @param value 변환할 값
	 * @returns boolean 값
	 */
	static toBoolean(value: any): boolean {
		const trutshyValues = ['true', 'yes', '1', 'on', 'Y'];
		if (this.isBoolean(value)) return value;
		if (this.isNullOrUndefined(value)) return false;

		if (this.isString(value)) {
			if (this.isBlank(value)) return false;
			const lower = value.toLowerCase().trim();
			return trutshyValues.includes(lower);
		}

		if (this.isNumber(value)) {
			return value !== 0;
		}

		return Boolean(value);
	}

	/**
	 * 두 값을 trim + 소문자 기준으로 비교합니다.
	 * @param a 비교할 첫 번째 값
	 * @param b 비교할 두 번째 값
	 * @returns 정규화 후 동일하면 true
	 */
	static equalsTrimLowercase(a: unknown, b: unknown): boolean {
		if (this.isNullOrUndefined(a) || this.isNullOrUndefined(b)) return false;

		return String(a).trim().toLowerCase() === String(b).trim().toLowerCase();
	}

	/**
	 * source가 keyword를 trim + 소문자 기준으로 포함하는지 확인합니다.
	 * @param source 원본 값
	 * @param keyword 찾을 값
	 * @returns 포함하면 true
	 */
	static containsTrimLowercase(source: unknown, keyword: unknown): boolean {
		if (this.isBlank(source) || this.isBlank(keyword)) return false;

		const normalizedSource = String(source).trim().toLowerCase();
		const normalizedKeyword = String(keyword).trim().toLowerCase();
		return normalizedSource.includes(normalizedKeyword);
	}

	/**
	 * 값이 비어있는 문자열인지 확인합니다. (trim 기준)
	 * @param value 확인할 값
	 * @returns null/undefined 이거나 trim 후 빈 문자열이면 true
	 */
	static isBlank(value: unknown): boolean {
		if (this.isNullOrUndefined(value)) return true;
		if (!this.isString(value)) return false;
		return value.trim() === '';
	}

	/**
	 * 값이 비어있지 않은 문자열인지 확인합니다. (trim 기준)
	 * @param value 확인할 값
	 * @returns 문자열이며 trim 후 비어있지 않으면 true
	 */
	static isNotBlank(value: unknown): boolean {
		if (!this.isString(value)) return false;
		return !this.isBlank(value);
	}

	/**
	 * 문자열을 지정된 길이로 자르고 말줄임표를 추가합니다.
	 * @param str 문자열
	 * @param length 최대 길이
	 * @param ellipsis 말줄임표 (기본: '...')
	 * @returns 잘린 문자열
	 */
	static truncate(str: string, length: number, ellipsis: string = '...'): string {
		if (!this.isString(str)) return '';
		if (str.length <= length) return str;
		return str.substring(0, length - ellipsis.length) + ellipsis;
	}

	/**
	 * 문자열의 첫 글자를 대문자로 변환합니다.
	 * @param str 문자열
	 * @returns 첫 글자가 대문자인 문자열
	 */
	static capitalize(str: string): string {
		if (!this.isString(str) || str.length === 0) return '';
		return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
	}

	/**
	 * camelCase를 snake_case로 변환합니다.
	 * @param str camelCase 문자열
	 * @returns snake_case 문자열
	 */
	static toSnakeCase(str: string): string {
		if (!this.isString(str)) return '';
		return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`).replace(/^_/, '');
	}

	/**
	 * snake_case를 camelCase로 변환합니다.
	 * @param str snake_case 문자열
	 * @returns camelCase 문자열
	 */
	static toCamelCase(str: string): string {
		if (!this.isString(str)) return '';
		return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
	}

	/**
	 * 문자열을 kebab-case로 변환합니다.
	 * @param str 문자열
	 * @returns kebab-case 문자열
	 */
	static toKebabCase(str: string): string {
		if (!this.isString(str)) return '';
		return str
			.replace(/([a-z])([A-Z])/g, '$1-$2')
			.replace(/[\s_]+/g, '-')
			.toLowerCase();
	}

	/**
	 * 문자열의 특정 범위를 마스킹 처리합니다.
	 * @param str 원본 문자열
	 * @param start 마스킹 시작 인덱스
	 * @param end 마스킹 종료 인덱스 (생략 시 끝까지)
	 * @param maskChar 마스킹 문자 (기본: '*')
	 * @returns 마스킹된 문자열
	 * @example
	 * ```typescript
	 * mask('hello world', 2, 7) // "he*** world"
	 * mask('1234567890', 4) // "1234******"
	 * ```
	 */
	static mask(str: string, start: number = 0, end?: number, maskChar: string = '*'): string {
		if (!this.isString(str) || str.length === 0) return '';

		const endIndex = end ?? str.length;
		const beforeMask = str.substring(0, start);
		const maskLength = Math.max(0, endIndex - start);
		const masked = maskChar.repeat(maskLength);
		const afterMask = str.substring(endIndex);

		return beforeMask + masked + afterMask;
	}

	/**
	 * 이메일 주소를 마스킹 처리합니다.
	 * @param email 이메일 주소
	 * @param visibleChars @ 앞에서 보여줄 문자 수 (기본: 2)
	 * @param maskChar 마스킹 문자 (기본: '*')
	 * @returns 마스킹된 이메일
	 * @example
	 * ```typescript
	 * maskEmail('example@gmail.com') // "ex*****@gmail.com"
	 * maskEmail('abc@test.com', 1) // "a**@test.com"
	 * ```
	 */
	static maskEmail(email: string, visibleChars: number = 2, maskChar: string = '*'): string {
		if (!this.isString(email) || !email.includes('@')) return email;

		const [localPart, domain] = email.split('@');
		if (localPart.length <= visibleChars) {
			return this.mask(localPart, 1, undefined, maskChar) + '@' + domain;
		}

		const maskedLocal = this.mask(localPart, visibleChars, undefined, maskChar);
		return maskedLocal + '@' + domain;
	}

	/**
	 * 전화번호를 완전히 마스킹 처리합니다.
	 * @param phoneNumber 전화번호
	 * @param maskChar 마스킹 문자 (기본: '*')
	 * @returns 마스킹된 전화번호
	 * @example
	 * ```typescript
	 * maskPhoneNumber('010-1234-5678') // "***-****-****"
	 * maskPhoneNumber('01012345678') // "***********"
	 * ```
	 */
	static maskPhoneNumber(phoneNumber: string, maskChar: string = '*'): string {
		if (!this.isString(phoneNumber) || phoneNumber.length === 0) return '';

		return phoneNumber.replace(/\d/g, maskChar);
	}

	/**
	 * 비밀번호를 완전히 마스킹 처리합니다.
	 * @param password 비밀번호
	 * @param maskChar 마스킹 문자 (기본: '*')
	 * @returns 마스킹된 비밀번호
	 * @example
	 * ```typescript
	 * maskPassword('myP@ssw0rd') // "**********"
	 * maskPassword('secret123', '#') // "#########"
	 * ```
	 */
	static maskPassword(password: string, maskChar: string = '*'): string {
		if (!this.isString(password) || password.length === 0) return '';

		return maskChar.repeat(password.length);
	}

	/**
	 * 지정된 범위 내의 랜덤 정수를 생성합니다.
	 * @param min 최소값 (포함)
	 * @param max 최대값 (포함)
	 * @returns 랜덤 정수
	 */
	static randomInt(min: number, max: number): number {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	/**
	 * 값을 지정된 범위 내로 제한합니다.
	 * @param value 값
	 * @param min 최소값
	 * @param max 최대값
	 * @returns 제한된 값
	 */
	static clamp(value: number, min: number, max: number): number {
		return Math.min(Math.max(value, min), max);
	}

	/**
	 * 배열을 지정된 크기의 청크로 나눕니다.
	 * @param array 배열
	 * @param size 청크 크기
	 * @returns 청크 배열
	 */
	static chunk<T>(array: T[], size: number): T[][] {
		if (!this.isArray(array) || size <= 0) return [];

		const chunks: T[][] = [];
		for (let i = 0; i < array.length; i += size) {
			chunks.push(array.slice(i, i + size));
		}
		return chunks;
	}

	/**
	 * 배열에서 중복을 제거합니다.
	 * @param array 배열
	 * @returns 중복이 제거된 배열
	 */
	static unique<T>(array: T[]): T[] {
		if (!this.isArray(array)) return [];
		return [...new Set(array)];
	}

	/**
	 * 배열을 섞습니다 (Fisher-Yates 알고리즘).
	 * @param array 배열
	 * @returns 섞인 배열 (원본 배열 변경 안 함)
	 */
	static shuffle<T>(array: T[]): T[] {
		if (!this.isArray(array)) return [];

		const result = [...array];
		for (let i = result.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[result[i], result[j]] = [result[j], result[i]];
		}
		return result;
	}

	/**
	 * @description 주어진 값의 정확한 타입을 반환합니다.
	 * @param value
	 * @returns {string} 값의 타입 (예: 'String', 'Number', 'Array', 'Object' 등)
	 * @Since 1.0.0
	 */
	static getType(value: any): string {
		return Object.prototype.toString.call(value).slice(8, -1);
	}

	static buildTree(
		data: Array<Record<string, any>>,
		idKey: string,
		parentKey: string,
		childrenKey: string = 'children'
	): Array<Record<string, any>> {
		const tree: Array<Record<string, any>> = [];
		const lookup: Record<string, any> = {};

		data.forEach(item => {
			lookup[item[idKey]] = { ...item, [childrenKey]: [] };
		});

		data.forEach(item => {
			if (item[parentKey] !== null && lookup[item[parentKey]]) {
				lookup[item[parentKey]][childrenKey].push(lookup[item[idKey]]);
			} else {
				tree.push(lookup[item[idKey]]);
			}
		});

		return tree;
	}

	static isObj(value: unknown): value is Record<string, any> {
		return this.getType(value) === 'Object';
	}

	static isArr(value: unknown): value is Array<any> {
		return this.getType(value) === 'Array';
	}

	static isNumeric(value: any): boolean {
		return !isNaN(parseFloat(value)) && isFinite(value);
	}

	static omit(obj: any, keys: string[]): any {
		const type = this.getType(obj);

		if (type === 'Null' || (type !== 'Object' && type !== 'Array')) {
			return obj;
		}

		if (type === 'Array') {
			return obj.map((item: any) => this.omit(item, keys));
		}

		const result: Record<string, any> = {};

		for (const key in obj) {
			if (keys.includes(key)) continue;

			const value = obj[key];
			result[key] = this.omit(value, keys);
		}

		return result;
	}

	static pick(obj: Record<string, any>, property: string): object {
		if (Object.prototype.hasOwnProperty.call(obj, property)) {
			const { [property]: _, ...rest } = obj;
			return rest;
		} else {
			throw new Error('Object does not have PROPERTY');
		}
	}

	static isEmpty(value: any): value is null | undefined | '' | [] | Record<string, never> {
		if (this.isNullOrUndefined(value)) return true;

		const type = this.getType(value);

		if (type === 'String' && this.isBlank(value)) return true;

		if (type === 'Array' && value.length === 0) return true;

		if (type === 'Object' && Object.keys(value).length === 0) return true;

		return false;
	}

	static cloneDeep(obj: any | object, seen: Map<any, any> = new Map()): any {
		if (this.isNullOrUndefined(obj) || typeof obj !== 'object') {
			return obj;
		}

		if (seen.has(obj)) {
			return seen.get(obj);
		}

		const type = this.getType(obj);
		let clone: any;

		if (type === 'Array') {
			clone = [];
			seen.set(obj, clone);
			for (const item of obj as Array<any>) {
				clone.push(this.cloneDeep(item, seen));
			}
		} else if (type === 'Object') {
			clone = {};
			seen.set(obj, clone);
			for (const key in obj as Record<string, any>) {
				if (Object.prototype.hasOwnProperty.call(obj, key)) {
					clone[key] = this.cloneDeep((obj as Record<string, any>)[key], seen);
				}
			}
		} else {
			return obj;
		}

		return clone;
	}

	static merge(target: Record<string, any>, source: Record<string, any>): object {
		const DANGEROUS = new Set(['__proto__', 'constructor', 'prototype']);

		const t: Record<string, any> = this.isObj(target) ? target : {};
		const s: Record<string, any> = this.isObj(source) ? source : {};

		const result: Record<string, any> = { ...t };

		for (const key of Reflect.ownKeys(s)) {
			if (typeof key === 'string' && DANGEROUS.has(key)) continue;

			let sv: any;
			try {
				sv = Reflect.get(s, key as any);
			} catch {
				continue;
			}

			const tv = Reflect.get(t, key as any);

			if (sv === undefined) continue;

			if (this.isArr(sv)) {
				result[key as any] = sv.slice();
				continue;
			}

			if (this.isObj(sv) && this.isObj(tv)) {
				result[key as any] = (this as any).merge(tv, sv);
				continue;
			}

			result[key as any] = sv;
		}

		return result;
	}

	static isEqual(a: any, b: any): boolean {
		if (a === b) return true;
		if (typeof a !== typeof b) return false;
		if (typeof a !== 'object' || a == null || b == null) return false;
		const aKeys = Object.keys(a),
			bKeys = Object.keys(b);
		if (aKeys.length !== bKeys.length) return false;
		for (const k of aKeys) {
			if (!StzUtils.isEqual(a[k], b[k])) return false;
		}
		return true;
	}

	static donwnloadTableByCSV(tableElement: HTMLTableElement, filename: string = 'table.csv'): void {
		if (!tableElement) {
			console.error('Table element not found.');
			return;
		}

		const rows = Array.from(tableElement.querySelectorAll('tr'));
		const csv = rows
			.map(row => {
				const cells = Array.from(row.querySelectorAll('th, td'));
				return cells.map(cell => `"${cell.textContent}"`).join(',');
			})
			.join('\n');

		const bom = '\uFEFF';
		const csvBlob = new Blob([bom + csv], { type: 'text/csv;charset=utf-8;' });
		const url = URL.createObjectURL(csvBlob);
		const a = document.createElement('a');
		a.href = url;
		a.download = filename;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}

	/**
	 * 색상 형식을 감지합니다.
	 * @param color 색상 문자열
	 * @returns 'hex', 'rgba', 'rgb' 또는 'unknown'
	 */
	static getColorType(color: string): 'hex' | 'rgba' | 'rgb' | 'unknown' {
		if (this.isEmpty(color) || !this.isString(color)) return 'unknown';

		const trimmed = color.trim();
		if (trimmed.startsWith('#')) return 'hex';
		if (trimmed.startsWith('rgba(')) return 'rgba';
		if (trimmed.startsWith('rgb(')) return 'rgb';

		return 'unknown';
	}

	/**
	 * HEX 색상을 RGBA로 변환합니다.
	 * @param hex HEX 색상 문자열 (예: '#FF5733' 또는 '#F57')
	 * @param opacity 투명도 (0-1, 기본값: 0.5)
	 * @returns RGBA 색상 문자열
	 */
	static hexToRgba(hex: string, opacity: number = 0.5): string {
		if (!hex || !this.isString(hex)) {
			throw new Error('Invalid hex color');
		}

		// # 제거
		let cleanHex = hex.trim().replace('#', '');

		// 3자리 hex를 6자리로 확장 (#F57 -> #FF5577)
		if (cleanHex.length === 3) {
			cleanHex = cleanHex
				.split('')
				.map(c => c + c)
				.join('');
		}

		if (cleanHex.length !== 6) {
			throw new Error('Hex color must be 3 or 6 characters');
		}

		// opacity 유효성 검사
		const validOpacity = Math.max(0, Math.min(1, opacity));

		const r = parseInt(cleanHex.substring(0, 2), 16);
		const g = parseInt(cleanHex.substring(2, 4), 16);
		const b = parseInt(cleanHex.substring(4, 6), 16);

		if (isNaN(r) || isNaN(g) || isNaN(b)) {
			throw new Error('Invalid hex color format');
		}

		return `rgba(${r}, ${g}, ${b}, ${validOpacity})`;
	}

	/**
	 * RGBA 색상을 HEX로 변환합니다.
	 * @param rgba RGBA 색상 문자열 (예: 'rgba(255, 87, 51, 0.5)')
	 * @returns HEX 색상 문자열 (알파값은 무시됨)
	 */
	static rgbaToHex(rgba: string): string {
		if (!rgba || !this.isString(rgba)) {
			throw new Error('Invalid rgba color');
		}

		const matches = rgba.match(/\d+/g);
		if (!matches || matches.length < 3) {
			throw new Error('Invalid rgba format');
		}

		const [r, g, b] = matches.slice(0, 3).map(Number);

		if (r > 255 || g > 255 || b > 255 || r < 0 || g < 0 || b < 0) {
			throw new Error('RGB values must be between 0 and 255');
		}

		const toHex = (n: number) => n.toString(16).padStart(2, '0').toUpperCase();
		return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
	}

	/**
	 * RGB 색상에 투명도를 추가하여 RGBA로 변환합니다.
	 * @param rgb RGB 색상 문자열 (예: 'rgb(255, 87, 51)')
	 * @param opacity 투명도 (0-1)
	 * @returns RGBA 색상 문자열
	 */
	static rgbAddOpacity(rgb: string, opacity: number): string {
		if (!rgb || !this.isString(rgb)) {
			throw new Error('Invalid rgb color');
		}

		const matches = rgb.match(/\d+/g);
		if (!matches || matches.length < 3) {
			throw new Error('Invalid rgb format');
		}

		const [r, g, b] = matches.slice(0, 3).map(Number);

		if (r > 255 || g > 255 || b > 255 || r < 0 || g < 0 || b < 0) {
			throw new Error('RGB values must be between 0 and 255');
		}

		const validOpacity = Math.max(0, Math.min(1, opacity));
		return `rgba(${r}, ${g}, ${b}, ${validOpacity})`;
	}

	/**
	 * RGBA 색상을 RGB로 변환합니다 (알파값 제거).
	 * @param rgba RGBA 색상 문자열 (예: 'rgba(255, 87, 51, 0.5)')
	 * @returns RGB 색상 문자열
	 */
	static rgbaToRgb(rgba: string): string {
		if (!rgba || !this.isString(rgba)) {
			throw new Error('Invalid rgba color');
		}

		const matches = rgba.match(/\d+/g);
		if (!matches || matches.length < 3) {
			throw new Error('Invalid rgba format');
		}

		const [r, g, b] = matches.slice(0, 3).map(Number);

		if (r > 255 || g > 255 || b > 255 || r < 0 || g < 0 || b < 0) {
			throw new Error('RGB values must be between 0 and 255');
		}

		return `rgb(${r}, ${g}, ${b})`;
	}

	/**
	 * HEX 색상을 RGB로 변환합니다.
	 * @param hex HEX 색상 문자열 (예: '#FF5733')
	 * @returns RGB 색상 문자열
	 */
	static hexToRgb(hex: string): string {
		const rgba = this.hexToRgba(hex, 1);
		return this.rgbaToRgb(rgba);
	}

	/**
	 * RGB 색상을 HEX로 변환합니다.
	 * @param rgb RGB 색상 문자열 (예: 'rgb(255, 87, 51)')
	 * @returns HEX 색상 문자열
	 */
	static rgbToHex(rgb: string): string {
		return this.rgbaToHex(rgb);
	}

	/**
	 * @description 문자열에 대문자가 포함되어 있는지 확인합니다.
	 * @param {string} str
	 * @returns {boolean}
	 */
	static hasUpperCase(str: string): boolean {
		return str !== str.toLowerCase();
	}

	/**
	 * @description 로컬 스토리지에서 키로 값을 가져옵니다.
	 * @param {string} key
	 * @returns {string | null}
	 */
	static getLocalStorageByKey(key: string): string | null {
		if (this.getType(window) === 'undefined') return null;
		if (!window.localStorage) return null;
		const raw = window.localStorage.getItem(key);
		if (raw == null) return null;
		return this.str(raw);
	}

	/**
	 * @description 로컬 스토리지에서 JSON 값을 가져옵니다.
	 * @param {string} key
	 * @returns {T | null}
	 */
	static getLocalStorageJson<T = unknown>(key: string): T | null {
		const raw = this.getLocalStorageByKey(key);
		if (raw == null) return null;
		try {
			return JSON.parse(raw) as T;
		} catch {
			return null;
		}
	}

	/**
	 * @description 로컬 스토리지에 키-값 쌍을 저장합니다.
	 * @param {string} key
	 * @param {T} value
	 * @returns {boolean}
	 */
	static setLocalStorageByKey<T>(key: string, value: T): boolean {
		try {
			if (typeof window === 'undefined') return false;
			const storage = window.localStorage;
			if (!storage) return false;

			if (value === undefined) {
				storage.removeItem(key);
				return true;
			}

			const data = typeof value === 'string' ? value : JSON.stringify(value);

			storage.setItem(key, data);
			return true;
		} catch (err) {
			return false;
		}
	}

	static isFalsy(str): boolean {
		if (
			str === false ||
			str === 0 ||
			str === '' ||
			str === null ||
			str === undefined ||
			(this.isArray(str) && str.length === 0) ||
			(this.isObj(str) && Object.keys(str).length === 0)
		) {
			return true;
		}
		return false;
	}
}
