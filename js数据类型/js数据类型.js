// instanceof 原理实现
function myInstanceof(left, right) {
  if (typeof left !== 'object' || left === null) {
      return false
  }
  let __proto__ = left.__proto__
  while(__proto__) {
      if(__proto__ === right.prototype) {
          return true
      } else {
        __proto__ = __proto__.__proto__   
      }
  }
  return false
}
class Person {}
let p = new Person()
console.log(myInstanceof(p, Person))  
console.log(myInstanceof(1, Number))
console.log(myInstanceof(new Number(1), Number))
console.log(myInstanceof({name: 'whh'}, Object))