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



## Unexpected behavior in the Load More button

The Load More button should disappear when there is no next page of items.

### Symptoms

- The Load More button was not being hidden when there were no more pages available.
- It was hidden only after the user clicked it.

### Investigation

- Checked that the server was returning `nextPage` = 2 even when there was no next page.
- Checked that the interface was not updating the default value of the `page` state.

### Root Cause

`GetAll` method in `TodosRepository` was calculating `totalPages` without applying the provided filters. That incorrect value was then used to calculate the next page.

### Resolution

I applied the provided filters before calculating `totalPages`, ensuring that `nextPage` is calculated correctly. Also, I updated `fetchData` function to update `page` after each successful request.