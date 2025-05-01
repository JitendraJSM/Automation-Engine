// The flow of execution is:.
//  Step 1. getCurrentMachine i.e. the name of current machine.
//  Step 2. getNewMemberToAdd(currentMachine) this returns {gmail,password }
//  Step 3. nextProfileNumber available for current machine.
//  Step 4. Create a browser instance (on the basis of currentMachine & nextProfileNumber).
// -- subTask "Open youtube trending section")
//  Step 5. Navigate to a URL https:www.youtube.com
//  Step 6. Go to trending section.
// -- subTask "Open a short video"
//  Step 7. Open a short video.
//  Step 8. wait for random time(5-10 secs).
// -- subTask "Like the video"
//  Step 9. Click on the like button.
// -- subTask "Sign in"
//  Step 10. Click on the Sign in button.
// .... etc. not yet described.

const api = require("../modules/apiInterface.js");
const utils = require("../utils/utils.js");

async function updateSetupTask() {
  console.log(this);

  this.addAction(utils.getCurrentMachineName);
  this.addAction(api.newMemberToAdd, this.state.currentMachineName);
  this.addAction(utils.nextAvailableChromeProfile);
  const browserOptions = {
    profileTarget: this.state.nextAvailableChromeProfile,
  };
  this.addAction(this.browserModule.init, browserOptions);
}
module.exports.updateSetupTask = updateSetupTask;
