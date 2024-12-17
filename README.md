# support <a href="https://www.buymeacoffee.com/parvineyvazov" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

- [Contact with me on Twitter](https://twitter.com/messages/compose?recipient_id=1035556159023927297) to advertise your project on jsontt cli

<p align="center">
    <span align="center">✨ Sponsored by fotogram.ai - Transform Your Selfies into Masterpieces with AI ✨</span>
</p>

<p align="center">
    <span align="center">✨ https://fotogram.ai ✨</span>
</p>

<p align="center" >
    <img src="https://i.hizliresim.com/stgrebn.png" alt="jsontt logo" width="150" />
</p>

# <p align="center"> **🚀 AI / FREE JSON & YAML TRANSLATOR 🆓** </p>

<p align="center">
  <a href="https://npmcharts.com/compare/@parvineyvazov/json-translator?minimal=true">
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

This package will provide you to translate your JSON/YAML files or JSON objects into different languages FREE.

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)](#table-of-contents)

### 🥷 CLI Support:

|    Translation Module    | Support |                   FREE                    |
| :----------------------: | :-----: | :---------------------------------------: |
|     Google Translate     |   ✅    |                 `✅ FREE`                 |
|    Google Translate 2    |   ✅    |                 `✅ FREE`                 |
| Microsoft Bing Translate |   ✅    |                 `✅ FREE`                 |
|     Libre Translate      |   ✅    |                 `✅ FREE`                 |
|     Argos Translate      |   ✅    |                 `✅ FREE`                 |
|     DeepL Translate      |   ✅    | `require API KEY (DEEPL_API_KEY as env)` </br> `optional API URL (DEEPL_API_URL as env)`  |
|          gpt-4o          |   ✅    | `require API KEY (OPENAI_API_KEY as env)` |
|      gpt-3.5-turbo       |   ✅    | `require API KEY (OPENAI_API_KEY as env)` |
|          gpt-4           |   ✅    | `require API KEY (OPENAI_API_KEY as env)` |
|       gpt-4o-mini        |   ✅    | `require API KEY (OPENAI_API_KEY as env)` |

### ⏳ Package Support:

|    Translation Module    | Support |                   FREE                    |
| :----------------------: | :-----: | :---------------------------------------: |
|     Google Translate     |   ✅    |                 `✅ FREE`                 |
|    Google Translate 2    |   ✅    |                 `✅ FREE`                 |
| Microsoft Bing Translate |   ✅    |                 `✅ FREE`                 |
|     Libre Translate      |   ✅    |                 `✅ FREE`                 |
|     Argos Translate      |   ✅    |                 `✅ FREE`                 |
|     DeepL Translate      |   ✅    | `require API KEY (DEEPL_API_KEY as env)` </br> `optional API URL (DEEPL_API_URL as env)`  |
|          gpt-4o          |   ✅    | `require API KEY (OPENAI_API_KEY as env)` |
|      gpt-3.5-turbo       |   ✅    | `require API KEY (OPENAI_API_KEY as env)` |
|          gpt-4           |   ✅    | `require API KEY (OPENAI_API_KEY as env)` |
|       gpt-4o-mini        |   ✅    | `require API KEY (OPENAI_API_KEY as env)` |

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

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)](#table-of-contents)

# **1. 💫 CLI Usage**

```bash
jsontt <your/path/to/file.json>
or
jsontt <your/path/to/file.yaml/yml>
```

## How to use it? (video below)

[![how to use jsontt](https://img.youtube.com/vi/A_12HaEj35Q/0.jpg)](https://www.youtube.com/watch?v=A_12HaEj35Q)

## Arguments

- `[path]`: Required JSON/YAML file path `<your/path/to/file.json>`
- `[path]`: optional proxy list txt file path `<your/path/to/proxy_list.txt>`

## Options

```
  -V, --version                     output the version number
  -m, --module <Module>             specify translation module
  -f, --from <Language>             from language
  -t, --to <Languages...>           to translates
  -n, --name <string>               optional ↵ | output filename
  -fb, --fallback <string>          optional ↵ | fallback logic,
                                    try other translation modules on fail | yes, no | default: no
  -cl, --concurrencylimit <number>  optional ↵ | set max concurrency limit
                                    (higher faster, but easy to get banned) | default: 3
  -c, --cache                       optional ↵ | enabled cache | default: no
  -h, --help                        display help for command
```

## Examples

Translate a JSON file using Google Translate:

```bash
jsontt <your/path/to/file.json> --module google --from en --to ar fr zh-CN
```

- with output name

```bash
jsontt <your/path/to/file.json> --module google --from en --to ar fr zh-CN --name myFiles
```

- with fallback logic (try other possible translation modules on fail)

```bash
jsontt <your/path/to/file.json> --module google --from en --to ar fr zh-CN --name myFiles --fallback yes
```

- set concurrency limit (higher faster, but easy to get banned | default: 3)

```bash
jsontt <your/path/to/file.json> --module google --from en --to ar fr zh-CN --name myFiles --fallback yes --concurrencylimit 10
```

### other usage examples

- translate (json/yaml)

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

- with proxy (only Google Translate module)

```bash
jsontt file.json proxy.txt
```

Result will be in the same folder as the original JSON/YAML file.

<br>

- help

```bash
jsontt -h
```

```bash
jsontt --help
```

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)](#table-of-contents)

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

await translator.translateFile(path, translator.languages.English, [
  translator.languages.German,
]);
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

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)](#table-of-contents)

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

    Go to file `src/modules/functions.ts`

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

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)](#table-of-contents)

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

:heavy_check_mark: CLI options for languages & source selection

:heavy_check_mark: Define output file names on CLI (optional command for CLI)

:heavy_check_mark: YAML file Translate

:heavy_check_mark: Fallback Translation (try new module on fail)

:heavy_check_mark: Can set the concurrency limit manually

- [ ] Libre Translate option (in code package)

- [ ] Argos Translate option (in code package)

- [ ] Bing Translate option (in code package)


- [ ] Openrouter Translate module

- [ ] Cohere Translate module

- [ ] Anthropic/Claude Translate module

- [ ] Together AI Translate module

- [ ] llamacpp Translate module

- [ ] Google Gemini API Translate module

- [ ] Groq support - [Full list](https://console.groq.com/docs/models) as new Translate modules

:heavy_check_mark: ChatGPT support

- [ ] Sync translation

- [ ] Browser support

- [ ] Translation Option for own LibreTranslate instance

- [ ] Make "--" dynamically adjustable (placeholder of not translated ones).

- [ ] Update name -> prefix in CLI / Ability to pass empty to prefix in CLI (better for autonomous tasks)

- [ ] `--prettyPrint` to CLI which will print json in a pretty way 

## License

**_@parvineyvazov/json-translator_** will be available under the [MIT license](LICENSE).


<p align="center">
  <a href="#summary" target="_blank">
  <bold>Back To Top </bold>
  </a>
</p>
