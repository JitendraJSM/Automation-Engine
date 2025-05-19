const test = require("./functionsLibrary/testFuncitonsLibrary/test.js");
// state = { a: 5, b: "pil" };
const newFun = async function (fn) {
  console.log(`fn.name is ${fn.name}`);
  console.log(`fn's property continueOnError is ${fn.continueOnError}`);
};
async function main() {
  console.log(`Point 1`);
  // console.log(this.state);
  newFun(test.testFunction3);
  // await test.testFunction3();
  // console.log(calculateSum.name);
  // console.log(calculateSum.toString());

  console.log(`Point 2`);
}
main();
