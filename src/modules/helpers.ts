import { default_value, translation_value_limit } from '../utils/micro';
import { LanguageMapping } from './languages';
import { TranslationModule, TranslationModules } from './modules';

// Define the enum for non-safe types
enum nonSafeTypes {
  long,
  undefined,
  null,
  empty,
}

// Define the interface for ValueSafety
interface ValueSafety {
  is_safe: boolean;
  type: nonSafeTypes | undefined;
}

/**
 * Checks if a value is safe according to the defined criteria.
 * @param value The string value to check.
 * @returns An object indicating whether the value is safe and its type if not safe.
 */
function valueIsSafe(value: string): ValueSafety {
  if (value === undefined) return { is_safe: false, type: nonSafeTypes.undefined };
  if (value === null) return { is_safe: false, type: nonSafeTypes.null };
  if (value.length >= translation_value_limit) return { is_safe: false, type: nonSafeTypes.long };
  if (value === '') return { is_safe: false, type: nonSafeTypes.empty };

  return { is_safe: true, type: undefined };
}

/**
 * Transitions a value to a safe value if it does not meet the safety criteria.
 * @param value The string value to transition.
 * @returns The safe value.
 */
export function safeValueTransition(value: string): string {
  const valueSafety: ValueSafety = valueIsSafe(value);

  if (valueSafety.is_safe) {
    return value;
  }

  switch (valueSafety.type) {
    case nonSafeTypes.null:
    case nonSafeTypes.undefined:
    case nonSafeTypes.empty:
      return default_value;
    case nonSafeTypes.long:
      return value.substring(0, translation_value_limit);
    default:
      throw new Error(`Unknown non-safe type: ${valueSafety.type}`);
  }
}

/**
 * Returns an array of keys from the TranslationModules object.
 * @returns An array of keys.
 */
export function translationModuleKeys(): string[] {
  return Object.keys(TranslationModules);
}

/**
 * Retrieves a TranslationModule by its key.
 * @param key The key of the TranslationModule.
 * @returns The TranslationModule if found, otherwise undefined.
 */
export function getTranslationModuleByKey(key: string): TranslationModule | undefined {
  return TranslationModules[key];
}

/**
 * Finds the language key from a given value in the languages object.
 * @param value The value to find.
 * @param languages The object containing language mappings.
 * @returns The language key if found, otherwise undefined.
 */
export function getLanguageKeyFromValue(
  value: string,
  languages: Record<string, string>
): string | undefined {
  return Object.keys(languages).find(key => languages[key] === value);
}

/**
 * Returns an array of language values from the languages object.
 * @param languages The object containing language mappings.
 * @returns An array of language values.
 */
export function getLanguageValues(languages: Record<string, string>): string[] {
  return Object.values(languages);
}

/**
 * Finds the language variant for a given source and destination.
 * @param source The source language.
 * @param sourceValue The value in the source language.
 * @param destination The destination language.
 * @returns The translated value if found, otherwise undefined.
 */
export function getLanguageVariant(
  source: string,
  sourceValue: string,
  destination: string
): string | undefined {
  for (const key of Object.keys(LanguageMapping)) {
    if (
      LanguageMapping[key].includes(source) &&
      getTranslationModuleByKey(source)?.languages[key] === sourceValue &&
      LanguageMapping[key].includes(destination)
    ) {
      return getTranslationModuleByKey(destination)?.languages[key];
    }
  }

  return undefined;
}
