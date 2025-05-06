require("dotenv").config();

const App = require("./modules/AppModule.js");

// === Tasks ===
const updateSystem = require("./tasks/updateTask.json");

// === Testing Tasks ===
const testTask = require("./tasks/testingTasks/testTask.json");

async function main() {
  console.log(`Main function Started.`);

  let app = new App();

  // ------------------ Testing purpose ---------------------------
  // await app.run(testTask);
  console.log(`--------module`);
  // console.log(Object.keys(require));
  // console.log(module.children[2]);

  await app.run(updateTask);
  // console.log(`${app.state.currentMachine} is the current machine.`);
  // console.log(`${app.state.newMemberToAdd} are member to add from api.`);
  // console.log(`app.state is as below : `);
  // console.log(app.state);

  console.log(`app is as below : `);
  console.log(app);

  // console.log(`New member to add is as below :`);
  // console.log(app.state.newMemberToAdd);
  // console.log(
  //   `Next available chrome profile is : ${app.state.nextAvailableChromeProfile}`
  // );
  // -----------------------------------------------------------
  // const pages = await app.browser.pages();
  // console.log(`${pages.length} pages opened.`);
  // // Print URLs of all open pages
  // console.log(`================================`);
  // for (const page of pages) {
  //   console.log(`Page URL: ${page.url()}`);
  // }
  // console.log(`================================`);
  // ------------------ Testing purpose ---------------------------

  console.log(`---END---`);
}
main();
