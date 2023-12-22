import { default_value, translation_value_limit } from '../utils/micro';
import { LanguageMapping } from './languages';
import { TranslationModule, TranslationModules } from './modules';

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

export function translationModuleKeys(): string[] {
  return Object.keys(TranslationModules);
}

export function getTranslationModuleByKey(key: string): TranslationModule {
  return TranslationModules[key];
}

export function getLanguageKeyFromValue(
  value: string,
  languages: Record<string, string>
): string | undefined {
  return Object.keys(languages).find(key => languages[key] === value);
}

export function getLanguageValues(languages: Record<string, string>): string[] {
  return Object.values(languages);
}

export function getLanguageVariant(
  source: string,
  sourceValue: string,
  destination: string
): string | undefined {
  let destinationValue: string | undefined = undefined;

  for (let key of Object.keys(LanguageMapping)) {
    if (
      LanguageMapping[key][source] !== undefined &&
      LanguageMapping[key][source] === sourceValue &&
      LanguageMapping[key][destination] !== undefined
    ) {
      destinationValue = LanguageMapping[key][destination];
      break;
    }
  }

  return destinationValue;
}
