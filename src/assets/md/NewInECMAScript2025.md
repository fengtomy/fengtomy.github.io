# What's new in ECMAScript 2025

## Catalog

* [Set methods for JavaScript](#set-methods-for-javascript)
* [Iterator Helper](#iterator-helper)
* [Promise.try](#promisetry)
* [Import Attributes and JSON modules](#import-attributes-and-json-modules)
* Duplicate named capturing groups
* Regular Expression Pattern Modifiers
* Float16Array
* RegExp Escaping
* References

I will introduce several features that are used frequently IMO.

## Frequently used ones

### Set methods for JavaScript

* intersection
* union
* difference
* symmetricDifference
* isSubsetOf
* isSupersetOf
* isDisjointFrom

```javascript
const setOne = new Set([1,2,3])
const setTwo = new Set([3,4,5])

setOne.intersection(setTwo) // Set(1) {3}
setOne.union(setTwo) // Set(5) {1,2,3,4,5}
setOne.difference(setTwo) // Set(2) {1,2}
setOne.symmetricDifference(setTwo) // Set(4) {1,2,4,5}

setOne.isSubsetOf(setTwo) // false
setOne.isSuperset(setTwo) // false
setOne.isDisjointFrom(setTwo) // false
```

[Set MDN doc](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)

### Iterator Helper

* map
* filter
* take
* drop
* flatMap
* reduce
* toArray
* forEach
* some
* every
* find
* Iterator.from

```javascript
const iter = [..."ECMAScript2025"].values()
const iterNumeric = iter.filter((c) => /^\d$/.test(c))

iterNumeric.next() // { value: '2', done: false }
iterNumeric.next() // { value: '0', done: false }
iterNumeric.next() // { value: '2', done: false }
iterNumeric.next() // { value: '5', done: false }
iterNumeric.next() // { value: undefined, done: false }

const iterNumeric = iter.drop(10).take(4)

iterNumeric.next() // { value: '2', done: false }
iterNumeric.next() // { value: '0', done: false }
iterNumeric.next() // { value: '2', done: false }
iterNumeric.next() // { value: '5', done: false }
iterNumeric.next() // { value: undefined, done: false }
```

### Promise.try()

```javascript
const handleAction = (action) => {
  return action
    .then(console.log)
    .catch(console.error)
    finally(() => console.log('done'))
}

handleAction(() => "look ma, no promise")
// TypeError: action.then is not a function

const handleAction = (action) => {
  Promise.try(action)
    .then(console.log)
    .catch(console.error)
    finally(() => console.log('done'))
}
handleAction(() => "look ma, no promise")
// look ma, no promise
// done

handleAction(() => {
  throw "look me, no promise, but an error"
})
// look me, no promise, but an error
// done
```

### Import Attributes and JSON modules

```javascript
import data from "./data.json" with { type: "json" }

const data = await import("./data.json", { with: { type: "json" } })

export { data } from "./data.json" with { type: "json" }
```

## Will not be used often

Below are some features I think will not used too much in daily work. You can explore them in depth by yourself.

### Duplicate named capturing groups

### Regular Expression Pattern Modifiers

### Float16Array

### RegExp Escaping
