import { languages, Sources } from '..';
import * as translator from '../core/translator';
import { deepDiver, objectTranslator } from '../core/json_object';

declare global {
  var totalTranslation: number;
  var totalTranslated: number;
  var source: Sources;
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

  const from = languages.English;

  const to = languages.Dutch;

  afterEach(() => {
    jest.clearAllMocks();
  });

  const to_multiple = [
    languages.Bulgarian,
    languages.Catalan,
    languages.Turkish,
  ];

  it('should dive every value in the object', async () => {
    // arrange
    jest.spyOn(translator, 'plaintranslate').mockResolvedValue('');

    // act
    await deepDiver(test_object, from, to);

    // assert
    expect(translator.plaintranslate).toBeCalledTimes(10);
  });

  it('should translate object into one language', async () => {
    // arrange
    jest.spyOn(translator, 'plaintranslate').mockResolvedValue('');

    // act
    const response = await objectTranslator(test_object, from, to);

    // assert
    expect(response).toMatchObject(test_object);
  });

  it('should translate object into multiple languages', async () => {
    // arrange
    jest.spyOn(translator, 'plaintranslate').mockResolvedValue('');

    // act
    const response = await objectTranslator(test_object, from, to_multiple);

    // assert
    expect(response.length).toEqual(to_multiple.length);
  });
});
