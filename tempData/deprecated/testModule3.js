const catchAsync = require("../../utils/catchAsync");

const testFunction3 = catchAsync(async function (var1, var2, var3) {
  console.log(
    `=== Test 3 with 3 args var1: ${var1}, var2: ${var2} & var3: ${var3}.`
  );
  const result = await Promise.resolve("Test successful");
  return result;
});
module.exports = { testFunction3 };

// async function testFunction3(var1, var2, var3) {
//   try {
//     console.log(
//       `=== Test 3 with 3 args var1: ${var1}, var2: ${var2} & var3: ${var3}.`
//     );
//     const result = await Promise.resolve("Test successful");
//     return result;
//   } catch (error) {
//     throw new Error(`Test failed: ${error.message}`);
//   }
// }
