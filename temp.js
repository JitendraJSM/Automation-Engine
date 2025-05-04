state = { ops: 59 };
function parseValue(value) {
  if (value === "true" || value === "false") {
    return value === "true";
  } else if (!isNaN(value)) {
    return Number(value);
  } else if (value.isPrototypeOf(this)) {
    return this[value];
  } else {
    return value;
  }
}
function parseStringToObject(str) {
  const sri = "state";
  console.log(`sri is: ${sri}`);
  console.log(`is sri a property of state: ${value.isPrototypeOf(this)}`);

  // Remove outer braces and whitespace
  str = str.trim().replace(/^{|}$/g, "");

  // Split into key-value pairs and reduce into object
  return str.split(",").reduce((obj, pair) => {
    const [key, value] = pair.split(":").map((s) => s.trim());

    // Convert value to appropriate type
    // let convertedValue = value;
    let convertedValue = parseValue(value);

    // if (!isNaN(value)) {
    //   convertedValue = Number(value);
    // } else if (value === "true" || value === "false") {
    //   convertedValue = value === "true";
    // }

    obj[key] = convertedValue;
    return obj;
  }, {});
}

// Test cases
const tests = ["{text:testVar, org:12, nestedOBJ:[a,true,b,56], ops:true}"];

tests.forEach((test) => {
  console.log("Input:", test);
  console.log("Output:", parseStringToObject(test));
  console.log("---");
});
