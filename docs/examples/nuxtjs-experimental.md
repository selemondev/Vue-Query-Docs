# Nuxt.js ( Experimental )

`plugins/vue-query.js`: This file defines a Vue.js plugin that sets up a `QueryClient` instance with default options, and passes it to the `VueQueryPlugin`. If the code is being executed on the client, it checks if there is any cached query state in the `context.nuxtState` object (which is passed by Nuxt.js), and hydrates the `QueryClient` with that state if it exists.

`pages/index.vue`: This file defines the main index page of the project, which fetches data from a remote API using the `useQuery` hook from Vue Query. When the page is being rendered on the server, it sets the `renderer` value to "server", and dehydrates the `QueryClient` using the `dehydrate` function from Vue Query. When the page is being rendered on the client, it sets the `renderer` value to "client", and provides a refetch function to manually trigger a data refetch.

`pages/about.vue`: This file defines a simple about page that just displays the current `renderer` value (either "server" or "client").

`layouts/default.vue`: This file defines the default layout for all pages in the project. It simply renders the Nuxt.js content `(<nuxt />)` inside a div.

[View source](https://github.com/DamianOsipiuk/vue-query/tree/main/examples/nuxt-simple)

::: code-group

```js [plugins/vue-query.js]
import Vue from "vue";
import { VueQueryPlugin, QueryClient, hydrate } from "vue-query";

export default (context) => {
  // Modify your Vue Query global settings here
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 5000 } },
  });
  const options = { queryClient };

  Vue.use(VueQueryPlugin, options);

  if (process.client) {
    if (context.nuxtState && context.nuxtState["vueQueryState"]) {
      hydrate(queryClient, context.nuxtState["vueQueryState"]);
    }
  }
};

```

```vue [pages/index.vue]
<template>
  <div>
    <h1>Index - Hi from {{ renderer }}</h1>
    <nuxt-link to="/about">About page</nuxt-link>
    <button @click="refetch">Refetch</button>
    <p>{{ data }}</p>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ssrRef,
  onServerPrefetch,
  useContext,
} from "@nuxtjs/composition-api";
import { useQuery, useQueryClient, dehydrate } from "vue-query";

const fetcher = async () =>
  await fetch("https://jsonplaceholder.typicode.com/todos").then((response) =>
    response.json()
  );

export default defineComponent({
  setup() {
    const renderer = ssrRef("client", "renderer");

    const { refetch, data, suspense } = useQuery("todos", fetcher, {
      // If you do not want data to be refetched on the client, set a staleTime to high enough time
      staleTime: 5000,
    });

    onServerPrefetch(async () => {
      renderer.value = "server";
      const { ssrContext } = useContext();
      const queryClient = useQueryClient();
      await suspense();

      ssrContext.nuxt.vueQueryState = dehydrate(queryClient);
    });

    return {
      refetch,
      renderer,
      data,
    };
  },
});
</script>

```

```vue [pages/about.vue]
<template>
  <div>
    <h1>About - Hi from {{ renderer }}</h1>
    <nuxt-link to="/">Index page</nuxt-link>
  </div>
</template>

<script>
import { defineComponent, useAsync, useContext } from "@nuxtjs/composition-api";

export default defineComponent({
  setup(props, attrs) {
    const { req } = useContext();
    const renderer = useAsync(() => (req ? "server" : "client"));

    return {
      renderer,
    };
  },
});
</script>
```

```vue [layouts/default.vue]
<template>
  <div>
    <nuxt />
  </div>
</template>
```
:::