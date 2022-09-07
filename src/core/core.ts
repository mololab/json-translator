import translate from '@vitalets/google-translate-api';
import { LanguageCode, Sources } from '..';
import * as fs from 'fs/promises';
import { error, messages } from '../utils/console';
import { default_value, translation_value_limit } from '../utils/micro';
import axios from 'axios';

export async function plaintranslate(
  word: string,
  from: LanguageCode,
  to: LanguageCode
): Promise<string> {
  let { map, word: ignored_word } = mapIgnoredValues(word);

  if (global.source == Sources.LibreTranslate) {
    let translatedWord = await translateWithLibre(ignored_word, from, to);
    translatedWord = unmapIgnoredValues(translatedWord, map);
    return translatedWord;
  } else if (global.source == Sources.ArgosTranslate) {
    let translatedWord = await translateWithArgos(ignored_word, from, to);
    translatedWord = unmapIgnoredValues(translatedWord, map);
    return translatedWord;
  } else {
    let translatedWord = await translateWithGoogle(ignored_word, from, to);
    translatedWord = unmapIgnoredValues(translatedWord, map);
    return translatedWord;
  }
}

async function translateWithLibre(
  word: string,
  from: LanguageCode,
  to: LanguageCode
) {
  let body = {
    q: word,
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
  word: string,
  from: LanguageCode,
  to: LanguageCode
) {
  let body = {
    q: word,
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

async function translateWithGoogle(
  word: string,
  from: LanguageCode,
  to: LanguageCode
) {
  const { text } = await translate(safeValueTransition(word), {
    from: from,
    to: to,
  });

  global.totalTranslated = global.totalTranslated + 1;

  return text;
}

function mapIgnoredValues(
  str: string
): { word: string; map: { [key: string]: string } } {
  let counter = 0;
  let map: { [key: string]: string } = {};

  let new_str = str.replace(/{{(.*?)\}}/g, function(word) {
    word = word.substring(2, word.length - 2);

    map[`${counter}`] = word;

    let locked_ignored = '{' + counter + '}';

    counter++;
    return locked_ignored;
  });

  return { word: new_str, map: map };
}

function unmapIgnoredValues(str: string, map: object): string {
  for (const [key, value] of Object.entries(map)) {
    let for_replace = '{' + key + '}';

    str = str.replace(for_replace, '{{' + value + '}}');
  }

  return str;
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

  if (root == undefined || root == '') {
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

  if (value_safety.is_safe == true) {
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

  if (value == undefined) {
    result.is_safe = false;
    result['type'] = nonSafeTypes.undefined;

    return result;
  }

  if (value == null) {
    result.is_safe = false;
    result['type'] = nonSafeTypes.null;

    return result;
  }

  if (value.length >= translation_value_limit) {
    result.is_safe = false;
    result['type'] = nonSafeTypes.long;

    return result;
  }

  if (value == '') {
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
