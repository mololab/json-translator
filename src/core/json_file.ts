import { LanguageCode, LanguageCodes, translatedObject } from '..';
import { error, messages, success } from '../utils/console';
import { getLanguageFromCode } from '../utils/micro';
import { getFile, getRootFolder, saveFilePublic } from './core';
import { objectTranslator } from './json_object';

export async function fileTranslator(
  objectPath: string,
  from: LanguageCode,
  to: LanguageCode | LanguageCodes
) {
  let file_from_path = await getFileFromPath(objectPath);

  let { json_obj } = file_from_path;
  objectPath = file_from_path.objectPath;

  if (json_obj === undefined) {
    error(messages.file.no_file_in_path);
    return;
  }

  json_obj = { data: JSON.parse(json_obj) };

  let new_json_obj = await objectTranslator(json_obj, from, to);

  if (new_json_obj === undefined) {
    error(messages.file.cannot_translate);
    return;
  }

  let latest_path = objectPath.replace(/\\/g, '/');
  let root_folder = getRootFolder(latest_path);

  if (Array.isArray(new_json_obj) === true && Array.isArray(to) === true) {
    // multiple file saving
    (new_json_obj as Array<translatedObject>).forEach(
      async (element, index) => {
        const current_json_obj = element.data;

        let file_name = `/${to[index]}.json`;

        await saveFilePublic(root_folder + file_name, current_json_obj);

        success(
          `For ${getLanguageFromCode(to[index])} --> ${to[index]}.json created.`
        );
      }
    );
  } else {
    new_json_obj = (new_json_obj as translatedObject).data;

    let file_name = `/${to}.json`;

    await saveFilePublic(root_folder + file_name, new_json_obj);

    success(`For ${getLanguageFromCode(to as string)} --> ${to}.json created.`);
  }
}

export async function getFileFromPath(
  objectPath: string
): Promise<{ json_obj: any; objectPath: string }> {
  let json_obj: any = await getFile(objectPath);

  if (json_obj === undefined) {
    objectPath = __dirname + '\\' + objectPath;

    json_obj = await getFile(objectPath);
  }

  return { json_obj, objectPath };
}
