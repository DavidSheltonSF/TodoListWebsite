# Error History

## Unhandled Promise Rejection when the API is unavailable

### Symptoms

- The browser reported `Unhandled Promise Rejection` when `getTodos` failed to reach the API.
- The error was displayed in the UI, but the console still showed an uncaught promise rejection.

### Investigation

- Confirmed that `getTodos` was already wrapped in a `try/catch`.
- Verified that throwing an error inside `getTodos` did not resolve the issue.

### Root Cause

`getTodosStats` was also making an API request, but its Promise was not being awaited or handled by the same `try/catch` block.

As a result, when `getTodosStats` failed, the browser emitted an `Unhandled Promise Rejection`.

### Resolution

The data-loading logic was refactored so that both requests are awaited together, ensuring that any rejection is properly handled.