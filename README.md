# 책꼬지

## 📂 폴더 구조

```
📦 chaekggoji-fe
 ┣ 📂public            # 정적 파일 (예: favicon, index.html 등)
 ┣ 📂src               # 소스 코드 폴더
 ┃ ┣ 📂assets         # 이미지, 폰트, 스타일 등의 정적 리소스
 ┃ ┣ 📂components     # 재사용 가능한 UI 컴포넌트
 ┃ ┣ 📂hooks          # 커스텀 훅 관리
 ┃ ┣ 📂pages          # 라우트별 페이지 컴포넌트
 ┃ ┣ 📂store          # Zustand 상태 관리 라이브러리 사용
 ┃ ┣ 📂utils          # 공통 유틸 함수 (파일 변환, API 요청, 데이터 가공 등)
 ┃ ┣ 📜main.jsx       # 앱 엔트리 포인트
 ┃ ┗ 📜App.jsx        # 최상위 App 컴포넌트
 ┣ 📜index.html       # Vite 기본 HTML 파일
 ┣ 📜vite.config.js   # Vite 설정 파일 (경로 alias 포함)
 ┣ 📜package.json     # 프로젝트 의존성 및 스크립트
 ┣ 📜jsconfig.json    # 경로 alias 설정
 ┣ 📜eslint.config.js # ESLint 설정
 ┣ 📜.prettierrc      # Prettier 설정 파일
 ┗ 📜.gitignore       # Git에서 제외할 파일 목록
```

## 🚀 프로젝트 실행 방법

### 1️⃣ 개발 서버 실행

```sh
npm install   # 패키지 설치
npm run dev   # 개발 서버 실행
```

### 2️⃣ 빌드 및 실행

```sh
npm run build   # 프로젝트 빌드
npm run preview # 빌드 결과 미리보기
```

### 3️⃣ 코드 스타일 검사 및 자동 수정

```sh
npm run lint      # 코드 린트 검사
npm run lint --fix # 자동 수정
```

## 🛠️ 설치 라이브러리

### ✅ **프로젝트 필수 라이브러리 (dependencies)**

| 라이브러리                         | 설명                                                                                      |
| ---------------------------------- | ----------------------------------------------------------------------------------------- |
| **@tanstack/react-query**          | 서버 상태 관리 라이브러리. API 요청 캐싱 및 최적화 가능                                   |
| **@tanstack/react-query-devtools** | React Query의 개발자 도구. API 상태를 시각적으로 확인 가능                                |
| **axios**                          | HTTP 요청을 쉽게 처리하는 라이브러리                                                      |
| **prop-types**                     | React 컴포넌트의 props 타입 검증                                                          |
| **react**                          | React 라이브러리                                                                          |
| **react-dom**                      | React 컴포넌트를 DOM에 렌더링하는 라이브러리                                              |
| **react-hook-form**                | React에서 폼(Form) 관리를 쉽게 도와주는 라이브러리                                        |
| **react-router**                   | 클라이언트 사이드 라우팅을 제공하는 라이브러리 (v7부터 `react-router-dom` 없이 사용 가능) |
| **styled-components**              | CSS-in-JS 방식으로 스타일을 적용할 수 있는 라이브러리                                     |
| **zustand**                        | 전역 상태 관리를 위한 가벼운 상태 관리 라이브러리                                         |

### 🛠 **개발 환경 관련 라이브러리 (devDependencies)**

| 라이브러리                      | 설명                                             |
| ------------------------------- | ------------------------------------------------ |
| **@vitejs/plugin-react**        | Vite에서 React를 사용하기 위한 플러그인          |
| **vite**                        | 빠른 빌드 속도를 제공하는 프론트엔드 빌드 도구   |
| **eslint**                      | 코드 스타일을 통일하고 버그를 방지하는 린팅 도구 |
| **eslint-config-prettier**      | ESLint와 Prettier의 충돌을 방지                  |
| **eslint-plugin-prettier**      | Prettier의 규칙을 ESLint에 통합                  |
| **eslint-plugin-react**         | React 관련 린트 규칙 제공                        |
| **eslint-plugin-react-hooks**   | React Hooks의 올바른 사용을 강제                 |
| **eslint-plugin-react-refresh** | React Fast Refresh를 위한 ESLint 플러그인        |
| **prettier**                    | 코드 스타일 자동 정리 도구                       |

## 📂 **Vite 설정 설명**

현재 `vite.config.js`에서는 **경로 alias 설정**이 포함되어 있습니다. 이를 활용하면 상대 경로 대신 절대 경로처럼 사용할 수 있습니다.

| Alias           | 경로              |
| --------------- | ----------------- |
| **@**           | `/src`            |
| **@assets**     | `/src/assets`     |
| **@components** | `/src/components` |
| **@hooks**      | `/src/hooks`      |
| **@store**      | `/src/store`      |
| **@utils**      | `/src/utils`      |

### 📌 **예시**

```js
import MyComponent from '@/components/MyComponent';
```

## 📂 **ESLint 설정 설명**

현재 `eslint.config.js`에서는 프로젝트의 코드 스타일을 유지하기 위한 여러 가지 규칙이 설정되어 있습니다. 주요 설정은 다음과 같습니다:

- `react/jsx-pascal-case`: 컴포넌트명을 PascalCase로 강제
- `no-var`: `var` 사용 금지 (대신 `let` 또는 `const` 사용)
- `prefer-template`: 문자열 결합 시 템플릿 리터럴 사용
- `prefer-const`: 변경되지 않는 변수는 `const` 사용 강제
- `react-hooks/exhaustive-deps`: React Hook의 의존성 배열 규칙 강제

## 📂 **프로젝트 엔트리 포인트 설명**

`main.jsx`는 React 애플리케이션의 엔트리 포인트로, 다음과 같은 주요 역할을 합니다:

1. `React.StrictMode` 적용하여 개발 시 엄격한 검사 수행
2. `QueryClientProvider`를 사용하여 React Query 설정
3. `ReactQueryDevtools` 추가하여 개발 시 상태 디버깅 가능

### 📌 **프로젝트 엔트리 포인트 (main.jsx)**

```js
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from './App.jsx';

const client = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
);
```
