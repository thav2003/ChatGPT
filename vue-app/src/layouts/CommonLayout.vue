<template>
  <a-layout has-sider :style="{ minHeight: '100vh' }">
    <Sider />
    <a-layout :style="{ marginLeft: '260px', position: 'relative' }">
      <Header />
      <a-layout-content :style="{ overflow: 'auto', maxHeight: 'calc(100vh - 64px - 48px)' }">
        <div :style="{ background: '#fff', textAlign: 'center', height: '100%' }">
          <slot />
        </div>
      </a-layout-content>
      <a-layout-footer :style="{ textAlign: 'center', background: '#fff', position: 'sticky', bottom: '0' }">
        <Footer />
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
  import Sider from './Sider.vue'
  import Header from './Header.vue'
  import Footer from './Footer.vue'
</script>
