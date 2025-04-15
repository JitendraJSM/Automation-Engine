async function testFunction(var1) {
  try {
    console.log(`Test function started parameter ${var1} defined. `);
    const result = await Promise.resolve("Test successful");
    return result;
  } catch (error) {
    throw new Error(`Test failed: ${error.message}`);
  }
}
module.exports = { testFunction };
