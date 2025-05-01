const { getCurrentMachineName } = require("./currentMachine.js");
async function test() {
  console.log(`--------------------`);
  console.log(getCurrentMachineName.shouldStoreState);
  console.log(`--------------------`);

  const currentMachineName = await getCurrentMachineName();
  console.log(currentMachineName);
}
test();
