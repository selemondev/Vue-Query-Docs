# Vue 2.x ( Experimental )

`Post.vue` component is responsible for rendering a single post with the given `postId`. It uses the `useQuery` hook to fetch the post data from `https://jsonplaceholder.typicode.com/posts/{id}` where `id` is the `postId prop` passed to the component. The `fetcher` function is an async function that returns the fetched post. The component returns the `isLoading`, `isError`, `isFetching`, `data`, and `error` properties provided by the useQuery hook. The `isLoading` property indicates if the data is currently being `fetched`, `isError` indicates if there was an `error` fetching the data, `isFetching` indicates if the data is being `refetched in the background`, `data` contains the `fetched post data`, and `error` contains the `error message` if there was an error.

`Posts.vue` component is responsible for rendering a list of posts. It uses the useQuery hook to fetch all posts from `https://jsonplaceholder.typicode.com/posts`. The fetcher function is an async function that returns an array of posts. The component returns the same isLoading, isError, isFetching, data, and error properties as the Post.vue component. The component also accepts a `prop isVisited` which is a function that takes a `post id` as an argument and returns a boolean indicating if the post has been visited before. The component renders a list of post titles with a link to view the full post. The visited class is applied to the link if isVisited returns true for the post. The `refetch` property provided by the useQuery hook can be used to refetch the data manually.

::: code-group

```ts [src/main.ts]
import Vue from "vue";
import VueCompositionApi, { createApp, h } from "@vue/composition-api";
import { VueQueryPlugin } from "vue-query";

import App from "./App.vue";

Vue.use(VueCompositionApi);
Vue.use(VueQueryPlugin);

createApp({
  render() {
    return h(App);
  },
}).mount("#app");
```

```vue [src/App.vue]
<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";

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
  <div>
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
    <Post
      v-if="postId > -1"
      :postId="postId"
      :style="{}"
      @setPostId="setPostId"
    />
    <Posts v-else :isVisited="isVisited" @setPostId="setPostId" />
  </div>
</template>

```

```vue [src/Post.vue]
<script lang="ts">
import { defineComponent, toRaw } from "@vue/composition-api";
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
      ["post", { postId: toRaw(props.postId) }],
      () => fetcher(toRaw(props.postId))
    );

    return { isLoading, isError, isFetching, data, error };
  },
});
</script>

<template>
  <div>
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
import { defineComponent } from "@vue/composition-api";
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
  <div>
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