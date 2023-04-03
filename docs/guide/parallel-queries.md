# Parallel Queries

`Parallel` queries are queries that are executed in parallel, or at the same time so as to maximize fetching concurrency.

## Manual Parallel Queries

When the number of parallel queries does not change, there is no extra effort to use parallel queries. Just use any number of Vue Query's `useQuery` and `useInfiniteQuery` hooks side-by-side!

```js
// The following queries will execute in parallel
const usersQuery = useQuery('users', fetchUsers)
const teamsQuery = useQuery('teams', fetchTeams)
const projectsQuery = useQuery('projects', fetchProjects)
```

::: tip
When using Vue Query in suspense mode, this pattern of parallelism does not work, since the first query would suspend the setup function before the other queries run. To get around this, you'll either need to use the `useQueries` hook (which is suggested) or orchestrate your own parallelism with separate components for each `useQuery` instance (which is lame).
:::


## Dynamic Parallel Queries with `useQueries`

When the number of queries that need to be performed within a component changes over time, manual querying cannot be used since it violates the rules of Composables, which must be executed synchronously in `<script setup>` or the `setup()` function. To solve this problem, Vue Query provides a `useQueries` hook that enables you to execute multiple queries in parallel dynamically.

`useQueries` accepts an array of query options objects and returns a reactive array of query results:

```js
const users = computed(...)
const usersQueriesOptions = computed(() => users.value.map(user => {
    return {
      queryKey: ['user', user.id],
      queryFn: () => fetchUserById(user.id),
    }
  })
);
const userQueries = useQueries({queries: usersQueriesOptions})
```