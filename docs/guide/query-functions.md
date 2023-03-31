# Query Functions

::: tip
Please read about [queryKey variables](/guide/query-keys) first to avoid common pitfalls of Vue reactivity system.
:::

A query function can be literally any function that `returns a promise`. The promise that is returned should either `resolve the data` or `throw an error`.

All of the following are valid query function configurations:

```ts
useQuery(["todos"], fetchAllTodos);
useQuery(["todos", todoId], () => fetchTodoById(todoId));
useQuery(["todos", todoId], async () => {
  const data = await fetchTodoById(todoId);
  return data;
});
useQuery(["todos", todoId], ({ queryKey }) => fetchTodoById(queryKey[1]));
```

## Handling and throwing erros

In order for Vue Query to identify an error in a query, the query function must throw an error. Any error thrown in the query function will be saved in the `error` state of the query.

```ts
const { error } = useQuery(["todos", todoId], async () => {
  if (somethingGoesWrong) {
    throw new Error("Oh no!");
  }

  return data;
});
```

## Using Vue Query with Non-Throwing Clients

While most utilities like `axios` or `graphql-request` automatically throw errors for unsuccessful HTTP calls, some utilities like `fetch` do not throw errors by default. If that's the case, you'll need to throw them on your own. Here is a simple way to do that with the popular `fetch` API:

```ts
useQuery(["todos", todoId], async () => {
  const response = await fetch("/todos/" + todoId);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
});
```

## Query function variables

Query keys not only serve the purpose of uniquely identifying the data you are retrieving but are also conveniently passed into your query function. Although not always required, this allows for the extraction of your query functions if needed.

```ts
function useTodos(status, page) {
  const result = useQuery(["todos", { status, page }], fetchTodoList);
}

// Access the key, status and page variables in your query function!
function fetchTodoList({ queryKey }) {
  const status = queryKey[1].status;
  const page = queryKey[1].page;
  return new Promise();
}
```

## Using a Query Object instead of parameters

You can express the same configuration using an object wherever the `[queryKey, queryFn, config]` signature is supported in Vue Query's API.

```ts
import { useQuery } from "vue-query";

useQuery({
  queryKey: ["todo", 7],
  queryFn: fetchTodo,
  ...config,
});
```