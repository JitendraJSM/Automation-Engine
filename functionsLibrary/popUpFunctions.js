async function privacySandboxHandler() {
  const privacyPopUp = "chrome://privacy-sandbox-dialog/notice";
  let pages = await this.browser.pages();

  if (pages.find((page) => page.url() === privacyPopUp)) {
    console.log(`Privacy sandbox pop up is opened.`);
  }
}
async function popUpHandler() {
  // await privacySandboxHandler();
  // console.log(`Popup handler called`);
  await privacySandboxHandler.call(this);
  // For a one-time detection of a new page
  //   browser.once("targetcreated", async (target) => {
  //     if (target.type() === "page") {
  //       const newPage = await target.page();
  //       console.log("New page created:", await newPage.url());
  //       return newPage;
  //     }
  //   });
}
module.exports.popUpHandler = popUpHandler;
