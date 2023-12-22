import {
  getLanguageVariant,
  getTranslationModuleByKey,
  translationModuleKeys,
} from '../modules/helpers';
import { TranslationConfig } from '../modules/modules';
import { warn } from '../utils/console';
import { default_value } from '../utils/micro';
import * as ignorer from './ignorer';

export async function plaintranslate(
  TranslationConfig: TranslationConfig,
  str: string,
  from: string,
  to: string,
  skipModuleKeys: string[]
): Promise<string> {
  // step: map the subset of string need to be ignored
  let {
    word: ignored_str,
    double_brackets_map,
    single_brackets_map,
  } = ignorer.map(str);

  // step: translate in try-catch to keep continuity
  try {
    // step: translate with proper source
    let translatedStr = await TranslationConfig.TranslationModule.translate(
      ignored_str,
      from,
      to
    );

    // step: put ignored values back
    translatedStr = ignorer.unMap(
      translatedStr,
      double_brackets_map,
      single_brackets_map
    );

    global.totalTranslated = global.totalTranslated + 1;

    return translatedStr;
  } catch (e) {
    // error case
    const clonedTranslationConfig = Object.assign({}, TranslationConfig); // cloning to escape ref value
    const clonedSkipModuleKeys = Object.assign([], skipModuleKeys); // cloning to escape ref value

    clonedSkipModuleKeys.push(clonedTranslationConfig.moduleKey);

    const { newModuleKey, newFrom, newTo } = newTranslationModule(
      clonedTranslationConfig.moduleKey,
      clonedSkipModuleKeys,
      from,
      to
    );

    let stop: boolean =
      !clonedTranslationConfig.fallback || newModuleKey === undefined;

    if (stop) {
      warn(
        `\nerror while translating "${str}" using ${clonedTranslationConfig.moduleKey}. Assigned "--" instead of exit from cli.`
      );

      global.totalTranslated = global.totalTranslated + 1;

      return default_value;
    }

    warn(
      `\nerror while translating "${str}" using ${clonedTranslationConfig.moduleKey}. Tried: ${clonedSkipModuleKeys}. Trying ${newModuleKey}.`
    );

    // update the TranslationModule for next try
    clonedTranslationConfig.TranslationModule = getTranslationModuleByKey(
      newModuleKey as string
    );
    clonedTranslationConfig.moduleKey = newModuleKey as string;

    return plaintranslate(
      clonedTranslationConfig,
      str,
      newFrom as string,
      newTo as string,
      clonedSkipModuleKeys
    );
  }
}

function newTranslationModule(
  sourceModuleKeys: string,
  skipModuleKeys: string[],
  from: string,
  to: string
) {
  const default_data = {
    newModuleKey: undefined,
    newFrom: undefined,
    newTo: undefined,
  };

  const allModuleKeys: string[] = translationModuleKeys();

  const result: string[] = allModuleKeys.filter(
    item => !skipModuleKeys.includes(item)
  );

  let newModuleKey = result[0];

  if (!newModuleKey) {
    return default_data; // default
  }

  let newFrom = getLanguageVariant(sourceModuleKeys, from, newModuleKey);
  let newTo = getLanguageVariant(sourceModuleKeys, to, newModuleKey);

  if (!newFrom || !newTo) {
    return default_data; // default
  }

  // has valid newModuleKey & from & to
  return {
    newModuleKey,
    newFrom,
    newTo,
  };
}
