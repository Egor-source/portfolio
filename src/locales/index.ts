import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import enCommon from './en/common.json'
import ruCommon from './ru/common.json'

import enProjects from './en/projects.json'
import ruProjects from './ru/projects.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: enCommon,
        projects: enProjects,
      },
      ru: {
        common: ruCommon,
        projects: ruProjects,
      },
    },

    fallbackLng: 'en',

    defaultNS: 'common',

    ns: ['common', 'projects'],

    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
