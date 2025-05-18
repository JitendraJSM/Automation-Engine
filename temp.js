// // Async function example
// async function fetchUserData(param) {
//   try {
//     console.log(`param: ${param.a.b}`);

//     // const response = await fetch("https://automation-db-api-render-service.onrender.com/api/v1");
//     const response = await fetch("https://api.example.com/user");

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching user data:", error);
//   }
// }
// const catchAsync = require("./utils/catchAsync.js");
// // Sync function example
// const calculateSum = catchAsync(async function (a, b) {
//   const sum = a + b;
//   return sum;
// });

const test = require("./functionsLibrary/testFuncitonsLibrary/test.js");
// state = { a: 5, b: "pil" };
async function main() {
  console.log(`Point 1`);
  // console.log(this.state);

  await test.testFunction3.call(this);
  // console.log(calculateSum.name);
  // console.log(calculateSum.toString());

  console.log(`Point 2`);
}
main();
