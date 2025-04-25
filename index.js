require("dotenv").config();

const App = require("./modules/app.js");

const updateTask = require("./tasks/updateTask.json");

async function main() {
  console.log(`Main function Started.`);

  let app = new App();
  await app.init();

  // ------------------ Testing code ---------------------------
  await app.run(updateTask);
  // console.log(`${app.state.currentMachine} is the current machine.`);
  // console.log(`New member to add is as below :`);
  // console.log(app.state.newMemberToAdd);
  // console.log(
  //   `Next available chrome profile is : ${app.state.nextAvailableChromeProfile}`
  // );
  // -----------------------------------------------------------

  console.log(`---END---`);
}
main();
