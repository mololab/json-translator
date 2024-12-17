import { translatedObject } from '..';
import { getKey, plaintranslate} from './translator';
import { TaskQueue } from 'cwait';
import { Promise as bluebirdPromise } from 'bluebird';
import { TranslationConfig } from '../modules/modules';
import { default_concurrency_limit } from '../utils/micro';
import { mergeKeys, removeKeys } from '../utils/console';
import {checkFile, getFile, saveFilePublic} from "./core";
import {flatten} from "../utils/json";

var queue = new TaskQueue(bluebirdPromise, default_concurrency_limit);

export async function objectTranslator(
  TranslationConfig: TranslationConfig,
  object: translatedObject,
  from: string,
  to: string[],
  oldTranslations: { [key: string]: any }
): Promise<translatedObject[]> {
  queue.concurrency = TranslationConfig.concurrencyLimit;

  if (object && from && to) {
    let generalObject: translatedObject[] | null[] = [];

    await Promise.all(
      Object.keys(to).map(async function (index) {
        const indexAsNum = Number(index);
        // Remove the keys which are already translated
        const copyObject = removeKeys(JSON.parse(JSON.stringify(object)), oldTranslations[to[indexAsNum]]);

        const newTranslations = await deepDiver(
          TranslationConfig,
          copyObject,
          from,
          to[indexAsNum]
        );

        // Insert old translations that we removed into the generalObject
        generalObject[indexAsNum] = mergeKeys(oldTranslations[to[indexAsNum]], newTranslations)

      })
    );

    return generalObject as translatedObject[];
  } else {
    throw new Error(
      `Undefined values detected. Available ones: object: ${!!object}, from: ${!!from}, to: ${!!to}`
    );
  }
}

export async function deepDiver(
  TranslationConfig: TranslationConfig,
  object: translatedObject,
  from: string,
  to: string
): Promise<translatedObject | null> {
  var has = Object.prototype.hasOwnProperty.bind(object);

  if (object === null) {
    return null;
  }

  const CACHE_FILE_NAME = `./cache_${from}_${to}.json`
  let originalObject:any = JSON.parse(JSON.stringify(object));
  var cacheObject: Record<string, any> = {};
  if (TranslationConfig.cacheEnabled) {
    if (!await checkFile(CACHE_FILE_NAME)) {
      await saveFilePublic(CACHE_FILE_NAME, {});
    }
    const cacheDataFile = await getFile(CACHE_FILE_NAME);
    cacheObject = JSON.parse(cacheDataFile);
  }

  await Promise.all(
    Object.keys(object).map(async function (k) {
      if (has(k)) {
        switch (typeof object[k]) {
          case 'object':
            await deepDiver(TranslationConfig, object[k], from, to);
            break;
          case 'string':
            global.totalTranslation = global.totalTranslation + 1;

            return queue.add(async () => {
              return await plaintranslate(
                TranslationConfig,
                object[k],
                from,
                to,
                [],
                cacheObject
              )
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

  if (TranslationConfig.cacheEnabled) {
    let originalStructure:Record<string, string> = flatten(originalObject)
    let translatedStructure:Record<string, string> = flatten(object)

    Object.keys(originalStructure).forEach(key => {
      let value = originalStructure[key]
      let cacheKey = getKey(value, from, to)
      cacheObject[cacheKey] = translatedStructure[key]
    })

    await saveFilePublic(CACHE_FILE_NAME, cacheObject);
  }

  return object;
}
