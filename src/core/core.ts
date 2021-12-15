import translate from '@vitalets/google-translate-api';
import { languages } from '..';

export async function plaintranslate(
  word: string,
  from: languages,
  to: languages
): Promise<string> {
  const { text } = await translate(word, { from: from, to: to });

  return text;
}
