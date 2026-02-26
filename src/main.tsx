import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

// Регистрируем Service Worker и настраиваем простое уведомление об обновлении
const updateSW = registerSW({
  onNeedRefresh() {
    // Когда кэш обновится (например, ты выкатишь новую версию),
    // браузер спросит пользователя, хочет ли он обновить страницу.
    if (confirm('Доступна новая версия приложения. Обновить сейчас?')) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log('Приложение готово к работе в автономном режиме');
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
