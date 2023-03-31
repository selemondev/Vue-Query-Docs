# Important defaults

By default, Vue Query is pre-configured with `aggressive` yet `sane` settings. While these defaults offer optimal performance, they may potentially cause confusion or hinder the learning and debugging process for new users who are unfamiliar with them.

To ensure a smooth learning and utilization process of Vue Query, it is important to keep these default settings in mind : 

- Query instances via `useQuery` or `useInfiniteQuery` by default consider cached data as `stale`.

:::tip
Vue Query offers the flexibility to adjust this behavior by allowing users to configure queries on a `global` or `per-query` basis through the `staleTime` option. Setting a longer 'staleTime' value reduces the frequency of data refetching, enabling greater control over the caching mechanism and optimizing performance.
:::

- Stale queries are refetched automatically in the background when:
  - New instances of the query mount.
  - The window is refocused.
  - The network is reconnected.
  - The query is optionally configured with a refetch interval

If you see a refetch that you are not expecting, it is likely because you just focused the window and Vue Query is doing a `refetchOnWindowFocus`. During development, this will probably be triggered more frequently, especially because focusing between the Browser DevTools and your app will also cause a fetch, so be aware of that.

:::tip
To change this functionality, you can use options like `refetchOnMount`, `refetchOnWindowFocus`, `refetchOnReconnect` and `refetchInterval`.
:::

- If query results do not have any active instances of `useQuery`, `useInfiniteQuery`, or `query observers`, they will be marked as `inactive`. These results will be stored in the cache in case they are needed again in the future.

- By default, `inactive` queries are garbage collected after 5 minutes.

:::tip
To change this, you can alter the default `cacheTime` for queries to something other than 1000 * 60 * 5 milliseconds.
:::

- Queries that fail are silently `retried 3 times`, with exponential backoff delay before capturing and displaying an error to the UI.

:::tip
To change this, you can alter the default `retry` and `retryDelay` options for queries to something other than `3` and the default exponential backoff function.
:::

- Query results by default are structurally shared to detect if data has actually changed and if not, the data reference remains unchanged to better help with value stabilization. If this concept sounds foreign, then don't worry about it! 99.9% of the time you will not need to disable this and it makes your app more performant at zero cost to you.


:::tip
Structural sharing only works with JSON-compatible values, any other value types will always be considered as changed. If you are seeing performance issues because of large responses for example, you can disable this feature with the `config.structuralSharing` flag. If you are dealing with non-JSON compatible values in your query responses and still want to detect if data has changed or not, you can define a data compare function with `config.isDataEqual`.
:::
