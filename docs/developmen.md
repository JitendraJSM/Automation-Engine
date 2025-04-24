<!-- 👇👇This below notes are written by Er. Jitendra Nath👇👇 -->

1. Import and create an instance of the `App` class.
2. Use the `addAction()` method to add functions to the queue.
3. Call the `run()` method to execute the queue.
4. The `run()` method calls the `next()` method to control flow between functions.
5. To conditionally skip a function, call `return this.next()` in the function.
6. Use `return this.next(error)` to handle errors.
7. The `run()` method returns a promise that resolves when the queue is empty.
8. Added State to APP

- 1. Added a state object to store shared data
- 2. Results from functions are automatically stored in state using the function name as key
- 3. Added setState and getState methods for explicit state management
- 4. Functions can access shared data through:
     -- this.state directly
     -- this.setState() and this.getState() methods
     -- Return values from previous functions (stored automatically)
     This approach gives you three ways to share data between functions:

- 5. Using explicit state management with setState/getState
- 6. Accessing this.state directly
- 7. Using automatic storage of function return values
  <!-- ------------- -->

- next() working
- next(error working)
- Each and every function which is added to the queue have access to the app via this.
<!-- ☝☝This above notes are written by Er. Jitendra Nath👆👆 -->

This appears to be an automation framework that's inspired by Express.js, implementing similar concepts like middleware and the next() function. Here's a breakdown of the key components:

1. Core Structure

- `app.js` is the main class that handles:
  - Action queue management
  - Error handling
  - Sequential execution of tasks

2. Key Features

- Action Queue System

  ```javascript
  addAction(callback, ...args) {
    this.actionList.push({ args, callback });
  }
  ```

  ```

  Similar to Express middleware, actions are queued and executed sequentially.
  ```

- Next Function Implementation

  ```javascript
  next(error) {
    if (error && this.errorHandler !== null) {
      this.errorHandler(this, error);
    } else if (this.currentActionIndex < this.actionList.length) {
      this.currentActionIndex++;
    }
  }
  ```

  ```

  Like Express's next() , it controls flow between actions.
  ```

3. Utility Functions

- `utils/utils.js` provides helper functions:
  - delay() for async timing
  - robustPolling() for reliable polling
  - randomDelay() for natural timing
  - log() for logging
