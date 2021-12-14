import translate from '@vitalets/google-translate-api';

export async function translateWord(
  word: string,
  from: languages,
  to: languages
) {
  return await plaintranslate(word, from, to);
}

export async function translateObject(
  object: translatedObject,
  from: languages,
  to: languages
): Promise<translatedObject> {
  let new_object: translatedObject = {};

  if (object && from && to) {
    await Promise.all(
      Object.keys(object).map(async function(key) {
        if (object[key] && typeof object[key] == 'string') {
          new_object[key] = await plaintranslate(object[key], from, to);
        } else {
          new_object[key] = object[key];
        }
      })
    );

    return new_object;
  } else {
    throw new Error(
      `Undefined values detected. Available ones: object: ${!!object}, from: ${!!from}, to: ${!!to}`
    );
  }
}

async function plaintranslate(
  word: string,
  from: languages,
  to: languages
): Promise<string> {
  const { text } = await translate(word, { from: from, to: to });

  return text;
}

// TYPES
export interface translatedObject {
  [key: string]: any;
}

export enum languages {
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
