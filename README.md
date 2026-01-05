# stzutil

개발 편의성 유틸리티 라이브러리

## 프로젝트 구조

```
stzUtils/
├── src/
│   ├── node.ts              # 메인 진입점
│   ├── core/
│   │   └── node.ts          # StzCore 통합 클래스
│   └── utils/
│       ├── StzUtils.ts       # 프론트엔드 유틸리티
│       ├── ExecUtil.ts       # 프로세스 & 파일 시스템 유틸리티
│       ├── CryptoUtil.ts     # 암호화 유틸리티
│       ├── FetchUtil.ts      # HTTP 요청 유틸리티
│       └── RequestUtil.ts    # 클라이언트 정보 추출 유틸리티
├── build/                     # 컴파일된 JavaScript 출력
├── package.json
└── tsconfig.json
```

## 설치

```bash
npm install
npm run build
```

## 사용법

### 권장: StzCore 사용 (통합 인터페이스)

```typescript
import { stzCore } from 'stzutil';

// 프론트엔드 유틸리티
const isEmpty = stzCore.stzUtils.isEmpty('');
const isArray = stzCore.stzUtils.isArray([1, 2, 3]);
const camelCase = stzCore.stzUtils.toCamelCase('hello_world');

// 프로세스 유틸리티
stzCore.execUtil.execute('ls -la');
stzCore.execUtil.mkDir('./test');
const files = stzCore.execUtil.listFiles('./src');

// 암호화 유틸리티
const hash = stzCore.cryptoUtil.encryptSHA256('password', 'salt');
const salt = stzCore.cryptoUtil.makeSalt(16);

// HTTP 요청 유틸리티
const response = await stzCore.fetchUtil.get('https://api.example.com/data');
const postResult = await stzCore.fetchUtil.post('https://api.example.com/users', { name: 'John' });

// 클라이언트 정보 유틸리티
const browserInfo = stzCore.requestUtil.getBrowserInfo(req);
const ip = stzCore.requestUtil.getClientIp(req);
```

### 대안: 개별 유틸리티 사용

```typescript
import { StzUtils, ExecUtil, CryptoUtil, FetchUtil, RequestUtil } from 'stzutil';

// 각 유틸리티를 독립적으로 사용 가능
const isEmpty = StzUtils.isEmpty('');
ExecUtil.execute('pwd');
const hash = CryptoUtil.hash('data');
await FetchUtil.get('https://api.example.com');
const ip = RequestUtil.getClientIp(req);
```

## API 레퍼런스

### StzUtils (프론트엔드 유틸리티)

**타입 체크:**
- `isNull(value)` - null 여부 확인
- `isUndefined(value)` - undefined 여부 확인
- `isNullOrUndefined(value)` - null 또는 undefined 여부 확인
- `isString(value)` - 문자열 여부 확인
- `isNumber(value)` - 숫자 여부 확인
- `isBoolean(value)` - 불린 여부 확인
- `isArray(value)` - 배열 여부 확인
- `isObject(value)` - 객체 여부 확인
- `isFunction(value)` - 함수 여부 확인
- `isEmpty(value)` - 빈 값 여부 확인 (null, undefined, '', [], {})

**타입 변환:**
- `toInt(value, defaultValue?)` - 정수로 변환
- `toFloat(value, defaultValue?)` - 실수로 변환
- `toBoolean(value)` - 불린으로 변환
- `str(value)` - 문자열로 변환

**문자열 조작:**
- `capitalize(str)` - 첫 글자 대문자화
- `toSnakeCase(str)` - snake_case로 변환
- `toCamelCase(str)` - camelCase로 변환
- `toKebabCase(str)` - kebab-case로 변환
- `truncate(str, length, ellipsis?)` - 문자열 자르기

**배열 유틸리티:**
- `chunk(array, size)` - 배열을 청크로 분할
- `unique(array)` - 중복 제거
- `shuffle(array)` - 배열 섞기

**객체 유틸리티:**
- `merge(target, source)` - 객체 깊은 병합
- `cloneDeep(obj)` - 객체 깊은 복사
- `isEqual(a, b)` - 깊은 동등성 비교
- `omit(obj, keys)` - 특정 키 제외

**색상 유틸리티:**
- `hexToRgba(hex, opacity?)` - HEX를 RGBA로 변환
- `rgbaToHex(rgba)` - RGBA를 HEX로 변환
- `hexToRgb(hex)` - HEX를 RGB로 변환
- `rgbToHex(rgb)` - RGB를 HEX로 변환

### ExecUtil (프로세스 & 파일 시스템)

**명령어 실행:**
- `execute(command)` - 셸 명령어 실행

**디렉토리 작업:**
- `mkDir(dirPath, options?)` - 디렉토리 생성
- `rmDir(dirPath, options?)` - 디렉토리 삭제

**파일 작업:**
- `copyFile(source, dest, options?)` - 파일 복사
- `moveFile(source, dest, options?)` - 파일 이동
- `exists(path)` - 경로 존재 여부 확인
- `readFile(filePath)` - 파일 내용 읽기
- `readJson<T>(filePath)` - JSON 파일 읽기 및 파싱

**파일 검색:**
- `listFiles(dir)` - 디렉토리의 파일 목록
- `findFiles(pattern, dir?)` - 패턴으로 파일 찾기

### CryptoUtil (암호화)

**해싱:**
- `encryptSHA256(data, salt?)` - SHA-256 해시
- `hash(data, algorithm?)` - 알고리즘 지정 해시 (md5, sha1, sha256, sha512)
- `makeSalt(bytes?)` - 랜덤 솔트 생성

**인코딩:**
- `encodeBase64(data)` - Base64 인코딩
- `decodeBase64(data)` - Base64 디코딩

### FetchUtil (HTTP 요청)

**HTTP 메서드:**
- `get<T>(url, params?, options?)` - GET 요청
- `post<T>(url, body?, options?)` - POST 요청
- `put<T>(url, body?, options?)` - PUT 요청
- `delete<T>(url, params?, options?)` - DELETE 요청
- `patch<T>(url, body?, options?)` - PATCH 요청
- `head<T>(url, params?, options?)` - HEAD 요청
- `options<T>(url, params?, options?)` - OPTIONS 요청

**쿼리 문자열:**
- `buildQueryString(params)` - 쿼리 문자열 생성
- `appendQueryString(url, params)` - URL에 쿼리 문자열 추가

### RequestUtil (클라이언트 정보 추출)

**클라이언트 정보:**
- `getBrowserInfo(request)` - 브라우저 정보 전체 (IP, OS, Browser, User-Agent)
- `getClientIp(request)` - 클라이언트 실제 IP 주소 (프록시 대응)
- `getClientOS(userAgent)` - OS 감지
- `getClientBrowser(userAgent)` - 브라우저 감지

**인증:**
- `getBearerToken(request)` - Bearer 토큰 추출

**기기 타입 감지:**
- `isMobileRequest(request)` - 모바일 요청 여부
- `isTabletRequest(request)` - 태블릿 요청 여부
- `isBotRequest(request)` - 봇/크롤러 요청 여부

**헤더 유틸리티:**
- `getAllHeaders(request)` - 모든 헤더 반환
- `hasHeader(request, headerName)` - 특정 헤더 존재 여부

## 스크립트

```bash
npm run build      # TypeScript를 JavaScript로 빌드
npm run dev        # 개발 모드 (watch)
npm run clean      # 빌드 디렉토리 정리
```

## 라이선스

MIT

## 작성자

stztic8462@gmail.com
