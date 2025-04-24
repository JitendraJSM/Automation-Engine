require("dotenv").config();
const apiInterface = require("./modules/apiInterface.js");
const BrowserModule = require("./modules/browserModule.js");
const App = require("./modules/app.js");

const updateTask = require("./tasks/updateTask.json");

async function main() {
  console.log(`Main function Started.`);

  let api = new apiInterface();
  await api.init();

  let browserModule = new BrowserModule();

  let app = new App(api, browserModule);
  await app.init();

  // ------------------ Testing code ---------------------------
  await app.run(updateTask);
  console.log(`${app.state.currentMachine} is the current machine.`);
  console.log(`New member to add is as below :`);
  console.log(app.state.newMember);

  // -----------------------------------------------------------

  console.log(`---END---`);
}
main();
