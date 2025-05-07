# Requirements

1.  Each execution should be logged in a different text file.
2.  The name of the file should be a formatted timestamp of the execution, format is "dd-mm-yy HH-MM-SS".
3.  The file should be stored at path "./data/logs".
4.  The file should contain the following information:
    - The execution time in format "MM minutes & SS seconds".
    - The execution result in below format:
      - if completed without error: "--------- Successful Execution ---------" .
      - if completed with error: "--------- Failed Execution ---------"
      - if terminated by user: "--------- Terminated Execution ---------"
5.  A method on app named as "log" when called will log the message.
6.  A method on app named as "logError" when called will log the message and the error.
7.  A method on app named as "logTask" when called will log the task name and the task actions.
8.  A method on app named as "logTaskResult" when called will log the task result.

# Description

# Examples

Suppose in current execution, in index.js the first call to app.run() is as "await app.run(updateTask);", so the this.task.taskName = "updateTask"

let a file name be "23-06-22 15-30-00"
the file content should be:

```
23-06-22 15-30-00
    Task-1: updateTask
[
  {
    "parentModuleName": "currentMachine",
    "actionName": "getCurrentMachineName"
  },
  {
    "parentModuleName": "api",
    "actionName": "getNewMemberToAdd"
  },
  .
  .
  .
  ...compltete updateTask
]


00 minutes & 00 seconds
--------- Successful Execution ---------
```
