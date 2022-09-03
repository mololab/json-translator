import { LanguageCode, LanguageCodes, translatedObject } from '..';
import { plaintranslate } from './core';
import { TaskQueue } from 'cwait';
import { Promise } from 'bluebird';
const MAX_SIMULTANEOUS_REQUEST = 3;

var queue = new TaskQueue(Promise, MAX_SIMULTANEOUS_REQUEST);

export async function objectTranslator(
  object: translatedObject,
  from: LanguageCode,
  to: LanguageCode | LanguageCodes
): Promise<translatedObject | translatedObject[]> {
  if (object && from && to) {
    if (typeof to == 'object') {
      let general_object: translatedObject[] = [];

      await Promise.all(
        Object.keys(to as LanguageCodes).map(async function(index) {
          const index_as_num = Number(index);
          const copy_object = JSON.parse(JSON.stringify(object));

          general_object[index_as_num] = await deepDiver(
            copy_object,
            from,
            to[index_as_num]
          );
        })
      );

      return general_object as translatedObject[];
    } else {
      await deepDiver(object, from, to);

      return object as translatedObject;
    }
  } else {
    throw new Error(
      `Undefined values detected. Available ones: object: ${!!object}, from: ${!!from}, to: ${!!to}`
    );
  }
}

export async function deepDiver(
  object: translatedObject,
  from: LanguageCode,
  to: LanguageCode
): Promise<translatedObject> {
  var has = Object.prototype.hasOwnProperty.bind(object);

  await Promise.all(
    Object.keys(object).map(async function(k) {
      if (has(k)) {
        switch (typeof object[k]) {
          case 'object':
            await deepDiver(object[k], from, to);
            break;
          case 'string':
            global.totalTranslation = global.totalTranslation + 1;

            return queue.add(async () => {
              return await plaintranslate(object[k], from, to)
                .then(data => {
                  object[k] = data;
                })
                .catch(err => {
                  // TODO: return error
                  console.log('Translation error:', err);
                });
            });
        }
      }
    })
  );

  return object;
}
