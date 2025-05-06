my question is in comment in line number 22 
const varJack = {
  arr: [1, 2, 3, 4, 5],
  obj: {
    a: 1,
    b: 2,
    c: 3,
  },
  str: "Hello World",
  num: 123,
  bool: true,
};
const varJack2 = {
  arr: [2, 4, 6, 8, 10],
  obj: {
    a: 2,
    b: 4,
    c: 6,
  },
};
function testFunction(obj) {
  /* here i want to print the name of variable which is passed to this function, do not hardcode */
}
function main() {
  testFunction(varJack);
  testFunction(varJack2);
}
main();



Ok you said as below:
In JavaScript, when you pass a variable as an argument to a function, the function receives the value of that variable, not the variable itself or its name. Therefore, inside the function, you cannot directly get the name of the variable that was passed because variable names are not preserved at runtime.

Why is this not possible?
JavaScript functions receive arguments by value (or reference for objects), but the variable name used in the caller's scope is not passed along.
and gave me the suggetion
function main() {
    testFunction(varJack, "varJack");
    testFunction(varJack2, "varJack2");
  }
but what i want actually is do something(means pass the valriable name) in testFunction call t