/// <reference types="../global" />
import nock from 'nock';
import { plaintranslate } from '../core/translator';
import { DeepLTranslateLanguages } from '../modules/languages';
import { TranslationConfig, TranslationModules } from '../modules/modules';
import { default_concurrency_limit, default_fallback } from '../utils/micro';

describe('TRANSLATOR', () => {
  it('should translate using DeepL', async function() {
    process.env.DEEPL_API_KEY = 'deepl_api_key';

    const scope = nock('https://api-free.deepl.com', {
      reqheaders: {
        authorization: `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`,
        'content-type': 'application/json',
      },
    })
      .post('/v2/translate', {
        text: ['hello'],
        target_lang: DeepLTranslateLanguages.German,
        source_lang: DeepLTranslateLanguages.English,
      })
      .reply(200, {
        translations: [
          {
            detected_source_language: 'EN',
            text: 'hallo',
          },
        ],
      });

    let config: TranslationConfig = {
      moduleKey: 'deepl',
      TranslationModule: TranslationModules['deepl'],
      concurrencyLimit: default_concurrency_limit,
      fallback: default_fallback,
    };

    const result = await plaintranslate(
      config,
      'hello',
      DeepLTranslateLanguages.English,
      DeepLTranslateLanguages.German,
      []
    );
    expect(result).toEqual('hallo');
    scope.done();
  });
});
