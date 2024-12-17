import 'openai/shims/node';
import { error, info, success, warn } from '../utils/console';

declare global {
  var totalTranslation: number;
  var totalTranslated: number;
  var skipInCache: number;
  var proxyList: string[];
  var proxyIndex: number;
}

describe(`UTIL`, () => {
  it(`sanity check for test environment`, () => {
    expect(true).toBeTruthy();
  });

  // arrange
  // const test_cases = [
  //   {
  //     code: 'az',
  //     language: 'Azerbaijani',
  //   },
  //   {
  //     code: 'eu',
  //     language: 'Basque',
  //   },
  //   {
  //     code: 'da',
  //     language: 'Danish',
  //   },
  // ];

  describe('MICRO', () => {
    // TODO: add modules/helpers function test
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
