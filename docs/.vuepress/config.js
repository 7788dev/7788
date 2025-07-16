import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'
import { plumeTheme } from 'vuepress-theme-plume'

export default defineUserConfig({
  // 站点语言
  lang: 'zh-CN',
  // 站点标题
  title: '7788 博客',
  // 站点描述
  description: '分享技术与生活',
  // 注入到 HTML <head> 里的标签
  head: [
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    ['meta', { name: 'keywords', content: '博客,技术,生活,7788' }],
  ],

  // 使用 plume 主题
  theme: plumeTheme({
    // 首页设置
    home: '/',
    // 导航栏配置
    navbar: [
      { text: '首页', link: '/' },
      { text: '博客', link: '/blog/', icon: 'material-symbols:article-outline' },
      {
        text: '分类',
        link: '/categories/',
        icon: 'material-symbols:category-outline'
      },
      {
        text: '标签',
        link: '/tags/',
        icon: 'material-symbols:tag-outline'
      },
      {
        text: '归档',
        link: '/archives/',
        icon: 'material-symbols:archive-outline'
      },
    ],

    // 博客相关配置
    blog: {
      // 这里的路径需要和您的文章实际存放路径一致
      // 假设您的文章都放在 `posts` 目录下
      dir: 'posts/',
      // 默认作者
      author: 'looks',
      // 文章默认摘要长度
      excerptLength: 200,
    },
    
    // 页脚配置
    footer: {
      copyright: 'Copyright © 2023-present 7788 博客',
    },

    // 启用最后更新时间
    lastUpdated: true,
    // 禁用贡献者显示
    contributors: false,
    
    // 主题插件选项
    plugins: {
      // 开启中等大小的缩放
      mediumZoom: true,
      // 搜索插件配置
      search: {
        locales: {
          '/': {
            placeholder: '搜索'
          }
        },
        hotKeys: ['/'],
        maxSuggestions: 10
      }
    }
  }),

  // 使用 Vite 打包工具
  bundler: viteBundler(),
})