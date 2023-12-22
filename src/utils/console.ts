import { translationModuleKeys } from '../modules/helpers';
import { current_version, fallbacks } from './micro';
var figlet = require('figlet');

const cli_name = 'jsontt';

const default_color = '\x1b[0m';
const success_color = '\x1b[32m';
const error_color = '\x1b[31m';
const info_color = '\x1b[34m';
const warn_color = '\x1b[33m';

export function success(message: string) {
  console.log(success_color, `${message}`, default_color);
}

export function error(message: string) {
  console.log(error_color, `${message}`, default_color);
}

export function info(message: string) {
  console.log(info_color, `${message}`, default_color);
}

export function warn(message: string) {
  console.log(warn_color, `${message}`, default_color);
}

export const commands = {
  help1: '--help',
  help2: '-h',
};

export const supportedLanguagesUrl = `\nsupported Languages: ${info_color}https://github.com/mololab/json-translator/blob/master/docs/LANGUAGES.md${default_color}\n`;

export const messages = {
  cli: {
    // cli general messages
    welcome: `\n${warn_color}Sponsored by Moniesto - Bridge between Traders and Investors in Crypto \nhttps://moniesto.com  \n\n${default_color}Welcome to the\n${success_color +
      figlet.textSync(
        'jsontt'
      )}${default_color}\n\t\t\t\tcli ${current_version}\n`,
    description:
      'This CLI will provide you the ability to translate your JSON/YAML files or JSON objects into different languages for free.',
    usage: `<your/path/to/file.json>`,
    usage_with_proxy: `Usage with proxy list file (only supported for Google module): ${cli_name} <your/path/to/file.json> <your/path/to/proxy_list.txt>`,
    usage_by_ops: `Usage with options: ${cli_name} <your/path/to/file.json> --module <TranslationModules> --from <Language> --to <Languages...>`,
    paths:
      'required json file path <path/file.json> or json file with proxy list txt file path <your/path/to/file.json> <your/path/to/proxy_list.txt>',

    // cli usage messages
    module: 'specify translation module | e.g., -m google',
    from: 'from language | e.g., -f en',
    to: 'to translates | e.g., -t ar fr zh-CN',
    new_file_name: 'optional ↵ | output filename | e.g., -n myApp',
    fallback:
      'optional ↵ | fallback logic, try other translation modules on fail | yes, no | default: no | e.g., -f yes',
    concurrency_limit:
      'optional ↵ | set max concurrency limit (higher faster, but easy to get banned) | default: 3 | e.g., -cl 5',

    // cli prompt messages
    select_module_message: 'Select translation module:',
    from_message: 'From which language?',
    to_message:
      'To which language | languages? (Can select more than one with space bar)',
    new_file_name_message: 'optional ↵ | Output filename',
    fallback_message:
      'optional ↵ | fallback logic, try other translation modules when fail | yes, no | default: no',
    concurrency_limit_message:
      'optional ↵ | set max concurrency limit (higher faster, but easy to get banned) | default: 3',

    // fail messages
    module_not_available: `module is not available. (choices : ${translationModuleKeys})`,
    from_not_available: `translate language from is not available\n${supportedLanguagesUrl}`,
    to_not_available: `languages to translate into is not available\n${supportedLanguagesUrl}`,
    no_selected_language:
      'You didn`t select any language. Please try it again and select languages with the space bar.',
    fallback_not_available: `fallback input is not available. (choices : ${Object.keys(
      fallbacks
    )})`,
    proxy_file_notValid_or_not_empty_options: `
    - Please ensure that the value for the option "-m, --module <Translation>" is compatible
    - Please ensure that the value for the option "-f, --from <Language>" is compatible
    - nPlease ensure that the value for the option "-t, --to <Languages...>" is compatible
    - Please ensure that the value for the option "-n, --name <string>" is valid
    - Please ensure that the value for the option "-f, --fallback <string>" is valid
    - Please ensure that the value for the option "-cl, --concurrencylimit <number>" is valid
    - Please make sure to provide a valid path for the proxy list file at "<your/path/to/proxy_list.txt>".
    `,

    // success messages
    creation_done:
      'All files are created! You can find them in the same folder as the original file.',
  },
  object: {},
  file: {
    no_path: `The path is not provided.`,
    no_file_in_path: `Could not find the file in the path.`,
    cannot_translate: `Could not translate the file.`,
    cannot_save_file: `Could not save the file.`,
  },
};
