import 'openai/shims/node';
import { fileTranslator } from '../core/json_file';
import * as appConsole from '../utils/console';
import * as jsonObject from '../core/json_object';
import * as core from '../core/core';
import { GoogleTranslateLanguages } from '../modules/languages';
import { TranslationConfig, TranslationModules } from '../modules/modules';
import { default_concurrency_limit, default_fallback } from '../utils/micro';
import { translatedObject } from '..';

declare global {
  var totalTranslation: number;
  var totalTranslated: number;
  var skipInCache: number;
  var proxyList: string[];
  var proxyIndex: number;
}

describe(`JSON FILE`, () => {
  it(`test environment is ready`, () => {
    expect(true).toBeTruthy();
  });

  it('should get `no file` error on undefined file path', async () => {
    // arrange
    const mock_objectPath = 'mock_objectPath';
    const mock_from = GoogleTranslateLanguages.English;
    const mock_to = GoogleTranslateLanguages.Dutch;
    const mock_newFileName = '';

    const mock_json_file = undefined;

    jest.spyOn(core, 'getFile').mockResolvedValue(mock_json_file);
    jest.spyOn(appConsole, 'error').mockReturnValue();

    let config: TranslationConfig = {
      moduleKey: 'google',
      TranslationModule: TranslationModules['google'],
      concurrencyLimit: default_concurrency_limit,
      fallback: default_fallback,
    };

    // act
    await fileTranslator(
      config,
      mock_objectPath,
      mock_from,
      [mock_to],
      mock_newFileName
    );

    // assert
    expect(appConsole.error).toHaveBeenCalled();
    expect(appConsole.error).toBeCalledWith(
      appConsole.messages.file.no_file_in_path
    );
  });

  it('should get file & translate it to one language & saves it', async () => {
    // arrange
    const mock_objectPath = 'mock_objectPath';
    const mock_from = GoogleTranslateLanguages.English;
    const mock_to = GoogleTranslateLanguages.German;
    const mock_newFileName = '';
    const mock_json_object = JSON.stringify({
      login: {
        title: 'Login',
        email: 'Please, enter your email',
        failure: 'Failed',
      },
    });
    const mock_translated_json_object: translatedObject[] = [
      {
        data: {
          login: {
            title: 'Anmeldung',
            email: 'Bitte geben Sie ihre E-Mail-Adresse ein',
            failure: 'Fehlgeschlagen',
          },
        },
      },
    ];
    const mock_root_folder = 'mock_root_folder';

    jest.spyOn(core, 'getFile').mockResolvedValue(mock_json_object);
    jest
      .spyOn(jsonObject, 'objectTranslator')
      .mockResolvedValue(mock_translated_json_object);
    jest.spyOn(core, 'getRootFolder').mockReturnValue(mock_root_folder);
    jest.spyOn(core, 'saveFilePublic').mockResolvedValue();
    jest.spyOn(appConsole, 'success').mockReturnValue();

    let config: TranslationConfig = {
      moduleKey: 'google',
      TranslationModule: TranslationModules['google'],
      concurrencyLimit: default_concurrency_limit,
      fallback: default_fallback,
    };

    // act
    await fileTranslator(
      config,
      mock_objectPath,
      mock_from,
      [mock_to],
      mock_newFileName
    );

    // assert
    expect(core.saveFilePublic).toBeCalledTimes(1);
  });

  it('should get file & translate it to multiple languages & saves it', async () => {
    // arrange
    const mock_objectPath = 'mock_objectPath';
    const mock_from = GoogleTranslateLanguages.English;
    const mock_to = [
      GoogleTranslateLanguages.German,
      GoogleTranslateLanguages.French,
    ];
    const mock_newFileName = '';
    const mock_json_object = JSON.stringify({
      login: {
        title: 'Login',
        email: 'Please, enter your email',
        failure: 'Failed',
      },
    });
    const mock_translated_json_object = [
      {
        data: {
          login: {
            title: 'Anmeldung',
            email: 'Bitte geben Sie ihre E-Mail-Adresse ein',
            failure: 'Fehlgeschlagen',
          },
        },
      },
      {
        data: {
          login: {
            title: 'Connexion',
            email: "S'il vous plaît, entrez votre e-mail",
            failure: 'Manquée',
          },
        },
      },
    ];
    const mock_root_folder = 'mock_root_folder';

    jest.spyOn(core, 'getFile').mockResolvedValue(mock_json_object);
    jest
      .spyOn(jsonObject, 'objectTranslator')
      .mockResolvedValue(mock_translated_json_object);
    jest.spyOn(core, 'getRootFolder').mockReturnValue(mock_root_folder);
    jest.spyOn(core, 'saveFilePublic').mockResolvedValue();
    jest.spyOn(appConsole, 'success').mockReturnValue();

    let config: TranslationConfig = {
      moduleKey: 'google',
      TranslationModule: TranslationModules['google'],
      concurrencyLimit: default_concurrency_limit,
      fallback: default_fallback,
    };

    // act
    await fileTranslator(
      config,
      mock_objectPath,
      mock_from,
      mock_to,
      mock_newFileName
    );

    // assert
    expect(core.saveFilePublic).toBeCalled();
    expect(appConsole.success).toBeCalled();
  });
});
