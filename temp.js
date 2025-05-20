// below commented code is for testing catchAsync wraping
// const test = require("./functionsLibrary/testFuncitonsLibrary/test.js");
// // state = { a: 5, b: "pil" };
// const newFun = async function (fn) {
//   console.log(`fn.name is ${fn.name}`);
//   console.log(`fn's property continueOnError is ${fn.continueOnError}`);
// };
// async function main() {
//   console.log(`Point 1`);
//   // console.log(this.state);
//   newFun(test.testFunction3);
//   // await test.testFunction3();
//   // console.log(calculateSum.name);
//   // console.log(calculateSum.toString());

//   console.log(`Point 2`);
// }
// main();

// below code is for testing monitor module
const Monitor = require("./modules/MonitorModule.js");
const { askUser } = require("./utils/utils.js");

async function waitForUserConfirmation() {
  const monitor = new Monitor();

  async function checkUserInput() {
    const answer = await askUser("Please enter 'y' to continue: ");
    return answer.toLowerCase() === "y";
  }

  try {
    // Start polling for user input with infinite polling enabled
    const result = await monitor.robustPolling(checkUserInput, {
      infintiePolling: true, // Keep asking until user enters 'y'
      waitForFunctionCompletion: true, // Will wait for function to complete before next attempt
      intervalMs: 500, // Wait 500ms between attempts
      retryCondition: (result) => result === true, // Continue until true is returned
    });

    console.log("User confirmed with 'y'!");
    return result;
  } catch (error) {
    console.error("Error while waiting for user input:", error);
    throw error;
  }
}

// Test the functionality
async function main() {
  try {
    await waitForUserConfirmation();
    console.log("Proceeding with the next steps...");
  } catch (error) {
    console.error("Main function error:", error);
  }
}

main();
