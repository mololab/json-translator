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

  // step: translate object
  let newJsonObj = await objectTranslator(TranslationConfig, jsonObj, from, to);
  if (newJsonObj === undefined) {
    error(messages.file.cannot_translate);
    return;
  }

  // step: save translated data
  let latestPath = objectPath.replace(/\\/g, '/');
  const fileExt = getFileExt(latestPath);

  let rootFolder = getRootFolder(latestPath);

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
