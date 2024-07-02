import * as fs from 'fs/promises';
import * as YAML from 'yaml';
import { matchYamlExt } from '../utils/yaml';
import { isPropertiesExt } from '../utils/properties';
import { error, messages } from '../utils/console';
import * as properties from 'properties';

export async function getFile(objectPath: string) {
  let json_file: any = undefined;

  await fs
    .readFile(objectPath, 'utf8')
    .then(data => {
      // This function should return a string with JSON-encoded data.
      // To preserve the contract, YAML files should be parsed to object
      // and then stringified to JSON string.
      json_file = matchYamlExt(objectPath)
        ? JSON.stringify(YAML.parse(data))
          : (isPropertiesExt(objectPath) ? JSON.stringify(properties.parse(data,null,null)) : data);
    })
    .catch(_ => {
      json_file = undefined;
    });

  return json_file;
}

export function getRootFolder(path: string) {
  let arr = path.split('/');
  arr.pop();

  let root = arr.join('/');

  if (root === undefined || root === '') {
    root = './';
  }

  return root;
}

export async function saveFilePublic(path: string, data: any) {
  // When path extension is for YAML file, then stringify with YAML encoder.
  // Otherwise, default JSON encoder is used.
    var json = matchYamlExt(path) ? YAML.stringify(data) : (isPropertiesExt(path) ? properties.stringify(data,null,null) : JSON.stringify(data));

  await fs
    .writeFile(path, json, 'utf8')
    .then(_ => {})
    .catch(_ => {
      error(messages.file.cannot_save_file);
    });
}
