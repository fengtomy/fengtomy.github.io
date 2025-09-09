# Map in ECMA2015

#### 在es6之前，一般我们需要使用字典类数据时，都是定义一个对象变量来存储键值对。es6之后，有了map这个数据类型，结合个人的实践，我发现了map对比普通对象的几个优点，使用起来更加方便，也能避免一些普通对象造成的不是那么严重但是有点烦的问题。那么接下来我先介绍普通对象使用起来不方便的地方。

1 对象遍历

一般来说，普通方式来初始化一个对象，比如`const obj = {};`，`obj`会继承有`Object.prototype`（也可以说是原型）的方法或者属性。如果需要遍历该对象，`for in `方法会访问到原型链所有的可遍历属性，那么其实这种情况，很多时候我们是想避免的，因此我们又需要加一个`hasOwnProperty`来筛选当前的属性是在自己，还是在原型链上的，有一点烦。
```javascript
const obj = { a: 1 };
for (let prop in obj) {
  // to check if in obj itself
  if (obj.hasOwnProperty(prop)) {
    console.log(prop); // a
  }
  // here are some properties/methods in Object.prototype(prototype chain)
  // eg. toString(), valueOf(),
}
```
这也意味着，我们定义了一个空对象，却意外获取到了些不是自己的属性。此时我又有了一个方法，我们可以把原型设置为null,`const obj = Object.create(null);`，哈哈哈反正我能解决这个问题。又或者我可以用es6的`Object.keys()`方法，使用该方法得到的自身的属性组成的数组，而不存在原型链上的属性。
```javascript
const obj = { a: 1, b: 2 };
const keys = Object.keys(obj); // ["a", "b"] compare with the code above
```
2 属性值的重写和改动

对于普通对象，我们可以轻易改动或者删除它的对象，比如往`Object.prototype`添加一些方法，或者重写对象从原型继承来的方法。而且对象的属性不支持非普通数据类型，比如用对象来作为某个对象的属性。
```javascript
const obj = {};
obj.toString = null;
obj.toString(); // Uncaught TypeError: obj.toString is not a function
Object.prototype.IDontKnowWhyButIWantToAddThisMethod = function() {};
obj.IDontKnowWhyButIWantToAddThisMethod(); // wow, perfect
obj[obj] = "Something wild"; // obj["[object Object]"] = "Something wild"
```
是不是会感觉到，我们用对象来描述键值对的数据类型，感觉有那么一点不安全，有点冒险（当然在实际项目中，不会有这么夸张）。那我们有map，可以很轻易的避免这些问题。

3 逃离普通对象，转战Map

好在我们现在一般开发都可以用工具来把es6编译成es5，来提升对浏览器的适配，同时也给我们赋能，让我们能够用更便利的api来实现我们的功能，比如用Map类来描述字典类型的键值对数据更形象更适配。
Map原型有set/get/size/has/delete/clear等方法，这里简单介绍下。
```javascript
const map = new Map();
map.set("name", "tomy");
map.set("age", 30);

// we can also pass a nested array to the constructor as the arguments
const map1 = new Map([["a", "b"], ["c", "d"]]);
// "a" and "c" are like the prop, "b" and "d" are the value

// we can also make some interesting properties
map.set(true, "1");
const obj = {};
map.set(obj, "This prop is Object");
// not something like map["[object Object]"] = "This prop is Object";
map.get(true);
map.get(obj); // "This prop is Object"

// when we want to get some properties and values
map.get("name");
map.get("age");

// when we want to check whether a prop is in map
map.has("name"); // true
map.has("age"); // false

// when we want to delete prop
map.delete("name");

// when we want to clear all props
map.clear();
```

#### 总结
综上所述，我们是不是应该在某些场景下使用map来替代普通对象作为描述字典类型的数据呢。使用Map可以避免一些由js继承带来的问题，比如原型链上的属性，比如对原型方法的改动，或者直接改动对象的原型进而产生一些额外的问题。如果觉得本文对你有帮助，请点个赞。如果有什么疑问或者建议请与我联系，留下您的评论。谢谢