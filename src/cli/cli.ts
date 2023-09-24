import { getLanguages, Sources, TRANSLATE_POSTFIX, translatorsNames } from '..';
import { fileTranslator, getFileFromPath } from '../core/json_file';
import {
  error,
  info,
  messages,
  supportedLanguagesUrl,
  warn,
} from '../utils/console';
import loading from 'loading-cli';
import {
  capitalize,
  current_version,
  getCodeFromLanguage,
  translationStatistic,
} from '../utils/micro';
import { readProxyFile } from '../core/proxy_file';
import { Command, Option } from 'commander';
import {
  promptFrom,
  promptName,
  promptTo,
  promptTranslator,
} from '../utils/prompt';

const program = new Command();

export async function initializeCli() {
  global.totalTranslation = 0;
  global.totalTranslated = 0;
  global.proxyIndex = 0;
  global.proxyList = [];

  program
    .version(current_version)
    .addHelpText('beforeAll', messages.cli.welcome)
    .description(messages.cli.description)
    .usage(messages.cli.usage)
    .addOption(
      new Option(
        `-T, --translator <Translator>`,
        messages.cli.translator
      ).choices(translatorsNames)
    )
    .addOption(new Option(`-f, --from <Language>`, messages.cli.from))
    .addOption(new Option(`-t, --to <Languages...>`, messages.cli.to))
    .addOption(new Option(`-n, --name [string]`, messages.cli.newFileName))
    .addHelpText(
      'after',
      `\n${messages.cli.usageWithProxy}\n${messages.cli.usageByOps}`
    )
    .addHelpText('afterAll', supportedLanguagesUrl);

  program.showSuggestionAfterError();
  program.exitOverride();

  try {
    program.parse();
  } catch (err) {
    process.exit();
  }

  if (!process.argv.slice(2).length) {
    program.outputHelp();
    return;
  }

  /*
    If the user adds an option without a value or forgets the value of the option, the value of the next option is applied to the proxy file path.
    It is actually a problem in commander.js
    I've come to this temporary solution, which is if the proxy path does not end with .txt display error 'messages.cli.proxy_File_notValid_or_not_empty_options'
*/
  if (program.args[1] !== undefined && !program.args[1].includes('.txt')) {
    error(messages.cli.proxy_File_notValid_or_not_empty_options);
    process.exit(1);
  }
  translate();
}

async function translate() {
  const commandArguments = program.args;
  const commandOptions = program.opts();
  if (commandArguments[1] && typeof commandArguments[1] === 'string') {
    const file_path = commandArguments[1];
    await readProxyFile(file_path);
  }

  // no path condition
  let objectPath = commandArguments[0];
  if (objectPath === undefined || objectPath === '') {
    error(messages.file.no_path);
    info(`([path] ${messages.cli.paths})`);
    return;
  }

  // no file in the path condition
  let { json_obj } = await getFileFromPath(objectPath);
  if (json_obj === undefined) {
    error(messages.file.no_file_in_path);
    return;
  }

  let translatorInput = commandOptions.translator
    ? commandOptions.translator
    : undefined;
  if (translatorInput && translatorInput !== '') {
    if (translatorsNames.includes(translatorInput)) {
      let translator = translatorsNames.find((el: string) =>
        el.includes(translatorInput as string)
      );
      // Restore source name after splitting it for "translatorsNames" variable
      global.source = [
        capitalize(translator as string),
        TRANSLATE_POSTFIX,
      ].join('') as Sources;
    } else {
      error(`${messages.cli.translator_not_available}`);
      process.exit(1);
    }
  } else {
    await promptTranslator();
  }

  const sourceLanguageInput: any = commandOptions.from
    ? commandOptions.from
    : undefined;
  const targetLanguageInput: any = commandOptions.to
    ? commandOptions.to
    : undefined;

  let sourceLanguageISO: string;
  let targetLanguageISOs: string[];
  let newFileName: string = commandOptions.name
    ? commandOptions.name
    : undefined;

  const listIOS = Object.values(getLanguages() as any); // get list after assigning global.source

  if (!sourceLanguageInput) {
    const { from } = await promptFrom();
    sourceLanguageISO = getCodeFromLanguage(from);
  } else {
    if (listIOS.includes(sourceLanguageInput)) {
      sourceLanguageISO = sourceLanguageInput;
    } else {
      error(`[${sourceLanguageInput}]: ${messages.cli.from_not_available}`);
      process.exit(1);
    }
  }

  if (!targetLanguageInput) {
    const { to } = await promptTo();
    targetLanguageISOs = to.map((lang: string) => getCodeFromLanguage(lang));

    if (targetLanguageISOs.length === 0 || targetLanguageISOs === undefined) {
      warn(messages.cli.no_selected_language);
      const { to } = await promptTo();
      targetLanguageISOs = to.map((lang: string) => getCodeFromLanguage(lang));
    }
  } else {
    targetLanguageISOs = targetLanguageInput.map((lang: string) => {
      if (listIOS.includes(lang)) {
        return lang;
      } else {
        error(`[${lang}]: ${messages.cli.to_not_available}`);
        process.exit(1);
      }
    });
  }

  if (!newFileName) {
    const { name } = await promptName();
    newFileName = name;
  } else {
    newFileName = newFileName;
  }

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

  await fileTranslator(
    objectPath,
    sourceLanguageISO,
    targetLanguageISOs,
    newFileName
  );

  load.succeed(
    `DONE! ${translationStatistic(
      global.totalTranslation,
      global.totalTranslation
    )}`
  );
  clearInterval(refreshInterval);

  info(messages.cli.creation_done);
}
