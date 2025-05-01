// === InterFace ===
module.exports = { testFunction };

// === Implementations ===

async function testFunction() {
  console.log(`=======Start testFunction Code=======`);
  console.log(`o teri.....`);

  console.log(`=======Code Tested=======`);
}

/* === below functions are for testing the Monitor module ===
// Example 1 Simple Condition Monitoring with default options most useful
async function simpleConditionMonitoring() {
  // Example function to poll
  async function checkCondition() {
    // Simulating some async check
    let randomNum = Math.random();
    console.log(`Random number is ${randomNum}`);

    return randomNum > 0.8;
  }

  // Basic polling with default options
  const promise = this.monitor.robustPolling(checkCondition);
  await promise;

  // promise
  //   .then((result) => {
  //     console.log("Polling succeeded:", result);
  //   })
  //   .catch((err) => {
  //     console.log("Polling failed:", err);
  //   });
}
module.exports.simpleConditionMonitoring = simpleConditionMonitoring;

// Example 2 Infinite Polling and Stopping after a Time Period
async function simpleInfiniteMonitoring() {
  // Example function to poll
  async function checkCondition() {
    // Simulating some async check
    let randomNum = Math.random();
    console.log(`Random number is ${randomNum}`);

    return false;
  }

  // Basic polling with default options
  // Start infinite polling
  const promise = this.monitor.robustPolling(checkCondition, {
    infintiePolling: true,
    intervalMs: 2000, // Check every 2 seconds
  });

  // Stop after 10 seconds
  setTimeout(() => {
    promise.stop();
  }, 10000);

  promise
    .then((result) => {
      console.log("Polling succeeded:", result);
    })
    .catch((err) => {
      console.log("Polling failed:", err);
    });
}
module.exports.simpleInfiniteMonitoring = simpleInfiniteMonitoring;

// Example 3: Multiple Polling Tasks Management
async function multiplePollingExample() {
  // First polling task - checks for even random numbers
  async function checkEvenNumber() {
    const num = Math.floor(Math.random() * 100);
    console.log(`First task - Number is ${num}`);
    // return true;
    return false;
  }

  // Second polling task - checks for numbers greater than 80
  async function checkLargeNumber() {
    const num = Math.floor(Math.random() * 100);
    console.log(`Second task - Number is ${num}`);
    return false;
  }

  // Start both polling tasks
  const task1 = this.monitor.robustPolling(checkEvenNumber, {
    intervalMs: 1500,
    infintiePolling: true,
  });

  const task2 = this.monitor.robustPolling(checkLargeNumber, {
    intervalMs: 2000,
    infintiePolling: true,
  });

  // After 5 seconds, get active pollings and stop the second task
  const activePollings = this.monitor.getActivePollings();
  console.log("Active polling tasks:----", activePollings);

  setTimeout(async () => {
    // Stop the second task using its taskId
    if (activePollings.length >= 2) {
      console.log(`\nStopping task: ${activePollings[1]}`);
      this.monitor.pollingTasks[`${activePollings[1]}`].stop();
      console.log(`ok-----ended`);
    }
  }, 5000);

  // Stop the first task after 10 seconds
  setTimeout(() => {
    console.log(`\nStopping task: ${activePollings[0]}`);
    this.monitor.pollingTasks[`${activePollings[0]}`]?.stop();
    console.log(`ok-----ended`);
  }, 10000);

  // Handle promises
  await Promise.all([task1, task2])
    .then((results) => {
      console.log("All polling tasks completed:", results);
    })
    .catch((err) => {
      console.log("A polling task failed:", err);
    });
}
module.exports.multiplePollingExample = multiplePollingExample;

// Example 4: Object Destructuring with Renaming for monitor.robustPolling returned object
// async function objectDestructuringExample() {
//   const person = {
//     firstName: "John",
//     lastName: "Doe",
//     age: 30,
//     city: "New York",
//   };

//   // Destructuring and renaming variables
//   const {
//     firstName: fName,
//     lastName: lName,
//     age: personAge,
//     city: location,
//   } = person;

//   console.log(fName); // John
//   console.log(lName); // Doe
//   console.log(personAge); // 30
//   console.log(location); // New York
// }
// objectDestructuringExample();
*/
