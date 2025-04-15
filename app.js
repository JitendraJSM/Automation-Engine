class App {
  constructor() {
    console.log(`App constructor called.`);

    // == Automation data ==
    this.actionList = [];
    this.currentActionIndex = 0;
    this.errorHandler = null;
  }

  async init() {
    // Initialize app components
    console.log(`App initialized.`);
  }

  next(...args) {
    if (args.length > 0 && this.errorHandler !== null) {
      console.log(`next function called with args ${args}`);
      this.errorHandler(this, ...args);
    } else if (this.currentActionIndex < this.actionList.length) {
      this.currentActionIndex++;
    }
  }

  async start() {
    // Start the application
    this.currentActionIndex = 0;
    while (this.currentActionIndex < this.actionList.length) {
      const action = this.actionList[this.currentActionIndex];
      const { callback, args } = action;
      await callback.call(this, ...args);

      //   try {
      //     await callback.call(this, ...args);
      //   } catch (error) {
      //     if (this.errorHandler) {
      //       await this.errorHandler(error, this);
      //     } else {
      //       throw error;
      //     }
      //   }

      this.currentActionIndex++;
    }
  }

  async stop() {
    // Cleanup and stop the application
  }

  addAction(callback, ...args) {
    // Add an action to the actionList
    this.actionList.push({ args, callback });
  }

  errorHandler(handlerFunction) {
    if (typeof handlerFunction !== "function") {
      throw new Error("Error handlerFunction must be a function");
    }
    this.errorHandler = handlerFunction;
  }
}
module.exports = App;
