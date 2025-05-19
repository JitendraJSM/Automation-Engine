const catchAsync = require("../../utils/catchAsync.js");
async function testFunction3() {
  console.log(`Running testFunctions3...`);

  // console.log(this.state);

  // console.log(this);
  // const a = "simpleString";
  console.log(a.validity);

  console.log(`testFunctions3 Ended.`);
}
// testFunction3.continueOnError = false;

async function testFunction4() {
  console.log(`Running testFunctions4...`);
  // console.log(this);
  console.log(`testFunctions4 Ended.`);
}
module.exports = { testFunction3: catchAsync(testFunction3), testFunction4 };
