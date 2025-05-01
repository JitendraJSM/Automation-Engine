// ---- TODO ----
/* 1. Getting the parent module instance
        - first check on "this"
        - if not defined, check is there any file by name `${parentModuleName}.js`
            -- if found, require it and assign it to "this"
*/
// --------------
// "this" in thw executeAction function is the app instance as it is called in the app by "executeAction.call(this, action)""

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

    const parsedArgs =
      typeof args === "string" && args.startsWith("{")
        ? JSON.parse(args)
        : args;

    // Execute the action based on whether it's async or not
    const result =
      action.constructor.name === "AsyncFunction"
        ? await action.call(this, parsedArgs)
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
