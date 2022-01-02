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

---

## **3. Translate JSON object into Multiple languages (supports deep objects)**

You can translate your JSON object into multiple languages in the same time

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
Let`s translate our object from English to French, Japanese and Italian in the same time:
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

- [ ] Translate JSON file
- [ ] Translate deep JSON file
- [ ] Multi language translate for JSON file
- [ ] Translate JSON file with extracting OR filtering some of its fields

- General

- [ ] CLI support for all above
- [ ] Browser support

## License

**_@parvineyvazov/json-translator_** will be available under the [MIT license](LICENSE).
