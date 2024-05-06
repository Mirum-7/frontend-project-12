import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { io } from 'socket.io-client';
import resources from './locals/resources';

const init = () => {
  // socket
  const socket = io();

  // locals
  const i18n = i18next
    .createInstance();
  i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
      resources,
      fallBackLng: 'ru',
      interpolation: {
        escapeValue: false,
      },
    });

  // rollbar config
  const rollbarConfig = {
    accessToken: process.env.REACT_APP_NOT_ROLLBAR_CODE,
    environment: 'production',
  };

  return {
    socket,
    i18n,
    rollbarConfig,
  };
};

export default init;
