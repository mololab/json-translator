# <p align="center"> **🚀 FREE JSON TRANSLATOR 🆓** </p>

This library will provide you to translate your JSON files or objects into different languages using Google Translate API.

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

## **2. Translate JSON object**

- Import the library to your code

```typescript
import * as translator from '@parvineyvazov/json-translator';
```

```typescript
/*
Let`s translate
    {
        greeting: `Hello!`,
        farewell: `Bye!`
    }
object from English to Spanish
*/

const old_object: translator.translatedObject = {
  greeting: `Hello!`,
  farewell: `Bye!`,
};

/*
FOR JavaScript (no interface):

    const old_object = {
      greeting: `Hello!`,
      farewell: `Bye!`,
    };
*/

// -- AWAIT Syntax
let new_object = await translator.translateObject(
  old_object,
  translator.languages.English,
  translator.languages.Spanish
);
/*
new_object:
            {
                greeting: '¡Hola!',
                farewell: '¡Chau!'
            }
*/
```

OR

```typescript
/* 
Let`s translate 
    {
        greeting: `Hello!`,
        farewell: `Bye!`
    }
object from English to Spanish
*/

// -- ASYNC Syntax
let new_object: translator.translatedObject;

/*
FOR JavaScript (no interface):
      let new_object;
*/

translator
  .translateObject(
    {
      greeting: `Hello!`,
      farewell: `Bye!`,
    },
    translator.languages.English,
    translator.languages.Spanish
  )
  .then(response_object => {
    new_object = response_object;
  });

/* 
new_object:
            {
                greeting: '¡Hola!', 
                farewell: '¡Chau!' 
            }
*/
```

## **🏞 Roadmap🏁**

:heavy_check_mark: Translate a word | sentence

:heavy_check_mark: Translate JSON object

- [ ] Translate JSON object with extracting OR filtering some of its fields
- [ ] Translate nested JSON object

- [ ] Translate JSON file
- [ ] Translate JSON file with extracting OR filtering some of its fields
- [ ] Translate nested JSON file

- [ ] Multi language translate
- [ ] CLI support for all above

## License

**_@parvineyvazov/json-translator_** will be available under the [MIT license](LICENSE).
