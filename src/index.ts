import translate from '@vitalets/google-translate-api';
import { languages } from './languages';
import { translatedObject } from './types';

export async function translateWord(word: string, from: string, to: string) {
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
        if (object[key]) {
          new_object[key] = await plaintranslate(object[key], from, to);
        } else {
          new_object[key] = object[key];
        }
      })
    );

    return new_object;
  } else {
    throw new Error(
      `Undefined values detected: object: ${!!object}, from: ${!!from}, to: ${!!to}`
    );
  }
}

async function plaintranslate(
  word: string,
  from: string,
  to: string
): Promise<string> {
  const { text } = await translate(word, { from: from, to: to });

  return text;
}
