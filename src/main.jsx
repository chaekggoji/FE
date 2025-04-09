import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Modal from 'react-modal'; // react-modal 라이브러리
import App from './App.jsx';
import './index.css';

const client = new QueryClient();

// 모달 접근성 설정 추가 - 모달이 열렸을 때 스크린 리더가 모달 외부의 콘텐츠를 무시하도록 설정(웹 접근성을 위해)
Modal.setAppElement('#root');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
);
