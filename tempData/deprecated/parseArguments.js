// This Script working but deprecated as it need much more development as parsing array or parsing nested objects and much more.
state = { ops: 59 };
function parseValue(value) {
  if (value === "true" || value === "false") {
    return value === "true";
  } else if (!isNaN(value)) {
    return Number(value);
  } else if (value in this) {
    return this[value];
  } else if (value in this.state) {
    return this.state[value];
  } else {
    return value;
  }
}
function parseStringToObject(str) {
  // Remove outer braces and whitespace
  str = str.trim().replace(/^{|}$/g, "");

  // Split into key-value pairs and reduce into object
  return str.split(",").reduce((obj, pair) => {
    const [key, value] = pair.split(":").map((s) => s.trim());

    // Convert value to appropriate type
    let convertedValue = parseValue(value);

    obj[key] = convertedValue;
    return obj;
  }, {});
}

// Test cases
const tests = ["{text:testVar, org:12, ne:true, ops:true}"];

tests.forEach((test) => {
  console.log("Input:", test);
  console.log("Output:", parseStringToObject(test));
  console.log("---");
});

// Algorithm of function "parseArg(argString)" to parse any string doesn't matter how much it is nested
// 1. Check "argString" exists or return
// 2. Check "argString" includes "{" or "["
//    if yes
//            -
