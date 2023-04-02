# Multi-page example

The App component has a setup function that defines three variables using the ref function from Vue's Composition API. `firstPage` is initialized to `1`, and `changePage` and `remove` are two functions that modify the firstPage variable. `changePage` toggles the `firstPage` value `between 1 and 2`, and `remove` sets the `firstPage value to 3`.

The Page component renders a title and a list of TODO items. The setup function defines several reactive variables returned by the `useQuery` function:

- `isLoading`: whether the query is currently loading or not.

- `isError`: whether the query resulted in an error or not.

- `isFetching`: whether the query is currently fetching data or not.

- `data`: the data returned by the query, which is an array of TODO items.

- `error`: the error object returned by the query, if any.

- `refetch`: a function that can be called to refetch the query data
The useQuery function takes three arguments:

- `todos`: a string that identifies this query, used for caching and refetching purposes.

- `todoFetcher`: a function that returns a promise that resolves to an array of TODO items
an options object that specifies the caching and retrying behavior of the query.

The Page component renders a button that calls the `refetch` function to reload the TODO items from the server. It also renders a loading message while the query is loading, an error message if the query failed, or a list of TODO items if the query succeeded. The TODO items are rendered in an unordered list, with each item having a checkbox and a label.

[View source](https://github.com/DamianOsipiuk/vue-query/tree/main/examples/multi-page)

::: code-group

```ts [src/main.ts]
import { createApp } from "vue";
import { VueQueryPlugin, VueQueryPluginOptions } from "vue-query";

import App from "./App.vue";

createApp(App)
  .use(VueQueryPlugin, { contextSharing: true } as VueQueryPluginOptions)
  .mount("#app");
// Second app mounted here will share vue-query context with the first app - click refresh to refresh both apps state
createApp(App)
  .use(VueQueryPlugin, { contextSharing: true } as VueQueryPluginOptions)
  .mount("#app2");
```

```vue [src/App.vue]
<script lang="ts">
import { defineComponent, ref } from "vue";
import Page from "./Page.vue";

export default defineComponent({
  name: "App",
  components: { Page },
  setup() {
    const firstPage = ref(1);

    const changePage = () => {
      firstPage.value = firstPage.value === 2 ? 1 : 2;
    };

    const remove = () => {
      firstPage.value = 3;
    };

    return { firstPage, changePage, remove };
  },
});
</script>

<template>
  <h1>vue-query example</h1>
  <button @click="changePage">Change Page</button>
  <button @click="remove">Remove page</button>
  <Page v-if="firstPage === 1" title="Page1" />
  <Page v-else-if="firstPage === 2" title="Page2" />
</template>

<style>
ul {
  list-style: none;
}
</style>

```

```vue [src/Page.vue]
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
  name: "Page",

  props: {
    title: String,
  },
  setup() {
    const { isLoading, isError, isFetching, data, error, refetch } = useQuery(
      "todos",
      todoFetcher,
      {
        retry: 0,
        staleTime: 2000,
        cacheTime: 4000,
      }
    );

    return { isLoading, isError, isFetching, data, error, refetch };
  },
});
</script>

<template>
  <h1>{{ title }}</h1>
  <p>
    Turn on <strong>Slow 3G</strong> or <strong>Offline</strong> in dev-tools
    and hit Refetch
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
  <div v-else>Nothing to see here...</div>
</template>

<style>
ul {
  list-style: none;
}
</style>
```
:::