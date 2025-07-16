import { blogPlugin } from '@vuepress/plugin-blog'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  lang: 'zh-CN',
  title: '7788 博客',
  description: '分享技术与生活',
  head: [
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    ['meta', { name: 'keywords', content: '博客,技术,生活,7788' }],
  ],

  theme: defaultTheme({
    // 首页设置
    home: '/',
    // 导航栏
    navbar: [
      { text: '首页', link: '/' },
      { text: '文章', link: '/article/' },
      { text: '分类', link: '/category/' },
      { text: '标签', link: '/tag/' },
      { text: '时间线', link: '/timeline/' },
    ],

    // 侧边栏
    sidebar: {
      '/article/': 'structure',
      '/category/': 'structure',
      '/tag/': 'structure'
    },

    // 主题插件
    plugins: {
      mediumZoom: true,
    },

    // 页脚
    footer: 'Copyright © 2023-present 7788 博客',
    displayFooter: true,

    // 最后更新时间
    lastUpdated: true,
    lastUpdatedText: '最后更新',

    // 禁用贡献者显示（包含邮箱）
    contributors: false,
  }),

  plugins: [
    blogPlugin({
      filter: ({ filePathRelative }) =>
        filePathRelative ? filePathRelative.startsWith('posts/') : false,

      getInfo: ({ frontmatter, title, data }) => ({
        title,
        author: frontmatter.author || 'looks', // 默认作者设为looks
        date: frontmatter.date || null,
        category: frontmatter.category || [],
        tag: frontmatter.tag || [],
        excerpt: typeof frontmatter.excerpt === 'string'
          ? frontmatter.excerpt
          : data?.excerpt || '',
      }),

      excerptFilter: ({ frontmatter }) =>
        !frontmatter.home &&
        frontmatter.excerpt !== false &&
        typeof frontmatter.excerpt !== 'string',

      category: [
        {
          key: 'category',
          getter: (page) => page.frontmatter.category || [],
          layout: 'Category',
          itemLayout: 'Category',
          frontmatter: () => ({ title: '文章分类', sidebar: false }),
          itemFrontmatter: (name) => ({ title: `分类: ${name}`, sidebar: false })
        },
        {
          key: 'tag',
          getter: (page) => page.frontmatter.tag || [],
          layout: 'Tag',
          itemLayout: 'Tag',
          frontmatter: () => ({ title: '文章标签', sidebar: false }),
          itemFrontmatter: (name) => ({ title: `标签: ${name}`, sidebar: false })
        }
      ],

      type: [
        {
          key: 'article',
          filter: (page) => !page.frontmatter.archive,
          layout: 'Article',
          frontmatter: () => ({ title: '所有文章', sidebar: false }),
          sorter: (pageA, pageB) => {
            if (pageA.frontmatter.sticky && pageB.frontmatter.sticky)
              return pageB.frontmatter.sticky - pageA.frontmatter.sticky
            if (pageA.frontmatter.sticky && !pageB.frontmatter.sticky) return -1
            if (!pageA.frontmatter.sticky && pageB.frontmatter.sticky) return 1
            if (!pageB.frontmatter.date) return 1
            if (!pageA.frontmatter.date) return -1
            return (
              new Date(pageB.frontmatter.date).getTime() -
              new Date(pageA.frontmatter.date).getTime()
            )
          }
        },
        {
          key: 'timeline',
          filter: (page) => page.frontmatter.date instanceof Date,
          sorter: (pageA, pageB) =>
            new Date(pageB.frontmatter.date).getTime() -
            new Date(pageA.frontmatter.date).getTime(),
          layout: 'Timeline',
          frontmatter: () => ({ title: '时间轴', sidebar: false })
        }
      ],
      hotReload: true
    }),

    // 搜索插件
    ['@vuepress/plugin-search', {
      locales: {
        '/': {
          placeholder: '搜索'
        }
      },
      hotKeys: ['/'],
      maxSuggestions: 10
    }]
  ],

  bundler: viteBundler()
})