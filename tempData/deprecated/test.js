const utils = require("../../utils/utils.js");
const Monitor = require("./monitor.js");
const monitor = new Monitor();
const app = {};
app.state = {};

async function getMyVar() {
  return app.userVar;
}

async function main() {
  const monitor = new Monitor();
  app.state.userVar = "userVar22";
  app.state.myVar = "myVar";
  app.state.myVar2 = "myVar2";
  app.state.myVar3 = "myVar3";

  console.log(`The state before start watching is as below: \n`);
  console.log(app.state);

  app.userVar = await utils.askUser("Enter a number for userVar: ");

  monitor.watch("userVar", getMyVar, {
    checkingInterval: 1000,
    eventName: "userVarChanged",
    maxHistoryLength: 5,
    callback: async (context) => {
      console.log(`======================================`);
      console.log(`Event: ${context.eventName}`);
      console.log(context);
      console.log(`======================================`);
    },
  });
  // Set interval to ask for user input every 5 seconds
  setInterval(async () => {
    app.userVar = await utils.askUser("Enter a number for userVar: ");
    console.log("Updated userVar:", app.userVar);
  }, 5000);
}

main();
