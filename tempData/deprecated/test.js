// const testFunction = require("./testModule");
const testFunction2 = require("./testModule2");
const testFunction3 = require("./testModule3");

const tet = require("./tet.json");

async function main() {
  const funNameIS = tet[0].funName;
  [`${funNameIS}`]();
}
main();
