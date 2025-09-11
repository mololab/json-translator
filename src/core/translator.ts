import {
  getLanguageVariant,
  getTranslationModuleByKey,
  translationModuleKeys,
} from '../modules/helpers';
import {TranslationConfig} from '../modules/modules';
import { warn } from '../utils/console';
import { default_value } from '../utils/micro';
import * as ignorer from './ignorer';
import * as crypto from 'crypto';


export function getKey(str: string, from: string, to: string):string {
  let strKey = crypto.createHash('md5').update(str).digest('hex')
  return `${from}-${to}-${strKey}`;
}

export function translateCacheModule(fallbackFn: Function, cacheObject: Record<string, any>, onSuccess: Function){
  return async (str: string, from: string, to: string): Promise<string> => {
    let key =  getKey(str, from, to)
    if (cacheObject[key] !== undefined && cacheObject[key] !== default_value) {
      onSuccess(true)
      return Promise.resolve(cacheObject[key]);
    } else {
      return fallbackFn(str, from, to);
    }
  };
}

export async function plaintranslate(
  TranslationConfig: TranslationConfig,
  str: string,
  from: string,
  to: string,
  skipModuleKeys: string[],
  cacheObject?: Record<string, any>
): Promise<string> {
  // Check for empty strings and return immediately if empty
  if (str.trim() === '') return str;

  // step: map the subset of string need to be ignored
  let {
    word: ignored_str,
    double_brackets_map,
    single_brackets_map,
  } = ignorer.map(str);

  // step: translate in try-catch to keep continuity
  try {
    // step: translate with proper source
    let defaultTranslateModule: Function = TranslationConfig.TranslationModule.translate
    let moduleOrCache = TranslationConfig.cacheEnabled ? translateCacheModule(defaultTranslateModule, cacheObject || {}, ()=> {
      global.skipInCache = global.skipInCache + 1;
    }) : defaultTranslateModule

    let translatedStr = await moduleOrCache(
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
    console.log(e)
    const clonedTranslationConfig = Object.assign({}, TranslationConfig); // cloning to escape ref value
    const clonedSkipModuleKeys = Object.assign([], skipModuleKeys); // cloning to escape ref value

    clonedSkipModuleKeys.push(clonedTranslationConfig.moduleKey);

    const {
      newModuleKey,
      newFrom,
      newTo,
      skippedModuleKeys,
    } = newTranslationModule(
      clonedTranslationConfig.moduleKey,
      clonedSkipModuleKeys,
      from,
      to
    );

    // add skippedModuleKeys to general skipModuleKeys
    skippedModuleKeys.forEach(skippedModuleKey => {
      clonedSkipModuleKeys.push(skippedModuleKey);
    });

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
    skippedModuleKeys: [],
  };
  const skippedModuleKeys: string[] = [];

  const allModuleKeys: string[] = translationModuleKeys();
  const result: string[] = allModuleKeys.filter(
    item => !skipModuleKeys.includes(item)
  );

  if (result.length == 0) {
    return default_data;
  }

  for (let i = 0; i < result.length; i++) {
    let newModuleKey = result[i];

    let newFrom = getLanguageVariant(sourceModuleKeys, from, newModuleKey);
    let newTo = getLanguageVariant(sourceModuleKeys, to, newModuleKey);

    // if found valid newFrom & newTo, return
    if (newFrom && newTo) {
      return {
        newModuleKey,
        newFrom,
        newTo,
        skippedModuleKeys,
      };
    }
    // otherwise skip to next module, add key to skippedModuleKeys
    else {
      skippedModuleKeys.push(newModuleKey);
    }
  }

  // has valid newModuleKey & from & to
  default_data.skippedModuleKeys = skippedModuleKeys as any;
  return default_data;
}
