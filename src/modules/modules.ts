import {
  translateWithGoogle,
  translateWithBing,
  translateWithLibre,
  translateWithArgos,
} from './functions';
import {
  GoogleTranslateLanguages,
  BingTranslateLanguages,
  LibreTranslateLanguages,
  ArgosTranslateLanguages,
} from './languages';

export type TranslationModules = {
  [key: string]: TranslationModule;
};

export type TranslationConfig = {
  moduleKey: string;
  TranslationModule: TranslationModule;
  concurrencyLimit: number;
  fallback: boolean;
};

export interface TranslationModule {
  name: string;
  altName: string;
  languages: Record<string, string>;
  init?: Function;
  translate: Function;
  onComplete?: Function;
}

export const TranslationModules: TranslationModules = {
  google: {
    name: 'Google Translate',
    altName: `Google Translate (104 languages)`,
    languages: GoogleTranslateLanguages,
    translate: translateWithGoogle,
  },
  bing: {
    name: 'Bing Translate',
    altName: 'Bing Microsoft Translate (110 languages) \x1b[33m**NEW**\x1b[0m',
    languages: BingTranslateLanguages,
    translate: translateWithBing,
  },
  libre: {
    name: 'Libre Translate',
    altName: `Libre Translate (29 languages)`,
    languages: LibreTranslateLanguages,
    translate: translateWithLibre,
  },
  argos: {
    name: 'Argos Translate',
    altName: `Argos Translate (17 languages)`,
    languages: ArgosTranslateLanguages,
    translate: translateWithArgos,
  },
};
