<p align="center" >
    <img src="https://i.hizliresim.com/stgrebn.png" alt="jsontt logo" width="150" />
</p>

# <p align="center"> **🚀 FREE JSON TRANSLATOR 🆓** </p>

<p align="center">
  <a href="https://img.shields.io/npm/dt/@parvineyvazov/json-translator?label=npm%20downloads">
    <img src="https://img.shields.io/npm/dt/@parvineyvazov/json-translator?label=npm%20downloads" alt="npm downloads">
  </a> 
  <br>
  <a href="https://img.shields.io/npm/v/@parvineyvazov/json-translator?color=navy&label=version">
    <img src="https://img.shields.io/npm/v/@parvineyvazov/json-translator?color=navy&label=version" alt="version">
  </a>
  <a href="https://img.shields.io/bundlephobia/min/@parvineyvazov/json-translator?style=plastic">
    <img src="https://img.shields.io/bundlephobia/min/@parvineyvazov/json-translator?style=plastic" alt="minified size">
  </a>
  <a href="https://img.shields.io/bundlephobia/minzip/@parvineyvazov/json-translator?style=plastic">
    <img src="https://img.shields.io/bundlephobia/minzip/@parvineyvazov/json-translator?style=plastic" alt="minzipped size">
  </a>
</p>

This package will provide you to translate your JSON files or objects into different languages FREE.

### Types of usages 👀

- CLI (Supports Google Translate, Bing Microsoft Translate, Libre Translate, Argos Translate)

- In code (Node.js) as a package (Supports only Google Translate)

`Browser support will come soon...`

[**_Supported languages_**](./docs/LANGUAGES.md#supported-languages-)

# **✅ Install**

```bash
npm i @parvineyvazov/json-translator
```

- OR you can install it globally (in case of using CLI)

```bash
npm i -g @parvineyvazov/json-translator
```

# **1. 💫 CLI Usage**

```bash
jsontt folder/file.json
```

<p align="center" >
    <img src="https://s3.gifyu.com/images/jsonttgif.gif" alt="jsontt logo" />
</p>

# **2. 💥 Package Usage**

## **1. Translate a word | sentence**

- Import the library to your code.

For JavaScript

```javascript
const translator = require('@parvineyvazov/json-translator');
```

For TypeScript:

```typescript
import * as translator from '@parvineyvazov/json-translator';
```

```typescript
// Let`s translate `Home sweet home!` string from English to Chinese

const my_str = await translator.translateWord(
  'Home sweet home!',
  translator.languages.English,
  translator.languages.Chinese_Simplified
);

// my_str: 家，甜蜜的家！
```

---

## **2. Translate JSON object (supports deep objects)**

- Import the library to your code

For JavaScript

```javascript
const translator = require('@parvineyvazov/json-translator');
```

For TypeScript:

```typescript
import * as translator from '@parvineyvazov/json-translator';
```

```typescript
/*
Let`s translate our deep object from English to Spanish
*/

const en_lang: translator.translatedObject = {
  login: {
    title: 'Login {{name}}',
    email: 'Please, enter your email',
    failure: 'Failed',
  },
  homepage: {
    welcoming: 'Welcome!',
    title: 'Live long, live healthily!',
  },
  profile: {
    edit_screen: {
      edit: 'Edit your informations',
      edit_age: 'Edit your age',
      number_editor: [
        {
          title: 'Edit number 1',
          button: 'Edit 1',
        },
        {
          title: 'Edit number 2',
          button: 'Edit 2',
        },
      ],
    },
  },
};

/*
FOR JavaScript don`t use translator.translatedObject (No need to remark its type)
*/

let es_lang = await translator.translateObject(
  en_lang,
  translator.languages.English,
  translator.languages.Spanish
);
/*
es_lang:
            {
              "login": {
                "title": "Acceso {{name}}",
                "email": "Por favor introduzca su correo electrónico",
                "failure": "Fallida"
              },
              "homepage": {
                "welcoming": "¡Bienvenidas!",
                "title": "¡Vive mucho tiempo, vivo saludable!"
              },
              "profile": {
                "edit_screen": {
                  "edit": "Edita tus informaciones",
                  "edit_age": "Editar tu edad",
                  "number_editor": [
                    {
                      "title": "Editar número 1",
                      "button": "Editar 1"
                    },
                    {
                      "title": "Editar número 2",
                      "button": "Editar 2"
                    }
                  ]
                }
              }
            }
*/
```

---

## **3. Translate JSON object into Multiple languages (supports deep objects)**

- Import the library to your code

For JavaScript

```javascript
const translator = require('@parvineyvazov/json-translator');
```

For TypeScript:

```typescript
import * as translator from '@parvineyvazov/json-translator';
```

```typescript
/*
Let`s translate our object from English to French, Georgian and Japanese in the same time:
*/

const en_lang: translator.translatedObject = {
  login: {
    title: 'Login',
    email: 'Please, enter your email',
    failure: 'Failed',
  },
  edit_screen: {
    edit: 'Edit your informations',
    number_editor: [
      {
        title: 'Edit number 1',
        button: 'Edit 1',
      },
    ],
  },
};

/*
FOR JavaScript don`t use translator.translatedObject (No need to remark its type)
*/

const [french, georgian, japanese] = (await translator.translateObject(
  en_lang,
  translator.languages.Automatic,
  [
    translator.languages.French,
    translator.languages.Georgian,
    translator.languages.Japanese,
  ]
)) as Array<translator.translatedObject>; // FOR JAVASCRIPT YOU DO NOT NEED TO SPECIFY THE TYPE
/*
french: 
{
  "login": {
    "title": "Connexion",
    "email": "S'il vous plaît, entrez votre email",
    "failure": "Manquée"
  },
  "edit_screen": {
    "edit": "Modifier vos informations",
    "number_editor": [
      {
        "title": "Modifier le numéro 1",
        "button": "Éditer 1"
      }
    ]
  }
}

georgian: 
{
  "login": {
    "title": "Შესვლა",
    "email": "გთხოვთ, შეიყვანეთ თქვენი ელ",
    "failure": "მცდელობა"
  },
  "edit_screen": {
    "edit": "თქვენი ინფორმაციათა რედაქტირება",
    "number_editor": [
      {
        "title": "რედაქტირების ნომერი 1",
        "button": "რედაქტირება 1"
      }
    ]
  }
}

japanese:
{
  "login": {
    "title": "ログイン",
    "email": "あなたのメールアドレスを入力してください",
    "failure": "失敗した"
  },
  "edit_screen": {
    "edit": "あなたの情報を編集します",
    "number_editor": [
      {
        "title": "番号1を編集します",
        "button": "編集1を編集します"
      }
    ]
  }
}
*/
```

## **4. Translate JSON file (supports deep objects)**

- Import the library to your code.

For JavaScript

```javascript
const translator = require('@parvineyvazov/json-translator');
```

For TypeScript:

```typescript
import * as translator from '@parvineyvazov/json-translator';
```

```typescript
/*
Let`s translate our json file into another language and save it into the same folder of en.json
*/

let path = 'C:/files/en.json'; // PATH OF YOUR JSON FILE (includes file name)

await translator.translateFile(
  path,
  translator.languages.English,
  translator.languages.German
);
```

```bash
── files
   ├── en.json
   └── de.json
```

---

## **5. Translate JSON file into Multiple languages (supports deep objects)**

- Import the library to your code.

For JavaScript

```javascript
const translator = require('@parvineyvazov/json-translator');
```

For TypeScript:

```typescript
import * as translator from '@parvineyvazov/json-translator';
```

```typescript
/*
Let`s translate our json file into multiple languages and save them into the same folder of en.json
*/

let path = 'C:/files/en.json'; // PATH OF YOUR JSON FILE (includes file name)

await translator.translateFile(path, translator.languages.English, [
  translator.languages.Cebuano,
  translator.languages.French,
  translator.languages.German,
  translator.languages.Hungarian,
  translator.languages.Japanese,
]);
```

```bash
── files
   ├── en.json
   ├── ceb.json
   ├── fr.json
   ├── de.json
   ├── hu.json
   └── ja.json
```

## **6. Ignore words**

To ignore words on translation use `{{word}}` OR `{word}` style on your object.

```
{
  "one": "Welcome {{name}}",
  "two": "Welcome {name}",
  "three": "I am {name} {{surname}}"
}

...translating to spanish

{
  "one": "Bienvenido {{name}}",
  "two": "Bienvenido {name}",
  "three": "Soy {name} {{surname}}"
}
```

- jsontt also ignores the `URL` in the text which means sometimes translations ruin the URL in the given string while translating that string. It prevents such cases by ignoring URLs in the string while translating.

  - You don't especially need to do anything for it, it ignores them automatically.

```
{
  "text": "this is a puppy https://shorturl.at/lvPY5"
}

...translating to german

{
  "text": "das ist ein welpe https://shorturl.at/lvPY5"
}
```

## **7. CLI commands**

- translate

```bash
jsontt file.json
```

```bash
jsontt folder/file.json
```

```bash
jsontt "folder\file.json"
```

```bash
jsontt "C:\folder1\folder\en.json"
```

- with proxy

```bash
jsontt file.json proxy.txt
```

Result will be in the same folder as the original JSON file.

<br>

- help

```bash
jsontt -h
```

```bash
jsontt --help
```

## How to contribute?

- Clone it

```
git clone https://github.com/mololab/json-translator.git
```

- Install dependencies (with using yarn - [install yarn if you don't have](https://classic.yarnpkg.com/lang/en/docs/install))

```
yarn
```

- Show the magic:

  - Update CLI

    Go to file `src/cli/cli.ts`

  - Update translation

    Go to file `src/core/core.ts`

  - Update JSON operations(deep dive, send translation request)

    Go to file `src/core/json_object.ts`

  - Update JSON file read/write operations

    Go to file `src/core/json_file.ts`

  - Update ignoring values in translation (map/unmap)

    Go to file `src/core/ignorer.ts`

- Check CLI locally

For checking CLI locally we need to `link` the package using `npm`

```
npm link
```

Or you can run the whole steps using make

```
make run-only-cli
```

Make sure your terminal has admin access while running these commands to prevent any access issues.

## **🏞 Roadmap🏁**

:heavy_check_mark: Translate a word | sentence

</br>

- for JSON objects

:heavy_check_mark: Translate JSON object

:heavy_check_mark: Translate deep JSON object

:heavy_check_mark: Multi language translate for JSON object

- [ ] Translate JSON object with extracting OR filtering some of its fields

</br>

- for JSON files

:heavy_check_mark: Translate JSON file

:heavy_check_mark: Translate deep JSON file

:heavy_check_mark: Multi language translate for JSON file

- [ ] Translate JSON file with extracting OR filtering some of its fields

</br>

- General

:heavy_check_mark: CLI support

:heavy_check_mark: Safe translation (Checking undefined, long, or empty values)

:heavy_check_mark: Queue support for big translations

:heavy_check_mark: Informing the user about the translation process (number of completed ones, the total number of lines and etc.)

:heavy_check_mark: Ignore value words in translation (such as ignore {{name}} OR {name} on translation)

:heavy_check_mark: Libre Translate option (CLI)

:heavy_check_mark: Argos Translate option (CLI)

:heavy_check_mark: Bing Translate option (CLI)

:heavy_check_mark: Ignore URL translation on given string

- [ ] Libre Translate option (in code package)

- [ ] Argos Translate option (in code package)

- [ ] Bing Translate option (in code package)

- [ ] ChatGPT support

- [ ] Sync translation

- [ ] Browser support

- [ ] Translation Option for own LibreTranslate instance

## License

**_@parvineyvazov/json-translator_** will be available under the [MIT license](LICENSE).
