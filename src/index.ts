import { initializeCli } from './cli/cli';
import { plaintranslate } from './core/translator';
import { fileTranslator } from './core/json_file';
import { objectTranslator } from './core/json_object';
import {
  TranslationConfig as TranslationConfigTemp,
  TranslationModules as TranslationModulesTemp,
  TranslationModule,
} from './modules/modules';
import { default_concurrency_limit, default_fallback } from './utils/micro';

const defaults: TranslationConfigTemp = {
  moduleKey: 'google',
  TranslationModule: TranslationModulesTemp['google'],
  concurrencyLimit: default_concurrency_limit,
  fallback: default_fallback,
  cacheEnabled: false,
};

export async function translateWord(
  word: string,
  from: string,
  to: string,
  config: TranslationConfigTemp = defaults,
) {
  return await plaintranslate(config, word, from, to, []);
}

export async function translateObject(
  object: translatedObject,
  from: string,
  to: string[],
  config: TranslationConfigTemp = defaults
): Promise<translatedObject | translatedObject[]> {
  let hard_copy = JSON.parse(JSON.stringify(object));
  return objectTranslator(config, hard_copy, from, to, []);
}

export async function translateFile(
  objectPath: string,
  from: string,
  to: string[],
  newFileName: string,
  config: TranslationConfigTemp = defaults
) {
  return fileTranslator(config, objectPath, from, to, newFileName);
}

export async function runCli() {
  initializeCli();
}

// TYPES
export interface translatedObject {
  [key: string]: any;
}

export { TranslationModule };
export { TranslationModules } from './modules/modules';
export type TranslationConfig = TranslationConfigTemp;
