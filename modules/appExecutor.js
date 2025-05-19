// ---- TODO ----
/* 1. Getting the parent module instance
        - first check on "this"
        - if not defined, check is there any file by name `${parentModuleName}.js`
            -- if found, require it and assign it to "this"
*/
// --------------
// "this" in thw executeAction function is the app instance as it is called in the app by "executeAction.call(this, action)""
function parseArgumentValue(value) {
  if (value === "true" || value === "false") {
    return value === "true";
  } else if (!isNaN(value)) {
    return Number(value);
  } else if (value.includes(".")) {
    let valueArr = value
      .trim()
      .split(".")
      .filter((element) => element !== "this");

    let result = this;
    for (let i = 0; i < valueArr.length; i++) {
      const element = valueArr[i];
      if (element in result) {
        result = result[element];
      } else {
        console.log(
          `${element} not exists on this.${valueArr
            .slice(0, i)
            .join(
              "."
            )}, \n so please check argumentsString in the task.json file.`
        );
        return undefined;
      }
    }
    return result;
  } else {
    return value;
  }
}
function parseArguments(argumentsString) {
  // console.log(this);
  if (!argumentsString) return [];
  let argumentsArray = argumentsString.split(",");
  console.log(`argumentsArray: ${argumentsArray}`);

  let parsedArguments = argumentsArray.map((arg) =>
    parseArgumentValue.call(this, arg)
  );
  return parsedArguments;
}

async function executeAction(actionDetails) {
  let {
    parentModuleName,
    actionName,
    argumentsString,
    shouldStoreState,
    doNotParseArgumentString,
    // doNotParseArgumentString = false, // Default to false
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
    await this.utils.randomDelay(3, 1);

    // Only parse as JSON if it's an object-like string
    let parsedArguments = !!doNotParseArgumentString
      ? [argumentsString]
      : parseArguments.call(this, argumentsString);

    // console.log(`parsed args: ${parsedArgs}`);
    // console.log(`Array.isArray parsed args: ${Array.isArray(parsedArgs)}`);

    // Check the preCondition if they exist
    if (action.preCondition) {
      let preConditionResult = false;
      if (typeof action.preCondition === "string" && this.page) {
        preConditionResult =
          this.page.url() === action.preCondition ||
          this.page.url().includes(action.preCondition);
      } else {
        preConditionResult = await action.preCondition.call(this);
      }
      if (!preConditionResult) {
        console.log(
          `Precondition failed for action: ${actionName}. Skipping...`
        );
        await askUser("Press Enter to continue...");
      }
    }

    // Execute the action based on whether it's async or not
    // const result = action.constructor.name === "AsyncFunction" ? await action.call(this, ...parsedArguments) : action.call(this, ...parsedArguments);
    const result =
      action.constructor.name === "AsyncFunction"
        ? await action.call(this, ...parsedArguments)
        : action.call(this, ...parsedArguments);

    // Store result in state if specified
    shouldStoreState ||= action.shouldStoreState;
    if (shouldStoreState && result !== undefined) {
      this.state[shouldStoreState] = result;
      this.currentAction[shouldStoreState] = result;
      // this.logger.logMSG(`${shouldStoreState}:${result}\n`);
    }
    this.logger.logAction();

    return result;
  } catch (error) {
    console.error(
      `Error executing action: ${error.message}\n and the error is as below: \n`
    );
    console.error(error);
    return null;
  }
}
module.exports = executeAction;
