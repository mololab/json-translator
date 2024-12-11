import * as packageJSON from '../../package.json';

export function translationStatistic(
  totalTranslated: number,
  totalTranslation: number,
  skipInCache: number,
): string {
  return `${totalTranslated} of ${totalTranslation} translated. In cache: ${skipInCache}`;
}
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
export const current_version = packageJSON.version;
export const default_value = '--';
export const translation_value_limit = 5000;
export const default_concurrency_limit = 3;
export const fallbacks = {
  yes: true,
  no: false,
};
export const cacheEnableds = {
  yes: true,
  no: false,
};
export const default_fallback = fallbacks.no;
