import { current_version } from './micro';
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

export function infoChoices(messages: string, choices: string) {
  console.log(messages, info_color, `${choices}`, '\x1b[0m');
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
  BingTranslate: 'Bing Microsoft Translate (110 languages) \x1b[33m**NEW**\x1b[0m',
  LibreTranslate: `Libre Translate (29 languages)`,
  ArgosTranslate: `Argos Translate (17 languages)`,
};

export const messages = {
  cli: {
    welcome: `Welcome to the`,
    version: `                                                      version: ${current_version}`,
    description: 'This package will provide you the ability to translate your JSON files or objects into different languages for free.',
    usage: ` <your/path/to/file.json>`,
    usageWithProxy: `Usage with proxy list file: ${cli_name} <your/path/to/file.json> <your/path/to/proxy_list.txt>`,
    usageByOps: `Usage with options: ${cli_name} <your/path/to/file.json>  --translator <TranslationService> --from <Language> --to <Language1,Language2>`,
    paths: 'required json file path <path/file.json> or json file with proxy list txt file path <your/path/to/file.json> <your/path/to/proxy_list.txt>',
    translator: ' specify translation service, example --translator Google',
    from: 'specify current language, example --from English',
    to: 'specify target languages, example --to Arabic,Chinese_Simplified,French',
    from_source: 'From which source?',
    from_message: 'From which language?',
    to_message: 'To which language | languages? (Can select more than one with space bar)',
    translator_not_available: " Translator not available. Choose from :",
    from_not_available: ' Language not available. Choose from the bottom list',
    proxy_File_notValid_or_not_empty_options: `Error Message:
    - Please ensure that the value for the option "-T, --translator <TranslationService>" is not empty.
    - Please ensure that the value for the option "-f, --from <Language>" is not empty.
    - Please ensure that the value for the option "-t, --to <Languages>" is not empty.
    - Please make sure to provide a valid path for the proxy list file at "<your/path/to/proxy_list.txt>".
    `,
    no_selected_language: 'You didn`t select any language. Please try it again and select languages with the space bar.',
    creation_done: 'All files are created! You can find them in the same folder as the original JSON file.',
  },
  object: {},
  file: {
    no_path: `The path is not provided.`,
    no_file_in_path: `Could not find the file in the path.`,
    cannot_translate: `Could not translate the file.`,
    cannot_save_file: `Could not save the file.`,
  },
};
