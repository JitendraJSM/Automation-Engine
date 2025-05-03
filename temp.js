// i want a function which to which i gave string and in return i got object.
// i am giving you different inputs and their outputs,
// 1. input type string: '{text:testVar}', output's tpy object: { text : testVar }
// 2. input type string: '{text:testVar, ore:12, opn:rag21s }', output's type object: { text:testVar, ore:12, opn:rag21s }  here 12 is number
// 2. input type string: '{text:testVar, ore:12, opn:rag21s }', output's type object: { text:testVar, ore:12, opn:rag21s }  here 12 is number
//  means i need a robust function for parsing string (this string does not needed to be a json formatted string, it could be any.) into object.
// give me less lines of codes , but that must be simple and logical.
function parseStringToObject(str) {
  // Remove outer braces and whitespace
  str = str.trim().replace(/^{|}$/g, "");

  // Split into key-value pairs and reduce into object
  return str.split(",").reduce((obj, pair) => {
    const [key, value] = pair.split(":").map((s) => s.trim());

    // Convert value to appropriate type
    let convertedValue = value;
    if (!isNaN(value)) {
      convertedValue = Number(value);
    } else if (value === "true" || value === "false") {
      convertedValue = value === "true";
    }

    obj[key] = convertedValue;
    return obj;
  }, {});
}

// Test cases
const tests = ["{text:testVar}", , "{text:testVar, org:12, ops:true}"];

tests.forEach((test) => {
  console.log("Input:", test);
  console.log("Output:", parseStringToObject(test));
  console.log("---");
});
