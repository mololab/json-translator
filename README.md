# <p align="center"> **🚀 FREE JSON TRANSLATOR 🆓** </p>

This package will provide you to translate your JSON files or objects into different languages using Google Translate API in your **Node applications**. (Browser support will come soon...)

[**_Supported languages_**](./docs/LANGUAGES.md#supported-languages-)

# **✅ Install**

```bash
npm i @parvineyvazov/json-translator
```

# **💥 Usage**

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

// -- AWAIT Syntax
const my_str = await translator.translateWord(
  'Home sweet home!',
  translator.languages.English,
  translator.languages.Chinese_Simplified
);

// my_str: 家，甜蜜的家！
```

OR

```typescript
// Let`s translate `Home sweet home!` string from English to Chinese

// -- ASYNC Syntax
let my_str: string;

translator
  .translateWord(
    'Home sweet home!',
    translator.languages.English,
    translator.languages.Chinese_Simplified
  )
  .then(translate_str => {
    my_str = translate_str;
  })
  .catch(error => {
    throw new Error(`Error on translate: ${error}`);
  });

// my_str: 家，甜蜜的家！
```

---

## **2. Translate JSON object (supports deep objects)**

- Import the library to your code

```typescript
import * as translator from '@parvineyvazov/json-translator';
```

```typescript
/*
Let`s translate our deep object from English to Spanish
*/

const en_lang: translator.translatedObject = {
  login: {
    title: 'Login',
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

// -- AWAIT Syntax
let es_lang = await translator.translateObject(
  en_lang,
  translator.languages.English,
  translator.languages.Spanish
);
/*
es_lang:
            {
              "login": {
                "title": "Acceso",
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

OR

```typescript
/* 
Let`s translate object from English to Japanese
*/

// -- ASYNC Syntax
let ja_lang!: translator.translatedObject; // add "!" to the beginning of the variable to avoid "used before assigned" error

const en_lang: translator.translatedObject = {
  login: {
    title: 'Login',
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
FOR JavaScript (no interface):
      let new_object;
*/

translator
  .translateObject(
    en_lang,
    translator.languages.English,
    translator.languages.Japanese
  )
  .then(response_object => {
    ja_lang = response_object;
  });

/*
ja_lang:
            {
              "login": {
                "title": "ログイン",
                "email": "あなたのメールアドレスを入力してください",
                "failure": "失敗した"
              },
              "homepage": {
                "welcoming": "いらっしゃいませ！",
                "title": "長い、健康的に生きている！"
              },
              "profile": {
                "edit_screen": {
                  "edit": "あなたの情報を編集します",
                  "edit_age": "年齢を編集します",
                  "number_editor": [
                    {
                      "title": "番号1を編集します",
                      "button": "編集1を編集します"
                    },
                    {
                      "title": "番号2を編集",
                      "button": "編集2を編集する"
                    }
                  ]
                }
              }
            }
*/
```

## **🏞 Roadmap🏁**

:heavy_check_mark: Translate a word | sentence

:heavy_check_mark: Translate JSON object

:heavy_check_mark: Translate deep JSON objects

- [ ] Translate JSON object with extracting OR filtering some of its fields

- [ ] Translate JSON file
- [ ] Translate JSON file with extracting OR filtering some of its fields
- [ ] Translate nested JSON file

- [ ] Multi language translate
- [ ] CLI support for all above
- [ ] Browser support

## License

**_@parvineyvazov/json-translator_** will be available under the [MIT license](LICENSE).
