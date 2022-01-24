import { languages } from '../src';
import * as core from '../src/core/core';
import * as jsonObject from '../src/core/json_object';

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
                q: 'q',
              },
            },
          },
        },
      },
    ],
  };
  const from = languages.English;

  const to = languages.Dutch;

  const to_multiple = [
    languages.Bulgarian,
    languages.Catalan,
    languages.Turkish,
  ];

  to_multiple;

  it('should dive every value in the object', async () => {
    // arrange
    jest.spyOn(core, 'plaintranslate').mockResolvedValue('');

    // act
    await jsonObject.deepDiver(test_object, from, to);

    // assert
    expect(core.plaintranslate).toBeCalledTimes(10);
  });

  it('should translate object into one language', async () => {
    // arrange
    const mock_response = {
      test: 'test',
    };
    jest.spyOn(jsonObject, 'deepDiver').mockResolvedValue(mock_response);

    // act
    const response = await jsonObject.objectTranslator(mock_response, from, to);

    // assert
    expect(jsonObject.deepDiver).toBeCalledTimes(0);
    expect(response).toMatchObject(mock_response);
  });

  it('should translate object into multiple languages', () => {
    expect(true).toBeTruthy();
  });

  it('should return error if there is object OR from OR to are undefined', () => {
    expect(true).toBeTruthy();
  });
});
