# Does this replace (Vuex, Pinia, etc)?

### Does Vue Query replace Vuex, Pinia or other global state managers?

Well, let's start with a few important items:

- Vue Query is a `server-state` library, responsible for managing asynchronous operations between your server and client.

- Vuex, Pinia, Zustand, etc. are `client-state` libraries that can be used to store asynchronous data, albeit inefficiently when compared to a tool like Vue Query.

With those points in mind, the short answer is that Vue Query replaces the boilerplate code and related wiring used to manage cache data in your client-state and replaces it with just a few lines of code.

For a vast majority of applications, the truly globally accessible client state that is left over after migrating all of your async code to Vue Query is usually very tiny.

::: tip
There are still some circumstances where an application might indeed have a massive amount of synchronous client-only state (like a visual designer or music production application), in which case, you will probably still want a client state manager. In this situation it's important to note that Vue Query is not a replacement for local/client state management. However, you can use Vue Query along side most client state managers with zero issues.
:::


## A contrived example

Here we have some "global" state being managed by a global state library:

```ts
const globalState = {
  projects,
  teams,
  tasks,
  users,
  themeMode,
  sidebarStatus,
};
```

Currently, the global state manager is caching 4 types of server-state: `projects`, `teams`, `tasks`, and `users`. If we were to move these server-state assets to Vue Query, our remaining global state would look more like this:

```ts
const globalState = {
  themeMode,
  sidebarStatus,
};

```

This also means that with a few hook calls to `useQuery` and `useMutation`, we also get to remove any boilerplate code that was used to manage our server state eg :

- Connectors
- Action Creators
- Middlewares
- Reducers
- Loading/Error/Result states
- Contexts

With all of those things removed, you may ask yourself, "Is it worth it to keep using our client state manager for this tiny global state?". Well `that's up to you!`

But Vue Query's role is clear. It removes asynchronous wiring and boilerplate from your application and replaces it with just a few lines of code.

What are you waiting for, give it a go already!
