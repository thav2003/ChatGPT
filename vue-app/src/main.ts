import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import './style.css'
import App from './App.vue'
import router from './router'

export class MfeVue extends HTMLElement {
  connectedCallback() {
    // new Vue(App).mount(this)

    createApp(App).use(router).use(Antd).mount(this)
  }
}

customElements.define('vue-element', MfeVue)
