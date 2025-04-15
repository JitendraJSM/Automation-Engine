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

  app.addAction(testFunction, "Raju", "Viju");
  app.addAction(utils.delay, 2000);
  app.addAction(testFunction2, "Raju", "Viju");
  app.addAction(utils.delay, 2000);
  app.addAction(testFunction3, "Raju", "Viju");

  await utils.delay(2000);

  await app.start();
}
main();
