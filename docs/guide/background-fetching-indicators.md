# Background Fetching Indicators

A query's `status === loading` state is sufficient to show the initial hard-loading state for a query, but sometimes you may want to display an additional indicator that a query is refetching in the background.

Queries provide an `isFetching` boolean that you can utilize to indicate that the query is currently fetching data, irrespective of the `status` variable's state.

```vue
<script setup>
import { useQuery } from "vue-query";

function useTodosQuery() {
  return useQuery("todos", fetchTodoList);
}

const { isLoading, isError, data, error, isFetching } = useTodosQuery();
</script>

<template>
  <span v-if="isLoading">Loading...</span>
  <span v-else-if="isError">Error: {{ error.message }}</span>
  <div v-else>
    <span v-if="isFetching">Refreshing...</span>
    <ul>
      <li v-for="todo in data" :key="todo.id">{{ todo.title }}</li>
    </ul>
  </div>
</template>
```

## Displaying Global Background Fetching Loading State

Apart from indicating the loading state of individual queries, you can utilize the `useIsFetching` hook to display a global loading indicator when any queries are fetching, even in the background.

```vue
<script setup>
import { useIsFetching } from "vue-query";

const isFetching = useIsFetching();
</script>

<template>
  <span v-if="isFetching">Queries are fetching in the background...</span>
</template>
```



