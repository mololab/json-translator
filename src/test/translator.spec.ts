/// <reference types="../global" />
import nock from 'nock';
import { Sources, getLanguages } from '..';
import { plaintranslate } from '../core/translator';

describe('TRANSLATOR', () => {
  it('should translate using DeepL', async function() {
    global.source = Sources.DeepLTranslate;
    process.env.DEEPL_API_KEY = 'deepl_api_key';

    const lng = getLanguages();

    const scope = nock('https://api-free.deepl.com', {
      reqheaders: {
        authorization: `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`,
        'content-type': 'application/json',
      },
    })
      .post('/v2/translate', {
        text: ['hello'],
        target_lang: lng.German,
        source_lang: lng.English,
      })
      .reply(200, {
        translations: [
          {
            detected_source_language: 'EN',
            text: 'hallo',
          },
        ],
      });

    const result = await plaintranslate('hello', lng.English, lng.German);
    expect(result).toEqual('hallo');
    scope.done();
  });
});
