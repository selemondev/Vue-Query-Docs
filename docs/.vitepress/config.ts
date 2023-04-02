import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Vue Query",
  description: "Build responsive and accessible apps 10x faster",
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
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Guide', link: '/getting-started/overview.md' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

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
          { text: 'Parallel Queries', link: '/guide/parallel-queries.md'},
          { text: 'Dependent Queries', link: '/guide/dependent-queries.md'},
          { text: 'Background Fetching Indicators', link: '/guide/background-fetching-indicators.md' },
          { text: 'Window Focus Refetching', link: '/guide/window-focus-refetching.md' },
          { text: 'Disabling Queries', link: '/guide/disabling-queries.md'},
          { text: 'Query Retries', link: '/guide/query-retries.md' },
          { text: 'Pagination Queries', link: '/guide/pagination-queries.md' },
          { text: 'Infinite Queries', link: '/guide/infinite-queries.md' },
          { text: 'Placeholder Query Data', link: '/guide/placeholder-query-data.md' },
          { text: 'Initial Query Data', link: '/guide/initial-query-data.md' },
          { text: 'Prefetching', link: '/guide/prefetching.md' },
          { text: 'Mutations', link: '/guide/mutations.md' },
          { text: 'Custom Clients ( Experimental ) ', link: '/guide/custom-clients.md'},
          { text: 'SSR & Nuxt.js ( Experimental )', link: '/guide/ssr-nuxt.md' },
          { text: 'Best Practices', link: '/guide/best-practices.md'}
        ]
      },

      {
        text: 'Examples',
        items: [
          {
            text: 'Simple', link: '/examples/simple.md'
          }
        ]
      }


    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/DamianOsipiuk/vue-query' }
    ]
  }
})
