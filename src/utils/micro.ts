import { languages } from '..';

export function getLanguageFromCode(language_code: string) {
  return getEnumKeyByEnumValue(languages, language_code);
}

function getEnumKeyByEnumValue(
  myEnum: any,
  enumValue: number | string
): string {
  let keys = Object.keys(myEnum).filter(x => myEnum[x] == enumValue);
  return keys.length > 0 ? keys[0] : '';
}
