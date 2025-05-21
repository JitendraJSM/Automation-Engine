/* Notes:- 
1. API functions & data will be stored in app.db
2. automation data will be stored in app.state
3. Browser fuction will be stored in app.browserFunctions
4. properties of actions / functions will have this preference as below:
    - if defined in task.json file then it will be used
    - if defined in that action's / function's file then it will be used
    - if not defined on both places then it will be undefined
*/

// === Base Imports ===
const Monitor = require("./MonitorModule.js");
const executeAction = require("./appExecutor.js");
const loggerInit = require("../functionsLibrary/logger.js");
const utils = require("../utils/utils.js");

// === Functions Library Imports ===
const api = require("../functionsLibrary/api.js");
const chrome = require("../functionsLibrary/chrome.js");
const currentMachine = require("../functionsLibrary/currentMachine.js");
const popUpFunctions = require("../functionsLibrary/popUpFunctions.js");
const youTube = require("../functionsLibrary/youtube.js");

// === Testing purposes ===
// const monitor = require("../monitor.js");
// const test4 = require("../tempData/testingCode/test4.js");
const test = require("../functionsLibrary/testFuncitonsLibrary/test.js");

class App {
  constructor() {
    // == functionsLibraries ==
    this.utils = utils;
    this.api = api;
    this.chrome = chrome;
    this.currentMachine = currentMachine;
    this.popUpFunctions = popUpFunctions;
    this.youTube = youTube;

    this.test = test;
    // == Modules ==
    this.monitor = new Monitor();
    this.logger = {};

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
    this.task = Array.isArray(task) ? task : [task];

    if (this.task.log !== false) loggerInit.call(this);

    // Initialize task index
    this.currentActionIndex = 0;

    // Execute tasks while we have valid index
    while (
      this.currentActionIndex >= 0 &&
      this.currentActionIndex < this.task.length
    ) {
      this.currentAction = this.task[this.currentActionIndex];
      await executeAction.call(this, this.currentAction);

      // Default behavior: move to next task
      this.currentActionIndex++;

      // You can add custom flow control here, for example:
      // if (someCondition) this.currentActionIndex--; // Go back
      // if (anotherCondition) this.currentActionIndex += 2; // Skip next task
    }

    // Logging the state in the end
    this.logger.logState();
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
