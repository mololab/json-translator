import { languages, translatedObject } from '..';
import { getFile, getRootFolder, saveFilePublic } from './core';
import { objectTranslator } from './json_object';

export async function fileTranslator(
  objectPath: string,
  from: languages,
  to: languages | languages[]
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

  let new_json_obj = await objectTranslator(json_obj, from, to);

  if (new_json_obj == undefined) {
    throw new Error('Error. Could not translate the file.');
  }

  let latest_path = objectPath.replace(/\\/g, '/');
  let root_folder = getRootFolder(latest_path);

  if (Array.isArray(new_json_obj) == true && Array.isArray(to) == true) {
    // multiple file saving
    (new_json_obj as Array<translatedObject>).forEach(
      async (element, index) => {
        const current_json_obj = element.data;

        let file_name = `/${to[index]}.json`;
        await saveFilePublic(root_folder + file_name, current_json_obj);

        console.log(`DONE -> ${to[index]}.json`);
      }
    );
  } else {
    new_json_obj = (new_json_obj as translatedObject).data;

    let file_name = `/${to}.json`;

    await saveFilePublic(root_folder + file_name, new_json_obj);

    console.log(`DONE -> ${to}.json`);
  }
}
