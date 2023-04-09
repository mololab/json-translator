import { initializeCli } from './cli/cli';
import { plaintranslate } from './core/translator';
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
  BingTranslate = 'BingTranslate',
}

// default
global.source = Sources.GoogleTranslate;

// TYPES
export interface translatedObject {
  [key: string]: any;
}

export type LanguageCode = string;
export type LanguageCodes = LanguageCode[];

export function getLanguages() {
  if (global.source === Sources.LibreTranslate) {
    return LibreTranslateLanguages;
  } else if (global.source === Sources.ArgosTranslate) {
    return ArgosTranslateLanguages;
  } else if (global.source === Sources.BingTranslate) {
    return BingTranslateLanguages;
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

enum BingTranslateLanguages {
  Automatic = 'auto-detect',
  Afrikaans = 'af',
  Albanian = 'sq',
  Amharic = 'am',
  Arabic = 'ar',
  Armenian = 'hy',
  Assamese = 'as',
  Azerbaijani = 'az',
  Bangla = 'bn',
  Bashkir = 'ba',
  Basque = 'eu',
  Bosnian = 'bs',
  Bulgarian = 'bg',
  Cantonese_Traditional = 'yue',
  Catalan = 'ca',
  Chinese_Literary = 'lzh',
  Chinese_Simplified = 'zh-Hans',
  Chinese_Traditional = 'zh-Hant',
  Croatian = 'hr',
  Czech = 'cs',
  Danish = 'da',
  Dari = 'prs',
  Divehi = 'dv',
  Dutch = 'nl',
  English = 'en',
  Estonian = 'et',
  Faroese = 'fo',
  Fijian = 'fj',
  Filipino = 'fil',
  Finnish = 'fi',
  French = 'fr',
  French_Canada = 'fr-CA',
  Galician = 'gl',
  Georgian = 'ka',
  German = 'de',
  Greek = 'el',
  Gujarati = 'gu',
  Haitian_Creole = 'ht',
  Hebrew = 'he',
  Hindi = 'hi',
  Hmong_Daw = 'mww',
  Hungarian = 'hu',
  Icelandic = 'is',
  Indonesian = 'id',
  Inuinnaqtun = 'ikt',
  Inuktitut = 'iu',
  Inuktitut_Latin = 'iu-Latn',
  Irish = 'ga',
  Italian = 'it',
  Japanese = 'ja',
  Kannada = 'kn',
  Kazakh = 'kk',
  Khmer = 'km',
  Klingon_Latin = 'tlh-Latn',
  Korean = 'ko',
  Kurdish_Central = 'ku',
  Kurdish_Northern = 'kmr',
  Kyrgyz = 'ky',
  Lao = 'lo',
  Latvian = 'lv',
  Lithuanian = 'lt',
  Macedonian = 'mk',
  Malagasy = 'mg',
  Malay = 'ms',
  Malayalam = 'ml',
  Maltese = 'mt',
  Marathi = 'mr',
  Mongolian_Cyrillic = 'mn-Cyrl',
  Mongolian_Traditional = 'mn-Mong',
  Myanmar_Burmese = 'my',
  Māori = 'mi',
  Nepali = 'ne',
  Norwegian = 'nb',
  Odia = 'or',
  Pashto = 'ps',
  Persian = 'fa',
  Polish = 'pl',
  Portuguese_Brazil = 'pt',
  Portuguese_Portugal = 'pt-PT',
  Punjabi = 'pa',
  Querétaro_Otomi = 'otq',
  Romanian = 'ro',
  Russian = 'ru',
  Samoan = 'sm',
  Serbian_Cyrillic = 'sr-Cyrl',
  Serbian_Latin = 'sr-Latn',
  Slovak = 'sk',
  Slovenian = 'sl',
  Somali = 'so',
  Spanish = 'es',
  Swahili = 'sw',
  Swedish = 'sv',
  Tahitian = 'ty',
  Tamil = 'ta',
  Tatar = 'tt',
  Telugu = 'te',
  Thai = 'th',
  Tibetan = 'bo',
  Tigrinya = 'ti',
  Tongan = 'to',
  Turkish = 'tr',
  Turkmen = 'tk',
  Ukrainian = 'uk',
  Upper_Sorbian = 'hsb',
  Urdu = 'ur',
  Uyghur = 'ug',
  Uzbek_Latin = 'uz',
  Vietnamese = 'vi',
  Welsh = 'cy',
  Yucatec_Maya = 'yua',
  Zulu = 'zu',
}

export const languages = GoogleTranslateLanguages;
