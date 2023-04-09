import translate from '@vitalets/google-translate-api';
import * as bingTranslator from 'bing-translate-api';
import createHttpProxyAgent from 'http-proxy-agent';
import { LanguageCode, Sources } from '..';
import { warn } from '../utils/console';
import { default_value } from '../utils/micro';
import axios from 'axios';
import * as ignorer from './ignorer';
import { safeValueTransition } from './core';

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
    let translatedStr = await translateSourceMap.get(global.source)(
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
    q: safeValueTransition(str),
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
    q: safeValueTransition(str),
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
  const { translation } = await bingTranslator.translate(
    safeValueTransition(str),
    from,
    to,
    false
  );

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
