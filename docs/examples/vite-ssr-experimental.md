# Vite SSR ( Experimental )

`vite.config.ts` is the configuration file for the Vite development server. It imports and uses the `vue` and `viteSSR` plugins and exports the configuration object.

`tsconfig.json` is the configuration file for the TypeScript compiler. It specifies the target, module, module resolution, strictness, source map, JSON module resolution, ES module interoperability, and the available library types. It also specifies the files to include for compilation.

`src/use-iso-query.ts` defines a custom hook called `useIsoQuery` that uses the useQuery function from vue-query to `fetch` and `cache data`. If the code is being run on the `server-side`, it uses `onServerPrefetch` from Vue to prefetch data for rendering.

`src/routes.ts` exports an array of route objects that will be used by vite-ssr.

`src/main.ts` is the entry point for the app. It imports `App`, `routes`, `viteSSR`, `QueryClient`, and `VueQueryDevTools` and creates a new QueryClient for each request to the server. It also `hydrates` and `dehydrates` the `QueryClient cache` for server-side rendering and provides the QueryClient to the app.

`src/App.vue` is a Vue component that provides a dev tools component called `VueQueryDevTools` and renders a `RouterView` component.

`src/Content.vue` is a Vue component that uses the `useIsoQuery` hook to fetch and render a list of todos from an external API. It also provides a button to `refetch` the data and displays `loading`, `error`, and `empty` state messages.

[View source](https://github.com/frandiox/vite-ssr-vue-query)


::: code-group

```ts [vite.config.ts]
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import viteSSR from "vite-ssr/plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), viteSSR()]
});

```

```ts [tsconfig.json]
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "moduleResolution": "node",
    "strict": true,
    "jsx": "preserve",
    "sourceMap": true,
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "lib": ["esnext", "dom"],
    "types": ["vite/client"]
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"]
}
```

```ts [src/use-iso-query.ts]
import { onServerPrefetch } from "vue";
import { useQuery, UseQueryOptions } from "vue-query";

export function useIsoQuery<T = any>(
  key: string,
  fetcher: () => Promise<T>,
  options?: UseQueryOptions
) {
  const result = useQuery(key, fetcher, {
    staleTime: 1000,
    ...options
  });

  if (import.meta.env.SSR) {
    onServerPrefetch(result.suspense);
  }

  return result;
}

export default useIsoQuery;

```

```ts [src/routes.ts]
// Note: Use vite-plugin-pages for filesystem routes

export default [
  {
    name: "home",
    path: "/",
    component: () => import("./Content.vue")
  }
];

```

```ts [src/main.ts]
import App from "./App.vue";
import routes from "./routes";
import viteSSR from "vite-ssr/vue";
import { QueryClient, hydrate, dehydrate, VUE_QUERY_CLIENT } from "vue-query";

export default viteSSR(App, { routes }, ({ app, initialState }) => {
  // Create a new VueQuery client inside the main hook (once per request)
  const client = new QueryClient();

  // Sync initialState with the client cache:
  if (import.meta.env.SSR) {
    // This is a placeholder that will return the VueQuery state during SSR.
    // See how JSON.stringify works:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#description
    initialState.vueQueryState = { toJSON: () => dehydrate(client) };
  } else {
    hydrate(client, initialState.vueQueryState);
  }

  client.mount();
  app.provide(VUE_QUERY_CLIENT, client);
});

```

```vue [src/App.vue]
<script lang="ts">
import { defineComponent } from "vue";
import { VueQueryDevTools } from "vue-query/devtools";

export default defineComponent({
  name: "App",
  components: { VueQueryDevTools },
});
</script>

<template>
  <h1>vue-query example</h1>
  <p>Turn on <b>Slow 3G</b> or <b>Offline</b> in dev-tools and hit Refetch</p>

  <RouterView />

  <VueQueryDevTools :initialIsOpen="true" />
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
import { useIsoQuery } from "./use-iso-query";

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
  setup() {
    const {
      isLoading,
      isError,
      isFetching,
      data,
      error,
      refetch,
    } = useIsoQuery("todos", todoFetcher);

    return { isLoading, isError, isFetching, data, error, refetch };
  },
});
</script>

<template>
  <div>
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
  </div>
</template>

```

:::

