# Simple example

Here is a simple example of how to use `useQuery` in a Vue component to fetch data from an external API and display it on the page. In this example, the component fetches a list of TODO items from the JSONPlaceholder API using the `fetcher` function. The component then uses `useQuery` to manage the state of the query, including `isLoading`, `isError`, `isFetching`, `data`, `error`, and `refetch`. Finally, the component renders a button to trigger the `refetch` function, and conditionally displays the loading spinner, error message, or list of TODO items based on the query state.

[View source](https://github.com/DamianOsipiuk/vue-query/tree/main/examples/simple)

::: code-group

```ts [src/main.ts]
import { createApp } from "vue";
import { VueQueryPlugin } from "vue-query";

import App from "./App.vue";

createApp(App).use(VueQueryPlugin).mount("#app");
```

```vue [src/App.vue]
<script lang="ts">
import { defineComponent } from "vue";

import Todos from "./Todos.vue";

export default defineComponent({
  name: "App",
  components: { Todos },
});
</script>

<template>
  <h1>Vue Query - Simple</h1>
  <Todos />
</template>
```

```vue [src/Todos.vue]
<script lang="ts">
import { defineComponent } from "vue";
import { useQuery } from "vue-query";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const fetcher = async (): Promise<Todo[]> =>
  await fetch("https://jsonplaceholder.typicode.com/todos").then((response) =>
    response.json()
  );

export default defineComponent({
  name: "Todos",
  setup() {
    const { isLoading, isError, isFetching, data, error, refetch } = useQuery(
      "todos",
      fetcher
    );

    return { isLoading, isError, isFetching, data, error, refetch };
  },
});
</script>

<template>
  <p>
    Turn on <strong>network throttling</strong> in dev-tools and press Refetch
  </p>
  <button @click="refetch" :disabled="isFetching">
    {{ isFetching ? "Refetching..." : "Refetch" }}
  </button>
  <h2>TODO list</h2>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="isError">An error has occurred: {{ error }}</div>
  <div v-else-if="data">
    <ul>
      <li v-for="item in data" :key="item.id">
        {{ item.completed ? "🗹" : "☐" }} {{ item.title }}
      </li>
    </ul>
  </div>
</template>

<style>
ul {
  list-style: none;
}
</style>
```
:::

