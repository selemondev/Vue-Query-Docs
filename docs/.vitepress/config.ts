import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Vue Query",
  description: "The Vue Query package provides hooks for fetching, caching and updating asynchronous data in Vue.",
  head: [
    [
      "link",
      {
        rel: "icon",
        type: "image/svg+xml",
        href: "/vue-query.png",
      },
    ],
    ["meta", { property: "og:type", content: "website" }],
  ],
  themeConfig: {
    logo: '/vue-query.png',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Guide', link: '/getting-started/overview.md' },
      { text: 'Examples', link: '/examples/simple.md' }
    ],

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2023-PRESENT Selemon Brahanu & Damian Osipiuk.",
    },

    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Overview', link: '/getting-started/overview.md' },
          { text: 'Installation', link: '/getting-started/installation.md' },
          { text: 'Quick start', link: '/getting-started/quick-start.md' },
          { text: 'DevTools', link: '/getting-started/devTools.md' },
          {
            text: 'TypeScript', link: '/getting-started/typeScript.md'
          }
        ]
      },

      {
        text: 'Guides & Concepts',
        items: [
          { text: 'Important defaults', link: '/guide/important-defaults.md' },
          { text: 'Queries', link: '/guide/queries.md' },
          { text: 'Query Keys', link: '/guide/query-keys.md' },
          { text: 'Query Functions', link: '/guide/query-functions.md' },
          { text: 'Network Mode', link: '/guide/network-mode.md'},
          { text: 'Parallel Queries', link: '/guide/parallel-queries.md'},
          { text: 'Dependent Queries', link: '/guide/dependent-queries.md'},
          { text: 'Background Fetching Indicators', link: '/guide/background-fetching-indicators.md' },
          { text: 'Window Focus Refetching', link: '/guide/window-focus-refetching.md' },
          { text: 'Disabling Queries', link: '/guide/disabling-queries.md'},
          { text: 'Query Retries', link: '/guide/query-retries.md' },
          { text: 'Paginated Queries', link: '/guide/pagination-queries.md' },
          { text: 'Infinite Queries', link: '/guide/infinite-queries.md' },
          { text: 'Placeholder Query Data', link: '/guide/placeholder-query-data.md' },
          { text: 'Initial Query Data', link: '/guide/initial-query-data.md' },
          { text: 'Prefetching', link: '/guide/prefetching.md' },
          { text: 'Mutations', link: '/guide/mutations.md' },
          { text: 'Query Invalidation', link: '/guide/query-invalidation.md' },
          { text: 'Invalidation from mutations', link: '/guide/invalidation-from-mutations.md' },
          { text: 'Updates from mutation responses', link: '/guide/updates-from-mutation-responses.md' },
          { text: 'Optimistic updates', link: '/guide/optimistic-updates.md' },
          { text: 'Query cancellation', link: '/guide/query-cancellation.md' },
          { text: 'Scroll restoration', link: '/guide/scroll-restoration.md' },
          { text: 'Filters', link: '/guide/filters.md' },
          { text: 'Caching', link: '/guide/caching.md' },
          { text: 'Default query function', link: '/guide/default-query-function.md' },
          { text: 'Custom logger', link: '/guide/custom-logger.md'},
          { text: 'Custom Client ', link: '/guide/custom-clients.md'},
          { text: 'SSR & Nuxt.js ( Experimental )', link: '/guide/ssr-nuxt.md' },
          { text: 'Best Practices', link: '/guide/best-practices.md' },
          { text: 'Does this replace ( Vuex, Pinia, etc) ?', link: '/guide/replace.md' },
          { text: 'Migrating to Vue Query 2', link: '/guide/migration.md'}
        ]
      },

      {
        text: 'Examples',
        items: [
          {
            text: 'Simple', link: '/examples/simple.md'
          },
          {
            text: 'Basic', link: '/examples/basic.md'
          },
          {
            text: 'Multi-page', link: '/examples/multi-page.md'
          },
          {
            text: 'Suspense ( Experimental )', link: '/examples/suspense-experimental.md'
          },
          {
            text: 'Vue 2.x ( Experimental )', link: '/examples/vue-2-experimental.md'
          },

          {
            text: 'Nuxt.js ( Experimental )', link: '/examples/nuxtjs-experimental.md'
          },

          {
            text: 'Vite SSR ( Experimental )', link: '/examples/vite-ssr-experimental.md'
          }
        ]
      }


    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/DamianOsipiuk/vue-query' }
    ]
  }
})
