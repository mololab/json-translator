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

export const messages = {
  cli: {
    welcome: `Welcome to the JSON translator. v${current_version}`,
    usage: `Usage: \n\n\t${cli_name} <path/file.json> \n\t${cli_name} <path/file.json> <path/proxy_list.txt> \n\t${cli_name} ${commands.help1} \n\t${cli_name} ${commands.help2}`,
    from_source: 'From which source?',
    from_message: 'From which language?',
    to_message:
      'To which language | languages? (Can select more than one with space bar)',
    no_selected_language:
      'You didn`t select any language. Please try it again and select languages with the space bar.',
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
