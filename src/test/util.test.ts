import { Sources } from '..';
import { error, info, success, warn } from '../utils/console';
import { getCodeFromLanguage, getLanguageFromCode } from '../utils/micro';

declare global {
  var totalTranslation: number;
  var totalTranslated: number;
  var source: Sources;
  var proxyList: string[];
  var proxyIndex: number;
}

describe(`UTIL`, () => {
  it(`sanity check for test environment`, () => {
    expect(true).toBeTruthy();
  });

  // arrange
  const test_cases = [
    {
      code: 'az',
      language: 'Azerbaijani',
    },
    {
      code: 'eu',
      language: 'Basque',
    },
    {
      code: 'da',
      language: 'Danish',
    },
  ];

  describe('MICRO', () => {
    it('should get language from the code', () => {
      test_cases.forEach(test_case => {
        // act
        const langauge = getLanguageFromCode(test_case.code);

        // assert
        expect(langauge).toStrictEqual(test_case.language);
      });
    });

    it('should get code from the language', () => {
      test_cases.forEach(test_case => {
        // act
        const code = getCodeFromLanguage(test_case.language);

        // assert
        expect(code).toStrictEqual(test_case.code);
      });
    });
  });

  describe('CONSOLE', () => {
    it('should print success message', () => {
      // arrange
      let message = 'success message';
      console.log = jest.fn();

      // act
      success(message);

      // assert
      expect(console.log).toBeCalled();
    });

    it('should print error message', () => {
      // arrange
      let message = 'error message';
      console.log = jest.fn();

      // act
      error(message);

      // assert
      expect(console.log).toBeCalled();
    });

    it('should print info message', () => {
      // arrange
      let message = 'info message';
      console.log = jest.fn();

      // act
      info(message);

      // assert
      expect(console.log).toBeCalled();
    });

    it('should print warn message', () => {
      // arrange
      let message = 'warn message';
      console.log = jest.fn();

      // act
      warn(message);

      // assert
      expect(console.log).toBeCalled();
    });
  });
});
