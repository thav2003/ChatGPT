<template>
  <a-layout has-sider :style="{ minHeight: '100vh' }">
    <Sider />
    <a-layout :style="{ marginLeft: '260px', position: 'relative' }">
      <a-layout-content :style="{ overflow: 'initial' }">
        <div :style="{ background: '#fff', textAlign: 'center', height: '100%' }">
          <slot />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
  import Sider from './Sider.vue'
</script>
