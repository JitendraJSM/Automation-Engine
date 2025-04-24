const catchAsync = require("../utils/catchAsync");

const testFunction2 = catchAsync(async function (var1, var2) {
  // const newVar = var2.testProp;

  // console.log(`=== Test 2 with 2 arguments ${var1} & ${newVar}.`);
  console.log(`=== Test 2 with 2 arguments var1: ${var1} & var2: ${var2}.`);
  const result = await Promise.resolve("Test 2 successful");
  return result;
});
module.exports = { testFunction2 };
