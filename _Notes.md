# Notes

1. All Actions should be done via app only.

- Like open a new page method is on browserModule but that should be done via app only.
- Like fetch the new Memeber method is on db but that should be done via app only.

* In the way you know the actions done by app only and not by any other module, so app can track the history of the actions and perform undo and redo or errorHandling.

2. On browserModule there must be a function which can be called from app and that function do mainly 2 things

   - starts polling in background for different conditions ( like: for some particular URLs, if some loading progress compltion is 100% or waiting for particular element to load)( not for unnecessary events like When the user clicks on a link)

3. "pageURL Changed" event should be emitted by browserModule but what to do with it? but it should be handled by app as the app only can perform action. but the listener should be defined in browserModule.

4. Similar to 2, there should be a browserModule must keep polling for
