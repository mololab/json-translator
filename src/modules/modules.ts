import {
  translateWithGoogle,
  translateWithBing,
  translateWithLibre,
  translateWithArgos,
  translateWithDeepL,
} from './functions';
import {
  GoogleTranslateLanguages,
  BingTranslateLanguages,
  LibreTranslateLanguages,
  ArgosTranslateLanguages,
  DeepLTranslateLanguages,
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
  requirements?: string[];
  init?: Function;
  translate: Function;
  onComplete?: Function;
}

export const TranslationModules: TranslationModules = {
  google: {
    name: 'Google Translate',
    altName: `[FREE] Google Translate (104 languages)`,
    languages: GoogleTranslateLanguages,
    translate: translateWithGoogle,
  },
  bing: {
    name: 'Bing Translate',
    altName: '[FREE] Bing Microsoft Translate (110 languages)',
    languages: BingTranslateLanguages,
    translate: translateWithBing,
  },
  libre: {
    name: 'Libre Translate',
    altName: `[FREE] Libre Translate (29 languages)`,
    languages: LibreTranslateLanguages,
    translate: translateWithLibre,
  },
  argos: {
    name: 'Argos Translate',
    altName: `[FREE] Argos Translate (17 languages)`,
    languages: ArgosTranslateLanguages,
    translate: translateWithArgos,
  },
  deepl: {
    name: 'DeepL Translate',
    altName: 'DeepL Translate (29 languages) \x1b[33m**NEW**\x1b[0m',
    requirements: ['"DEEPL_API_KEY" as env'],
    languages: DeepLTranslateLanguages,
    translate: translateWithDeepL,
  },
};
