# What's new in ECMAScript 2024

## Catalog

* [Well-Formed Unicode Strings](#well-formed-unicode-strings)
* [RegExp v flag with set notion and properties of string](#regexp-v-flag-with-set-notion-and-properties-of-strings)
* [Checks against a subset of Unicode string properties](#checks-against-a-subset-of-unicode-string-properties)
* [In-Place Resizable and Growable ArrayBuffers](#in-place-resizable-and-growable-arraybuffers)
* [ArrayBuffer transfer](#arraybuffer-transfer)
* [Array grouping](#array-grouping)
* [Promise.withResolvers](#promisewithresolvers)
* Asynchronous atomic wait

## Well-Formed Unicode Strings

```javascript
'a'.length // 1
'a'.split('') // ['a']

'🥑'.length // 2
'🥑'.split('') //[ '\ud83e', '\udd51' ] 👈 surrogate pair
```
```javascript
// after
'\ud83e\udd51' // 🥑

'\ud83e\udd51'.isWellFormed() // true

'\ud83e'.isWellFormed() // without trailing surrogate
// false

'\ud83e'.toWellFormed() // �
```

## RegExp v flag with set notion and properties of strings

```javascript
// `u` and `v` modes are similar, but they cannot be combined
const pattern = /./vu;
// SyntaxError: Invalid regular expression: invalid flags
```

## Checks against a subset of Unicode string properties

The new `v` Regex mode enables three features: checks against a subset of Unicode string properties, performs subtraction/intersection/union matching and improves case-insensitive matching.

```javascript
const patternMath = /\p{Math}/u;
const patternDash = /\p{Dash}/u;
const patternHex = /\p{ASCII_Hex_Digit}/u;

patternMath.test('+'); // true
patternMath.test('z'); // false

patternDash.test('-'); // true
patternDash.test('z'); // false

patternHex.test('f'); // true
patternHex.test('z'); // false
```

## In-Place Resizable and Growable ArrayBuffers

```javascript
const buffer = new ArrayBuffer(8, { maxByteLength: 16 })

buffer.resizable // true
buffer.byteLength // 8
buffer.maxByteLength // 16

buffer.resize(16)

buffer.byteLength // 16
buffer.maxByteLength // 16
```

## ArrayBuffer transfer

It adds abilities to transfer their ownership.  
The `transfer` or `transferToFixedLength` methods allows us to relocate bytes depending on the destination.  
A new `detached` getter is a new native solution for checking deallocated buffers.

```javascript
const buffer = new ArrayBuffer()
buffer.detached // false

const newBuffer = buffer.transfer()
buffer.detached // true
```

## Array grouping

`Object.groupBy` and `Map.groupBy`

```javascript
const langs = [
  { name: "Rust", compiled: true, released: 2015 },
  { name: "Go", compiled: true, released: 2009 },
  { name: "JavaScript", compiled: false, released: 1995 },
  { name: "Python", compiled: false, released: 1991 },
];

const callback = ({ compiled }) => (compiled ? "compiled" : "interpreted");
const langsByType = Object.groupBy(langs, callback);

console.log({ langsByType });
// {
//   compiled: [
//     { name: "Rust", compiled: true, released: 2015 },
//     { name: "Go", compiled: true, released: 2009 }
//   ],
//   interpreted: [
//     { name: "JavaScript", compiled: false, released: 1995 },
//     { name: "Python", compiled: false, released: 1991 }
//   ]
// }
```

## Promise.withResolvers

You can use it to avoid nesting in the promise executor, although it shines when you need to pass resolve or reject to multiple callers.  
Working with stream or event-based systems is an excellent use case.

```javascript
function createEventsAggregator(eventsCount) {
  const events = [];
  const { promise, resolve, reject } = Promise.withResolvers();

  return {
    add: (event) => {
      if (events.length < eventsCount) events.push(event);
      if (events.length === eventsCount) resolve(events);
    },
    abort: () => reject("Events aggregation aborted."),
    events: promise,
  };
}

const eventsAggregator = createEventsAggregator(3);

eventsAggregator.events
  .then((events) => console.log("Resolved:", events))
  .catch((reason) => console.error("Rejected:", reason));

eventsAggregator.add("event-one");
eventsAggregator.add("event-two");
eventsAggregator.add("event-three");

// Resolved: [ "event-one", "event-two", "event-three" ]
```

## Asynchronous atomic wait
