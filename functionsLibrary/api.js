// === Interface ===
module.exports = {
  apiTesting,
  fetchAPI,
  update,
  getNewMemberToAdd,
  addSystemProfileToMember,
};

// === Implementation ===
const API_URL = process.env.API_URL || "http://localhost:3000/api/v1";
// Fetch data from API and store in local cache
async function fetchAPI(endpoint, params = {}) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      ...params,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} on ${API_URL}${endpoint}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch data from ${endpoint}:`, error);
    throw error;
  }
}

async function apiTesting() {
  try {
    await fetchAPI();
  } catch (error) {
    console.error("Failed to initialize database interface:", error);
    throw error;
  }
}

// Update data through API
async function update(endpoint, data, params = {}) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      ...params,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    // Update local cache
    this.db[endpoint] = result;
    return result;
  } catch (error) {
    console.error(`Failed to update data at ${endpoint}:`, error);
    throw error;
  }
}

// ------------------- Get Data from API Methods
async function getNewMemberToAdd() {
  const response = await fetchAPI(`/members?systemName=-${this.state.currentMachine}`);

  if (response.results == 0) {
    console.log(`No new member to add.`);
    return false;
  }
  console.log(`There are ${response.results} new members available to add.`);

  const newMembersToAdd = await response.data.data;

  return newMembersToAdd[0];
}
getNewMemberToAdd.shouldStoreState = "newMemberToAdd";

async function addSystemProfileToMember(memberGmail, systemName, profileNumber) {
  console.log(`ok addSystemProfileToMember started`);

  memberGmail ||= this.state.newMemberToAdd.gmail;
  systemName ||= this.state.currentMachine;
  profileNumber ||= this.state.nextAvailableChromeProfile;
  const response = await fetchAPI(`/members?gmail=${memberGmail}`, {
    method: "GET",
  });

  const memberId = this.state.newMemberToAdd._id;

  const sytemProfile = { systemName, profileNumber };

  const res = await fetchAPI(`/members/${memberId}/systemProfile/`, {
    method: "PATCH",
    body: JSON.stringify(sytemProfile),
  });
  const successMSG = `System Profile added successfully to member ${memberGmail} with systemName ${systemName} and profileNumber ${profileNumber}`;
  const errorMSG = `Some error occured can't add to member ${memberGmail} with systemName ${systemName} and profileNumber ${profileNumber}`;
  if (res.status !== "success") {
    console.log(errorMSG);
    this.logger.logError(errorMSG);
    return false;
  } else {
    console.log(successMSG);
    this.logger.logMSG(successMSG);
    return true;
  }
}

/* Doesn't seems required and the polling in appExecuter.js is not implemented yet. 
getNewMemberToAdd.polling = true;
getNewMemberToAdd.pollingInterval = 1000;
getNewMemberToAdd.pollingRetries = 3;
*/

// -------------------------------------
// const os = require("os");

// async function newMemberToAdd(systemName) {
//   // 1. Get the current Machine's username
//   systemName ||= os.userInfo().username;
//   // 2. Get all members of which do not have chrome profile the current system
//   const res = await fetch(
//     `${process.env.API_URL}/members?systemName=-${systemName}`
//   );
//   const resJSON = await res.json();
//   const members = resJSON.data.data;

//   if (members.length === 0) {
//     console.log("No Members to add");
//     return "No Members to add";
//   }
//   // console.log(members);
//   // console.log(members[0].systemProfiles);
//   return members[0];
// }
