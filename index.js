require("dotenv").config();
const utils = require("./utils/utils.js");

const App = require("./app.js");
const { testFunction } = require("./testModule.js");
const { testFunction2 } = require("./testModule2.js");
const { testFunction3 } = require("./testModule3.js");

async function main() {
  console.log(`Main function Started.`);
  let app = new App();
  await app.init();

  app.addAction(testFunction, "Arg1 for t1");
  app.addAction(utils.delay, 2000);
  app.addAction(testFunction2, "Arg1 for t2", "Arg2 for t2");
  // app.addAction(testFunction2, "Arg1 for t2");
  app.addAction(utils.delay, 2000);
  app.addAction(testFunction3, "Arg1 for t3", "Arg2 for t3", "Arg3 for t3");

  app.addGlobalErrorHandler(function (error) {
    console.log(error);
  });

  await utils.delay(2000);

  await app.run();
}
main();
