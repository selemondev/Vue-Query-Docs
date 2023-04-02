# Suspense ( Experimental )

The `Content.vue` file uses the `useQuery` hook to fetch data from an external API. The useQuery hook takes two parameters: the first is a `unique key` that identifies the query and the second is a `function that returns the data`. In this case, the function is `todoFetcher`, which uses the fetch API to retrieve data from the `https://jsonplaceholder.cypress.io/todos` endpoint.

The setup function is an async function that returns an object containing data about the query, such as whether it is `loading`, whether an `error` has occurred, and the data that has been fetched. The `suspense` function is called to ensure that the query is resolved before the component is rendered. The template section of the component displays a button that allows the user to `refetch` the data, a list of TODO items if the data has been fetched successfully, or an error message if an error has occurred.

[View source](https://github.com/DamianOsipiuk/vue-query/tree/main/examples/suspense)

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

import Content from "./Content.vue";

export default defineComponent({
  name: "App",
  components: { Content },
});
</script>

<template>
  <h1>vue-query example</h1>
  <p>
    Turn on <strong>Slow 3G</strong> or <strong>Offline</strong> in dev-tools
    and hit Refetch
  </p>
  <Suspense>
    <template #default>
      <Content />
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>

<style>
ul {
  list-style: none;
}
</style>

```

```vue [src/Content.vue]
<script lang="ts">
import { defineComponent } from "vue";
import { useQuery } from "vue-query";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const todoFetcher = async (): Promise<Todo[]> =>
  await fetch("https://jsonplaceholder.cypress.io/todos").then((response) =>
    response.json()
  );

export default defineComponent({
  name: "Content",
  async setup() {
    const { isLoading, isError, isFetching, data, error, refetch, suspense } =
      useQuery("todos", todoFetcher);
    useQuery("todos2", todoFetcher);
    useQuery("todos3", todoFetcher);

    await suspense();

    return { isLoading, isError, isFetching, data, error, refetch };
  },
});
</script>

<template>
  <button @click="refetch" :disabled="isFetching">
    {{ isFetching ? "Refetching..." : "Refetch" }}
  </button>
  <h2>TODO list</h2>
  <div v-if="isError">An error has occurred: {{ error }}</div>
  <div v-else-if="data">
    <ul>
      <li v-for="item in data" :key="item.id">
        {{ item.completed ? "🗹" : "☐" }} {{ item.title }}
      </li>
    </ul>
  </div>
  <div v-else>Nothing to see here...</div>
</template>

```
:::