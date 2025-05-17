// === Interfaces ===
module.exports = {
  getCurrentMachineName,
  isChromeAlreadyOpened,
  getNextAvailableChromeProfile,
};
// === Implementation ===
const os = require("os");
const fs = require("fs");

function getCurrentMachineName() {
  return os.userInfo().username;
}
getCurrentMachineName.shouldStoreState = "currentMachine";

function getNextAvailableChromeProfile() {
  // const profilesPath = `${os.homedir()}/AppData/Local/Google/Chrome/User Data`;
  const profilesPath = `C:/Automation-App-by-JN-Data`;
  // 1. Check how many folders are there in profilesPath starting with 'Profile' and add their name to profiles array. Find first missing number starting from 1
  const profileNumbers = fs
    .readdirSync(profilesPath)
    .filter((name) => name.startsWith("Profile"))
    .map((name) => parseInt(name.split(" ")[1]))
    .sort((a, b) => a - b);

  // Find first missing number
  const nextProfileNumber = profileNumbers.reduce((missing, current) => (current === missing ? missing + 1 : missing), 1);

  console.log(`nextProfileNumber: ${nextProfileNumber}`);
  return nextProfileNumber;
}
getNextAvailableChromeProfile.shouldStoreState = "nextAvailableChromeProfile";

/* Note:- This function must be called before chrome.initializeBrowser() */
// -- As it is so much dependent on chrome.initializeBrowser() why merge this in that function, what if it needed separately let's think about this in future.
async function isChromeAlreadyOpened() {
  const { promisify } = require("util");
  const { exec } = require("child_process");
  const promisifiedExec = promisify(exec);

  const port = 9222;
  // 1.2 Get webSocketDebuggerUrl
  async function getUrl() {
    const urlCommand = `curl http://127.0.0.1:${port}/json/version`;
    const { stdout } = await promisifiedExec(urlCommand);
    return stdout;
  }
  let wsURL;
  try {
    wsURL = await getUrl();
    if (wsURL) wsURL = JSON.parse(wsURL).webSocketDebuggerUrl;
  } catch (err) {
    null;
  }
  if (wsURL?.startsWith("ws://")) return wsURL;
  else return false;
}
isChromeAlreadyOpened.shouldStoreState = "isChromeAlreadyOpened";

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
