import { languages, translatedObject } from '..';
import { plaintranslate } from './core';

export async function objectTranslator(
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
