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
      { text: 'Guide', link: '/guide/overview.md' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Overview', link: '/guide/overview.md' },
          { text: 'Installation', link: '/guide/installation.md' },
          { text: 'Quick start', link: '/guide/quick-start.md' },
          { text: 'DevTools', link: '/guide/devTools.md' },
          {
            text: 'TypeScript', link: '/guide/typeScript.md'
          }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/DamianOsipiuk/vue-query' }
    ]
  }
})
