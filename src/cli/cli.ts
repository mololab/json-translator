import { getLanguages, LanguageCodes, Sources } from '..';
import { fileTranslator, getFileFromPath } from '../core/json_file';
import {
  error,
  info,
  infoChoices,
  language_choices,
  messages,
  success,
  warn,
} from '../utils/console';
import loading from 'loading-cli';
import { capitalize, current_version, getCodeFromLanguage, translationStatistic } from '../utils/micro';
import { readProxyFile } from '../core/proxy_file';
var inquirer = require('inquirer');
import { Command } from "commander";
var figlet = require("figlet");

const program = new Command();

export async function initializeCli() {
  global.totalTranslation = 0;
  global.totalTranslated = 0;
  global.proxyIndex = 0;
  global.proxyList = [];
  program
    .version(current_version)
    .usage(messages.cli.usage)
    .description(`${messages.cli.usageWithProxy}\n${messages.cli.usageByOps}\n\n\n${messages.cli.description}`)
    .option("-T, --translator <TranslationService>", messages.cli.translator, false)
    .option("-f, --from  <Language>", messages.cli.from, false)
    .option("-t, --to <Languages>", messages.cli.to, false)


  program.exitOverride();

  try {
    program.parse();
  } catch (err) {

    process.exit()
  }
  /*
      If the user adds an option without a value or forgets the value of the option, the value of the next option is applied to the proxy file path.
      It is actually a problem in commander.js
      I've come to this temporary solution, which is if the proxy path does not end with .txt display error 'messages.cli.proxy_File_notValid_or_not_empty_options'
  */
  if (program.args[1] !== undefined && !program.args[1].includes('.txt')) {
    error(messages.cli.proxy_File_notValid_or_not_empty_options)
    process.exit()
  }


  if (!process.argv.slice(2).length) {
    help();
    return;
  } else

    translate();

}

export async function help() {
  console.log(messages.cli.welcome);
  success(
    figlet.textSync("json-translator")
  );
  console.log(messages.cli.version)
  program.outputHelp()

}

async function translate() {
  const myArgs = program.args;
  const myOpts = program.opts();
  if (myArgs[1] && typeof myArgs[1] === 'string') {
    const file_path = myArgs[1];
    await readProxyFile(file_path);
  }

  // no path condition
  let objectPath = myArgs[0];
  if (objectPath === undefined || objectPath === '') {
    error(messages.file.no_path);
    info(`([path] ${messages.cli.paths})`)
    return;
  }

  // no file in the path condition
  let { json_obj } = await getFileFromPath(objectPath);
  if (json_obj === undefined) {
    error(messages.file.no_file_in_path);
    return;
  }
  
  
  let translator = myOpts.translator
  if (translator && translator !== '') {
    translator = capitalize(myOpts.translator)
    switch (translator) {
      case 'Google':
        global.source = Sources.GoogleTranslate

        infoChoices(messages.cli.from_source, Sources.GoogleTranslate)
        break;
      case 'Argos':
        global.source = Sources.ArgosTranslate
        infoChoices(messages.cli.from_source, Sources.ArgosTranslate)

        break;
      case 'Libre':
        global.source = Sources.LibreTranslate
        infoChoices(messages.cli.from_source, Sources.LibreTranslate)

        break;
      case 'Bing':
        global.source = Sources.BingTranslate
        infoChoices(messages.cli.from_source, Sources.BingTranslate)
        break;
      default:
        error(translator + ' ' + messages.cli.translator_not_available);
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
        break;
    }
  } else {
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


  async function promptFrom(from_choices: any[], messages: any) {
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

  async function promptTo(to_choices: any[], messages: any, default_languages?: any) {
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

  const opt_from: any = myOpts.from ? capitalize(myOpts.from) : undefined;
  const opt_to: any = myOpts.to ? (myOpts.to as string).split(',').map(lang => capitalize(lang)) : undefined;
  let from!: string;
  let to!: string[];
  const { from_choices, to_choices } = getLanguageChoices();

  if (!opt_from && !opt_to) {
    ({ from } = await promptFrom(from_choices, messages));
    ({ to } = await promptTo(to_choices, messages));
  } else {
    if (opt_from) {
      if ((getLanguages() as any)[opt_from]) {
        from = opt_from;
      } else {
        error(opt_from + ' ' + messages.cli.from_not_available);
        ({ from } = await promptFrom(from_choices, messages));
      }
    } else {
      ({ from } = await promptFrom(from_choices, messages));
    }

    if (opt_to) {
      to = opt_to;
    } else {
      ({ to } = await promptTo(to_choices, messages));
    }
  }

  let available_languages = to.filter((language) => (getLanguages() as any)[language] !== undefined);
  let not_available_languages = to.filter((language) => (getLanguages() as any)[language] === undefined);

  if (not_available_languages.length !== 0) {
    for (let lang of not_available_languages) {
      error(lang + ' ' + messages.cli.from_not_available);
    }
    ({ to } = await promptTo(to_choices, messages, available_languages));
  }



  if (to.length === 0 || to === undefined) {
    warn(messages.cli.no_selected_language);
    ({ to } = await promptTo(to_choices, messages));
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
