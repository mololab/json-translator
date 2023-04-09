import { getLanguages } from '..';
import * as packageJSON from '../../package.json';

export function getLanguageFromCode(language_code: string) {
  return getEnumKeyByEnumValue(getLanguages(), language_code);
}

export function getCodeFromLanguage(language: string) {
  let languages = getLanguages();
  return (languages as any)[language as keyof typeof languages];
}

function getEnumKeyByEnumValue(
  myEnum: any,
  enumValue: number | string
): string {
  let keys = Object.keys(myEnum).filter(x => myEnum[x] === enumValue);
  return keys.length > 0 ? keys[0] : '';
}

export function translationStatistic(
  totalTranslated: number,
  totalTranslation: number
): string {
  return `${totalTranslated} of ${totalTranslation} translated.`;
}

export const current_version = packageJSON.version;
export const default_value = '--';
export const translation_value_limit = 5000;
