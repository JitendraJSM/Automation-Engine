const utils = require("../utils/utils.js");
class apiInterface {
  constructor() {
    this.db = {}; // Local cache for storing data
    this.API_URL = process.env.API_URL || "http://localhost:3000/api/v1";
    this.endpoints = {
      // Define your API endpoints here
      // base: process.env.API_URL || "http://localhost:3000/api/v1",
      // Add more endpoints as needed
    };
  }
  // Initialize the database interface
  async init() {
    try {
      this.fetch();
    } catch (error) {
      console.error("Failed to initialize database interface:", error);
      throw error;
    }
  }

  // Fetch data from API and store in local cache
  async fetch(endpoint, params = {}) {
    try {
      const response = await fetch(`${this.API_URL}${endpoint}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        ...params,
      });

      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status} on ${this.API_URL}${endpoint}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Failed to fetch data from ${endpoint}:`, error);
      throw error;
    }
  }

  // Post data to API
  async post(endpoint, data, params = {}) {
    try {
      const response = await fetch(`${this.API_URL}${endpoint}`, {
        method: "POST",
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
      console.error(`Failed to post data to ${endpoint}:`, error);
      throw error;
    }
  }

  // Update data through API
  async update(endpoint, data, params = {}) {
    try {
      const response = await fetch(`${this.API_URL}${endpoint}`, {
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

  // Get data from local cache
  getFromCache(endpoint) {
    return this.db[endpoint];
  }

  // Clear specific endpoint data from cache
  clearCache(endpoint) {
    if (endpoint) {
      delete this.db[endpoint];
    } else {
      this.db = {}; // Clear entire cache if no endpoint specified
    }
  }
  // Reset local db
  async resetdb() {
    this.db = {};
    return true;
  }
  // Log the entire database
  async logDB() {
    await utils.log(JSON.stringify(this.db));
    console.log(`DB Logged`);
    return true;
  }
  // ------------------- Get Data from API Methods
  async getNewMemberToAdd() {
    /* const newMember = await this.fetch("/members", {
      systemName: "-OfficePC",
      });
      console.log(newMember);
      */
    this.db.newMemberToAdd = await this.fetch("/members?systemName=-OfficePC");
    return this.db.newMemberToAdd;
  }
}

module.exports = apiInterface;
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
