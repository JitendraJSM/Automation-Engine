const os = require("os");
const fs = require("fs");

module.exports = {
  getCurrentMachineName: async function () {
    return os.userInfo().username;
  },

  getNextAvailableChromeProfile: async function () {
    const profilesPath = `${os.homedir()}/AppData/Local/Google/Chrome/User Data`;
    // 1. Check how many folders are there in profilesPath starting with 'Profile' and add their name to profiles array.
    const profilesCreated = fs
      .readdirSync(profilesPath)
      .filter((foldersName) => foldersName.startsWith("Profile"));

    // 2. Find first available profile number
    const nextProfileNumber = profilesCreated.length + 1;
    return nextProfileNumber;
  },
};
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
