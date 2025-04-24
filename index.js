require("dotenv").config();
const apiInterface = require("./modules/apiInterface.js");
const BrowserModule = require("./modules/browserModule.js");
const App = require("./modules/app.js");

const updateTask = require("./tasks/updateTask.json");

async function main() {
  console.log(`Main function Started.`);

  let db = new apiInterface();
  await db.init();

  let browserModule = new BrowserModule();

  let app = new App();
  await app.init(db, browserModule);

  // ------------------ Testing code ---------------------------
  app.run(updateTask);
  // -----------------------------------------------------------

  console.log(`---END---`);
}
main();
