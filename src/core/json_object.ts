import { translatedObject } from '..';
import { getKey, plaintranslate} from './translator';
import { TaskQueue } from 'cwait';
import { Promise as bluebirdPromise } from 'bluebird';
import { TranslationConfig } from '../modules/modules';
import { default_concurrency_limit } from '../utils/micro';
import {checkFile, getFile, saveFilePublic} from "./core";
import {flatten} from "../utils/json";

var queue = new TaskQueue(bluebirdPromise, default_concurrency_limit);

export async function objectTranslator(
  TranslationConfig: TranslationConfig,
  object: translatedObject,
  from: string,
  to: string[],
  oldTranslations?: { [key: string]: any }
): Promise<translatedObject[]> {
  queue.concurrency = TranslationConfig.concurrencyLimit;

  if (object && from && to) {
    let generalObject: translatedObject[] | null[] = [];

    await Promise.all(
      Object.keys(to).map(async function(index) {
        const indexAsNum = Number(index);
        
        // Start with exact copy of source structure
        const resultObject = JSON.parse(JSON.stringify(object));
        
        // Translate the source object and fill only the keys that exist in source
        const translatedResult = await deepDiver(
          TranslationConfig,
          resultObject,
          from,
          to[indexAsNum],
          oldTranslations ? oldTranslations[to[indexAsNum]] : undefined
        );

        generalObject[indexAsNum] = translatedResult;
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
  to: string,
  oldTranslation?: any
): Promise<translatedObject | null> {
  var has = Object.prototype.hasOwnProperty.bind(object);

  if (object === null) {
    return null;
  }

  const CACHE_FILE_NAME = `./cache_${from}_${to}.json`;
  let originalObject: any = JSON.parse(JSON.stringify(object));
  var cacheObject: Record<string, any> = {};
  
  // Load existing cache
  if (TranslationConfig.cacheEnabled) {
    if (!await checkFile(CACHE_FILE_NAME)) {
      await saveFilePublic(CACHE_FILE_NAME, {});
    }
    const cacheDataFile = await getFile(CACHE_FILE_NAME);
    cacheObject = JSON.parse(cacheDataFile);
  }

  // Process each key in the source object
  await Promise.all(
    Object.keys(object).map(async function(k) {
      if (has(k)) {
        switch (typeof object[k]) {
          case 'object':
            // Recursively process nested objects
            await deepDiver(
              TranslationConfig, 
              object[k], 
              from, 
              to, 
              oldTranslation && oldTranslation.data ? oldTranslation.data[k] : undefined
            );
            break;
          case 'string':
            // Check if we have this translation in old file first
            if (oldTranslation && oldTranslation.data && oldTranslation.data[k] && 
                oldTranslation.data[k] !== '' && oldTranslation.data[k] !== '--') {
              // Use existing translation
              object[k] = oldTranslation.data[k];
              global.skipInCache = global.skipInCache + 1;
            } else {
              // Need to translate this string
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
                    console.log('Translation error:', err);
                  });
              });
            }
            break;
        }
      }
    })
  );

  // Update cache with ONLY current translations (refresh cache to latest content)
  if (TranslationConfig.cacheEnabled) {
    // Clear old cache and rebuild with only current file's translations
    const newCacheObject: Record<string, any> = {};
    
    let originalStructure: Record<string, string> = flatten(originalObject);
    let translatedStructure: Record<string, string> = flatten(object);

    // Only add current file's translations to cache
    Object.keys(originalStructure).forEach(key => {
      let value = originalStructure[key];
      let cacheKey = getKey(value, from, to);
      newCacheObject[cacheKey] = translatedStructure[key];
    });

    // Save refreshed cache with only current content
    await saveFilePublic(CACHE_FILE_NAME, newCacheObject);
  }

  return object;
}
