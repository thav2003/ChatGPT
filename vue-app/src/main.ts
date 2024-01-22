import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

export class MfeVue extends HTMLElement {
    connectedCallback() {
      // new Vue(App).mount(this)
  
      createApp(App).mount(this)
    }
  }
  
  customElements.define('vue-element', MfeVue)
