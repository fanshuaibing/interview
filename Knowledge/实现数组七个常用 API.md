# 实现数组七个常用 API

## join(char)

```javascript
Array.prototype.join = function(char){
  let result = this[0] || ''
  let length = this.length
  for(let i=1; i< length; i++){
      result += char + this[i]
  }
  return result
}
```

## slice(begin, end)

**array.slice(beginIndex, endIndex)**

```javascript
Array.prototype.slice = function(begin, end){
    let result = []
    begin = begin || 0
    end = end || this.length
    for(let i = begin; i< end; i++){
        result.push(this[i])
    }
    return result
}

```

伪数组 => 数组

```javascript
let array = Array.prototye.slice.call(arrayLike)
或者
let array = [].slice.call(arrayLike)
```

es6

```javascript
let array = Array.from(arrayLike)
```

##  sort

```javascript
Array.prototype.sort = function(fn){
    fn = fn || (a,b)=> a-b
    let roundCount = this.length - 1 // 比较的轮数
    for(let i = 0; i < roundCount; i++){
        let minIndex = this[i]
        for(let k = i+1; k < this.length; k++){
            if( fn.call(null, this[k],this[i]) < 0 ){
                [ this[i], this[k] ] = [ this[k], this[i] ]
            }
        }
    }
}
```

**fn.call(null, this[k], this[i]) 决定了第 k 项和第 i 项的前后（大小）关系**



## forEach

```javascript
Array.prototype.forEach = function(fn){
    for(let i=0;i<this.length; i++){
        if(i in this){
            fn.call(undefined, this[i], i, this)
        }
    }
}
```

forEach 和 for 的区别主要有两个：

1. forEach 没法 break
2. forEach 用到了函数，所以每次迭代都会有一个新的函数作用域；而 for 循环只有一个作用域（著名前端面试题就是考察了这个）

## map

```javascript
Array.prototype.map = function(fn){
    let result = []
    for(let i=0;i<this.length; i++){
        if(i in this) {
            result[i] = fn.call(undefined, this[i], i, this)
        }
    }
    return result
}
```

## filter

```javascript
Arra.prototype.filter = function(fn){
    let result = []
    let temp
    for(let i=0;i<this.length; i++){
        if(i in this) {
            if(temp = fn.call(undefined, this[i], i, this) ){
                result.push(this[i])
            }
        }
    }
    return result
}
```

**fn.call() 返回真值就 push 到返回值，没返回真值就不 push。**



## reduce

```javascript
arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])
```

```javascript
Arra.prototype.reduce = function(fn, init){
    let result = init
    for(let i=0;i<this.length; i++){
        if(i in this) {
            result = fn.call(undefined, result, this[i], i, this)
        }
    }
    return result
}
```

## map、filter 和 reduce 的区别

- map  [1,2,3,4,5]  =>  [2,3,4,5,6]
- filter  [1,2,3,4,5]  =>  [4,5]
- reduce  [1,2,3,4,5] =>   15 

## map、filter 和 reduce 的联系

### 用 reduec 表示 map

```javascript
let array2 = array.map( (v) => v+1 )
 //可以写成 
 let array2 = array.reduce( (result, v)=> {
     result.push(v + 1)
     return result
 }, [] )
```



### 用 reduce 表示 filter

```javascript
 array2 = array.filter( (v) => v % 2 === 0 )
 //可以写成
 array2 = array.reduce( (result, v)=> {
     if(v % 2 === 0){ result.push(v) }
     return result
 }, [])
```





## 所有数组方法

### 改变原数组的方法

- `fill(value[, start[, end]])`  将数组中指定区间的所有元素的值，都替换成某个固定的值
- `pop `删除数组的最后一个元素，并返回这个元素
- `push `在数组的末尾增加一个或多个元素，并返回数组的新长度
- `reverse `颠倒数组中元素的排列顺序，即原先的第一个变为最后一个，原先的最后一个变为第一个
- `shift `删除数组的第一个元素，并返回这个元素
- `sort` 对数组元素进行排序，并返回当前数组
- `splice `在任意的位置给数组添加或删除任意个元素
- `unshift `在数组的开头增加一个或多个元素，并返回数组的新长度

```

```



### 访问方法，不改变原数组

- `concat  `返回一个由当前数组和其它若干个数组或者若干个非数组值组合而成的新数组。
- `join `连接所有数组元素组成一个字符串
- `slice `抽取当前数组中的一段元素组合成一个新数组
- `toString `返回一个由所有数组元素组合而成的字符串
- `indexOf  `返回数组中第一个与指定值相等的元素的索引，如果找不到这样的元素，则返回 -1



### 迭代方法

- `forEach `为数组中的每个元素执行一次回调函数

- `entries `返回一个数组迭代器对象，该迭代器会包含所有数组元素的键值对

- `every  `如果数组中的每个元素都满足测试函数，则返回 `true`，否则返回 `false`

- `some `如果数组中至少有一个元素满足测试函数，则返回 true，否则返回 false

- `filter `将所有在过滤函数中返回 `true` 的数组元素放进一个新数组中并返回

- `keys `返回一个数组迭代器对象，该迭代器会包含所有数组元素的键

- `values `返回一个数组迭代器对象，该迭代器会包含所有数组元素的值。 

- `map `返回一个由回调函数的返回值组成的新数组

- `reduce  `从左到右为每个数组元素执行一次回调函数，并把上次回调函数的返回值放在一个暂存器中传给下次回调函数，并返回最后一次回调函数的返回值。

  

