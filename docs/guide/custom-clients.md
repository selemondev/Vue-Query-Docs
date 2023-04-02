# Custom clients (experimental)

## Custom client

Vue Query allows providing custom `QueryClient` for Vue context.

It might be handy when you need to create `QueryClient` beforehand to integrate it with other libraries that do not have access to the Vue context.

For this reason, `VueQueryPlugin` accepts either `QueryClientConfig` or `QueryClient` as a plugin options.

If you provide `QueryClientConfig`, `QueryClient` instance will be created internally and provided to the Vue context.

```ts
const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: { queries: { staleTime: 3600 } },
  },
};
app.use(VueQueryPlugin, vueQueryPluginOptions);
```

```ts
const myClient = new QueryClient(queryClientConfig);
const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClient: myClient,
};
app.use(VueQueryPlugin, vueQueryPluginOptions);
```

## Custom context keys

You can also customize the key under which `QueryClient` will be accessible in the Vue context. This can be useful if you want to avoid name clashing between multiple apps on the same page.

It works both with default, and custom `QueryClient`

```ts
const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClientKey: "Foo",
};
app.use(VueQueryPlugin, vueQueryPluginOptions);
```

```ts
const myClient = new QueryClient(queryClientConfig);
const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClient: myClient,
  queryClientKey: "Foo",
};
app.use(VueQueryPlugin, vueQueryPluginOptions);
```

To use the custom client key, you have to provide it as a query option

```js
useQuery("query1", fetcher, { queryClientKey: "foo" });
```

The `queryClientKeys` prop in Devtools allows you to monitor multiple clients by providing multiple keys and switching between them.

```vue
<template>
  <VueQueryDevTools :queryClientKeys="['foo', 'bar']" />
</template>
```

The custom key will be internally combined with the default query key as a suffix, but users do not need to worry about it.

```ts
const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClientKey: "Foo",
};
app.use(VueQueryPlugin, vueQueryPluginOptions); // -> VUE_QUERY_CLIENT:Foo
```