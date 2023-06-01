import { getLanguages,  Sources } from '..';
import { fileTranslator, getFileFromPath } from '../core/json_file';
import {
  error,
  info,
  messages,
  success,
  warn,
} from '../utils/console';
import loading from 'loading-cli';
import { capitalize, current_version, getCodeFromLanguage, translationStatistic } from '../utils/micro';
import { readProxyFile } from '../core/proxy_file';
import { Command } from "commander";
import { promptFrom, promptTo, promptTranslator } from '../utils/prompt';
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
    process.exit(1)
  }


  if (!process.argv.slice(2).length) {
    help();
    return;
  }
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
        break;
      case 'Argos':
        global.source = Sources.ArgosTranslate

        break;
      case 'Libre':
        global.source = Sources.LibreTranslate

        break;
      case 'Bing':
        global.source = Sources.BingTranslate
        break;
      default:
        error(translator + ' ' + messages.cli.translator_not_available);
        promptTranslator()
        break;
    }
  } else {
   await promptTranslator()
  }




  const opt_from: any = myOpts.from ? capitalize(myOpts.from) : undefined;
  const opt_to: any = myOpts.to ? (myOpts.to as string).split(',').map(lang => capitalize(lang)) : undefined;
  let from!: string;
  let to!: string[];
  

  if (!opt_from && !opt_to) {
    ({ from } = await promptFrom());
    ({ to } = await promptTo());
  } else {
    if (opt_from) {
      if ((getLanguages() as any)[opt_from]) {
        from = opt_from;
      } else {
        error(opt_from + ' ' + messages.cli.from_not_available);
        ({ from } = await promptFrom());
      }
    } else {
      ({ from } = await promptFrom());
    }

    if (opt_to) {
      to = opt_to;
    } else {
      ({ to } = await promptTo());
    }
  }

  let available_languages = to.filter((language) => (getLanguages() as any)[language] !== undefined);
  let not_available_languages = to.filter((language) => (getLanguages() as any)[language] === undefined);

  if (not_available_languages.length !== 0) {
    for (let lang of not_available_languages) {
      error(lang + ' ' + messages.cli.from_not_available);
    }
    ({ to } = await promptTo(available_languages));
  }



  if (to.length === 0 || to === undefined) {
    warn(messages.cli.no_selected_language);
    ({ to } = await promptTo());
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


