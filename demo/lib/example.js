'use strict';

var saySomething = function saySomething(something) {
  return 'I would say: ' + something;
};

var str = 'hello world';
var result = saySomething(str);
console.log(result);