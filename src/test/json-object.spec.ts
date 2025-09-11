import 'openai/shims/node';
import * as translator from '../core/translator';
import { deepDiver, objectTranslator } from '../core/json_object';
import { GoogleTranslateLanguages } from '../modules/languages';
import { TranslationConfig, TranslationModules } from '../modules/modules';
import { default_concurrency_limit, default_fallback } from '../utils/micro';

declare global {
  var totalTranslation: number;
  var totalTranslated: number;
  var skipInCache: number;
  var proxyList: string[];
  var proxyIndex: number;
}

describe(`JSON OBJECT`, () => {
  test('sanity check for test environment', () => {
    expect(true).toBeTruthy();
  });

  const test_object = {
    a: 'a',
    b: 'b',
    c: {
      d: 'd',
      e: 'e',
    },
    f: [
      {
        g: 'g',
        h: 'h',
      },
      {
        i: 'i',
        j: {
          k: 'k',
          l: 'l',
        },
        m: {
          n: {
            o: {
              p: {
                q: 'q {{name}}',
              },
            },
          },
        },
      },
    ],
  };

  const from = GoogleTranslateLanguages.English;

  const to = GoogleTranslateLanguages.Dutch;

  afterEach(() => {
    jest.clearAllMocks();
  });

  const to_multiple = [
    GoogleTranslateLanguages.Bulgarian,
    GoogleTranslateLanguages.Catalan,
    GoogleTranslateLanguages.Turkish,
  ];

  it('should dive every value in the object', async () => {
    // arrange
    jest.spyOn(translator, 'plaintranslate').mockResolvedValue('');

    let config: TranslationConfig = {
      moduleKey: 'google',
      TranslationModule: TranslationModules['google'],
      concurrencyLimit: default_concurrency_limit,
      fallback: default_fallback,
    };

    // act
    await deepDiver(config, test_object, from, to);

    // assert
    expect(translator.plaintranslate).toBeCalledTimes(10);
  });

  it('should translate object into one language', async () => {
    // arrange
    jest.spyOn(translator, 'plaintranslate').mockResolvedValue('');

    let config: TranslationConfig = {
      moduleKey: 'google',
      TranslationModule: TranslationModules['google'],
      concurrencyLimit: default_concurrency_limit,
      fallback: default_fallback,
    };

    // act
    const response = await objectTranslator(config, test_object, from, [to]);

    // assert
    expect(response).toMatchObject([test_object]);
  });

  it('should translate object into multiple languages', async () => {
    // arrange
    jest.spyOn(translator, 'plaintranslate').mockResolvedValue('');

    let config: TranslationConfig = {
      moduleKey: 'google',
      TranslationModule: TranslationModules['google'],
      concurrencyLimit: default_concurrency_limit,
      fallback: default_fallback,
    };

    // act
    const response = await objectTranslator(
      config,
      test_object,
      from,
      to_multiple
    );

    // assert
    expect(response.length).toEqual(to_multiple.length);
  });
});
