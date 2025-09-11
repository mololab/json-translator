import { translatedObject } from '..';
import { error, messages, success } from '../utils/console';
import { getFile, getRootFolder, saveFilePublic } from './core';
import { objectTranslator } from './json_object';
import { matchYamlExt } from '../utils/yaml';
import { TranslationConfig } from '../modules/modules';
import { getLanguageKeyFromValue } from '../modules/helpers';

export async function fileTranslator(
  TranslationConfig: TranslationConfig,
  tempObjectPath: string,
  from: string,
  to: string[],
  newFileName: string
) {
  // step: get file details -> data, path
  let { jsonObj, objectPath } = await getFileFromPath(tempObjectPath);
  if (jsonObj === undefined) {
    error(messages.file.no_file_in_path);
    return;
  }

  jsonObj = { data: JSON.parse(jsonObj) };

  // step: check if translation file already exists, if exists save content of it in oldTranslations
  let oldTranslations = JSON.parse("{}")
  let latestPath = objectPath.replace(/\\/g, '/');
  const fileExt = getFileExt(latestPath);
  let rootFolder = getRootFolder(latestPath);

  for (const lang of to) {
    // Filename of tranlated file
    let baseFileName = newFileName
      ? `${newFileName}.${lang}.${fileExt}`
      : `${lang}.${fileExt}`;
    
    // Construct full path using rootFolder
    let fileName = `${rootFolder}/${baseFileName}`;

    let response = await getFileFromPath(fileName);
    let oldTranslation = response?.jsonObj
    try{
      if (oldTranslation === undefined) {
        // Old Translation not found
        console.log(`📋 Cache miss: No existing translation found for ${lang} in ${fileName}`);
        oldTranslations[lang] = { data: {} };
      } else {
        oldTranslation = { data: JSON.parse(oldTranslation) };
        oldTranslations[lang] = oldTranslation;
        console.log(`📋 Cache hit: Found existing translation for ${lang} in ${fileName}`);
      }
    } catch{
      // If error in parsing json skip it
      console.log(`⚠️  Error parsing translation file for ${lang} in ${fileName}`);
      oldTranslations[lang] = { data: {} };
    }
    
  }

  // step: translate object
  let newJsonObj = await objectTranslator(TranslationConfig, jsonObj, from, to, oldTranslations);
  if (newJsonObj === undefined) {
    error(messages.file.cannot_translate);
    return;
  }

  // step: save translated data
  (newJsonObj as Array<translatedObject>).forEach(async (element, index) => {
    const currentJsonObj = element.data;

    let fileName = newFileName
      ? `/${newFileName}.${to[index]}.${fileExt}`
      : `/${to[index]}.${fileExt}`;

    await saveFilePublic(rootFolder + fileName, currentJsonObj);

    success(
      `For ${getLanguageKeyFromValue(
        to[index],
        TranslationConfig.TranslationModule.languages
      )} --> ${fileName} created.`
    );
  });
}

export async function getFileFromPath(
  objectPath: string
): Promise<{ jsonObj: any; objectPath: string }> {
  let jsonObj: any = await getFile(objectPath);

  if (jsonObj === undefined) {
    objectPath = __dirname + '\\' + objectPath;

    jsonObj = await getFile(objectPath);
  }

  return { jsonObj, objectPath };
}

function getFileExt(latestPath: string): string {
  // Check if source file has YAML extension and return the extension ("yml" or "yaml").
  const sourceFileMatchYamlExt = matchYamlExt(latestPath);

  // When source file has "yml" or "yaml" extension, use the same in output file path.
  // Otherwise, default "json" extension used.
  const fileExt = sourceFileMatchYamlExt || 'json';

  return fileExt;
}
