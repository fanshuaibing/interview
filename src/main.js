{
  /**
   * @手写AJAX
   * @type {XMLHttpRequest}
   */
  const request = new XMLHttpRequest()

  request.open("get", "a?b=1", true)
  request.onreadystatechange = function (e) {
    if (request.readyState === 4 && request.status === 200) {
      console.log(request.responseText)
    }
  }
  request.send()
}


{
  /**
   * @手写节流
   * @param fn
   * @param delay
   * @returns {function(...[*]=)}
   */
  function throttle(fn, delay) {
    let canUse = true
    return function () {
      if(canUse){
        canUse = false
        fn.call()
        setTimeout(()=>{
          canUse = true
        }, delay)

      }
    }
  }

  const throttled = throttle(()=> console.log("throttled"))
  throttled()
  throttled()
  throttled()

}


{
  /**
   * @手写防抖
   * @param fn
   * @param delay
   * @returns {function(...[*]=)}
   */
  function debounce(fn, delay) {
    let timerId = null
    return function () {
      const context = this
      if(timerId) clearTimeout(timerId)
      timerId = setTimeout(()=>{
        fn.apply(context , arguments)
      }, delay)

    }
  }
  const debounced =  debounce(()=> console.log("debounced"), 3000)
  let i = 1
  setInterval(()=>{
    if(i < 11)    {
      console.log(i)
      i = i + 1
    }
  }, 1000)
  debounced()
  setTimeout(()=>  debounced() , 2500)
  setTimeout(()=>  debounced() , 6500)
}


{
  /**
   * @prototype实现继承
   * @param color
   * @constructor
   */
  function Animal(color) {
    this.color = color
  }
  Animal.prototype.run = function () {
    console.log("Animal can run")
  }
  function Dog(color, name) {
    Animal.call(this, color)
    this.name = name
  }
  // 下面三行实现 Dog.prototype.__proto__ = Animal.prototype
  function Mid() {}
  Mid.prototype = Animal.prototype
  Dog.prototype = new Mid()


  Dog.prototype.constructor = Dog //将 Dog 的构造函数指向 Dog
  Dog.prototype.say = function () {
    console.log("汪")
  }

  let wangcai = new Dog("黑色","旺财")
  console.log(wangcai);

}


{
  /**
   * @class实现继承
   */
  class Animal{
    constructor(color) {
      this.color = color
    }
    run(){
      console.log("Animal can run")
    }
  }

  class Dog extends Animal{
    constructor(color, name) {
      super(color)
      this.name = name
    }
    say(){
      console.log("Dog can wang");
    }
  }

  let wangcai = new Dog("red", "旺财")
  console.log(wangcai);
}

{

}



