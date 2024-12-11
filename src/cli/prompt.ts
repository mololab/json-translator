import {
  translationModuleKeys,
  getTranslationModuleByKey,
} from '../modules/helpers';
import { messages } from '../utils/console';
import { default_concurrency_limit } from '../utils/micro';
var inquirer = require('inquirer');

export async function promptModuleKey(): Promise<string> {
  const module_key_choices = translationModuleKeys().map(key => {
    return {
      name:
        getTranslationModuleByKey(key).altName +
        (getTranslationModuleByKey(key).requirements
          ? ' | requirements: ' +
            (getTranslationModuleByKey(key).requirements as string[]).join(
              ' | '
            )
          : ''),
      value: key,
      short: key,
    };
  });

  let selectedModuleKey = '';

  await inquirer
    .prompt([
      {
        type: 'list',
        name: 'moduleKey',
        message: messages.cli.select_module_message,
        pageSize: 20,
        choices: [...module_key_choices, new inquirer.Separator()],
      },
    ])
    .then((answers: any) => {
      selectedModuleKey = answers.moduleKey;
    });

  return selectedModuleKey;
}

export async function promptFrom(languages: Record<string, string>) {
  const fromLanguageKeys = Object.keys(languages);

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'from',
      message: messages.cli.from_message,
      pageSize: 20,
      choices: [...fromLanguageKeys, new inquirer.Separator()],
    },
  ]);

  return answers.from;
}

export async function promptTo(
  languages: Record<string, string>,
  default_languages?: string[]
) {
  let toLanguageKeys = Object.keys(languages);
  toLanguageKeys = toLanguageKeys.filter(key => key !== `Automatic`);

  const answers = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'to',
      pageSize: 20,
      message: messages.cli.to_message,
      choices: toLanguageKeys,
      default: default_languages ? default_languages : [],
    },
  ]);

  return answers.to;
}

export async function promptName() {
  const answers = await inquirer.prompt([
    {
      type: 'string',
      name: 'name',
      message: messages.cli.new_file_name_message,
      // default: default_name ? default_name : undefined,
    },
  ]);

  return answers.name;
}

export async function promptFallback() {
  const answers = await inquirer.prompt([
    {
      type: 'string',
      name: 'fallback',
      message: messages.cli.fallback_message,
      default: '',
    },
  ]);

  if (answers.fallback === '') {
    return 'no';
  }

  return answers.fallback;
}

export async function promptCacheEnabled() {
  const answers = await inquirer.prompt([
    {
      type: 'string',
      name: 'cache_enabled',
      message: messages.cli.cache_enabled,
      default: 'no',
    },
  ]);

  if (answers.fallback === '') {
    return 'no';
  }

  return answers.cache_enabled;
}

export async function promptConcurrencyLimit() {
  const answers = await inquirer.prompt([
    {
      type: 'number',
      name: 'concurrencylimit',
      message: messages.cli.concurrency_limit_message,
      default: '',
    },
  ]);

  if (answers.concurrencylimit === '') {
    return default_concurrency_limit;
  }

  return answers.concurrencylimit;
}
