// 1. API functions & data will be stored in app.db
// 2. automation data will be stored in app.state
// 3. Browser fuction will be stored in app.browserModule
const utils = require("../utils/utils.js");
const currentMachine = require("../utils/currentMachine.js");

class App {
  constructor(db, browserModule) {
    this.db = db;
    this.browserModule = browserModule;

    // == Automation data ==
    this.actionList = [];
    this.currentActionIndex = 0;
    this.errorHandler = null;
    // Add shared state object
    this.state = {};

    console.log(`Your Automation-App (i.e. app) Instanciated.`);
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

  async executeTask(task) {
    const {
      parentModuleName,
      actionName,
      arguments: args,
      shouldStoreState,
      continueOnError = false,
    } = task;

    try {
      // Get the parent module instance
      const parentModule = this[parentModuleName];
      if (!parentModule) {
        throw new Error(`Module ${parentModuleName} not found`);
      }

      // Get the action function
      const action = parentModule[actionName];
      if (typeof action !== "function") {
        throw new Error(
          `Action ${actionName} not found in module ${parentModuleName}`
        );
      }

      // Parse arguments if they're provided as a string
      const parsedArgs = typeof args === "string" ? JSON.parse(args) : args;

      // Execute the action
      const result = await action.call(parentModule, parsedArgs);

      // Store result in state if specified
      if (shouldStoreState && result !== undefined) {
        this.state[shouldStoreState] = result;
      }

      return result;
    } catch (error) {
      if (!continueOnError) {
        throw error;
      }
      console.error(`Error executing task: ${error.message}`);
      return null;
    }
  }

  async run(tasks) {
    // Handle both single task and array of tasks
    const taskArray = Array.isArray(tasks) ? tasks : [tasks];

    // Execute each task sequentially
    for (const task of taskArray) {
      await this.executeTask(task);
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
