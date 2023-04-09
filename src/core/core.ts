import * as fs from 'fs/promises';
import { error, messages } from '../utils/console';
import { default_value, translation_value_limit } from '../utils/micro';

export async function getFile(objectPath: string) {
  let json_file: any = undefined;

  await fs
    .readFile(objectPath, 'utf8')
    .then(data => {
      json_file = data;
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
  var json = JSON.stringify(data);

  await fs
    .writeFile(path, json, 'utf8')
    .then(_ => {})
    .catch(_ => {
      error(messages.file.cannot_save_file);
    });
}

export function safeValueTransition(value: string) {
  const value_safety: ValueSafety = valueIsSafe(value);

  if (value_safety.is_safe === true) {
    return value;
  }

  switch (value_safety.type) {
    case nonSafeTypes.null:
    case nonSafeTypes.undefined:
    case nonSafeTypes.empty:
      value = default_value;
      break;
    case nonSafeTypes.long:
      value = value.substring(0, translation_value_limit);
      break;
  }

  return value;
}

function valueIsSafe(value: string): ValueSafety {
  let result: ValueSafety = {
    is_safe: true,
    type: undefined,
  };

  if (value === undefined) {
    result.is_safe = false;
    result['type'] = nonSafeTypes.undefined;

    return result;
  }

  if (value === null) {
    result.is_safe = false;
    result['type'] = nonSafeTypes.null;

    return result;
  }

  if (value.length >= translation_value_limit) {
    result.is_safe = false;
    result['type'] = nonSafeTypes.long;

    return result;
  }

  if (value === '') {
    result.is_safe = false;
    result['type'] = nonSafeTypes.empty;

    return result;
  }

  return result;
}

interface ValueSafety {
  is_safe: boolean;
  type: nonSafeTypes | undefined;
}

enum nonSafeTypes {
  'long',
  'undefined',
  'null',
  'empty',
}
