# delayed-task

Delays running a function, resetting the timeout each time the function is delayed.


## Use

```TypeScript
const delayedTask = new DelayedTask(doSomething, 100);

// Invoke function 100ms after last change
inputElement.addEventListener('change', () => delayedTask.delay());

// Cancel timeout
delayedTask.cancel();

// Execute immediatly
delayedTask.run();
```

## Build

```shell
npm install
npm run build
npm run test
```