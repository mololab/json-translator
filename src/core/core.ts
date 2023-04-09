import translate from '@vitalets/google-translate-api';
import * as bingTranslator from 'bing-translate-api';
import createHttpProxyAgent from 'http-proxy-agent';
import { LanguageCode, Sources } from '..';
import * as fs from 'fs/promises';
import { error, messages, warn } from '../utils/console';
import { default_value, translation_value_limit } from '../utils/micro';
import axios from 'axios';
import * as ignorer from './ignorer';

export async function plaintranslate(
  str: string,
  from: LanguageCode,
  to: LanguageCode
): Promise<string> {
  // STEP: map the subset of string need to be ignored
  let {
    word: ignored_str,
    double_brackets_map,
    single_brackets_map,
  } = ignorer.map(str);

  // STEP: translate in try-catch to keep continuity
  try {
    // STEP: translate with proper source
    let translatedStr = await translateSourceMap[global.source](
      ignored_str,
      from,
      to
    );

    // STEP: put ignored values back
    translatedStr = ignorer.unMap(
      translatedStr,
      double_brackets_map,
      single_brackets_map
    );

    return translatedStr;
  } catch (e) {
    // error case -> return
    return '--';
  }
}

const translateSourceMap = new Map<string, any>([
  [Sources.LibreTranslate, translateWithLibre],
  [Sources.ArgosTranslate, translateWithArgos],
  [Sources.BingTranslate, translateWithBing],
  [Sources.GoogleTranslate, translateWithGoogle],
]);

async function translateWithLibre(
  str: string,
  from: LanguageCode,
  to: LanguageCode
): Promise<string> {
  let body = {
    q: str,
    source: from,
    target: to,
  };

  const { data } = await axios.post(
    'https://libretranslate.com/translate',
    body,
    {
      headers: {
        Origin: 'https://libretranslate.com',
      },
    }
  );

  global.totalTranslated = global.totalTranslated + 1;

  return data?.translatedText ? data?.translatedText : default_value;
}

async function translateWithArgos(
  str: string,
  from: LanguageCode,
  to: LanguageCode
): Promise<string> {
  let body = {
    q: str,
    source: from,
    target: to,
  };

  const { data } = await axios.post(
    'https://translate.argosopentech.com/translate',
    body,
    {
      headers: {
        Origin: 'https://translate.argosopentech.com',
        Referer: 'https://translate.argosopentech.com',
      },
    }
  );

  global.totalTranslated = global.totalTranslated + 1;

  return data?.translatedText ? data?.translatedText : default_value;
}

async function translateWithBing(
  str: string,
  from: LanguageCode,
  to: LanguageCode
): Promise<string> {
  const { translation } = await bingTranslator.translate(str, from, to, false);

  global.totalTranslated = global.totalTranslated + 1;

  return translation;
}

async function translateWithGoogle(
  str: string,
  from: LanguageCode,
  to: LanguageCode
): Promise<string> {
  // STEP: if proxy list provided
  if (
    global.proxyList &&
    global.proxyList.length > 0 &&
    global.proxyIndex !== -1
  ) {
    let proxy = global.proxyList[global.proxyIndex];

    // STEP: new proxy exist
    if (proxy) {
      let agent = createHttpProxyAgent(`http://${proxy}`);

      let translatedStr = await translateWithGoogleByProxySupport(
        str,
        from,
        to,
        {
          agent,
          timeout: 4000,
        }
      );

      return translatedStr;
    } else {
      warn('No new proxy exists, continuing without proxy');
      global.proxyIndex = -1;

      let translatedStr = await translateWithGoogle(str, from, to);

      return translatedStr;
    }
  }

  // STEP: translate without proxy
  else {
    let translatedStr = await translateWithGoogle(str, from, to);

    return translatedStr;
  }
}

async function translateWithGoogleByProxySupport(
  str: string,
  from: LanguageCode,
  to: LanguageCode,
  options?: { agent: any; timeout: number }
) {
  const { text } = await translate(
    safeValueTransition(str),
    {
      from: from,
      to: to,
    },
    {
      agent: options !== undefined ? options.agent : undefined,
    }
  );

  global.totalTranslated = global.totalTranslated + 1;

  return text;
}

export async function getFile(objectPath: string) {
  let json_file: any = undefined;

  await fs
    .readFile(objectPath, 'utf8')
    .then(data => {
      json_file = data;
    })
    .catch(_ => {
      json_file = undefined;
    });

  return json_file;
}

export function getRootFolder(path: string) {
  let arr = path.split('/');
  arr.pop();

  let root = arr.join('/');

  if (root === undefined || root === '') {
    root = './';
  }

  return root;
}

export async function saveFilePublic(path: string, data: any) {
  var json = JSON.stringify(data);

  await fs
    .writeFile(path, json, 'utf8')
    .then(_ => {})
    .catch(_ => {
      error(messages.file.cannot_save_file);
    });
}

export function safeValueTransition(value: string) {
  const value_safety: ValueSafety = valueIsSafe(value);

  if (value_safety.is_safe === true) {
    return value;
  }

  switch (value_safety.type) {
    case nonSafeTypes.null:
    case nonSafeTypes.undefined:
    case nonSafeTypes.empty:
      value = default_value;
      break;
    case nonSafeTypes.long:
      value = value.substring(0, translation_value_limit);
      break;
  }

  return value;
}

function valueIsSafe(value: string): ValueSafety {
  let result: ValueSafety = {
    is_safe: true,
    type: undefined,
  };

  if (value === undefined) {
    result.is_safe = false;
    result['type'] = nonSafeTypes.undefined;

    return result;
  }

  if (value === null) {
    result.is_safe = false;
    result['type'] = nonSafeTypes.null;

    return result;
  }

  if (value.length >= translation_value_limit) {
    result.is_safe = false;
    result['type'] = nonSafeTypes.long;

    return result;
  }

  if (value === '') {
    result.is_safe = false;
    result['type'] = nonSafeTypes.empty;

    return result;
  }

  return result;
}

interface ValueSafety {
  is_safe: boolean;
  type: nonSafeTypes | undefined;
}

enum nonSafeTypes {
  'long',
  'undefined',
  'null',
  'empty',
}
