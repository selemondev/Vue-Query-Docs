# Query Retries

In the event that a `useQuery` query encounters a failure (i.e., the query function throws an error), Vue Query will take the initiative to attempt the query again, provided that the maximum number of consecutive retries (which defaults to 3) has not been reached, or if a custom function has been specified to evaluate whether a retry attempt should be made.

You can configure retries both on a global level and an individual query level.

- Setting `retry = false` will disable retries.

- Setting `retry = 6` will retry failing requests 6 times before showing the final error thrown by the function.

- Setting `retry = true` will infinitely retry failing requests.

- Setting `retry = (failureCount, error) => ...` allows for custom logic based on why the request failed.

```js
import { useQuery } from "vue-query";

// Make a specific query retry a certain number of times
const result = useQuery("todos", fetchTodos, {
  retry: 10, // Will retry failed requests 10 times before displaying an error
});
```

## Retry Delay

By default, retries in Vue Query do not happen immediately after a request fails. As is standard, a back-off delay is gradually applied to each retry attempt.

The default `retryDelay` is set to double (starting at `1000ms`) with each attempt, but not exceed `30 seconds`:

```js
new QueryClient({
  defaultOptions: {
    queries: {
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});
```

Though it is not recommended, you can obviously override the `retryDelay` function/integer in both the Provider and individual query options.

If set to an integer instead of a function the delay will always be the same amount of time: 

```js
const result = useQuery("todos", fetchTodos, {
  retryDelay: 1000, // Will always wait 1000ms to retry, regardless of how many retries
});
```