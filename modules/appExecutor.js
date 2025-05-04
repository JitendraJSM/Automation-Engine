// ---- TODO ----
/* 1. Getting the parent module instance
        - first check on "this"
        - if not defined, check is there any file by name `${parentModuleName}.js`
            -- if found, require it and assign it to "this"
*/
// --------------
// "this" in thw executeAction function is the app instance as it is called in the app by "executeAction.call(this, action)""
function parseArgumentValue(value) {
  console.log(`---------------value: ${value}`);

  if (value === "true" || value === "false") {
    return value === "true";
  } else if (!isNaN(value)) {
    return Number(value);
  } else if (value.includes(".")) {
    let valueArr = value.trim().split(".");
    console.log(`valueArr after split:`);
    console.log(valueArr);
    console.log(this["state"]["newMemberToAdd"]["gmail"]);

    if (value in this) {
      return this[value];
    } else if (value in this.state) {
      return this.state[value];
    }
  } else {
    return value;
  }
}
function parseArguments(argumentsString) {
  // console.log(this);
  if (!argumentsString) return [];
  let argumentsArray = argumentsString.split(",");
  console.log(`the Splited argumentsArray:`);
  console.log(argumentsArray);

  let parsedArguments = argumentsArray.map((arg) =>
    parseArgumentValue.call(this, arg)
  );
  console.log(`parsedArguments after looping:`);
  console.log(parsedArguments);

  return parsedArguments;
}

async function executeAction(actionDetails) {
  let {
    parentModuleName,
    actionName,
    argumentsString,
    shouldStoreState,
    continueOnError,
    doParseArguments,
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
    let parsedArguments = doParseArguments
      ? parseArguments.call(this, argumentsString)
      : [argumentsString];

    // console.log(`parsed args: ${parsedArgs}`);
    // console.log(`Array.isArray parsed args: ${Array.isArray(parsedArgs)}`);

    // Execute the action based on whether it's async or not
    const result =
      action.constructor.name === "AsyncFunction"
        ? await action.call(this, ...parsedArguments)
        : action.call(this, ...parsedArguments);

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
