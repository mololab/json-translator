import 'openai/shims/node';
import { getFile, getRootFolder, saveFilePublic } from '../core/core';
import * as fs from 'fs/promises';
import * as appConsole from '../utils/console';
import { safeValueTransition } from '../modules/helpers';

jest.mock('fs/promises');

declare global {
  var totalTranslation: number;
  var totalTranslated: number;
  var skipInCache: number;
  var proxyList: string[];
  var proxyIndex: number;
}

describe(`CORE`, () => {
  test('sanity check for test environment', () => {
    expect(true).toBeTruthy();
  });

  it(`should get defined file`, async () => {
    // arrange
    const path = 'files/en.json';
    const expected_output = {
      login: {
        title: 'Login',
        email: 'Please, enter your email',
        failure: 'Failed',
      },
    };

    jest.spyOn(fs, 'readFile').mockResolvedValue(expected_output as any);

    // act
    const output = await getFile(path);

    // assert
    expect(output).toMatchObject(expected_output);
  });

  it(`should not get undefined file`, async () => {
    // arrange
    const path = 'files/en.json';

    jest.spyOn(fs, 'readFile').mockRejectedValue(undefined);

    // act
    const output = await getFile(path);

    // assert
    expect(output).toBeUndefined();
  });

  it('should get root folder', () => {
    // arrange
    const test_cases = [
      {
        path: 'C:/PACKAGES/js/json-translator/test/files/en.json',
        root_folder: 'C:/PACKAGES/js/json-translator/test/files',
      },
      {
        path: 'files/en.json',
        root_folder: 'files',
      },
      {
        path: 'en.json',
        root_folder: './',
      },
    ];

    // act & assert
    test_cases.forEach(test_case => {
      const root_folder = getRootFolder(test_case.path);
      expect(root_folder).toStrictEqual(test_case.root_folder);
    });
  });

  it('should save file (successful case)', async () => {
    // arrange
    const path = 'files';
    const data = {};
    jest.spyOn(fs, 'writeFile').mockResolvedValue();
    jest.spyOn(appConsole, 'error').mockReturnValue();

    // act
    await saveFilePublic(path, data);

    // assert
    expect(appConsole.error).not.toHaveBeenCalled();
  });

  it('should not save file (unsuccessful case)', async () => {
    // arrange
    const path = 'files';
    const data = {};
    jest.spyOn(fs, 'writeFile').mockRejectedValue(``);
    jest.spyOn(appConsole, 'error').mockReturnValue();

    // act
    await saveFilePublic(path, data);

    // assert
    expect(appConsole.error).toHaveBeenCalled();
  });

  it('should transit value to a safe form', () => {
    // arrange
    const test_cases = [
      {
        value: '',
        expected_safe_value: '--',
      },
      {
        value: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris varius interdum auctor. Proin congue auctor risus. Aliquam maximus bibendum velit, eget scelerisque lectus elementum in. Aliquam non nibh ac est laoreet venenatis. Proin id leo vestibulum, aliquet tellus et, scelerisque sapien. Etiam accumsan justo vitae vestibulum tincidunt. Curabitur accumsan lorem sit amet ullamcorper ultricies. Nam pretium lacus dui, vitae feugiat purus feugiat eget. Ut eleifend porttitor lobortis. Nulla placerat augue ut lacus dignissim finibus. Pellentesque magna mauris, pellentesque id dictum vitae, gravida vitae mi. Proin cursus congue mauris, sit amet iaculis libero aliquet et. Nulla gravida semper consectetur. Nam non mauris eget ligula dictum mollis. Aenean leo metus, efficitur sed ipsum in, dictum blandit purus. Praesent dictum aliquet elementum. Vestibulum quis sapien ut massa condimentum ornare. Quisque ornare venenatis commodo. Aliquam luctus lacus vitae metus iaculis convallis. Nunc enim odio, ullamcorper sed finibus vitae, sodales eu risus. Ut a tellus hendrerit, vulputate nulla vel, pretium felis. Curabitur id pulvinar neque. Cras euismod aliquet odio, nec vestibulum orci condimentum vel. Vivamus ut ante ligula. Aliquam finibus dui eros, sit amet euismod magna gravida in. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris varius interdum auctor. Proin congue auctor risus. Aliquam maximus bibendum velit, eget scelerisque lectus elementum in. Aliquam non nibh ac est laoreet venenatis. Proin id leo vestibulum, aliquet tellus et, scelerisque sapien. Etiam accumsan justo vitae vestibulum tincidunt. Curabitur accumsan lorem sit amet ullamcorper ultricies. Nam pretium lacus dui, vitae feugiat purus feugiat eget. Ut eleifend porttitor lobortis. Nulla placerat augue ut lacus dignissim finibus. Pellentesque magna mauris, pellentesque id dictum vitae, gravida vitae mi. Proin cursus congue mauris, sit amet iaculis libero aliquet et. Nulla gravida semper consectetur. Nam non mauris eget ligula dictum mollis. Aenean leo metus, efficitur sed ipsum in, dictum blandit purus. Praesent dictum aliquet elementum. Vestibulum quis sapien ut massa condimentum ornare. Quisque ornare venenatis commodo. Aliquam luctus lacus vitae metus iaculis convallis. Nunc enim odio, ullamcorper sed finibus vitae, sodales eu risus. Ut a tellus hendrerit, vulputate nulla vel, pretium felis. Curabitur id pulvinar neque. Cras euismod aliquet odio, nec vestibulum orci condimentum vel. Vivamus ut ante ligula. Aliquam finibus dui eros, sit amet euismod magna gravida in. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris varius interdum auctor. Proin congue auctor risus. Aliquam maximus bibendum velit, eget scelerisque lectus elementum in. Aliquam non nibh ac est laoreet venenatis. Proin id leo vestibulum, aliquet tellus et, scelerisque sapien. Etiam accumsan justo vitae vestibulum tincidunt. Curabitur accumsan lorem sit amet ullamcorper ultricies. Nam pretium lacus dui, vitae feugiat purus feugiat eget. Ut eleifend porttitor lobortis. Nulla placerat augue ut lacus dignissim finibus. Pellentesque magna mauris, pellentesque id dictum vitae, gravida vitae mi. Proin cursus congue mauris, sit amet iaculis libero aliquet et. Nulla gravida semper consectetur. Nam non mauris eget ligula dictum mollis. Aenean leo metus, efficitur sed ipsum in, dictum blandit purus. Praesent dictum aliquet elementum. Vestibulum quis sapien ut massa condimentum ornare. Quisque ornare venenatis commodo. Aliquam luctus lacus vitae metus iaculis convallis. Nunc enim odio, ullamcorper sed finibus vitae, sodales eu risus. Ut a tellus hendrerit, vulputate nulla vel, pretium felis. Curabitur id pulvinar neque. Cras euismod aliquet odio, nec vestibulum orci condimentum vel. Vivamus ut ante ligula. Aliquam finibus dui eros, sit amet euismod magna gravida in. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris varius interdum auctor. Proin congue auctor risus. Aliquam maximus bibendum velit, eget scelerisque lectus elementum in. Aliquam non nibh ac est laoreet venenatis. Proin id leo vestibulum, aliquet tellus et, scelerisque sapien. Etiam accumsan justo vitae vestibulum tincidunt. Curabitur accumsan lorem sit amet ullamcorper ultricies. Nam pretium lacus dui, vitae feugiat purus feugiat eget. Ut eleifend porttitor lobortis. Nulla placerat augue ut lacus dignissim finibus. Pellentesque magna mauris, pellentesque id dictum vitae, gravida vitae mi. Proin cursus congue mauris, sit amet iaculis libero aliquet et. Nulla gravida semper consectetur. Nam non mauris eget ligula dictum mollis. Aenean leo metus, efficitur sed ipsum in, dictum blandit purus. Praesent dictum aliquet elementum. Vestibulum quis sapien ut massa condimentum ornare. Quisque ornare venenatis commodo. Aliquam luctus lacus vitae metus iaculis convallis. Nunc enim odio, ullamcorper sed finibus vitae, sodales eu risus. Ut a tellus hendrerit, vulputate nulla vel, pretium felis. Curabitur id pulvinar neque. Cras euismod aliquet odio, nec vestibulum orci condimentum vel. Vivamus ut ante ligula. Aliquam finibus dui eros, sit amet euismod magna gravida in.`,
        expected_safe_value:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris varius interdum auctor. Proin congue auctor risus. Aliquam maximus bibendum velit, eget scelerisque lectus elementum in. Aliquam non nibh ac est laoreet venenatis. Proin id leo vestibulum, aliquet tellus et, scelerisque sapien. Etiam accumsan justo vitae vestibulum tincidunt. Curabitur accumsan lorem sit amet ullamcorper ultricies. Nam pretium lacus dui, vitae feugiat purus feugiat eget. Ut eleifend porttitor lobortis. Nulla placerat augue ut lacus dignissim finibus. Pellentesque magna mauris, pellentesque id dictum vitae, gravida vitae mi. Proin cursus congue mauris, sit amet iaculis libero aliquet et. Nulla gravida semper consectetur. Nam non mauris eget ligula dictum mollis. Aenean leo metus, efficitur sed ipsum in, dictum blandit purus. Praesent dictum aliquet elementum. Vestibulum quis sapien ut massa condimentum ornare. Quisque ornare venenatis commodo. Aliquam luctus lacus vitae metus iaculis convallis. Nunc enim odio, ullamcorper sed finibus vitae, sodales eu risus. Ut a tellus hendrerit, vulputate nulla vel, pretium felis. Curabitur id pulvinar neque. Cras euismod aliquet odio, nec vestibulum orci condimentum vel. Vivamus ut ante ligula. Aliquam finibus dui eros, sit amet euismod magna gravida in. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris varius interdum auctor. Proin congue auctor risus. Aliquam maximus bibendum velit, eget scelerisque lectus elementum in. Aliquam non nibh ac est laoreet venenatis. Proin id leo vestibulum, aliquet tellus et, scelerisque sapien. Etiam accumsan justo vitae vestibulum tincidunt. Curabitur accumsan lorem sit amet ullamcorper ultricies. Nam pretium lacus dui, vitae feugiat purus feugiat eget. Ut eleifend porttitor lobortis. Nulla placerat augue ut lacus dignissim finibus. Pellentesque magna mauris, pellentesque id dictum vitae, gravida vitae mi. Proin cursus congue mauris, sit amet iaculis libero aliquet et. Nulla gravida semper consectetur. Nam non mauris eget ligula dictum mollis. Aenean leo metus, efficitur sed ipsum in, dictum blandit purus. Praesent dictum aliquet elementum. Vestibulum quis sapien ut massa condimentum ornare. Quisque ornare venenatis commodo. Aliquam luctus lacus vitae metus iaculis convallis. Nunc enim odio, ullamcorper sed finibus vitae, sodales eu risus. Ut a tellus hendrerit, vulputate nulla vel, pretium felis. Curabitur id pulvinar neque. Cras euismod aliquet odio, nec vestibulum orci condimentum vel. Vivamus ut ante ligula. Aliquam finibus dui eros, sit amet euismod magna gravida in. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris varius interdum auctor. Proin congue auctor risus. Aliquam maximus bibendum velit, eget scelerisque lectus elementum in. Aliquam non nibh ac est laoreet venenatis. Proin id leo vestibulum, aliquet tellus et, scelerisque sapien. Etiam accumsan justo vitae vestibulum tincidunt. Curabitur accumsan lorem sit amet ullamcorper ultricies. Nam pretium lacus dui, vitae feugiat purus feugiat eget. Ut eleifend porttitor lobortis. Nulla placerat augue ut lacus dignissim finibus. Pellentesque magna mauris, pellentesque id dictum vitae, gravida vitae mi. Proin cursus congue mauris, sit amet iaculis libero aliquet et. Nulla gravida semper consectetur. Nam non mauris eget ligula dictum mollis. Aenean leo metus, efficitur sed ipsum in, dictum blandit purus. Praesent dictum aliquet elementum. Vestibulum quis sapien ut massa condimentum ornare. Quisque ornare venenatis commodo. Aliquam luctus lacus vitae metus iaculis convallis. Nunc enim odio, ullamcorper sed finibus vitae, sodales eu risus. Ut a tellus hendrerit, vulputate nulla vel, pretium felis. Curabitur id pulvinar neque. Cras euismod aliquet odio, nec vestibulum orci condimentum vel. Vivamus ut ante ligula. Aliquam finibus dui eros, sit amet euismod magna gravida in. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris varius interdum auctor. Proin congue auctor risus. Aliquam maximus bibendum velit, eget scelerisque lectus elementum in. Aliquam non nibh ac est laoreet venenatis. Proin id leo vestibulum, aliquet tellus et, scelerisque sapien. Etiam accumsan justo vitae vestibulum tincidunt. Curabitur accumsan lorem sit amet ullamcorper ultricies. Nam pretium lacus dui, vitae feugiat purus feugiat eget. Ut eleifend porttitor lobortis. Nulla placerat augue ut lacus dignissim finibus. Pellentesque magna mauris, pellentesque id dictum vitae, gravida vitae mi. Proin cursus congue mauris, sit amet iaculis libero aliquet et. Nulla gravida semper consectetur. Nam non mauris eget ligula dictum mollis. Aenean leo metus, efficitur sed ipsum in, dictum blandit purus. Praesent dictum aliquet elementum. Vestibulum quis sapien ut massa condimentum ornare. Quisque ornare venenatis commodo. Aliquam luctus lacus vitae metus iaculis convallis. Nunc enim odio, ullamcorper sed finibus vitae, sodales eu risus. Ut a tellus hendrerit, vulputate nulla vel, pretium felis. Curabitur id pulvi',
      },
    ];

    // act & assert
    test_cases.forEach(test_case => {
      const safe_form = safeValueTransition(test_case.value);
      expect(safe_form).toStrictEqual(test_case.expected_safe_value);
    });
  });
});
