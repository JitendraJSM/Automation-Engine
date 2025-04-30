const os = require("os");
const fs = require("fs");

async function getCurrentMachineName() {
  return os.userInfo().username;
}
module.exports.getCurrentMachineName = getCurrentMachineName;

async function getNextAvailableChromeProfile() {
  // const profilesPath = `${os.homedir()}/AppData/Local/Google/Chrome/User Data`;
  const profilesPath = `C:/Automation-App-by-JN-Data`;
  // 1. Check how many folders are there in profilesPath starting with 'Profile' and add their name to profiles array.
  const profilesCreated = fs
    .readdirSync(profilesPath)
    .filter((foldersName) => foldersName.startsWith("Profile"));

  // 2. Find first available profile number
  const nextProfileNumber = profilesCreated.length + 1;
  // const nextProfileNumber = profilesCreated.length + 1;
  return nextProfileNumber;
}
module.exports.getNextAvailableChromeProfile = getNextAvailableChromeProfile;

async function testforArgs(arugs) {
  console.log(`testforArgs function started.`);

  console.log(`type of arugments is ${typeof arugments}`);
  console.log(arugs);
}
module.exports.testforArgs = testforArgs;
// -------------- Deprecated code.
// async function currentMachineName() {
//   return os.userInfo().username;
//   /* The given below code is actually API's resonsibility, not utils's.

//   // Get the current user's username
//   let currentMachine = os.userInfo().username;

//   const availableMachines = ["Office", "Er. Jitendra Nath", "SM-NETWORK"];

//   if (!availableMachines.includes(currentMachine))
//     console.log(
//       `Current Machine (i.e. "${currentMachine}") \n\t\tis not in "availableMachines" array in utils. Please add it to "availableMachines" Array.`
//     );
//   return false;
//   */
// }
// exports.currentMachineName = currentMachineName;
