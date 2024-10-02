import { initializeCli } from './cli/cli';
import { plaintranslate } from './core/translator';
import { fileTranslator } from './core/json_file';
import { objectTranslator } from './core/json_object';
import { TranslationConfig, TranslationModules } from './modules/modules';
import { default_concurrency_limit, default_fallback } from './utils/micro';

const defaults: TranslationConfig = {
  moduleKey: 'google',
  TranslationModule: TranslationModules['google'],
  concurrencyLimit: default_concurrency_limit,
  fallback: default_fallback,
};

export async function translateWord(
  word: string,
  from: string,
  to: string,
  config: TranslationConfig = defaults
) {
  return await plaintranslate(config, word, from, to, []);
}
export async function translateObject(
  object: translatedObject,
  from: string,
  to: string[],
  config: TranslationConfig = defaults
): Promise<translatedObject | translatedObject[]> {
  let hard_copy = JSON.parse(JSON.stringify(object));
  return objectTranslator(config, hard_copy, from, to);
}

export async function translateFile(
  objectPath: string,
  from: string,
  to: string[],
  newFileName: string,
  config: TranslationConfig = defaults
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
