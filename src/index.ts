import { initializeCli } from './cli/cli';
import { plaintranslate } from './core/translator';
import { fileTranslator } from './core/json_file';
import { objectTranslator } from './core/json_object';
import { TranslationConfig, TranslationModules } from './modules/modules';
import { default_concurrency_limit, default_fallback } from './utils/micro';

// TODO: fix to get from user
export async function translateWord(word: string, from: string, to: string) {
  let config: TranslationConfig = {
    moduleKey: 'google',
    TranslationModule: TranslationModules['google'],
    concurrencyLimit: default_concurrency_limit,
    fallback: default_fallback,
  };

  return await plaintranslate(config, word, from, to, []);
}
// TODO: fix to get from user
export async function translateObject(
  object: translatedObject,
  from: string,
  to: string[]
): Promise<translatedObject | translatedObject[]> {
  let hard_copy = JSON.parse(JSON.stringify(object));

  let config: TranslationConfig = {
    moduleKey: 'google',
    TranslationModule: TranslationModules['google'],
    concurrencyLimit: default_concurrency_limit,
    fallback: default_fallback,
  };

  return objectTranslator(config, hard_copy, from, to);
}

export async function translateFile(
  objectPath: string,
  from: string,
  to: string[],
  newFileName: string
) {
  let config: TranslationConfig = {
    moduleKey: 'google',
    TranslationModule: TranslationModules['google'],
    concurrencyLimit: default_concurrency_limit,
    fallback: default_fallback,
  };

  return fileTranslator(config, objectPath, from, to, newFileName);
}

export async function runCli() {
  initializeCli();
}

// TYPES
export interface translatedObject {
  [key: string]: any;
}
