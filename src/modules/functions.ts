import { translate } from '@vitalets/google-translate-api';
import * as bingTranslator from 'bing-translate-api';
import createHttpProxyAgent from 'http-proxy-agent';
import axios from 'axios';
import { getLanguageKeyFromValue, safeValueTransition } from './helpers';
import { warn } from '../utils/console';
import translate2 from '@iamtraction/google-translate';
import OpenAI from 'openai';
import { GTPTranslateLanguages } from './languages';

export async function translateWithLibre(
  str: string,
  from: string,
  to: string
): Promise<string> {
  let body = {
    q: safeValueTransition(str),
    source: from,
    target: to,
    format: 'text',
    api_key: '',
    secret: 'YK4VRVW',
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

  return data.translatedText;
}

export async function translateWithArgos(
  str: string,
  from: string,
  to: string
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

  return data.translatedText;
}

export async function translateWithBing(
  str: string,
  from: string,
  to: string
): Promise<string> {
  const { translation } = await bingTranslator.translate(
    safeValueTransition(str),
    from,
    to,
    false
  );

  return translation;
}

export async function translateWithGoogle(
  str: string,
  from: string,
  to: string
): Promise<string> {
  // step: if proxy list provided
  if (
    global.proxyList &&
    global.proxyList.length > 0 &&
    global.proxyIndex !== -1
  ) {
    let proxy = global.proxyList[global.proxyIndex];

    // step: new proxy exist
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

      let translatedStr = await translateWithGoogleByProxySupport(
        str,
        from,
        to
      );

      return translatedStr;
    }
  } else {
    // step: translate without proxy
    let translatedStr = await translateWithGoogleByProxySupport(str, from, to);

    return translatedStr;
  }
}

async function translateWithGoogleByProxySupport(
  str: string,
  from: string,
  to: string,
  options?: { agent: any; timeout: number }
) {
  const { text } = await translate(safeValueTransition(str), {
    from: from,
    to: to,
    fetchOptions: { agent: options !== undefined ? options.agent : undefined },
  });

  return text;
}

export async function translateWithDeepL(
  str: string,
  from: string,
  to: string
): Promise<string> {
  const DEEPL_API_KEY = process.env.DEEPL_API_KEY;
  if (!DEEPL_API_KEY) {
    warn('process.env.DEEPL_API_KEY is not defined');
  }

  const body = {
    text: [safeValueTransition(str)],
    target_lang: to,
    source_lang: from,
  };

  const { data } = await axios.post(
    'https://api-free.deepl.com/v2/translate',
    body,
    {
      headers: {
        Authorization: `DeepL-Auth-Key ${DEEPL_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return data.translations[0].text;
}

export async function translateWithGoogle2(
  str: string,
  from: string,
  to: string
) {
  const response = await translate2(str, { from: from, to: to });

  return response.text;
}

export async function translateWithGPT4o(
  str: string,
  from: string,
  to: string
) {
  return translateWithGPT('gpt-4o', str, from, to);
}

export async function translateWithGPT(
  model: string,
  str: string,
  from: string,
  to: string
) {
  type ChatCompletionRequestMessage = {
    role: 'system' | 'user' | 'assistant';
    content: string;
  };

  let fromKey = getLanguageKeyFromValue(from, GTPTranslateLanguages);
  let toKey = getLanguageKeyFromValue(to, GTPTranslateLanguages);

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_API_KEY) {
    warn('process.env.OPENAI_API_KEY is not defined');
  }

  const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
  });

  try {
    let conversationHistory: ChatCompletionRequestMessage[] = [
      {
        role: 'system',
        content:
          'You are a translation assistant. Translate any text given to you into the specified language. Do not return anything else.',
      },
      {
        role: 'user',
        content: `${fromKey} to ${toKey}: "${str}"`,
      },
    ];

    const response = await openai.chat.completions.create({
      model: model,
      messages: conversationHistory,
      max_tokens: 1000,
    });

    let translation = response?.choices?.[0].message?.content?.trim() || '';

    // remove first " if exist
    translation =
      translation[0] == '"' ? translation.substring(1) : translation;

    // remove last " if exist
    translation =
      translation[translation.length - 1] == '"'
        ? translation.substring(0, translation.length - 1)
        : translation;

    return translation || 'Translation failed';
  } catch (error) {
    throw new Error(`Failed to translate text with GPT: ${error}`);
  }
}
