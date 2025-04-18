const catchAsync = require("./utils/catchAsync");

const testFunction = catchAsync(async function (var1) {
  console.log(this);

  console.log(`=== Test 1 with 1 argument ${var1}. `);
  const result = await Promise.resolve("Test successful");
  return result;
});

module.exports = { testFunction };

// async function testFunction(var1) {
//   try {
//     console.log(`=== Test 1 with 1 argument ${var1}. `);
//     const result = await Promise.resolve("Test successful");
//     return result;
//   } catch (error) {
//     throw new Error(`Test failed: ${error.message}`);
//   }
// }
