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
	 * 값을 boolean으로 변환합니다.
	 * @param value 변환할 값
	 * @returns boolean 값
	 */
	static toBoolean(value: any): boolean {
		const trutshyValues = ['true', 'yes', '1', 'on', 'Y'];
		if (this.isBoolean(value)) return value;
		if (this.isNullOrUndefined(value)) return false;

		if (this.isString(value)) {
			const lower = value.toLowerCase().trim();
			return trutshyValues.includes(lower);
		}

		if (this.isNumber(value)) {
			return value !== 0;
		}

		return Boolean(value);
	}

	/**
	 * null/undefined일 때 기본값을 반환합니다.
	 * @param value 확인할 값
	 * @param defaultValue 기본값
	 * @returns value 또는 defaultValue
	 */
	static defaultValue<T>(value: T | null | undefined, defaultValue: T): T {
		return this.isNullOrUndefined(value) ? defaultValue : value!;
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

	static buildTree(data: Array<Record<string, any>>, idKey: string, parentKey: string, childrenKey: string = 'children'): Array<Record<string, any>> {
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

    static isNumeric(value : any): boolean {
        return !isNaN(parseFloat(value)) && isFinite(value);
    }

	static omit(obj: any, keys: string[]): any {
		const type = this.getType(obj);

		if (type === 'object') {
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

		if (type === 'String' && value.trim() === '') return true;

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
		const DANGEROUS_KEYS = new Set(['__proto__', 'constructor', 'prototype']);
		if (!this.isObj(target) || !this.isObj(source)) return source;

		const result = { ...target };

		for (const key of Reflect.ownKeys(source)) {
			if (typeof key === 'string' && DANGEROUS_KEYS.has(key)) continue;

			const sourceVal = Reflect.get(source, key);
			const targetVal = Reflect.get(target, key);

			if (this.isObj(sourceVal) && this.isObj(targetVal)) {
				const merged = this.merge(targetVal, sourceVal);
				Reflect.set(result, key, merged);
			} else {
				Reflect.set(result, key, sourceVal);
			}
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
			cleanHex = cleanHex.split('').map(c => c + c).join('');
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
}
