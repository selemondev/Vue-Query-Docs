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
          { text: 'Query Functions', link: '/guide/query-functions.md'}
        ]
      },


    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/DamianOsipiuk/vue-query' }
    ]
  }
})
