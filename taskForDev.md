await this.page.locator("::-p-text(RFC 6761)").click();
this above code from perplexity is working

- Note now when ever click on some link (by your code) that triggers navigation then you have to wait for that navigation to complete, so do something for that, like adding event listener for all these events or triger a custom event as due to naviagation page URL changes or create a custom event when network is not idle so that app can wait for network being idle but on youtube like websites network will never become idle.
  <!-- ------------------------------------------------------- -->
  <!-- ------------------------------------------------------- -->
  <!-- ------------------------------------------------------- -->
  not working solutions

1. "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --user-data-dir="C:\Users\acer\AppData\Local\Google\Chrome\User Data\Profile 2" --profile-directory="Profile 2" --remote-debugging-port=9222
2. "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --user-data-dir="C:\Users\acer\AppData\Local\Google\Chrome\User Data" --profile-directory="Profile 2" --remote-debugging-port=9222
   C:\Users\acer\AppData\Local\Google\Chrome\User Data

"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --user-data-dir="C:\Users\acer\AppData\Local\Google\Chrome\User Data" --profile-directory="Profile 2" --remote-debugging-port=9222
ok the given command opens the original profile 2 but in that chrome but the same problem that on url "http://127.0.0.1:9222/json/version" "This site can’t be reached"
