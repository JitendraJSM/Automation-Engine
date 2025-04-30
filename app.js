const executeAction = require("./modules/appExecutor.js");
// 1. API functions & data will be stored in app.db
// 2. automation data will be stored in app.state
// 3. Browser fuction will be stored in app.browserFunctions
const utils = require("./utils/utils.js");
const Monitor = require("./Classes/MonitorClass.js");
const BrowserInstanceClass = require("./Classes/BrowserClass.js");

// === Functions Library ===
const currentMachine = require("./functionsLibrary/currentMachine.js");
const api = require("./functionsLibrary/apiInterface.js");
const popUpFunctions = require("./functionsLibrary/popUpFunctions.js");

// === Testing purposes ===
// const monitor = require("../monitor.js");
// const test4 = require("../tempData/testingCode/test4.js");
const test = require("./functionsLibrary/webAutomation/testingLib.js");

// === Tasks ===
const updateTask = require("./tasks/updateTask.json");

class App {
  constructor() {
    // == functionsLibraries ==
    this.api = api;
    this.currentMachine = currentMachine; // Add currentMachine module
    this.popUpFunctions = popUpFunctions;
    this.utils = utils;

    this.test = test;
    // == Modules ==
    this.monitor = new Monitor();

    // == Automation data ==
    this.actionList = [];
    this.currentActionIndex = 0;
    this.errorHandler = null;
    // Add shared state object
    this.state = {};

    // console.log(`Your Automation-App (i.e. app) Instanciated.`);
  }

  async init() {
    // Initialize app components
    console.log(`App initialized.`);

    this.browserIns = new BrowserInstanceClass(this);
  }

  next(error) {
    // console.log(this);
    if (error) {
      // console.log(`The action called ${this.actionList[this.currentActionIndex].callback.name} failed.`);

      if (this.errorHandler == null) {
        console.log(
          `Error Handler is not defined. Please define as: app.addGlobalErrorHandler(error)`
        );
        // console.log(error);
      } else this.errorHandler(error);
    } else if (this.currentActionIndex < this.actionList.length) {
      this.currentActionIndex++;
    }
  }

  async run(task) {
    // Handle both single task and array of tasks
    const actionsArray = Array.isArray(task) ? task : [task];

    // Execute each action sequentially

    for (const action of actionsArray) {
      await executeAction.call(this, action);
    }
  }

  async stop() {
    // Cleanup and stop the application
  }

  addAction(callback, ...args) {
    // Add metadata to control state storage
    const shouldStoreState = callback.storeState !== false;

    // Wrap the callback with logging functionality
    const wrappedCallback = async (...callbackArgs) => {
      const actionName = callback.name || "anonymous";
      try {
        const result = await callback.call(this, ...callbackArgs);
        await utils.log(`Action '${actionName}' completed successfully`);
        // Only return result if it should be stored in state
        return shouldStoreState ? result : undefined;
      } catch (error) {
        await utils.log(
          `Action '${actionName}' failed with error: ${error.message}`
        );
        throw error;
      }
    };

    // Add an action to the actionList
    this.actionList.push({ args, callback: wrappedCallback });
  }

  addGlobalErrorHandler(handlerFunction) {
    if (typeof handlerFunction !== "function") {
      throw new Error("Error handlerFunction must be a function");
    }
    this.errorHandler = handlerFunction;
  }
}
module.exports = App;
