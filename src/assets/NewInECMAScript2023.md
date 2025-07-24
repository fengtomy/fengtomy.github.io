# What's new in ECMAScript 2023

## Array find from last

It adds `findLast` and `findLastIndex` methods on `Array` and `TypedArray` prototype.  
They do the same thing as `find` and `findIndex` but in reverse order.

```javascript
const isEven = (number) => number % 2 === 0;
const numbers = [1, 2, 3, 4];

console.log(numbers.find(isEven));
// 2
console.log(numbers.findIndex(isEven));
// 1

console.log(numbers.findLast(isEven));
// 4
console.log(numbers.findLastIndex(isEven));
// 3
```

## Hashbang Grammar

Hashbang, also known as a shebang, is a sequence of characters at the beginning of an executable script that defines the interpreter for the program to be run on.  
When the Unix kernel's program loader executes a JavaScript program, the host strips the hashbang to generate a valid source before passing it down to the engine.  
Hashbang Grammar proposal standardizes how it is done.

```javascript
#!/usr/bin/env node

console.log('hi 👋');
```

## Symbols as WeakMap keys

Previous versions or specifications allowed only Objects to be used as the `WeakMap` keys.  
This proposal adds non-registered Symbols to the list of allowed keys.

```javascript
const weak = new WeakMap();
const key = Symbol("ref");
weak.set(key, "ECMAScript 2023");

console.log(weak.get(key));
// ECMAScript 2023
```

## Change Array by Copy

`toReversed`, `toSorted`, `toSpliced`  
`with` returns a new array with the element at the given index replaced with the given value to avoid mutations in place using bracket notation.

```javascript
const original = [1, 2, 3, 4];
const reversed = original.toReversed();

console.log(original);
// [ 1, 2, 3, 4 ]
console.log(reversed);
// [ 4, 3, 2, 1 ]
```
```javascript
const original = [1, 3, 2, 4];
const sorted = original.toSorted();

console.log(original);
// [ 1, 3, 2, 4 ]

console.log(sorted);
// [ 1, 2, 3, 4 ]
```
```javascript
const original = [1, 4];
const spliced = original.toSpliced(1, 0, 2, 3);

console.log(original);
// [ 1, 4 ]

console.log(spliced);
// [ 1, 2, 3, 4 ]
```
```javascript
const original = [1, 2, 2, 4];
const withThree = original.with(2, 3);

console.log(original);
// [ 1, 2, 2, 4 ]

console.log(withThree);
// [ 1, 2, 3, 4 ]
```
