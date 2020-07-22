## 原生 JavaScript

### 基本数据类型

Number String Bool Null undefined Object Symbol

### let var 区别

- var 的作用域是当前声明的执行上下文，let 的作用域则是块
- [`var`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/statements/var)声明的变量只能是全局或者整个函数块的。 [`var`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/statements/var) 和 `let` 的不同之处在于后者是在编译时才初始化

- var 有变量提升，而 let 则没有

- var 可以重复定义，但是在一个 scope 内，重复定义也只是那一个变量，而重复定义`let` 变量则会引起 TypeError 错误

### 什么是闭包

**「函数」和「函数内部能访问到的变量」（也叫环境）的总和，就是一个闭包。**

```javascript
function fn1() {
  let name = "shixi";
  function fn2() {
    console.log(name);
  }
  return fn2;
}
var fn3 = fn1();
fn3();
```

函数 fn2 和 fn2 内部 可以访问到的 name (可以打印出) 的总和，就是一个闭包。

[JS 中的闭包是什么 - 方应杭](https://zhuanlan.zhihu.com/p/22486908)

### this 是什么

1. 「 箭头函数 」内的 this 就是外面的 this

2. 「 new 绑定 」函数是否在 new 中调用 ？ 如果是，this 绑定的即是 新创建的对象

   var bar = new foo() this === bar

3. 「 显式绑定 」函数是否通过 call 、apply、 bind 绑定？this 绑定的时第一个参数

   var bar = foo.call(obj) this === foo

4. 「 隐式绑定 」 函数是否在某个上下文中调用？ 是的话，this 绑定的是那个上下文对象

   var bar = obj.foo() this === obj

5. 「 默认绑定」如果都不是，那么就是默认绑定。严格模式绑定到 undefined ，否则绑定到 全局对象

   var bar = foo() this ==== window/undefined

详解: [JS 中的 this 到底是什么](https://juejin.im/post/5ca4889b6fb9a05e4b05bd17)

### 用正则实现 trim()

```javascript
String.prototype.trim = function () {
  return this.replace(/^\s+|\s+$/g, "");
};

function trim(string) {
  return string.replace(/^\s+|\s+$/g, "");
}
```

### ES6 语法用过哪些

let const 箭头函数 模板字符串 解构赋值 默认参数 ... 剩余参数

for..of... Object.keys Object.values async/await

Promise

### 如何在当前 JS 文件中使用其他 JS 文件的变量

EventHub

### 如何给数组添加新的方法?

使用 `prototype`

```javascript
Array.prototype.sum = function () {
  return this[0] + this[1];
};
```

### 数组去重

```javascript
// 使用 `Set`
const newArr = Array.from(new Set([1, 2, 3, 4, 4, 4, 1]));

// 使用 `indexOf`
const unique = function (arr) {
  const newArray = [];
  arr.forEach((item) => {
    if (newArray.indexOf(item) === -1) {
      newArray.push(item);
    }
  });
  return newArray;
};

// 使用 `sort`
const unique = function (data) {
  const newArray = [];
  let arr = data;
  arr.sort();
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== arr[i + 1]) {
      newArray.push(arr[i]);
    }
  }
  return newArray;
};
```

### == 和 === 区别

=== 叫做严格运算符

== 叫做相等运算符

### undefined 和 null 区别

`null` 表示没有对象，即该出不应该有值，一般用法：

- 作为函数的参数，表示该函数的参数不是对象
- 作为对象原型链的终点

`undefined` 表示缺少值，就是此处应该有值，但是没有值，典型用法：

    - 变量被声明了，但没有赋值时，就等于undefined。
    - 调用函数时，应该提供的参数没有提供，该参数等于undefined。
    - 对象没有赋值的属性，该属性的值为undefined。
    - 函数没有返回值时，默认返回 un defined。

### 图片懒加载

`Intersection Observer` 判断是否可见

默认当图片不显示时，`src` 留空 或者 `src` 设置缩略图，然后设置一个 data-src ，并且设置一个 `class` 在页面加载完后，需要把所有的懒加载图进行筛选，判断所有的图片是否在可视区，如果在可视区就把 `data-src` 的值赋给 `src`，滚动时也是相同的。

### EventLoop 事件循环 微任务宏任务

### 前端如何解决跨域问题

jsonp iframe proxy nginx 反向代理 websocket

### 洋葱模型

类似于柯里化，内层中间件返回的值作为外层中间件的参数

### Promise

​

1. Promise 用法

   ```js
    function fn(){
        return new Promise((resolve, reject)=>{
          resolve() 成功调用
          reject()  失败调用
        })
    }
    fn().then(success, fail).then(success2, fail2)
   ```

2. Promise.all

   ```js
   Promise.all([promise1, promise2]).then(success1, fail1);
   ```

   promise1 和 promise2 都成功才会调用 success1，否则调用 fail1

3. 背代码 Promise.race 用法

   ```js
   Promise.race([promise1, promise2]).then(success1, fail1);
   ```

   promise1 和 promise2 只要有一个成功就会调用 success1；

   promise1 和 promise2 只要有一个失败就会调用 fail1；

   总之，谁第一个成功或失败，就认为是 race 的成功或失败。

[Promise - MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)

## 手写系列

### 手写 EventHub

```typescript
const EventHub = {
  cache: {},
  on(eventName: string, fn: EventHubFn) {
    this.cache[eventName] = this.cache[eventName] || [];
    this.cache[eventName].push(fn);
  },
  emit(eventName: string, data?: unknown) {
    (this.cache[eventName] || []).forEach((fn) => {
      fn(data);
    });
  },
  off(eventName: string, fn: EventHubFn) {
    this.cache[eventName] = this.cache[eventName] || [];
    let index = indexOf(this.cache[eventName], fn);
    console.log(index);
    if (index === -1) {
      return;
    }
    this.cache[eventName].splice(index, 1);
  },
};

interface EventHubFn {
  (data: unknown): void;
}

function indexOf(arr, fn) {
  let index = -1;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === fn) {
      index = i;
      break;
    }
  }
  return index;
}
```

### 手写节流

```typescript
function throttle(fn, delay) {
  let canUse = true;
  return function () {
    if (canUse) {
      canUse = false;
      fn.call();
      setTimeout(() => {
        canUse = true;
      }, delay);
    }
  };
}

const throttled = throttle(() => console.log("throttled"), 1000);
```

### 手写防抖

```typescript
function debounce(fn, delay) {
  let timerId = null;
  return function () {
    const context = this;
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn.apply(context, arguments);
    }, delay);
  };
}
const debounced = debounce(() => console.log("debounced"), 3000);
```

### 如何实现继承

#### 使用 extends 关键字

```javascript
class Animal {
  constructor(color) {
    this.color = color;
  }
  move() {}
}
class Dog extends Animal {
  constructor(color, name) {
    super(color);
    this.name = name;
  }
  say() {}
}
```

#### 使用 「 原型链 」

```javascript
function Animal(color) {
  this.color = color;
}
Animal.prototype.move = function () {};
function Dog(color, name) {
  Animal.call(this, color); // 或者 Animal.apply(this, arguments)
  this.name = name;
}
// 下面三行实现 Dog.prototype.__proto__ = Animal.prototype
function temp() {}
temp.prototype = Animal.prototype;
Dog.prototype = new temp();

Dog.prototype.constuctor = Dog;
Dog.prototype.say = function () {
  console.log("汪");
};

const dog = new Dog("黄色", "阿黄");
```

### 手写 AJAX

```javascript
var request = new XMLHttpRequest();
request.open("GET", "/a/b/c?name=ff", true);
request.onreadystatechange = function () {
  if (request.readyState === 4 && request.status === 200) {
    console.log(request.responseText);
  }
};
request.send();
```

### 手写深拷贝

[深拷贝](https://github.com/fatfanfan/deepClone)

### 手写 bind

[bind](https://github.com/fatfanfan/bind)

### 手写 Promise

## Vue

### v-if 和 v-show 区别

- v-if 不会渲染元素

- v-show 会渲染元素到页面上，只是控制元素的 display

### location.href 和 vue-router 跳转有什么区别

`location.href` 刷新了页面

router 跳转不会刷新页面，静态跳转

### 生命周期

![Vue 实例生命周期](https://cn.vuejs.org/images/lifecycle.png)

### computed 、 watch 和 methods 区别

`computed` **计算属性是基于它们的响应式依赖进行缓存的**,只在相关响应式依赖发生改变时它们才会重新求值，当依赖性没有变化时，多次访问计算属性会立即返回缓存的结果。

`watch` 侦听属性 对数据进行侦听，来进行其他操作

`methods` 方法 每次调用都会重新计算

### 项目中有多个环境怎么处理

使用 `.env` `.env.development` `.env.production`

```javascript
VUE_APP_BASE_URL = url; //开发环境的 url
```

### v-for 为什么加上唯一 key ?

`key` 的特殊 attribute 主要用在 Vue 的虚拟 DOM 算法，在新旧 nodes 对比时辨识 VNodes。如果不使用 key，Vue 会使用一种最大限度减少动态元素并且尽可能的尝试就地修改/复用相同类型元素的算法。而使用 key 时，它会基于 key 的变化重新排列元素顺序，并且会移除 key 不存在的元素。

有相同父元素的子元素必须有**独特的 key**。重复的 key 会造成渲染错误。

### MVC 和 MVVM

#### MVC 简介

Model 模型是应用程序中用于处理应用程序数据逻辑的部分

View 视图是应用程序中处理数据显示的部分

Controller 控制器是应用程序中处理用户交互的部分

#### MVVM 简介

Model 数据模型

View 视图 它包括一些数据绑定事件和行为

ViewModel 负责将 model 的变换反应到 View 上，而 View 有变化时，也会同步 Model 变化

### Vuex 包括哪些内容

State Getter Mutation Action Module

Mutation 一般做同步修改

Action 异步请求

Module 数据模块化

### VueRouter 常用

History 模式 / Hash 模式 / 导航守卫/ 路由懒加载/路由元信息

`router-link` `router-view`

`this.$router` 方法

`this.$route` 路由对象

### VueRouter 钩子介绍

**完整的导航解析流程**

1. 导航被触发。
2. 在失活的组件里调用 `beforeRouteLeave` 守卫。
3. 调用全局的 `beforeEach` 守卫。
4. 在重用的组件里调用 `beforeRouteUpdate` 守卫 (2.2+)。
5. 在路由配置里调用 `beforeEnter`。
6. 解析异步路由组件。
7. 在被激活的组件里调用 `beforeRouteEnter`。
8. 调用全局的 `beforeResolve` 守卫 (2.5+)。
9. 导航被确认。
10. 调用全局的 `afterEach` 钩子。
11. 触发 DOM 更新。
12. 用创建好的实例调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数。

### VueRouter 路由懒加载

```javascript
const Foo = () => import("./Foo.vue"); // 返回 Promise
```

### Vue 项目优化

[Vue 项目性能优化 — 实践指南 - 掘金](https://juejin.im/post/5d548b83f265da03ab42471d#heading-7)

## React

## HTTP

### HTTP 常用状态码

- 1xx 表示临时响应

- 2xx 表示成功处理
- 3xx 表示需要进一步操作
- 4xx 表示浏览器方面出错
- 5xx 表示服务器出错

[HTTP 状态码 -- MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status)

### HTTP 缓存有哪几种？

- `ETag` 是通过对比浏览器和服务器资源的特征值（如 MD5）来决定是否要发送文件内容，如果一样就只发送 304（not modified）

- `Expires` 是设置过期时间（绝对时间），但是如果用户的本地时间错乱了，可能会有问题

- `CacheControl`: max-age=3600 是设置过期时长（相对时间），跟本地时间无关。

### GET 和 POST 的区别

1. 错解，但是能过面试
   - GET 在浏览器回退时是无害的，而 POST 会再次提交请求。
   - GET 产生的 URL 地址可以被加入收藏栏，而 POST 不可以。
   - GET 请求会被浏览器主动 cache，而 POST 不会，除非手动设置。
   - GET 请求只能进行 url 编码，而 POST 支持多种编码方式。
   - GET 请求参数会被完整保留在浏览器历史记录里，而 POST 中的参数不会被保留。
   - GET 请求在 URL 中传送的参数是有长度限制的，而 POST 么有。
   - 对参数的数据类型，GET 只接受 ASCII 字符，而 POST 没有限制。
   - GET 比 POST 更不安全，因为参数直接暴露在 URL 上，所以不能用来传递敏感信息。
   - GET 参数通过 URL 传递，POST 放在 Request body 中。
2. 正解
   就一个区别：语义——GET 用于获取资源，POST 用于提交资源。

### Cookie V.S. LocalStorage V.S. SessionStorage V.S. Session

- Cookie V.S. LocalStorage
  1. 主要区别是 Cookie 会被发送到服务器，而 LocalStorage 不会
  2. Cookie 一般最大 4k，LocalStorage 可以用 5Mb 甚至 10Mb（各浏览器不同）
- LocalStorage V.S. SessionStorage
  1. LocalStorage 一般不会自动过期（除非用户手动清除），而 SessionStorage 在回话结束时过期（如关闭浏览器）
- Cookie V.S. Session
  1. Cookie 存在浏览器的文件里，Session 存在服务器的文件里
  2. Session 是基于 Cookie 实现的，具体做法就是把 SessionID 存在 Cookie 里

## 浏览器相关

### url 输入到页面显示全过程

- DNS 查询 DNS 缓存

- 建立 TCP 连接（三次握手）连接复用

- 发送 HTTP 请求（请求的四部分）

- 后台处理请求

  - 监听 80 端口

  - 路由

  - 渲染 HTML 模板

  - 生成响应

- 发送 HTTP 响应

- 关闭 TCP 连接（四次挥手）

- 解析 HTML

- 下载 CSS（缓存

- 解析 CSS

- 下载 JS（缓存

- 解析 JS

- 下载图片

- 解析图片

- 渲染 DOM 树

- 渲染样式树

- 执行 JS

### CSRF

跨站请求伪造，一般来说，攻击者通过伪造用户的浏览器的请求，向访问一个用户自己曾经认证访问过的网站发送出去，使目标网站接收并误以为是用户的真实操作而去执行命令。

防范

- 验证 HTTP Referer 字段
- 添加并验证 token csrf_token
- 添加自定义 http 请求头

### XSS

Cross-Site Scripting（跨站脚本攻击）简称 XSS，是一种代码注入攻击。攻击者通过在目标网站上注入恶意脚本，使之在用户的浏览器上运行。利用这些恶意脚本，攻击者可获取用户的敏感信息如 Cookie、SessionID 等，进而危害数据安全。

```javascript
<script>console.log(document.cookie)</script>
```

预防

- 不要使用 innerHTML，改成 innerText，script 就会被当成文本，不执行

- 如果你一样要用 innerHTML，字符过滤
- 使用 CSP Content Security Policy
