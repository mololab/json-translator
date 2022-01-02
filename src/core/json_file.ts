import { languages, translatedObject } from '..';
import { getFile, getRootFolder, saveFilePublic } from './core';
import { objectTranslator } from './json_object';

export async function fileTranslator(
  objectPath: string,
  from: languages,
  to: languages
) {
  let json_obj: any = await getFile(objectPath);

  // try combined path
  if (json_obj == undefined) {
    objectPath = __dirname + '\\' + objectPath;

    json_obj = await getFile(objectPath);

    if (json_obj == undefined) {
      throw new Error(`ERROR. Could not found the file in the path.`);
    }
  }

  json_obj = { data: JSON.parse(json_obj) };

  let new_json_obj: translatedObject = await objectTranslator(
    json_obj,
    from,
    to
  );

  if (new_json_obj == undefined) {
    throw new Error('Error. Could not translate the file.');
  }

  new_json_obj = new_json_obj.data;

  let latest_path = objectPath.replace(/\\/g, '/');
  let root_folder = getRootFolder(latest_path);

  let file_name = `/${to}.json`;

  await saveFilePublic(root_folder + file_name, new_json_obj);

  console.log(`DONE!`);
}
