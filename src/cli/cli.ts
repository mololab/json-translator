import { languages } from '..';
import { fileTranslator, getFileFromPath } from '../core/json_file';
import { error, messages, warn } from '../utils/console';

var inquirer = require('inquirer');

export async function initializeCli() {
  const myArgs = process.argv.slice(2);

  // no path condition
  let objectPath = myArgs[0];
  if (objectPath == undefined) {
    error(messages.file.no_path);
    return;
  }

  // no file in the path condition
  let { json_obj } = await getFileFromPath(objectPath);
  if (json_obj == undefined) {
    error(messages.file.no_file_in_path);
    return;
  }

  let from!: languages;
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

  await fileTranslator(objectPath, from, to_languages);
}
