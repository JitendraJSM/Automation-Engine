class Monitor {
  constructor() {
    this.watchList = [];
    this.defaultInterval = 100;
    this.intervals = {};
  }

  async watch(nameOfVariable, getter, options = {}) {
    const {
      checkingInterval = this.defaultInterval,
      eventName = "change",
      maxHistoryLength = 10,
      callback = async () => {},
    } = options;

    // Get initial value
    let initialValue;
    try {
      initialValue = await getter();
    } catch (error) {
      console.error(
        `Error getting initial value for ${nameOfVariable}:`,
        error
      );
      initialValue = null;
    }

    this.watchList.push({
      nameOfVariable,
      getter,
      callback,
      lastValue: initialValue,
      valuesHistory: [initialValue],
      checkingInterval,
      eventName,
      maxHistoryLength,
      isChecking: false, // Flag to prevent concurrent checks
    });

    // Set up individual interval for this variable
    this.intervals[nameOfVariable] = setInterval(
      () => this.checkVariable(nameOfVariable),
      checkingInterval
    );
  }

  async checkVariable(nameOfVariable) {
    const watcher = this.watchList.find(
      (w) => w.nameOfVariable === nameOfVariable
    );
    if (!watcher || watcher.isChecking) return;

    watcher.isChecking = true;
    try {
      const current = await watcher.getter();
      if (current !== watcher.lastValue) {
        // Update history
        watcher.valuesHistory.push(current);
        if (watcher.valuesHistory.length > watcher.maxHistoryLength) {
          watcher.valuesHistory.shift();
        }

        // Create context object
        const context = {
          eventName: watcher.eventName,
          variable: watcher.nameOfVariable,
          newValue: current,
          oldValue: watcher.lastValue,
          history: watcher.valuesHistory,
        };

        // Trigger callback with additional context
        try {
          await watcher.callback(context);
        } catch (callbackError) {
          console.error(
            `Error in callback for ${watcher.nameOfVariable}:`,
            callbackError
          );
        }

        watcher.lastValue = current;
      }
    } catch (error) {
      console.error(`Error checking ${watcher.nameOfVariable}:`, error);
    } finally {
      watcher.isChecking = false;
    }
  }

  destroy() {
    Object.values(this.intervals).forEach((interval) =>
      clearInterval(interval)
    );
    this.watchList = [];
    this.intervals = {};
  }
}
module.exports = Monitor;

// // Usage example with async functions
// const monitor = new Monitor();
// let myVar = 0;

// // Example async getter and callback
// monitor.watch(
//   "myVar",
//   async () => {
//     // Simulate async getter
//     await new Promise((resolve) => setTimeout(resolve, 100));
//     return myVar;
//   },
//   {
//     checkingInterval: 200,
//     eventName: "myVarChanged",
//     maxHistoryLength: 5,
//     callback: async (context) => {
//       // Simulate async processing
//       await new Promise((resolve) => setTimeout(resolve, 50));
//       console.log(`Event: ${context.eventName}`);
//       console.log(
//         `Variable ${context.variable} changed: ${context.oldValue} → ${context.newValue}`
//       );
//       console.log("Value history:", context.history);
//     },
//   }
// );

// Example usage
setTimeout(() => {
  myVar = 3; // Will be detected and logged with history
}, 1000);
