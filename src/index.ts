import { initializeCli } from './cli/cli';
import { plaintranslate } from './core/core';
import { fileTranslator } from './core/json_file';
import { objectTranslator } from './core/json_object';

export async function translateWord(
  word: string,
  from: LanguageCode,
  to: LanguageCode
) {
  return await plaintranslate(word, from, to);
}

export async function translateObject(
  object: translatedObject,
  from: LanguageCode,
  to: LanguageCode | LanguageCodes
): Promise<translatedObject | translatedObject[]> {
  let hard_copy = JSON.parse(JSON.stringify(object));

  return objectTranslator(hard_copy, from, to);
}

export async function translateFile(
  objectPath: string,
  from: LanguageCode,
  to: LanguageCode | LanguageCodes
) {
  return fileTranslator(objectPath, from, to);
}

export async function runCli() {
  initializeCli();
}

export enum Sources {
  GoogleTranslate = 'GoogleTranslate',
  LibreTranslate = 'LibreTranslate',
  ArgosTranslate = 'ArgosTranslate',
}

// TYPES
export interface translatedObject {
  [key: string]: any;
}

export type LanguageCode = string;
export type LanguageCodes = LanguageCode[];

export function getLanguages() {
  if (global.source == Sources.LibreTranslate) {
    return LibreTranslateLanguages;
  } else if (global.source == Sources.ArgosTranslate) {
    return ArgosTranslateLanguages;
  }
  return GoogleTranslateLanguages;
}

enum LibreTranslateLanguages {
  Automatic = 'auto',
  English = 'en',
  Arabic = 'ar',
  Azerbaijani = 'az',
  Chinese = 'zh',
  Czech = 'cs',
  Danish = 'da',
  Dutch = 'nl',
  Esperanto = 'eo',
  Finnish = 'fi',
  French = 'fr',
  German = 'de',
  Greek = 'el',
  Hebrew = 'iw',
  Hindi = 'hi',
  Hungarian = 'hu',
  Indonesian = 'id',
  Irish = 'ga',
  Italian = 'it',
  Japanese = 'ja',
  Korean = 'ko',
  Persian = 'fa',
  Polish = 'pl',
  Portuguese = 'pt',
  Russian = 'ru',
  Slovak = 'sk',
  Spanish = 'es',
  Swedish = 'sv',
  Turkish = 'tr',
  Ukrainian = 'uk',
}

enum ArgosTranslateLanguages {
  Automatic = 'auto',
  English = 'en',
  Arabic = 'ar',
  Chinese = 'zh',
  French = 'fr',
  German = 'de',
  Hindi = 'hi',
  Indonesian = 'id',
  Irish = 'ga',
  Italian = 'it',
  Japanese = 'ja',
  Korean = 'ko',
  Polish = 'pl',
  Portuguese = 'pt',
  Russian = 'ru',
  Spanish = 'es',
  Turkish = 'tr',
  Vietnamese = 'vi',
}

enum GoogleTranslateLanguages {
  Automatic = 'auto',
  Afrikaans = 'af',
  Albanian = 'sq',
  Amharic = 'am',
  Arabic = 'ar',
  Armenian = 'hy',
  Azerbaijani = 'az',
  Basque = 'eu',
  Belarusian = 'be',
  Bengali = 'bn',
  Bosnian = 'bs',
  Bulgarian = 'bg',
  Catalan = 'ca',
  Cebuano = 'ceb',
  Chichewa = 'ny',
  Chinese_Simplified = 'zh-CN',
  Chinese_Traditional = 'zh-TW',
  Corsican = 'co',
  Croatian = 'hr',
  Czech = 'cs',
  Danish = 'da',
  Dutch = 'nl',
  English = 'en',
  Esperanto = 'eo',
  Estonian = 'et',
  Filipino = 'tl',
  Finnish = 'fi',
  French = 'fr',
  Frisian = 'fy',
  Galician = 'gl',
  Georgian = 'ka',
  German = 'de',
  Greek = 'el',
  Gujarati = 'gu',
  Haitian_Creole = 'ht',
  Hausa = 'ha',
  Hawaiian = 'haw',
  Hebrew = 'iw',
  Hindi = 'hi',
  Hmong = 'hmn',
  Hungarian = 'hu',
  Icelandic = 'is',
  Igbo = 'ig',
  Indonesian = 'id',
  Irish = 'ga',
  Italian = 'it',
  Japanese = 'ja',
  Javanese = 'jw',
  Kannada = 'kn',
  Kazakh = 'kk',
  Khmer = 'km',
  Korean = 'ko',
  Kurdish_Kurmanji = 'ku',
  Kyrgyz = 'ky',
  Lao = 'lo',
  Latin = 'la',
  Latvian = 'lv',
  Lithuanian = 'lt',
  Luxembourgish = 'lb',
  Macedonian = 'mk',
  Malagasy = 'mg',
  Malay = 'ms',
  Malayalam = 'ml',
  Maltese = 'mt',
  Maori = 'mi',
  Marathi = 'mr',
  Mongolian = 'mn',
  Myanmar_Burmese = 'my',
  Nepali = 'ne',
  Norwegian = 'no',
  Pashto = 'ps',
  Persian = 'fa',
  Polish = 'pl',
  Portuguese = 'pt',
  Punjabi = 'pa',
  Romanian = 'ro',
  Russian = 'ru',
  Samoan = 'sm',
  Scots_Gaelic = 'gd',
  Serbian = 'sr',
  Sesotho = 'st',
  Shona = 'sn',
  Sindhi = 'sd',
  Sinhala = 'si',
  Slovak = 'sk',
  Slovenian = 'sl',
  Somali = 'so',
  Spanish = 'es',
  Sundanese = 'su',
  Swahili = 'sw',
  Swedish = 'sv',
  Tajik = 'tg',
  Tamil = 'ta',
  Telugu = 'te',
  Thai = 'th',
  Turkish = 'tr',
  Ukrainian = 'uk',
  Urdu = 'ur',
  Uzbek = 'uz',
  Vietnamese = 'vi',
  Welsh = 'cy',
  Xhosa = 'xh',
  Yiddish = 'yi',
  Yoruba = 'yo',
  Zulu = 'zu',
}

export const languages = GoogleTranslateLanguages;
