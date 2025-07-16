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
    // Giscus 评论脚本
    ['script', { 
      src: 'https://giscus.app/client.js',
      'data-repo': '7788dev/7788',
      'data-repo-id': 'R_kgDOPNmcIA',
      'data-category': 'Announcements',
      'data-category-id': 'DIC_kwDOPNmcIM4CtCgS',
      'data-mapping': 'pathname',
      'data-strict': '0',
      'data-reactions-enabled': '1',
      'data-emit-metadata': '0',
      'data-input-position': 'top',
      'data-theme': 'preferred_color_scheme',
      'data-lang': 'zh-CN',
      crossorigin: 'anonymous',
      async: true
    }]
  ],

  theme: defaultTheme({
    // 使用默认 VuePress 图标和 logo
    // 不指定 logo 将使用默认的
    
    // 主题设置
    colorMode: 'light',
    colorModeSwitch: true,

    // 导航栏
    navbar: [
      { text: '首页', link: '/' },
      { text: '文章', link: '/article/' },
      { text: '分类', link: '/category/' },
      { text: '标签', link: '/tag/' },
      { text: '时间线', link: '/timeline/' },
      { text: '关于', link: '/about/' }
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
      // 评论容器
      comment: {
        provider: 'Giscus',
        repo: '7788dev/7788',
        repoId: 'R_kgDOPNmcIA',
        category: 'Announcements',
        categoryId: 'DIC_kwDOPNmcIM4CtCgS',
        mapping: 'pathname',
        reactionsEnabled: '1',
        theme: 'preferred_color_scheme',
        lang: 'zh-CN'
      }
    },

    // 页脚
    footer: 'Copyright © 2023-present 7788 博客',
    displayFooter: true,

    // 最后更新时间
    lastUpdated: true,
    lastUpdatedText: '最后更新'
  }),

  plugins: [
    blogPlugin({
      filter: ({ filePathRelative }) =>
        filePathRelative ? filePathRelative.startsWith('posts/') : false,

      getInfo: ({ frontmatter, title, data }) => ({
        title,
        author: frontmatter.author || '匿名',
        date: frontmatter.date || null,
        category: frontmatter.category || [],
        tag: frontmatter.tag || [],
        excerpt: typeof frontmatter.excerpt === 'string'
          ? frontmatter.excerpt
          : data?.excerpt || '',
        // 已移除 cover 封皮字段
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