# Сильный Typescript

### Что такое Typescript

TypeScript — это язык программирования, в котором исправлены многие недостатки JavaScript. Код Typescript очень похож на код Javascript, поэтому если вы являетесь front-end разработчиком, то изучить Typescript будет достаточно просто.

Код на TypeScript компилируется в JS и подходит для разработки любых проектов под любые браузеры — тем более что можно выбрать версию JS, в которую будет компилироваться код. С ним проще писать большие и сложные проекты, поэтому их легче поддерживать, развивать, масштабировать и тестировать, чем на стандартном JavaScript.

У Typescript большое сообщество и поддержка, поэтому он очень быстро развивается. На 01.07.2022 кол-во скачиваний за неделю достигает *31,5 миллиона* (данные взяты с [сайта](https://www.npmjs.com/package/typescript)). Исходники Typescript можно найти по [ссылке](https://github.com/Microsoft/TypeScript).

![Снимок экрана 2022-07-01 115709](https://user-images.githubusercontent.com/46563672/176879652-16948c9a-57e2-40a8-95d0-520df409f732.png)


### История развития

Развитие TypeScript началось в конце 2012 года. Хотя он зародился в компании Microsoft, и его фактическим создателем является программист Андерс Хейлсберг. И уже с самого начала новый язык стал быстро распространяться в силу своей гибкости и производительности. Немало проектов, которые были написаны на JavaScript, стали переноситься на TypeScript.  

Однако, казалось бы, зачем нужен еще один язык программирования для клиентской стороны в среде Web, если со всей той же самой работой прекрасно справляется и традиционный JavaScript, который используется практически на каждом сайте, которым владеет множество разработчиков и поддержка которого в сообществе программистов довольно высока. Но TypeScript это не просто новый JavaScript.

Давайте разберёмся о преимуществах данного языка.

### Строгая типизация

Многие проблемы с Javascript связаны с его динамической типизацией. Это хорошо заметно на средних-больших проектах. В коде Javascript тяжело понять, какие данные хранит переменная, какие данные принимает и возвращает функция, пишется много ненадежного кода и многое другое. 

В TypeScript строгая типизация, которая помогает решать все проблемы выше, тем самым проекты разрабатываются быстрее и надежнее. 

В JavaScript используются разные типы данных, и при помощи Typescript можем описать их:

```tsx
// Primitives
const myNumber: number = 1;
const myString: string = "Hello World!"
const isTypescript: boolean = true;

// Object Types

type AnimalType = "fish" | "bird" | "beast" | "pet";

interface Animal {
	type: AnimalType;
	name: string;
	voice?: string;
}

const myAnimal: Animal = {
	type: "pet",
	name: "Cat",
	voice: "meow"
}

// Arrays

const languages: Array<string> = ["Javascript", "Typescript"];
const friends: string[] = ["Bob", "Tony", "Anna"];

// Functions

function greet(name: string) {
  console.log("Hello, " + name.toUpperCase() + "!!");
}

```

Больше информации можно найти в [официальной документации Typescipt](https://www.typescriptlang.org/).

### Улучшение возможностей ООП

В JS есть поддержка объектно-ориентированного программирования: классы, объекты, наследование, но TypeScript использует больше возможностей ООП.

**Интерфейсы**

```tsx
// Declaring the interface
interface Car {
	brand: string;
	model: string;
	speed: {
		value: number;
		unit: string;
	};
	weight: number;
}

// Creating classes that implement this interface

class Ford implements Car {
	brand: "Ford";
	model: "Mustang";
	speed: {
		value: 250,
		unit: "mph"
	},
	weight: 1500;
}

```

**Декораторы**

```tsx
function first() {
  console.log("first(): factory evaluated");
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("first(): called");
  };
}
 
function second() {
  console.log("second(): factory evaluated");
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("second(): called");
  };
}
 
class ExampleClass {
  @first()
  @second()
  method() {}
}

/*
Which would print this output to the console:
	first(): factory evaluated
	second(): factory evaluated
	second(): called
	first(): called
*/
```

**Enums**

```tsx
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}

enum FileAccess {
  None,
  Read = 1 << 1,
  Write = 1 << 2,
  ReadWrite = Read | Write,
  G = "123".length,
}
```

Больше информации можно найти в [официальной документации Typescipt](https://www.typescriptlang.org/).
