import translate from '@vitalets/google-translate-api';
import { languages } from '..';
import * as fs from 'fs/promises';

export async function plaintranslate(
  word: string,
  from: languages,
  to: languages
): Promise<string> {
  const { text } = await translate(word, { from: from, to: to });

  return text;
}

export async function getFile(objectPath: string) {
  let json_file: any = undefined;

  await fs
    .readFile(objectPath, 'utf8')
    .then(data => {
      json_file = data;
    })
    .catch(err => {
      console.log('Error on reading file', err);
      json_file = undefined;
    });

  return json_file;
}

export function getRootFolder(path: string) {
  let arr = path.split('/');
  arr.pop();
  return arr.join('/');
}

export async function saveFilePublic(path: string, data: any) {
  var json = JSON.stringify(data);

  await fs
    .writeFile(path, json, 'utf8')
    .then(_ => {})
    .catch(err => {
      console.log(`err: `, err);
    });
}
