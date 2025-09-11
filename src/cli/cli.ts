import {
  translationModuleKeys,
  getTranslationModuleByKey,
} from '../modules/helpers';
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
  current_version,
  translationStatistic,
  default_concurrency_limit,
  default_fallback,
  fallbacks, cacheEnableds,
} from '../utils/micro';
import { readProxyFile } from '../core/proxy_file';
import { Command, Option, OptionValues } from 'commander';
import {
  promptFrom,
  promptName,
  promptTo,
  promptModuleKey,
  promptFallback,
  promptConcurrencyLimit,
  promptCacheEnabled
} from './prompt';
import { TranslationConfig, TranslationModule } from '../modules/modules';

const program = new Command();

export async function initializeCli() {
  global.totalTranslation = 0;
  global.totalTranslated = 0;
  global.skipInCache = 0;
  global.proxyIndex = 0;
  global.proxyList = [];

  program
    .version(current_version)
    .addHelpText('beforeAll', messages.cli.welcome)
    .description(messages.cli.description)
    .usage(messages.cli.usage)
    .addOption(
      new Option(`-m, --module <Module>`, messages.cli.module).choices(
        translationModuleKeys()
      )
    )
    .addOption(new Option(`-f, --from <Language>`, messages.cli.from))
    .addOption(new Option(`-t, --to <Languages...>`, messages.cli.to))
    .addOption(new Option(`-n, --name <string>`, messages.cli.new_file_name))
    .addOption(
      new Option(`-fb, --fallback <string>`, messages.cli.fallback).choices(
        Object.keys(fallbacks)
      )
    )
    .addOption(
      new Option(
        `-cl, --concurrencylimit <number>`,
        messages.cli.concurrency_limit
      )
    )
    .addOption(new Option(`-c, --cache <boolean>`, messages.cli.cache_enabled))
    .addHelpText(
      'after',
      `\n${messages.cli.usage_with_proxy}\n${messages.cli.usage_by_ops}`
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
    error(messages.cli.proxy_file_notValid_or_not_empty_options);
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
  let { jsonObj } = await getFileFromPath(objectPath);
  if (jsonObj === undefined) {
    error(messages.file.no_file_in_path);
    return;
  }

  // get Translation Module
  const TranslationConfig = await translationConfig(commandOptions);

  // get from language
  const fromLanguageValue = await fromLanguage(
    commandOptions,
    TranslationConfig.TranslationModule
  );

  // get to languages
  const toLanguageValues = await toLanguages(
    commandOptions,
    TranslationConfig.TranslationModule
  );

  // get filename
  const fileNameValue = await fileName(commandOptions);

  // get fallback
  const fallbackValue = await fallback(commandOptions);
  TranslationConfig.fallback = fallbackValue;

  // get concurrency limit
  const concurrencyLimitValue = await concurrencyLimit(commandOptions);
  TranslationConfig.concurrencyLimit = concurrencyLimitValue;

  const cacheEnabledValue = await cacheEnabled(commandOptions);
  TranslationConfig.cacheEnabled = cacheEnabledValue;

  // set loading
  const { load, refreshInterval } = setLoading();

  await fileTranslator(
    TranslationConfig,
    objectPath,
    fromLanguageValue,
    toLanguageValues,
    fileNameValue
  );

  load.succeed(
    `DONE! ${translationStatistic(
      global.totalTranslation,
      global.totalTranslation,
      global.skipInCache
    )}`
  );
  clearInterval(refreshInterval);

  info(messages.cli.creation_done);
}

// getting input from user
async function translationConfig(
  commandOptions: OptionValues
): Promise<TranslationConfig> {
  let moduleKey = commandOptions.module ?? undefined;
  let TranslationModule: TranslationModule;

  if (moduleKey && translationModuleKeys().includes(moduleKey)) {
    // valid module key
    TranslationModule = getTranslationModuleByKey(moduleKey);
  } else if (moduleKey) {
    // invalid module key
    error(`${messages.cli.module_not_available}`);
    process.exit(1);
  } else {
    // no module key
    moduleKey = await promptModuleKey();
    TranslationModule = getTranslationModuleByKey(moduleKey);
  }

  let translationConfig: TranslationConfig = {
    moduleKey,
    TranslationModule,
    concurrencyLimit: default_concurrency_limit,
    fallback: default_fallback,
    cacheEnabled: false,
  };

  return translationConfig;
}

async function fromLanguage(
  commandOptions: OptionValues,
  TranslationModule: TranslationModule
): Promise<string> {
  const fromLanguageInput: any = commandOptions.from ?? undefined;
  let fromLanguageValue: string;

  const supportedLanguageValues = Object.values(TranslationModule.languages);

  if (!fromLanguageInput) {
    const fromLanguageInput = await promptFrom(TranslationModule.languages);
    fromLanguageValue = TranslationModule.languages[fromLanguageInput];
  } else {
    if (supportedLanguageValues.includes(fromLanguageInput)) {
      fromLanguageValue = fromLanguageInput;
    } else {
      error(`[${fromLanguageInput}]: ${messages.cli.from_not_available}`);
      process.exit(1);
    }
  }

  return fromLanguageValue;
}

async function toLanguages(
  commandOptions: OptionValues,
  TranslationModule: TranslationModule
): Promise<string[]> {
  const toLanguageInputs: any = commandOptions.to ?? undefined;
  let toLanguageValues: string[];

  const supportedLanguageValues = Object.values(TranslationModule.languages);

  if (!toLanguageInputs) {
    const toLanguageKeys = await promptTo(TranslationModule.languages);
    toLanguageValues = toLanguageKeys.map(
      (key: string) => TranslationModule.languages[key]
    );

    // second chance to select languages
    if (toLanguageValues.length === 0 || toLanguageValues === undefined) {
      warn(messages.cli.no_selected_language);
      const toLanguageKeys = await promptTo(TranslationModule.languages);
      toLanguageValues = toLanguageKeys.map(
        (key: string) => TranslationModule.languages[key]
      );
    }
  } else {
    toLanguageValues = toLanguageInputs.map((lang: string) => {
      if (supportedLanguageValues.includes(lang)) {
        return lang;
      } else {
        error(`[${lang}]: ${messages.cli.to_not_available}`);
        process.exit(1);
      }
    });
  }

  return toLanguageValues;
}

async function fileName(commandOptions: OptionValues): Promise<string> {
  let newFileName: string = commandOptions.name ?? undefined;

  if (newFileName == undefined) {
    newFileName = await promptName();
    return newFileName;
  }

  return newFileName;
}

async function fallback(commandOptions: OptionValues): Promise<boolean> {
  let fallbackStr: string = commandOptions.fallback ?? undefined;
  let fallback: boolean = false;

  if (!fallbackStr) {
    fallbackStr = await promptFallback();

    if (!Object.keys(fallbacks).includes(fallbackStr)) {
      error(`[${fallbackStr}]: ${messages.cli.fallback_not_available}`);
      process.exit(1);
    }
  }

  if (fallbackStr === 'yes') {
    fallback = fallbacks.yes;
  } else {
    fallback = fallbacks.no;
  }

  return fallback;
}

async function cacheEnabled(commandOptions: OptionValues): Promise<boolean> {
  let cacheEnabledStr: string = commandOptions.cacheEnabled ?? undefined;
  let cacheEnabled: boolean = false;

  if (!cacheEnabledStr) {
    cacheEnabledStr = await promptCacheEnabled();

    if (!Object.keys(cacheEnableds).includes(cacheEnabledStr)) {
      error(`[${cacheEnabledStr}]: ${messages.cli.cache_enabled}`);
      process.exit(1);
    }
  }

  if (cacheEnabledStr === 'yes') {
    cacheEnabled = cacheEnableds.yes;
  } else {
    cacheEnabled = cacheEnableds.no;
  }

  return cacheEnabled;
}

async function concurrencyLimit(commandOptions: OptionValues): Promise<number> {
  let concurrencyLimitInput: number =
    commandOptions.concurrencylimit ?? undefined;

  if (!concurrencyLimitInput) {
    concurrencyLimitInput = await promptConcurrencyLimit();
  }

  let concurrencyLimit: number = Number(concurrencyLimitInput);

  return Number.isNaN(concurrencyLimit)
    ? default_concurrency_limit
    : Number(concurrencyLimit);
}

function setLoading() {
  const load = loading({
    text: `Translating. Please wait. ${translationStatistic(
      global.totalTranslated,
      global.totalTranslation,
      global.skipInCache,
    )}`,
    color: 'yellow',
    interval: 100,
    stream: process.stdout,
    frames: ['.', 'o', 'O', '°', 'O', 'o', '.'],
  }).start();

  const refreshInterval = setInterval(() => {
    load.text = `Translating. Please wait. ${translationStatistic(
      global.totalTranslated,
      global.totalTranslation,
      global.skipInCache
    )}`;
  }, 200);

  return { load, refreshInterval };
}
