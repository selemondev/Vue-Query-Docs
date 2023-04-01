# Dependent Queries

Serial queries, also known as dependent queries, require the completion of preceding queries before they can be executed. Enabling the `enabled` option is a simple way to indicate a query's readiness to execute.

```js
// Main Query - get the user
function useUserQuery(email) {
  return useQuery(["user", email], () => getUserByEmail(email.value));
}

// Dependant query - get the user's projects
function useUserProjectsQuery(userId, { enabled }) {
  return useQuery(["projects", userId], () => getProjectsByUser(userId.value), {
    enabled, // The query will not execute until `enabled == true`
  });
}

// Get the user
const { data: user } = useUserQuery(email);

const userId = computed(() => user.value?.id);
const enabled = computed(() => !!user.value?.id);

// Then get the user's projects
const { isIdle, data: projects } = useUserProjectsQuery(userId, { enabled });

// isIdle will be `true` until `enabled` is true and the query begins to fetch.
// It will then go to the `isLoading` stage and hopefully the `isSuccess` stage :)
```