<template>
  <a-layout has-sider>
    <Sider />
    <a-layout :style="{ marginLeft: '260px' }">
      <Header />
      <a-layout-content :style="{ overflow: 'initial' }">
        <div :style="{ background: '#fff', textAlign: 'center' }">
          <slot />
        </div>
      </a-layout-content>
      <a-layout-footer :style="{ textAlign: 'center' }">
        ChatGPT can make mistakes. Consider checking important information.
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
  import Sider from './Sider.vue'
  import Header from './Header.vue'
</script>
