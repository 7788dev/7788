<template>
  <div class="giscus" ref="giscus"></div>
</template>

<script>
export default {
  mounted() {
    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.async = true
    script.crossOrigin = 'anonymous'
    script.setAttribute('data-repo', '7788dev/7788')
    script.setAttribute('data-repo-id', 'R_kgDOPNmcIA')
    script.setAttribute('data-category', 'Announcements')
    script.setAttribute('data-category-id', 'DIC_kwDOPNmcIM4CtCgS')
    script.setAttribute('data-mapping', 'pathname')
    script.setAttribute('data-strict', '0')
    script.setAttribute('data-reactions-enabled', '1')
    script.setAttribute('data-emit-metadata', '0')
    script.setAttribute('data-input-position', 'top')
    script.setAttribute('data-theme', 'preferred_color_scheme')
    script.setAttribute('data-lang', 'zh-CN')
    
    this.$refs.giscus.appendChild(script)
  }
}
</script>