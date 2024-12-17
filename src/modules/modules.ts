import {
  translateWithGoogle,
  translateWithBing,
  translateWithLibre,
  translateWithArgos,
  translateWithDeepL,
  translateWithGoogle2,
  translateWithGPT35Turbo,
  translateWithGPT4o,
  translateWithGPT4,
  translateWithGPT4oMini,
  translateWithGemma7B,
  translateWithGemma9B,
  translateWithMixtral8x7B,
  translateWithLlama8B,
  translateWithLlama70B
} from './functions';
import {
  GoogleTranslateLanguages,
  BingTranslateLanguages,
  LibreTranslateLanguages,
  ArgosTranslateLanguages,
  DeepLTranslateLanguages,
  GoogleTranslate2Languages,
  GTPTranslateLanguages,
} from './languages';

export type TranslationModulesType = {
  [key: string]: TranslationModule;
};

export type TranslationConfig = {
  moduleKey: string;
  TranslationModule: TranslationModule;
  concurrencyLimit: number;
  fallback: boolean;
  cacheEnabled: boolean;
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

export const TranslationModules: TranslationModulesType = {
  google: {
    name: 'Google Translate',
    altName: `[FREE] Google Translate (104 languages)`,
    languages: GoogleTranslateLanguages,
    translate: translateWithGoogle,
  },
  google2: {
    name: 'Google Translate 2',
    altName: `[FREE] Google Translate 2 (104 languages)`,
    languages: GoogleTranslate2Languages,
    translate: translateWithGoogle2,
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
    altName: 'DeepL Translate (29 languages)',
    requirements: ['"DEEPL_API_KEY" and "DEEPL_API_URL" as env'],
    languages: DeepLTranslateLanguages,
    translate: translateWithDeepL,
  },
  'gpt-4o': {
    name: 'gpt-4o model',
    altName: 'AI model: gpt-4o model (104 languages)',
    requirements: ['"OPENAI_API_KEY" as env'],
    languages: GTPTranslateLanguages,
    translate: translateWithGPT4o,
  },
  'gpt-3.5-turbo': {
    name: 'gpt-3.5-turbo model',
    altName:
      '\x1b[33m**NEW**\x1b[0m AI model: gpt-3.5-turbo model (104 languages)',
    requirements: ['"OPENAI_API_KEY" as env'],
    languages: GTPTranslateLanguages,
    translate: translateWithGPT35Turbo,
  },
  'gpt-4': {
    name: 'gpt-4 model',
    altName: '\x1b[33m**NEW**\x1b[0m AI model: gpt-4 model (104 languages)',
    requirements: ['"OPENAI_API_KEY" as env'],
    languages: GTPTranslateLanguages,
    translate: translateWithGPT4,
  },
  'gpt-4o-mini': {
    name: 'gpt-4o-mini model',
    altName:
      '\x1b[33m**NEW**\x1b[0m AI model: gpt-4o-mini model (104 languages)',
    requirements: ['"OPENAI_API_KEY" as env'],
    languages: GTPTranslateLanguages,
    translate: translateWithGPT4oMini,
  },
  'gemma-7b': {
    name: 'gemma-7b model',
    altName: '\x1b[33m**NEW**\x1b[0m AI model: gemma-7b model',
    requirements: ['"GROQ_API_KEY" as env'],
    languages: GTPTranslateLanguages,
    translate: translateWithGemma7B,
  },
  'gemma2-9b': {
    name: 'gemma2-9b model',
    altName: '\x1b[33m**NEW**\x1b[0m AI model: gemma2-9b model',
    requirements: ['"GROQ_API_KEY" as env'],
    languages: GTPTranslateLanguages,
    translate: translateWithGemma9B,
  },
  'mixtral-8x7b': {
    name: 'mixtral-8x7b model',
    altName: '\x1b[33m**NEW**\x1b[0m AI model: mixtral-8x7b model',
    requirements: ['"GROQ_API_KEY" as env'],
    languages: GTPTranslateLanguages,
    translate: translateWithMixtral8x7B,
  },
  'llama3-8b': {
    name: 'llama3-8b model',
    altName: '\x1b[33m**NEW**\x1b[0m AI model: llama3-8b model',
    requirements: ['"GROQ_API_KEY" as env'],
    languages: GTPTranslateLanguages,
    translate: translateWithLlama8B,
  },
  'llama3-70b': {
    name: 'llama3-70b model',
    altName: '\x1b[33m**NEW**\x1b[0m AI model: llama3-70b model',
    requirements: ['"GROQ_API_KEY" as env'],
    languages: GTPTranslateLanguages,
    translate: translateWithLlama70B,
  },
};
