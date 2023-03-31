# Query Keys

At its core, Vue Query manages query caching for you based on query keys. Query keys can be as simple as a string, or as complex as an array of many strings and nested objects. As long as the query key is serializable, and `unique to the query's data`, you can use it!

## String Only Query Keys

The simplest form of a key is actually not an array, but an individual string. When a string query key is passed, it is converted to an array internally with the string as the only item in the query key. This format is useful for:

- Generic list / Index resources.
- Non-hierarchical resources

```ts
// A list of todos
useQuery('todos', ...) // queryKey === ['todos']

// Something else, whatever!
useQuery('somethingSpecial', ...) // queryKey === ['somethingSpecial']
```

## Array Keys

When a query needs more information to uniquely describe its data, you can use an array with a string and any number of serializable objects to describe it. This is useful for:

- Hierarchical or nested resources
  - It's common to pass an ID, index, or other primitive to uniquely identify the item.
- Queries with additional parameters
  - It's common to pass an object of additional options


```ts
// An individual todo
useQuery(['todo', 5], ...)
// queryKey === ['todo', 5]

// And individual todo in a "preview" format
useQuery(['todo', 5, { preview: true }], ...)
// queryKey === ['todo', 5, { preview: true }]

// A list of todos that are "done"
useQuery(['todos', { type: 'done' }], ...)
// queryKey === ['todos', { type: 'done' }]
```

::: danger
To ensure that your query key parameter can change over time within the same component, pass each query key parameter as a `ref` or `computed` value.
:::

```ts
const id = ref(5);
useQuery(['todo', id], ...)
```

## Query Keys are hashed deterministically!

This means that no matter the order of keys in objects, all of the following queries are considered `equal`:

```ts
useQuery(['todos', { status, page }], ...)
useQuery(['todos', { page, status }], ...)
useQuery(['todos', { page, status, other: undefined }], ...)
```

However, it is important to note that the following query keys `are not equal` as the order of array items is significant.

```ts
 useQuery(['todos', status, page], ...)
 useQuery(['todos', page, status], ...)
 useQuery(['todos', undefined, page, status], ...)
```

If your query function depends on a variable, include it in your query key.

Since query keys uniquely describe the data they are fetching, they should include any variables you use in your query function that change. For example:

```ts
function useTodos(todoId) {
  const queryKey = ["todos", todoId];
  const result = useQuery(queryKey, () => fetchTodoById(todoId.value));
}
```


