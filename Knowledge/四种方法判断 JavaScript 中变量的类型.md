# 四种方法判断 JavaScript 中变量的类型

## JavaScript 中的类型

- 基本类型
  - String
  - Number
  - Boolean
  - undefined
  - null
- 引用类型
  - Object

## typeof

**`typeof`** 操作符返回一个字符串，表示未经计算的操作数的类型。

```javascript
typeof 37 === "number";
typeof true === "boolean";
typeof "bla" === "string";
typeof Symbol() === "symbol";
typeof undefined === "undefined";
typeof null === "object"; // 类型的标签和实际数据值表示的  null 的类型标签是0 所以是 "object"
typeof { a: 1 } === "object";
typeof [1, 2, 4] === "object"; // 无法判断数组
typeof new Boolean(true) === "object";
typeof new Number(1) === "object";
typeof new String("abc") === "object";
typeof function () {} === "function";
```

typeof 主要用来判断基本类型，不能判断除了 function 之外的复杂类型，所以可以使用 instanceof 来判断复杂类型

## instanceof

**`instanceof`** **运算符**用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上。

> ```javascript
> object instanceof constructor;
> ```

`instanceof` 运算符用来检测 `constructor.prototype`是否存在于参数 `object` 的原型链上。

```javascript
let arr = [1, 2, 3];
arr instanceof Array; // true
arr instanceof Object; // true

let fn = function () {};
fn instanceof Function; // true
fn instanceof Object; // true

function Father() {}
function Son() {}
Son.prototype = new Father();

let son = new Son();
son instanceof Son; // true
son instanceof Father; // true
Object.getPrototypeOf(son) === Son.prototype;
Object.getPrototypeOf(son).__proto__ === Father.prototype;

let myString = new String();

myString instanceof String; // true
myString instanceof Object; // true

let myDate = new Date();
myDate instanceof Date; // true
myDate instanceof Object; // ture
```

## Object.prototype.toString.call()

- 语法 `obj.toString()`

- 返回值一个表示该对象的字符串。
- `toString()` 返回 "[object *type*]"，其中 `type` 是对象的类型

```javascript
let toString = Object.prototype.toString;

toString.call(999) // "[object Number]"
.toString.call('') // "[object String]"
toString.call(Symbol()) // "[object Symbol]"
toString.call(42) // "[object Number]"
toString.call(undefined); // [object Undefined]
toString.call(null); // [object Null]
toString.call(new Date; // [object Date]
toString.call(new String; // [object String]
toString.call(Math); // [object Math]
toString.call(function(){});  // [object Function]
toString.call([]) //[object Array]
```

## constructor

返回创建实例对象的 [`Object`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object) 构造函数的引用。

```javascript
var o = {};
o.constructor === Object; // true

var o = new Object();
o.constructor === Object; // true

var a = [];
a.constructor === Array; // true

var a = new Array();
a.constructor === Array; // true

var n = new Number(3);
n.constructor === Number; // true
```

## 面试题

### 如何判断一个对象是空对象？

- Object.keys() 判断返回值为空数组
- Object.values() 判断返回值为空数组
- Object.getOwnPropertyNames({}) 判断返回值为空数组

### 如何判断数组？

```javascript
[1, 2, 3] instanceof Array; // true
```

## 参考

- [typeof mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof)

- [instanceof mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof)

- [toString mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString)

- [constructor mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor)
