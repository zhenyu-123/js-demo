/**
 * 隐式绑定：当函数被一个对象所拥有，再调用时，会触发隐式绑定，此时，this会指向该对象.
 *
 */
// function foo() {
//   console.log(this.a);
// }
// var obj = { a: 2, foo: foo };
// obj.foo();// 2
// ----------------------------------------------------------------------------------------------------
/**
 * 显式绑定：通过call、apply、bind方法，可以显式地指定this的指向.
 */
// function foo() {
//   console.log(this.a);
// }
// var obj = { a: 2 };
// foo.call(obj); //2

// function foo(n, m) {
//   console.log(this.a, n, m);
// }
// var obj = { a: 2 };
// foo.apply(obj, [100, 200]);

// function foo(n, m) {
//   console.log(this.a, n, m);
// }
// var obj = { a: 2 };
// var bar = foo.bind(obj, 100, 200);
// bar(); // bind 不会立即调用函数，而是返回一个新的函数，这个新的函数会自动将this绑定到指定的对象上.
// ----------------------------------------------------------------------------------------------------

// 箭头函数：箭头函数没有自己的this，它会捕获其所在上下文的this值，作为自己的this值.
// 箭头函数的this是静态的，不会因为调用方式的不同而改变.
// 箭头函数不能作为构造函数使用，不能使用new关键字调用.
// 箭头函数没有自己的arguments对象，只能访问外层函数的arguments对象.
const foo = () => {
  console.log(this.a);
};
var obj = { a: 2, foo: foo };
obj.foo();

// ----------------------------------------------------------------------------------------------------
// 当使用new关键字调用构造函数时，JavaScript会创建一个新对象，并将该对象绑定到this上。
// 如果在某个上下文中存在多种绑定方式，优先级如下：new绑定 > 显式绑定 > 隐式绑定 > 默认绑定。