// === InterFace ===
module.exports = { testFunction1, testFunction2 };

// === Implementations ===

async function testFunction1(arg1, agr2) {
  console.log(`going go click btn.`);

  // Filter by text content
  // const submitButton = this.page.locator("a").filter({ hasText: "More information..." });
  // const submitButton = this.page.locator("a ::-p-text(More information...)");
  // const submitButton = this.page.locator("a").filter((el) => el.innerText === "More information...");
  // const submitButton =
  await this.page.locator("text/More info").click();
  // await submitButton.click();
  console.log(`btn has been clicked.`);

  // Filter by CSS selector
  // const inputField = this.page.locator("input").filter({ has: this.page.locator("label") });
  // await inputField.fill("Test Input");
}
async function testFunction2(arg1, agr2) {
  // async function testFunction2(arg1, agr2) {
  console.log(`=======Start testFunction Code=======`);
  console.log(`arg1 is as below:`);
  console.log(arg1);
  console.log(`agr2 is as below:`);
  console.log(agr2);

  // console.log(`textOrSelector is : ${textOrSelector}`);
  // console.log(
  //   `Array.isArray textOrSelector is : ${Array.isArray(textOrSelector)}`
  // );
  // console.log(`type of textOrSelector is : ${typeof textOrSelector}`);
  // // console.log(`type of textOrSelector is : ${typeof textOrSelector}`);
  // console.log(`options is as below :`);
  // console.log(options);
  // // console.log(`options.text is : ${options?.text}`);
  // // console.log(`the state is as below:`);
  // // console.log(this.state);
  console.log(`=======Code Tested=======`);
}
