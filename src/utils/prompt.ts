import { LanguageCodes, Sources, getLanguages } from "..";
import { language_choices, messages } from "./console";

var inquirer = require('inquirer');
export async function promptTranslator() {
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

}

const { from_choices, to_choices } = getLanguageChoices();
export async function promptFrom() {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'from',
      message: messages.cli.from_message,
      pageSize: 20,
      choices: [...from_choices, new inquirer.Separator()],
    },
  ]);

  return answers;
}

export async function promptTo(default_languages?: any) {
  const answers = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'to',
      pageSize: 20,
      message: messages.cli.to_message,
      choices: to_choices,
      default: default_languages ? default_languages : []
    },
  ]);

  return answers;
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