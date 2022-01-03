const cli_name = 'jsontt';

const success_color = '\x1b[32m';
const error_color = '\x1b[31m';
const info_color = '\x1b[34m';
const warn_color = '\x1b[33m';

export function success(message: string) {
  console.log(success_color, `\n${message}\n`, '\x1b[0m');
}

export function error(message: string) {
  console.log(error_color, `\n${message}\n`, '\x1b[0m');
}

export function info(message: string) {
  console.log(info_color, `\n${message}\n`, '\x1b[0m');
}

export function warn(message: string) {
  console.log(warn_color, `\n${message}\n`, '\x1b[0m');
}

export const messages = {
  cli: {
    from_message: 'From which language?',
    to_message:
      'To which language | languages? (Can select more than one with space bar button)',
    no_selected_language:
      'You didn`t select any language. Please try it again and select languages with space bar button.',
    creation_done_multiple:
      'All files are created! You can find them in the same folder as the original JSON file.',
    creation_done_single:
      'File is created! You can find it in the same folder as the original JSON file.',
  },
  object: {},
  file: {
    no_path: `Path is not provided. Please use like this: \n\n\t${cli_name} "C:/json/file/path"`,
    no_file_in_path: `Could not find the file in the path.`,
    cannot_translate: `Could not translate the file.`,
    cannot_save_file: `Could not save the file.`,
  },
  general: {},
};
