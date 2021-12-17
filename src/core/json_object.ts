import { languages, translatedObject } from '..';
import { plaintranslate } from './core';

export async function objectTranslator(
  object: translatedObject,
  from: languages,
  to: languages
): Promise<translatedObject> {
  if (object && from && to) {
    await deepDiver(object, from, to);

    return object;
  } else {
    throw new Error(
      `Undefined values detected. Available ones: object: ${!!object}, from: ${!!from}, to: ${!!to}`
    );
  }
}

async function deepDiver(
  object: translatedObject,
  from: languages,
  to: languages
) {
  var has = Object.prototype.hasOwnProperty.bind(object);

  await Promise.all(
    Object.keys(object).map(async function(k) {
      if (has(k)) {
        switch (typeof object[k]) {
          case 'object':
            await deepDiver(object[k], from, to);
            break;
          case 'string':
            object[k] = await plaintranslate(object[k], from, to);
        }
      }
    })
  );
}
