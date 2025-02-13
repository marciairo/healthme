
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      welcome: 'Welcome to HealthTrack',
      login: 'Login',
      register: 'Register',
      email: 'Email',
      password: 'Password',
      name: 'Name',
    },
  },
  pt: {
    translation: {
      welcome: 'Bem-vindo ao HealthTrack',
      login: 'Entrar',
      register: 'Registrar',
      email: 'Email',
      password: 'Senha',
      name: 'Nome',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
