import { translatorsNames } from '..';
import { current_version } from './micro';
var figlet = require('figlet');

const cli_name = 'jsontt';

const success_color = '\x1b[32m';
const error_color = '\x1b[31m';
const info_color = '\x1b[34m';
const warn_color = '\x1b[33m';

export function success(message: string) {
  console.log(success_color, `${message}`, '\x1b[0m');
}

export function error(message: string) {
  console.log(error_color, `${message}`, '\x1b[0m');
}

export function info(message: string) {
  console.log(info_color, `${message}`, '\x1b[0m');
}

export function warn(message: string) {
  console.log(warn_color, `${message}`, '\x1b[0m');
}

export const commands = {
  help1: '--help',
  help2: '-h',
};

export const language_choices: { [key: string]: string } = {
  GoogleTranslate: `Google Translate (104 languages)`,
  BingTranslate:
    'Bing Microsoft Translate (110 languages) \x1b[33m**NEW**\x1b[0m',
  LibreTranslate: `Libre Translate (29 languages)`,
  ArgosTranslate: `Argos Translate (17 languages)`,
};
export const supportedLanguagesUrl = `\nsupported Languages: ${info_color}https://github.com/mololab/json-translator/blob/master/docs/LANGUAGES.md\x1b[0m\n`;
export const messages = {
  cli: {
    welcome: `\nWelcome to the\n${success_color +
      figlet.textSync('jsontt')}\x1b[0m\n\t\t\t\tcli ${current_version}\n`,
    description:
      'This package will provide you the ability to translate your JSON files or objects into different languages for free.',
    usage: ` <your/path/to/file.json>`,
    usageWithProxy: `Usage with proxy list file: ${cli_name} <your/path/to/file.json> <your/path/to/proxy_list.txt>`,
    usageByOps: `Usage with options: ${cli_name} <your/path/to/file.json> --translator <TranslationService> --from <Language> --to <Languages...>`,
    paths:
      'required json file path <path/file.json> or json file with proxy list txt file path <your/path/to/file.json> <your/path/to/proxy_list.txt>',
    translator: 'specify translation service',
    from: 'the translate language from it, e.g., --from en',
    to: 'the Languages to translate into, e.g., --to ar fr zh-CN',
    from_source: 'From which source?',
    from_message: 'From which language?',
    to_message:
      'To which language | languages? (Can select more than one with space bar)',
    translator_not_available: `the Translator not available. (choices : ${translatorsNames})`,
    from_not_available: `the translate language from it, is not available\n${supportedLanguagesUrl}`,
    to_not_available: `the Languages to translate into is not available\n${supportedLanguagesUrl}`,
    no_selected_language:
      'You didn`t select any language. Please try it again and select languages with the space bar.',
    proxy_File_notValid_or_not_empty_options: `
    - Please ensure that the value for the option "-T, --translator <Translation>" is compatible
    - Please ensure that the value for the option "-f, --from <Language>" is compatible
    - Please ensure that the value for the option "-t, --to <Languages...>" is compatible
    - Please make sure to provide a valid path for the proxy list file at "<your/path/to/proxy_list.txt>".
    `,
    creation_done:
      'All files are created! You can find them in the same folder as the original JSON file.',
  },
  object: {},
  file: {
    no_path: `The path is not provided.`,
    no_file_in_path: `Could not find the file in the path.`,
    cannot_translate: `Could not translate the file.`,
    cannot_save_file: `Could not save the file.`,
  },
};
