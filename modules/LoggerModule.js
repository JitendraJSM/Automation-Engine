const fs = require("fs");
const path = require("path");

class LoggerModule {
  constructor(app) {
    this.app = app;
    this.app.state.startTime = this._getFormattedTimestamp();
    this.app.state.logFilePath = this._createLogFile();
    this._writeInitialContent();
    // this.logTask();
  }

  _createLogFile() {
    const logDir = path.join(process.cwd(), "data", "logs");

    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    return path.join(logDir, `${this.app.state.startTime}.txt`);
  }

  _getFormattedTimestamp() {
    const now = new Date();
    const dd = String(now.getDate()).padStart(2, "0");
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const yy = String(now.getFullYear()).slice(-2);
    const HH = String(now.getHours()).padStart(2, "0");
    const MM = String(now.getMinutes()).padStart(2, "0");
    const SS = String(now.getSeconds()).padStart(2, "0");

    return `${dd}-${mm}-${yy} ${HH}-${MM}-${SS}`;
  }

  _writeInitialContent() {
    fs.writeFileSync(this.app.state.logFilePath, `${this.app.state.startTime}\n    Task-1: ${this.app.task.taskName}\n`);
    this.logTask();
  }

  _getExecutionTime() {
    const totalSeconds = Math.floor((Date.now() - this.startTime) / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")} minutes & ${String(seconds).padStart(2, "0")} seconds`;
  }

  log(message) {
    if (!this.logFilePath) return;
    fs.appendFileSync(this.logFilePath, `${message}\n`);
  }
  logTask() {
    console.log(`logTask started`);

    if (!this.app.state.logFilePath) return;
    fs.appendFileSync(this.app.state.logFilePath, JSON.stringify(this.app.task, null, 2) + "\n\n");
    console.log(`logTask completed`);
  }

  logError(message, error) {
    if (!this.logFilePath) return;
    const errorMessage = `${message}\nError: ${error.message}\n`;
    fs.appendFileSync(this.logFilePath, errorMessage);
  }

  logTask(taskName, actions) {
    if (!this.logFilePath) return;
    this.actions = actions;
    fs.appendFileSync(this.logFilePath, JSON.stringify(actions, null, 2) + "\n\n");
  }

  logTaskResult(status = "success") {
    if (!this.logFilePath) return;
    const executionTime = this._getExecutionTime();
    let resultMessage = "";

    switch (status.toLowerCase()) {
      case "error":
        resultMessage = "--------- Failed Execution ---------";
        break;
      case "terminated":
        resultMessage = "--------- Terminated Execution ---------";
        break;
      default:
        resultMessage = "--------- Successful Execution ---------";
    }

    fs.appendFileSync(this.logFilePath, `\n${executionTime}\n${resultMessage}\n`);
  }
}

module.exports = LoggerModule;
