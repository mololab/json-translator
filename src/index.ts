import translate from '@vitalets/google-translate-api';
import { languages } from './languages';

export function translateME(word: string, from: string, to: string) {
  translate(word, { from: from, to: to }).then(res => {
    console.log(res.text);
  });
}

export function translateObject(
  object: object,
  from: languages,
  to: languages
) {
  console.log(`translate this object: `, object);
  console.log(`from: `, from);
  console.log(`to: `, to);
}
