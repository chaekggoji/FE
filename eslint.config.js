import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  { ignores: ['dist'] }, // 'dist' 폴더 내의 파일은 ESLint 검사에서 제외
  {
    files: ['**/*.{js,jsx}'], // 모든 .js, .jsx 파일에 대해 ESLint 적용
    languageOptions: {
      ecmaVersion: 2020, // 최신 ES2020 문법 지원
      globals: globals.browser, // 브라우저 환경의 전역 변수 자동 인식 (ex: window, document)
      parserOptions: {
        ecmaVersion: 'latest', // 최신 ECMAScript 문법 지원
        ecmaFeatures: { jsx: true }, // JSX 문법 사용 가능
        sourceType: 'module', // ES 모듈(import/export) 문법 사용 가능
      },
    },
    settings: { react: { version: 'detect' } }, // React 버전 명시 (자동 감지 문제 방지)
    plugins: {
      react, // React 관련 ESLint 규칙 적용
      'react-hooks': reactHooks, // React Hooks 관련 ESLint 규칙 적용
      'react-refresh': reactRefresh, // React Fast Refresh 관련 규칙 적용 (개발 중 Hot Reload 최적화)
    },
    rules: {
      ...js.configs.recommended.rules, // ESLint 기본 추천 규칙 적용
      ...react.configs.recommended.rules, // React 공식 ESLint 추천 규칙 적용
      ...react.configs['jsx-runtime'].rules, // React 17+ 자동 JSX 변환 적용
      ...reactHooks.configs.recommended.rules, // React Hooks 관련 추천 규칙 적용

      //  React 관련 규칙
      'react/jsx-no-target-blank': 'off', // ❌ a 태그의 target="_blank" 사용 시 보안 경고 해제
      'react/jsx-pascal-case': 'error', // 컴포넌트 이름을 PascalCase로 강제
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }, // export default 외에도 상수 export 허용
      ],

      //  코드 스타일 규칙
      'prefer-template': 'error', // 문자열 결합 시 + 연산자 대신 템플릿 리터럴 사용 강제 (`Hello, ${name}`)
      'space-infix-ops': 'error', // 연산자(`+`, `-`, `*`, `=` 등) 앞뒤 공백 강제 (`a + b` ✅ / `a+b` ❌)
      'no-var': 'error', // `var` 사용 금지 (let 또는 const 사용 필수)
      'prefer-const': 'error', // 변경되지 않는 변수는 `const` 사용 강제 (`let` 대신)

      // 네이밍 컨벤션 규칙
      camelcase: [
        'error',
        {
          properties: 'never', // 객체 속성(property)에서는 카멜케이스 강제하지 않음 (API 응답 등 예외 허용)
          ignoreDestructuring: true, // 비구조화 할당(Destructuring) 시 카멜케이스 예외 허용
          allow: ['^([A-Z0-9_]+)$'], // 상수(`const MAX_VALUE = 100;`)에서 대문자 + 스네이크 케이스 허용
        },
      ],
    },
  },
  eslintConfigPrettier,
];
