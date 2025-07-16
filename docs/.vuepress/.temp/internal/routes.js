export const redirects = JSON.parse("{\"/about.html\":\"/article/c7fqtspu/\",\"/posts/hi.html\":\"/article/8ezpbtbt/\"}")

export const routes = Object.fromEntries([
  ["/article/c7fqtspu/", { loader: () => import(/* webpackChunkName: "article_c7fqtspu_index.html" */"C:/Users/Administrator/Desktop/vuepress-starter/docs/.vuepress/.temp/pages/article/c7fqtspu/index.html.js"), meta: {"title":"关于本站"} }],
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"C:/Users/Administrator/Desktop/vuepress-starter/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":"欢迎来到7788博客"} }],
  ["/article/8ezpbtbt/", { loader: () => import(/* webpackChunkName: "article_8ezpbtbt_index.html" */"C:/Users/Administrator/Desktop/vuepress-starter/docs/.vuepress/.temp/pages/article/8ezpbtbt/index.html.js"), meta: {"title":"欢迎来到我的技术博客"} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"C:/Users/Administrator/Desktop/vuepress-starter/docs/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
  ["/blog/", { loader: () => import(/* webpackChunkName: "blog_index.html" */"C:/Users/Administrator/Desktop/vuepress-starter/docs/.vuepress/.temp/pages/blog/index.html.js"), meta: {"title":"博客"} }],
  ["/blog/tags/", { loader: () => import(/* webpackChunkName: "blog_tags_index.html" */"C:/Users/Administrator/Desktop/vuepress-starter/docs/.vuepress/.temp/pages/blog/tags/index.html.js"), meta: {"title":"标签"} }],
  ["/blog/archives/", { loader: () => import(/* webpackChunkName: "blog_archives_index.html" */"C:/Users/Administrator/Desktop/vuepress-starter/docs/.vuepress/.temp/pages/blog/archives/index.html.js"), meta: {"title":"归档"} }],
  ["/blog/categories/", { loader: () => import(/* webpackChunkName: "blog_categories_index.html" */"C:/Users/Administrator/Desktop/vuepress-starter/docs/.vuepress/.temp/pages/blog/categories/index.html.js"), meta: {"title":"分类"} }],
]);
