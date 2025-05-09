class Monitor {
  constructor() {
    this.pollingTasks = {};
  }
  pollingTaskNameGenerator(functionName) {
    if (!functionName) return `anonymous_${Date.now()}`;

    let existingCount = Object.keys(this.pollingTasks).filter((taskName) =>
      taskName.startsWith(`${functionName}_`)
    ).length;

    return `${functionName}_${existingCount + 1}`;
  }

  robustPolling(func, options = {}, ...args) {
    const {
      maxAttempts = 30,
      intervalMs = 1000,
      timeoutMs = 30000,
      retryCondition = () => true,
      rejectOnEnd = true,
      infintiePolling = false,
    } = options;

    let pollingTaskName = this.pollingTaskNameGenerator(func.name);

    let attempts = 0;
    const startTime = Date.now();

    const pollingPromise = new Promise((resolve, reject) => {
      const intervalFun = setInterval(async () => {
        attempts++;
        try {
          const result = await func(...args);

          if (result && retryCondition(result)) {
            clearInterval(intervalFun);
            delete this.pollingTasks[pollingTaskName];
            resolve(result);
            return;
          }
        } catch (err) {
          const errMSG = err.message || "Error msg not defined";
          console.log(
            `Task ${pollingTaskName} - Attempt ${attempts} failed with error:`,
            errMSG
          );
        }

        const shouldStop =
          !infintiePolling &&
          (attempts >= maxAttempts || Date.now() - startTime >= timeoutMs);

        if (shouldStop) {
          clearInterval(intervalFun);
          delete this.pollingTasks[pollingTaskName];
          options.endMSG ||= `Task ${pollingTaskName} failed after ${attempts} attempts.`;
          if (rejectOnEnd) {
            reject(
              `monitor.robustPolling(${pollingTaskName}) rejecting with message "${options.endMSG}".`
            );
          } else {
            console.log(
              `monitor.robustPolling(${pollingTaskName}) resolving null, with message "${options.endMSG}".`
            );
            resolve(null);
          }
        }
      }, intervalMs);

      const controller = {
        intervalFun,
        stop: () => {
          clearInterval(intervalFun);
          delete this.pollingTasks[pollingTaskName];
          resolve({ pollingTaskName, stopped: true });
        },
      };
      this.pollingTasks[pollingTaskName] = controller;
    });
    pollingPromise.pollingTaskName = pollingTaskName;
    pollingPromise.stop = () => this.pollingTasks[pollingTaskName]?.stop();
    return pollingPromise;
  }

  stopAll() {
    Object.values(this.pollingTasks).forEach((controller) => {
      controller.stop();
    });
  }

  getActivePollings() {
    return Object.keys(this.pollingTasks);
  }
}

module.exports = Monitor;
