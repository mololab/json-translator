import * as fs from 'fs/promises';
import * as YAML from 'yaml';
import { matchYamlExt } from '../utils/yaml';
import { error, messages } from '../utils/console';

export async function checkFile(objectPath: string):Promise<boolean> {
  try {
    await fs.access(objectPath);
    return Promise.resolve(true)
  } catch {
    return Promise.resolve(false)
  }
}
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
        : data;
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
  var json = matchYamlExt(path) ? YAML.stringify(data) : JSON.stringify(data);

  await fs
    .writeFile(path, json, 'utf8')
    .then(_ => {})
    .catch(_ => {
      error(messages.file.cannot_save_file);
    });
}
