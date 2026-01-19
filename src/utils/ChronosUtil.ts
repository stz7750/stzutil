/**
 * ═════════════════════════════════════════════════════════════
 * 📄 FILE     : ChronosUtil.ts
 * 📁 PACKAGE  : stzUtils-src.utils
 * 👤 AUTHOR   : stz
 * 🕒 CREATED  : 26. 1. 19.
 * ═════════════════════════════════════════════════════════════
 * ═════════════════════════════════════════════════════════════
 * 📝 DESCRIPTION
 *   - Immutable date manipulation library similar to Moment.js
 * ═════════════════════════════════════════════════════════════
 * ═════════════════════════════════════════════════════════════
 * 🔄 CHANGE LOG
 *   - DATE : 2026/01/19 | Author : stz | 최초 생성
 * ═════════════════════════════════════════════════════════════
 */

/** 시간 단위 타입 */
export type ChronosUnit = 'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond';

/**
 * Immutable 날짜 조작 클래스
 * @example
 * ```typescript
 * const date = chronos('2024-06-15');
 * const nextMonth = date.add(1, 'month');
 * console.log(date.format());      // 2024-06-15 (원본 유지)
 * console.log(nextMonth.format()); // 2024-07-15
 * ```
 */
export class Chronos {
	private readonly _date: Date;
	private readonly _isUTC: boolean;

	/**
	 * Chronos 인스턴스 생성
	 * @param dateInput - Date 객체, ISO 문자열, 또는 timestamp
	 * @param isUTC - UTC 모드 여부
	 */
	constructor(dateInput?: Date | string | number, isUTC: boolean = false) {
		this._date = dateInput ? new Date(dateInput) : new Date();
		this._isUTC = isUTC;
	}

	private clone(): Date {
		return new Date(this._date.getTime());
	}

	private createNew(date: Date): Chronos {
		return new Chronos(date, this._isUTC);
	}

	/**
	 * 연도 반환
	 * @returns 연도 (4자리)
	 */
	year(): number {
		return this._isUTC ? this._date.getUTCFullYear() : this._date.getFullYear();
	}

	/**
	 * 월 반환 (0-11)
	 * @returns 월 인덱스
	 */
	month(): number {
		return this._isUTC ? this._date.getUTCMonth() : this._date.getMonth();
	}

	/**
	 * 일 반환 (1-31)
	 * @returns 일
	 */
	date(): number {
		return this._isUTC ? this._date.getUTCDate() : this._date.getDate();
	}

	/**
	 * 요일 반환 (0-6, 일요일=0)
	 * @returns 요일 인덱스
	 */
	day(): number {
		return this._isUTC ? this._date.getUTCDay() : this._date.getDay();
	}

	/**
	 * 시 반환 (0-23)
	 * @returns 시
	 */
	hour(): number {
		return this._isUTC ? this._date.getUTCHours() : this._date.getHours();
	}

	/**
	 * 분 반환 (0-59)
	 * @returns 분
	 */
	minute(): number {
		return this._isUTC ? this._date.getUTCMinutes() : this._date.getMinutes();
	}

	/**
	 * 초 반환 (0-59)
	 * @returns 초
	 */
	second(): number {
		return this._isUTC ? this._date.getUTCSeconds() : this._date.getSeconds();
	}

	/**
	 * 밀리초 반환 (0-999)
	 * @returns 밀리초
	 */
	millisecond(): number {
		return this._isUTC ? this._date.getUTCMilliseconds() : this._date.getMilliseconds();
	}

	/**
	 * 연도 설정 (새 인스턴스 반환)
	 * @param value - 설정할 연도
	 * @returns 새 Chronos 인스턴스
	 */
	setYear(value: number): Chronos {
		const d = this.clone();
		this._isUTC ? d.setUTCFullYear(value) : d.setFullYear(value);
		return this.createNew(d);
	}

	/**
	 * 월 설정 (새 인스턴스 반환)
	 * @param value - 설정할 월 (0-11)
	 * @returns 새 Chronos 인스턴스
	 */
	setMonth(value: number): Chronos {
		const d = this.clone();
		this._isUTC ? d.setUTCMonth(value) : d.setMonth(value);
		return this.createNew(d);
	}

	/**
	 * 일 설정 (새 인스턴스 반환)
	 * @param value - 설정할 일 (1-31)
	 * @returns 새 Chronos 인스턴스
	 */
	setDate(value: number): Chronos {
		const d = this.clone();
		this._isUTC ? d.setUTCDate(value) : d.setDate(value);
		return this.createNew(d);
	}

	/**
	 * 시 설정 (새 인스턴스 반환)
	 * @param value - 설정할 시 (0-23)
	 * @returns 새 Chronos 인스턴스
	 */
	setHour(value: number): Chronos {
		const d = this.clone();
		this._isUTC ? d.setUTCHours(value) : d.setHours(value);
		return this.createNew(d);
	}

	/**
	 * 분 설정 (새 인스턴스 반환)
	 * @param value - 설정할 분 (0-59)
	 * @returns 새 Chronos 인스턴스
	 */
	setMinute(value: number): Chronos {
		const d = this.clone();
		this._isUTC ? d.setUTCMinutes(value) : d.setMinutes(value);
		return this.createNew(d);
	}

	/**
	 * 초 설정 (새 인스턴스 반환)
	 * @param value - 설정할 초 (0-59)
	 * @returns 새 Chronos 인스턴스
	 */
	setSecond(value: number): Chronos {
		const d = this.clone();
		this._isUTC ? d.setUTCSeconds(value) : d.setSeconds(value);
		return this.createNew(d);
	}

	/**
	 * 밀리초 설정 (새 인스턴스 반환)
	 * @param value - 설정할 밀리초 (0-999)
	 * @returns 새 Chronos 인스턴스
	 */
	setMillisecond(value: number): Chronos {
		const d = this.clone();
		this._isUTC ? d.setUTCMilliseconds(value) : d.setMilliseconds(value);
		return this.createNew(d);
	}

	/**
	 * 시간 더하기 (새 인스턴스 반환)
	 * @param value - 더할 값
	 * @param unit - 시간 단위
	 * @returns 새 Chronos 인스턴스
	 * @example
	 * ```typescript
	 * chronos().add(1, 'month').add(7, 'day')
	 * ```
	 */
	add(value: number, unit: ChronosUnit): Chronos {
		const d = this.clone();
		if (this._isUTC) {
			switch (unit) {
				case 'year': d.setUTCFullYear(d.getUTCFullYear() + value); break;
				case 'month': d.setUTCMonth(d.getUTCMonth() + value); break;
				case 'week': d.setUTCDate(d.getUTCDate() + value * 7); break;
				case 'day': d.setUTCDate(d.getUTCDate() + value); break;
				case 'hour': d.setUTCHours(d.getUTCHours() + value); break;
				case 'minute': d.setUTCMinutes(d.getUTCMinutes() + value); break;
				case 'second': d.setUTCSeconds(d.getUTCSeconds() + value); break;
				case 'millisecond': d.setUTCMilliseconds(d.getUTCMilliseconds() + value); break;
			}
		} else {
			switch (unit) {
				case 'year': d.setFullYear(d.getFullYear() + value); break;
				case 'month': d.setMonth(d.getMonth() + value); break;
				case 'week': d.setDate(d.getDate() + value * 7); break;
				case 'day': d.setDate(d.getDate() + value); break;
				case 'hour': d.setHours(d.getHours() + value); break;
				case 'minute': d.setMinutes(d.getMinutes() + value); break;
				case 'second': d.setSeconds(d.getSeconds() + value); break;
				case 'millisecond': d.setMilliseconds(d.getMilliseconds() + value); break;
			}
		}
		return this.createNew(d);
	}

	/**
	 * 시간 빼기 (새 인스턴스 반환)
	 * @param value - 뺄 값
	 * @param unit - 시간 단위
	 * @returns 새 Chronos 인스턴스
	 */
	subtract(value: number, unit: ChronosUnit): Chronos {
		return this.add(-value, unit);
	}

	/**
	 * 해당 단위의 시작 시점으로 설정
	 * @param unit - 시간 단위
	 * @returns 새 Chronos 인스턴스
	 * @example
	 * ```typescript
	 * chronos('2024-06-15 14:30:00').startOf('month') // 2024-06-01 00:00:00
	 * ```
	 */
	startOf(unit: ChronosUnit): Chronos {
		const d = this.clone();
		if (this._isUTC) {
			switch (unit) {
				case 'year':
					d.setUTCMonth(0, 1);
					d.setUTCHours(0, 0, 0, 0);
					break;
				case 'month':
					d.setUTCDate(1);
					d.setUTCHours(0, 0, 0, 0);
					break;
				case 'week':
					d.setUTCDate(d.getUTCDate() - d.getUTCDay());
					d.setUTCHours(0, 0, 0, 0);
					break;
				case 'day':
					d.setUTCHours(0, 0, 0, 0);
					break;
				case 'hour':
					d.setUTCMinutes(0, 0, 0);
					break;
				case 'minute':
					d.setUTCSeconds(0, 0);
					break;
				case 'second':
					d.setUTCMilliseconds(0);
					break;
			}
		} else {
			switch (unit) {
				case 'year':
					d.setMonth(0, 1);
					d.setHours(0, 0, 0, 0);
					break;
				case 'month':
					d.setDate(1);
					d.setHours(0, 0, 0, 0);
					break;
				case 'week':
					d.setDate(d.getDate() - d.getDay());
					d.setHours(0, 0, 0, 0);
					break;
				case 'day':
					d.setHours(0, 0, 0, 0);
					break;
				case 'hour':
					d.setMinutes(0, 0, 0);
					break;
				case 'minute':
					d.setSeconds(0, 0);
					break;
				case 'second':
					d.setMilliseconds(0);
					break;
			}
		}
		return this.createNew(d);
	}

	/**
	 * 해당 단위의 끝 시점으로 설정
	 * @param unit - 시간 단위
	 * @returns 새 Chronos 인스턴스
	 * @example
	 * ```typescript
	 * chronos('2024-06-15').endOf('month') // 2024-06-30 23:59:59.999
	 * ```
	 */
	endOf(unit: ChronosUnit): Chronos {
		const d = this.clone();
		if (this._isUTC) {
			switch (unit) {
				case 'year':
					d.setUTCMonth(11, 31);
					d.setUTCHours(23, 59, 59, 999);
					break;
				case 'month':
					d.setUTCMonth(d.getUTCMonth() + 1, 0);
					d.setUTCHours(23, 59, 59, 999);
					break;
				case 'week':
					d.setUTCDate(d.getUTCDate() + (6 - d.getUTCDay()));
					d.setUTCHours(23, 59, 59, 999);
					break;
				case 'day':
					d.setUTCHours(23, 59, 59, 999);
					break;
				case 'hour':
					d.setUTCMinutes(59, 59, 999);
					break;
				case 'minute':
					d.setUTCSeconds(59, 999);
					break;
				case 'second':
					d.setUTCMilliseconds(999);
					break;
			}
		} else {
			switch (unit) {
				case 'year':
					d.setMonth(11, 31);
					d.setHours(23, 59, 59, 999);
					break;
				case 'month':
					d.setMonth(d.getMonth() + 1, 0);
					d.setHours(23, 59, 59, 999);
					break;
				case 'week':
					d.setDate(d.getDate() + (6 - d.getDay()));
					d.setHours(23, 59, 59, 999);
					break;
				case 'day':
					d.setHours(23, 59, 59, 999);
					break;
				case 'hour':
					d.setMinutes(59, 59, 999);
					break;
				case 'minute':
					d.setSeconds(59, 999);
					break;
				case 'second':
					d.setMilliseconds(999);
					break;
			}
		}
		return this.createNew(d);
	}

	/**
	 * 다른 날짜보다 이전인지 비교
	 * @param other - 비교할 날짜
	 * @param unit - 비교 단위 (생략 시 밀리초 단위)
	 * @returns 이전이면 true
	 */
	isBefore(other: Chronos | Date | string, unit?: ChronosUnit): boolean {
		const otherChronos = other instanceof Chronos ? other : new Chronos(other);
		if (!unit) {
			return this._date.getTime() < otherChronos.valueOf();
		}
		return this.endOf(unit).valueOf() < otherChronos.startOf(unit).valueOf();
	}

	/**
	 * 다른 날짜보다 이후인지 비교
	 * @param other - 비교할 날짜
	 * @param unit - 비교 단위 (생략 시 밀리초 단위)
	 * @returns 이후이면 true
	 */
	isAfter(other: Chronos | Date | string, unit?: ChronosUnit): boolean {
		const otherChronos = other instanceof Chronos ? other : new Chronos(other);
		if (!unit) {
			return this._date.getTime() > otherChronos.valueOf();
		}
		return this.startOf(unit).valueOf() > otherChronos.endOf(unit).valueOf();
	}

	/**
	 * 다른 날짜와 같은지 비교
	 * @param other - 비교할 날짜
	 * @param unit - 비교 단위 (생략 시 밀리초 단위)
	 * @returns 같으면 true
	 */
	isSame(other: Chronos | Date | string, unit?: ChronosUnit): boolean {
		const otherChronos = other instanceof Chronos ? other : new Chronos(other);
		if (!unit) {
			return this._date.getTime() === otherChronos.valueOf();
		}
		return this.startOf(unit).valueOf() === otherChronos.startOf(unit).valueOf();
	}

	/**
	 * 다른 날짜와 같거나 이전인지 비교
	 * @param other - 비교할 날짜
	 * @param unit - 비교 단위
	 * @returns 같거나 이전이면 true
	 */
	isSameOrBefore(other: Chronos | Date | string, unit?: ChronosUnit): boolean {
		return this.isSame(other, unit) || this.isBefore(other, unit);
	}

	/**
	 * 다른 날짜와 같거나 이후인지 비교
	 * @param other - 비교할 날짜
	 * @param unit - 비교 단위
	 * @returns 같거나 이후이면 true
	 */
	isSameOrAfter(other: Chronos | Date | string, unit?: ChronosUnit): boolean {
		return this.isSame(other, unit) || this.isAfter(other, unit);
	}

	/**
	 * 두 날짜 사이에 있는지 확인
	 * @param start - 시작 날짜
	 * @param end - 끝 날짜
	 * @param unit - 비교 단위
	 * @param inclusivity - 포함 여부 ('()' | '[]' | '[)' | '(]')
	 * @returns 사이에 있으면 true
	 */
	isBetween(
		start: Chronos | Date | string,
		end: Chronos | Date | string,
		unit?: ChronosUnit,
		inclusivity: '()' | '[]' | '[)' | '(]' = '()'
	): boolean {
		const startCheck = inclusivity[0] === '[' ? this.isSameOrAfter(start, unit) : this.isAfter(start, unit);
		const endCheck = inclusivity[1] === ']' ? this.isSameOrBefore(end, unit) : this.isBefore(end, unit);
		return startCheck && endCheck;
	}

	/**
	 * 유효한 날짜인지 확인
	 * @returns 유효하면 true
	 */
	isValid(): boolean {
		return !isNaN(this._date.getTime());
	}

	/**
	 * 윤년인지 확인
	 * @returns 윤년이면 true
	 */
	isLeapYear(): boolean {
		const year = this.year();
		return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
	}

	/**
	 * 해당 월의 일수 반환
	 * @returns 일수
	 */
	daysInMonth(): number {
		return new Date(this.year(), this.month() + 1, 0).getDate();
	}

	/**
	 * 해당 연도의 일수 반환
	 * @returns 일수 (365 또는 366)
	 */
	daysInYear(): number {
		return this.isLeapYear() ? 366 : 365;
	}

	/**
	 * 연도의 몇 번째 주인지 반환
	 * @returns 주차 (1-53)
	 */
	week(): number {
		const startOfYear = new Chronos(new Date(this.year(), 0, 1));
		const days = Math.floor((this.valueOf() - startOfYear.valueOf()) / (24 * 60 * 60 * 1000));
		return Math.ceil((days + startOfYear.day() + 1) / 7);
	}

	/**
	 * 두 날짜 간의 차이 계산
	 * @param other - 비교할 날짜
	 * @param unit - 결과 단위
	 * @param precise - 소수점 포함 여부
	 * @returns 차이값
	 * @example
	 * ```typescript
	 * chronos('2024-06-15').diff('2024-01-01', 'month') // 5
	 * ```
	 */
	diff(other: Chronos | Date | string, unit: ChronosUnit = 'millisecond', precise: boolean = false): number {
		const otherChronos = other instanceof Chronos ? other : new Chronos(other);
		const diffMs = this._date.getTime() - otherChronos.valueOf();

		let result: number;
		switch (unit) {
			case 'year':
				result = this.monthDiff(otherChronos) / 12;
				break;
			case 'month':
				result = this.monthDiff(otherChronos);
				break;
			case 'week':
				result = diffMs / (7 * 24 * 60 * 60 * 1000);
				break;
			case 'day':
				result = diffMs / (24 * 60 * 60 * 1000);
				break;
			case 'hour':
				result = diffMs / (60 * 60 * 1000);
				break;
			case 'minute':
				result = diffMs / (60 * 1000);
				break;
			case 'second':
				result = diffMs / 1000;
				break;
			default:
				result = diffMs;
		}

		return precise ? result : Math.trunc(result);
	}

	private monthDiff(other: Chronos): number {
		const months = (this.year() - other.year()) * 12 + (this.month() - other.month());
		const anchor = other.add(months, 'month');
		const adjust = this.valueOf() - anchor.valueOf();
		const anchorNext = other.add(months + (adjust >= 0 ? 1 : -1), 'month');
		return months + (adjust / (anchorNext.valueOf() - anchor.valueOf())) * (adjust >= 0 ? 1 : -1);
	}

	/**
	 * 현재 시각으로부터의 상대 시간 문자열
	 * @returns 상대 시간 문자열 (예: "3 days ago")
	 * @example
	 * ```typescript
	 * chronos().subtract(3, 'day').fromNow() // "3 days ago"
	 * ```
	 */
	fromNow(): string {
		return this.from(new Chronos());
	}

	/**
	 * 특정 날짜로부터의 상대 시간 문자열
	 * @param other - 기준 날짜
	 * @returns 상대 시간 문자열
	 */
	from(other: Chronos | Date | string): string {
		const otherChronos = other instanceof Chronos ? other : new Chronos(other);
		const diffMs = this._date.getTime() - otherChronos.valueOf();
		const absDiff = Math.abs(diffMs);
		const isFuture = diffMs > 0;

		let text: string;
		if (absDiff < 10000) {
			return 'just now';
		} else if (absDiff < 60000) {
			text = `${Math.floor(absDiff / 1000)} seconds`;
		} else if (absDiff < 120000) {
			text = 'a minute';
		} else if (absDiff < 3600000) {
			text = `${Math.floor(absDiff / 60000)} minutes`;
		} else if (absDiff < 7200000) {
			text = 'an hour';
		} else if (absDiff < 86400000) {
			text = `${Math.floor(absDiff / 3600000)} hours`;
		} else if (absDiff < 172800000) {
			text = 'a day';
		} else if (absDiff < 604800000) {
			text = `${Math.floor(absDiff / 86400000)} days`;
		} else if (absDiff < 1209600000) {
			text = 'a week';
		} else if (absDiff < 2592000000) {
			text = `${Math.floor(absDiff / 604800000)} weeks`;
		} else if (absDiff < 5184000000) {
			text = 'a month';
		} else if (absDiff < 31536000000) {
			text = `${Math.floor(absDiff / 2592000000)} months`;
		} else if (absDiff < 63072000000) {
			text = 'a year';
		} else {
			text = `${Math.floor(absDiff / 31536000000)} years`;
		}

		return isFuture ? `in ${text}` : `${text} ago`;
	}

	/**
	 * 현재 시각까지의 상대 시간 문자열
	 * @returns 상대 시간 문자열
	 */
	toNow(): string {
		return new Chronos().from(this);
	}

	/**
	 * 특정 날짜까지의 상대 시간 문자열
	 * @param other - 대상 날짜
	 * @returns 상대 시간 문자열
	 */
	to(other: Chronos | Date | string): string {
		const otherChronos = other instanceof Chronos ? other : new Chronos(other);
		return otherChronos.from(this);
	}

	/**
	 * 날짜를 지정된 형식의 문자열로 변환
	 * @param formatStr - 형식 문자열
	 * @returns 포맷된 문자열
	 * @example
	 * ```typescript
	 * chronos().format('YYYY-MM-DD HH:mm:ss') // "2024-06-15 14:30:00"
	 * chronos().format('YY/M/D')              // "24/6/15"
	 * ```
	 */
	format(formatStr: string = 'YYYY-MM-DD'): string {
		const pad = (n: number, len: number = 2) => n.toString().padStart(len, '0');

		const tokens: [RegExp, string][] = [
			[/YYYY/g, this.year().toString()],
			[/YY/g, this.year().toString().slice(-2)],
			[/MM/g, pad(this.month() + 1)],
			[/M/g, (this.month() + 1).toString()],
			[/DD/g, pad(this.date())],
			[/D/g, this.date().toString()],
			[/HH/g, pad(this.hour())],
			[/H/g, this.hour().toString()],
			[/mm/g, pad(this.minute())],
			[/ss/g, pad(this.second())],
			[/SSS/g, pad(this.millisecond(), 3)],
		];

		let result = formatStr;
		for (const [regex, value] of tokens) {
			result = result.replace(regex, value);
		}
		return result;
	}

	/**
	 * UTC 모드로 전환
	 * @returns 새 Chronos 인스턴스 (UTC 모드)
	 * @example
	 * ```typescript
	 * chronos().utc().format('YYYY-MM-DD HH:mm:ss')
	 * ```
	 */
	utc(): Chronos {
		return new Chronos(this._date, true);
	}

	/**
	 * 로컬 모드로 전환
	 * @returns 새 Chronos 인스턴스 (로컬 모드)
	 */
	local(): Chronos {
		return new Chronos(this._date, false);
	}

	/**
	 * UTC 모드인지 확인
	 * @returns UTC 모드이면 true
	 */
	isUTC(): boolean {
		return this._isUTC;
	}

	/**
	 * 네이티브 Date 객체 반환
	 * @returns Date 객체 (복사본)
	 */
	toDate(): Date {
		return this.clone();
	}

	/**
	 * ISO 8601 문자열 반환
	 * @returns ISO 문자열
	 */
	toISOString(): string {
		return this._date.toISOString();
	}

	/**
	 * Unix timestamp (밀리초) 반환
	 * @returns 밀리초 timestamp
	 */
	valueOf(): number {
		return this._date.getTime();
	}

	/**
	 * Unix timestamp (초) 반환
	 * @returns 초 timestamp
	 */
	unix(): number {
		return Math.floor(this._date.getTime() / 1000);
	}

	/**
	 * 문자열 표현 반환
	 * @returns Date.toString() 결과
	 */
	toString(): string {
		return this._date.toString();
	}

	/**
	 * JSON 직렬화용 문자열 반환
	 * @returns ISO 문자열
	 */
	toJSON(): string {
		return this.toISOString();
	}
}

/**
 * Chronos 인스턴스 생성 팩토리 함수
 * @param dateInput - Date 객체, ISO 문자열, 또는 timestamp
 * @returns 새 Chronos 인스턴스
 * @example
 * ```typescript
 * import { chronos } from './ChronosUtil';
 *
 * const now = chronos();
 * const date = chronos('2024-06-15');
 * const fromTimestamp = chronos(1718438400000);
 * ```
 */
export function chronos(dateInput?: Date | string | number): Chronos {
	return new Chronos(dateInput);
}

/**
 * UTC 모드로 Chronos 인스턴스 생성
 * @param dateInput - Date 객체, ISO 문자열, 또는 timestamp
 * @returns 새 Chronos 인스턴스 (UTC 모드)
 */
chronos.utc = function (dateInput?: Date | string | number): Chronos {
	return new Chronos(dateInput, true);
};

/**
 * Unix timestamp(초)로 Chronos 인스턴스 생성
 * @param timestamp - Unix timestamp (초)
 * @returns 새 Chronos 인스턴스
 */
chronos.unix = function (timestamp: number): Chronos {
	return new Chronos(timestamp * 1000);
};