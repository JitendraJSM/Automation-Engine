async function testFunction2(var1, var2) {
  try {
    if (var2 === "Viju") return this.next();
    console.log(`Test function 2 started parameter ${var1} & ${var2} <-. `);
    const result = await Promise.resolve("Test successful");
    return result;
  } catch (error) {
    throw new Error(`Test failed: ${error.message}`);
  }
}
module.exports = { testFunction2 };
