async function testFunction3(var1, var2, var3) {
  try {
    console.log(`Test function 3  ${var1} & ${var2} & ${var3} <-. `);
    const result = await Promise.resolve("Test successful");
    return result;
  } catch (error) {
    throw new Error(`Test failed: ${error.message}`);
  }
}
module.exports = { testFunction3 };
