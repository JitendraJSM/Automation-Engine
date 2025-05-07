// === Interface ===
module.exports = bindMethodsOnLogger;
function bindMethodsOnLogger() {
  logger = {};
  logger.init = init.bind(this);
  logger.log = log.bind(this);
  logger.logError = logError.bind(this);
  logger.logTask = logTask.bind(this);
  logger.logAction = logAction.bind(this);
  logger.logTaskResult = logTaskResult.bind(this);
  return logger;
}

// === Implementation ===
const fs = require("fs");
const path = require("path");

function init() {
  this.state.logFilePath = _createLogFile.call(this);
  _writeInitialContent.call(this);
}

function _createLogFile() {
  const timestamp = _getFormattedTimestamp.call(this);
  const logDir = path.join(process.cwd(), "data", "logs");

  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  return path.join(logDir, `${timestamp}.txt`);
}

function _getFormattedTimestamp() {
  const now = new Date();
  const dd = String(now.getDate()).padStart(2, "0");
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const yy = String(now.getFullYear()).slice(-2);
  const HH = String(now.getHours()).padStart(2, "0");
  const MM = String(now.getMinutes()).padStart(2, "0");
  const SS = String(now.getSeconds()).padStart(2, "0");

  return `${dd}-${mm}-${yy} ${HH}-${MM}-${SS}`;
}

function _writeInitialContent() {
  const timestamp = _getFormattedTimestamp.call(this);
  fs.writeFileSync(this.state.logFilePath, `${timestamp}\n    Task-1: ${this.task.taskName}\n`);
  logTask.call(this);
}

function _getExecutionTime() {
  const totalSeconds = Math.floor((Date.now() - this.state.startTime) / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")} minutes & ${String(seconds).padStart(2, "0")} seconds`;
}

function log(message) {
  if (!this.state.logFilePath) return;
  fs.appendFileSync(this.state.logFilePath, `${message}\n`);
}

function logError(message, error) {
  if (!this.state.logFilePath) return;
  const errorMessage = `${message}\nError: ${error.message}\n`;
  fs.appendFileSync(this.state.logFilePath, errorMessage);
}

function logTask() {
  if (!this.state.logFilePath) return;
  fs.appendFileSync(this.state.logFilePath, JSON.stringify(this.task, null, 2) + "\n\n");
}

function logAction() {
  if (!this.state.logFilePath) return;
  fs.appendFileSync(this.state.logFilePath, JSON.stringify(this.currentAction, null, 2) + "\n\n");
}
function logTaskResult(status = "success") {
  if (!this.state.logFilePath) return;
  const executionTime = _getExecutionTime();
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

  fs.appendFileSync(this.state.logFilePath, `\n${executionTime}\n${resultMessage}\n`);
}
