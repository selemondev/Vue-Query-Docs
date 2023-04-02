# Basic example

The `Posts.vue` component uses the `useQuery` hook from the vue-query library to fetch a list of posts from the `fetcher` function when the component is mounted. The `isFetching`, `isLoading`, `isError`, `data`, and `error` variables returned by the useQuery hook are used to render the appropriate content in the component's template. The `refetch` function is also returned by the useQuery hook and can be used to manually trigger a refetch of the data.

The Post.vue component also uses the useQuery hook to fetch a single post based on the `postId prop`. The `isLoading`, `isError`, `isFetching`, `data`, and `error` variables returned by the hook are used to render the appropriate content in the template. The component `emits` a `setPostId` event with a value of `-1` when the user clicks the `Back link`, which causes the App.vue component to render the Posts.vue component again.

[View source](https://github.com/DamianOsipiuk/vue-query/tree/main/examples/basic)

::: code-group

```ts [src/main.ts]
import { createApp } from "vue";
import { VueQueryPlugin } from "vue-query";

import App from "./App.vue";

createApp(App).use(VueQueryPlugin).mount("#app");
```

```vue [src/App.vue]
<script lang="ts">
import { defineComponent, ref } from "vue";

import Posts from "./Posts.vue";
import Post from "./Post.vue";

export default defineComponent({
  name: "App",
  components: { Posts, Post },
  setup() {
    const visitedPosts = ref(new Set());
    const isVisited = (id: number) => visitedPosts.value.has(id);

    const postId = ref(-1);
    const setPostId = (id: number) => {
      visitedPosts.value.add(id);
      postId.value = id;
    };

    return {
      isVisited,
      postId,
      setPostId,
    };
  },
});
</script>

<template>
  <h1>Vue Query - Basic</h1>
  <p>
    As you visit the posts below, you will notice them in a loading state the
    first time you load them. However, after you return to this list and click
    on any posts you have already visited again, you will see them load
    instantly and background refresh right before your eyes!
    <strong>
      (You may need to throttle your network speed to simulate longer loading
      sequences)
    </strong>
  </p>
  <Post v-if="postId > -1" :postId="postId" @setPostId="setPostId" />
  <Posts v-else :isVisited="isVisited" @setPostId="setPostId" />
</template>

```

```vue [src/Post.vue]
<script lang="ts">
import { defineComponent } from "vue";
import { useQuery } from "vue-query";

import { Post } from "./types";

const fetcher = async (id: number): Promise<Post> =>
  await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then(
    (response) => response.json()
  );

export default defineComponent({
  name: "Post",
  props: {
    postId: {
      type: Number,
      required: true,
    },
  },
  emits: ["setPostId"],
  setup(props) {
    const { isLoading, isError, isFetching, data, error } = useQuery(
      ["post", props.postId],
      () => fetcher(props.postId)
    );

    return { isLoading, isError, isFetching, data, error };
  },
});
</script>

<template>
  <h1>Post {{ postId }}</h1>
  <a @click="$emit('setPostId', -1)" href="#"> Back </a>
  <div v-if="isLoading" class="update">Loading...</div>
  <div v-else-if="isError">An error has occurred: {{ error }}</div>
  <div v-else-if="data">
    <h1>{{ data.title }}</h1>
    <div>
      <p>{{ data.body }}</p>
    </div>
    <div v-if="isFetching" class="update">Background Updating...</div>
  </div>
</template>

<style scoped>
.update {
  font-weight: bold;
  color: green;
}
</style>
```


```vue [src/Posts.vue]
<script lang="ts">
import { defineComponent } from "vue";
import { useQuery } from "vue-query";

import { Post } from "./types";

const fetcher = async (): Promise<Post[]> =>
  await fetch("https://jsonplaceholder.typicode.com/posts").then((response) =>
    response.json()
  );

export default defineComponent({
  name: "Posts",
  props: {
    isVisited: {
      type: Function,
      required: true,
    },
  },
  emits: ["setPostId"],
  setup() {
    const { isLoading, isError, isFetching, data, error, refetch } = useQuery(
      "posts",
      fetcher
    );

    return { isLoading, isError, isFetching, data, error, refetch };
  },
});
</script>

<template>
  <h1>Posts</h1>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="isError">An error has occurred: {{ error }}</div>
  <div v-else-if="data">
    <ul>
      <li v-for="item in data" :key="item.id">
        <a
          @click="$emit('setPostId', item.id)"
          href="#"
          :class="{ visited: isVisited(item.id) }"
          >{{ item.title }}</a
        >
      </li>
    </ul>
  </div>
</template>

<style scoped>
.visited {
  font-weight: bold;
  color: green;
}
</style>
```
:::