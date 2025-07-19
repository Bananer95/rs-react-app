import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './main.css';
import MainPage from './mainPage/MainPage.tsx';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <MainPage />
  </StrictMode>
);
