import { languages } from '..';
import { fileTranslator, getFileFromPath } from '../core/json_file';
import {
  commands,
  error,
  info,
  messages,
  success,
  warn,
} from '../utils/console';
import loading from 'loading-cli';
import { getCodeFromLanguage } from '../utils/micro';
var inquirer = require('inquirer');

export async function initializeCli() {
  const myArgs = process.argv.slice(2);

  if (
    myArgs.length == 0 ||
    myArgs[0] == commands.help1 ||
    myArgs[0] == commands.help2
  ) {
    help();
    return;
  }

  translate();
}

export async function help() {
  success(messages.cli.welcome);
  info(messages.cli.usage);
}

async function translate() {
  const myArgs = process.argv.slice(2);

  // no path condition
  let objectPath = myArgs[0];
  if (objectPath == undefined || objectPath == '') {
    error(messages.file.no_path + ' ' + messages.cli.usage);
    return;
  }

  // no file in the path condition
  let { json_obj } = await getFileFromPath(objectPath);
  if (json_obj == undefined) {
    error(messages.file.no_file_in_path);
    return;
  }

  let from!: string;
  let to!: string[];

  const from_choices = Object.entries(languages).map(([key, _]) => key);
  const to_choices = from_choices.filter(language => language != `Automatic`);

  await inquirer
    .prompt([
      {
        type: 'list',
        name: 'from',
        message: messages.cli.from_message,
        pageSize: 20,
        choices: [...from_choices, new inquirer.Separator()],
      },
      {
        type: 'checkbox',
        name: 'to',
        pageSize: 20,
        message: messages.cli.to_message,
        choices: to_choices,
      },
    ])
    .then((answers: any) => {
      from = answers.from;
      to = answers.to;
    });

  if (to.length == 0 || to == undefined) {
    warn(messages.cli.no_selected_language);
    return;
  }

  const to_languages = to.map(language => (languages as any)[language]);

  const load = loading({
    text: 'Translating. Please wait.',
    color: 'yellow',
    interval: 100,
    stream: process.stdout,
    frames: ['.', 'o', 'O', '°', 'O', 'o', '.'],
  }).start();

  await fileTranslator(objectPath, getCodeFromLanguage(from), to_languages);

  load.succeed('DONE');

  info(messages.cli.creation_done);
}
