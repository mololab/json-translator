# <p align="center"> **🚀 FREE JSON TRANSLATOR 🆓** </p>

### **\*_NOT RELEASED YET_**

This library will provide you to translate your JSON files or objects into different languages using Google Translate API.

# **✅ Install**

```bash
...coming soon
```

# **💥 Usage**

## **1. Translate a word | sentence**

- Import the library to your code

```typescript
import * as translator from '@parvineyvazov/json-translator';
import { languages } from '@parvineyvazov/json-translator/dist/languages';
```

```typescript
// Let`s translate `Home sweet home!` string from English to Chinese

// -- AWAIT Syntax
const my_str = await translator.translateWord(
  'Home sweet home!',
  languages.English,
  languages.Chinese_Simplified
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
    languages.English,
    languages.Chinese_Simplified
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
import { languages } from '@parvineyvazov/json-translator/dist/languages';
import { translatedObject } from '@parvineyvazov/json-translator/dist/types';
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

const old_object: translatedObject = {
  greeting: `Hello!`,
  farewell: `Bye!`,
};

// -- AWAIT Syntax
let new_object = await translator.translateObject(
  old_object,
  languages.English,
  languages.Spanish
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
let new_object: translatedObject;

translator
  .translateObject(
    {
      greeting: `Hello!`,
      farewell: `Bye!`,
    },
    languages.English,
    languages.Spanish
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

## License

**_@parvineyvazov/json-translator_** will be available under the [MIT license](LICENSE).
