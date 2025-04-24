const catchAsync = require("./utils/catchAsync");

const testFunction = catchAsync(async function (var1) {
  console.log(this);

  console.log(`=== Test 1 with 1 argument ${var1}. `);
  const result = await Promise.resolve("Test successful");
  return result;
});

module.exports = { testFunction };

// // async function testFunction(var1) {
// //   try {
// //     console.log(`=== Test 1 with 1 argument ${var1}. `);
// //     const result = await Promise.resolve("Test successful");
// //     return result;
// //   } catch (error) {
// //     throw new Error(`Test failed: ${error.message}`);
// //   }
// // }
// -----------------------------------------------------------------
// const os = require("os");
// require("dotenv").config();

// async function newMemberToAdd(systemName) {
//   // 1. Get the current Machine's username
//   systemName ||= os.userInfo().username;
//   // 2. Get all members of which do not have chrome profile the current system
//   const res = await fetch(
//     // `${process.env.API_URL}/members?systemName=-${systemName}`
//     `${process.env.API_URL}`
//   );
//   // const resJSON = await res.json();
//   // console.log(resJSON);

//   console.log(res);
// }
// newMemberToAdd();
