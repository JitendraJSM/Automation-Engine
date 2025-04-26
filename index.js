require("dotenv").config();

const App = require("./modules/app.js");

const updateTask = require("./tasks/updateTask.json");

async function main() {
  console.log(`Main function Started.`);

  let app = new App();
  await app.init();

  // ------------------ Testing purpose ---------------------------
  await app.run(updateTask);
  // console.log(`${app.state.currentMachine} is the current machine.`);
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
