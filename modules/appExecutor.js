// ---- TODO ----
/* 1. Getting the parent module instance
        - first check on "this"
        - if not defined, check is there any file by name `${parentModuleName}.js`
            -- if found, require it and assign it to "this"
*/
// --------------
// "this" in thw executeAction function is the app instance as it is called in the app by "executeAction.call(this, action)""
function checkStateReference(arg) {
  // console.log(this);
  if (arg.startsWith("this")) {
    console.log(`${arg} is a referenced argument`);
    arg = this[arg.split(".")[1]];
  }
}
function parseObject(objString) {
  // console.log(this);
  const obj = {};
  console.log(`********************`);
  console.log(`The Object string is : ${objString}`);
  console.log(`the parsed obj is as below:`);

  console.log(obj);
  console.log(`********************`);
}
function parseArgs(args) {
  // console.log(this);

  if (!args) return [];

  // Handle single argument case
  if (args.includes(",")) {
    args = args.split(",");
    // console.log(`the Splited args:`);
    // console.log(args);
  }
  args.forEach((arg) => {
    arg = arg.trim();
    if (arg.startsWith("{")) {
      console.log(`--- ${arg} is an object`);
      arg = parseObject(arg);
    } else console.log(`--- ${arg} is not an object`);
  });
  console.log(`args after looping:`);
  console.log(args);
  // Split by comma but respect JSON objects
  let inObject = false;
  let currentArg = "";
  let parsedArgs = [];

  for (let i = 0; i < args.length; i++) {
    const char = args[i];

    if (char === "{") inObject = true;
    if (char === "}") inObject = false;

    if (char === "," && !inObject) {
      parsedArgs.push(tryParseValue(currentArg.trim()));
      currentArg = "";
    } else {
      currentArg += char;
    }
  }

  // Push the last argument
  if (currentArg.trim()) {
    parsedArgs.push(tryParseValue(currentArg.trim()));
  }

  return parsedArgs;
}

function tryParseValue(value) {
  if (!value) return value;

  // Try to parse as JSON if it starts with { or [
  if (value.startsWith("{") || value.startsWith("[")) {
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  }

  // Handle string values that reference this.state
  if (value.startsWith("this.state.")) {
    try {
      return value.split(".").reduce((obj, key) => obj[key], this);
    } catch (e) {
      return value;
    }
  }

  // Handle boolean values
  if (value.toLowerCase() === "true") return true;
  if (value.toLowerCase() === "false") return false;

  // Handle numeric values
  if (!isNaN(value)) return Number(value);

  return value;
}
async function executeAction(actionDetails) {
  let {
    parentModuleName,
    actionName,
    arguments: args,
    shouldStoreState,
    continueOnError,
    // continueOnError = false,
  } = actionDetails;

  // Get the parent module instance
  const parentModule = this[parentModuleName];
  if (!parentModule) {
    throw new Error(
      `Module ${parentModuleName} not found while executing action: ${actionName}`
    );
  }

  // Get the action function
  const action = parentModule[actionName];
  if (typeof action !== "function") {
    throw new Error(
      `Action ${actionName} not found in module ${parentModuleName}`
    );
  }
  try {
    // Only parse as JSON if it's an object-like string
    let parsedArgs = parseArgs.call(this, args);

    // console.log(`parsed args: ${parsedArgs}`);
    // console.log(`Array.isArray parsed args: ${Array.isArray(parsedArgs)}`);

    // Execute the action based on whether it's async or not
    const result =
      action.constructor.name === "AsyncFunction"
        ? await action.call(this, ...parsedArgs)
        : action.call(this, parsedArgs);

    // Store result in state if specified
    shouldStoreState ||= action.shouldStoreState;
    if (shouldStoreState && result !== undefined) {
      this.state[shouldStoreState] = result;
    }

    return result;
  } catch (error) {
    continueOnError ||= action.continueOnError;
    if (!continueOnError) {
      throw error;
    }
    console.error(`Error executing action: ${error.message}`);
    return null;
  }
}
module.exports = executeAction;
