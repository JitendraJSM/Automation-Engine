//  Note How to use it:
/* 
// Step 1: define the async function
async function testFunction3() {
  console.log(`Running testFunctions3...`);
}

// (OPTIONAL) Step 2: define the errorHandler function particular for function
testFunction3.errorHandler = async function (err) {
  console.log(`In Error the errorHandler function of testFunction3`);
  console.log(`In Error the errorHandler function of testFunction3`);
  return result
  }
  ---------------------- OR ----------------------
  testFunction3.errorHandler = errorHandlerOftestFunction3;
  - IF NOT DEFINE the errorHandler function then it will use the default errorHandler function (that is presently else block of catch block)

// (OPTIONAL) Step 3: define value of continueOnError
  - By Default value of continueOnError is true even when fn.continueOnError is not defined,
      BUT if you want that execution should stop if any error occured in function then you must set fn.continueOnError = false

*/

/**
 * Wraps an async function to handle errors gracefully
 * @param {Function} fn - The async function to wrap
 * @returns {Function} - The wrapped function that forwards errors to error handler
 */
const { askUser } = require("./utils");

const catchAsync = (fn) => {
  return async function (...args) {
    try {
      const result = await fn.apply(this, args);
      return result;
    } catch (error) {
      fn.continueOnError ??= true;
      if (!fn.continueOnError) {
        throw error;
      } else {
        console.error(`Error in ${fn.name} (${error.stack.split("\n")[1].trim()}): ${error.message}`);
        // take a screen shot of browser page also note url of page with error in log file if exists and if not exists then log app or reconnect browser
        await askUser("Press Enter to continue...");
      }
    }
  };
};

module.exports = catchAsync;
