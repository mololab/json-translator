import { getLanguages, LanguageCodes, Sources } from '..';
import { fileTranslator, getFileFromPath } from '../core/json_file';
import {
  commands,
  error,
  info,
  language_choices,
  messages,
  success,
  warn,
} from '../utils/console';
import loading from 'loading-cli';
import { getCodeFromLanguage, translationStatistic } from '../utils/micro';
import { readProxyFile } from '../core/proxy_file';
var inquirer = require('inquirer');

export async function initializeCli() {
  global.totalTranslation = 0;
  global.totalTranslated = 0;
  global.proxyIndex = 0;
  global.proxyList = [];

  const myArgs = process.argv.slice(2);
  if (
    myArgs.length === 0 ||
    myArgs[0] === commands.help1 ||
    myArgs[0] === commands.help2
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

  if (myArgs[1] && typeof myArgs[1] === 'string') {
    const file_path = myArgs[1];
    await readProxyFile(file_path);
  }

  // no path condition
  let objectPath = myArgs[0];
  if (objectPath === undefined || objectPath === '') {
    error(messages.file.no_path + ' ' + messages.cli.usage);
    return;
  }

  // no file in the path condition
  let { json_obj } = await getFileFromPath(objectPath);
  if (json_obj === undefined) {
    error(messages.file.no_file_in_path);
    return;
  }

  let from!: string;
  let to!: string[];

  const source_choices = Object.entries(Sources).map(([key, _]) => {
    return {
      name: language_choices[key],
      value: key,
      short: key,
    };
  });

  await inquirer
    .prompt([
      {
        type: 'list',
        name: 'source',
        message: messages.cli.from_source,
        pageSize: 20,
        choices: [...source_choices, new inquirer.Separator()],
      },
    ])
    .then((answers: any) => {
      global.source = answers.source;
    });

  const { from_choices, to_choices } = getLanguageChoices();

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

  if (to.length === 0 || to === undefined) {
    warn(messages.cli.no_selected_language);
    return;
  }

  const to_languages = to.map(language => (getLanguages() as any)[language]);

  const load = loading({
    text: `Translating. Please wait. ${translationStatistic(
      global.totalTranslated,
      global.totalTranslation
    )}`,
    color: 'yellow',
    interval: 100,
    stream: process.stdout,
    frames: ['.', 'o', 'O', '°', 'O', 'o', '.'],
  }).start();

  const refreshInterval = setInterval(() => {
    load.text = `Translating. Please wait. ${translationStatistic(
      global.totalTranslated,
      global.totalTranslation
    )}`;
  }, 200);

  await fileTranslator(objectPath, getCodeFromLanguage(from), to_languages);

  load.succeed(
    `DONE! ${translationStatistic(
      global.totalTranslation,
      global.totalTranslation
    )}`
  );
  clearInterval(refreshInterval);

  info(messages.cli.creation_done);
}

function getLanguageChoices(): {
  from_choices: LanguageCodes;
  to_choices: LanguageCodes;
} {
  let from_choices = getFromChoices();
  let to_choices = from_choices.filter(language => language !== `Automatic`);

  return { from_choices, to_choices };
}

function getFromChoices(): LanguageCodes {
  let languages = Object.entries(getLanguages() as any).map(([key, _]) => key);

  return languages;
}
