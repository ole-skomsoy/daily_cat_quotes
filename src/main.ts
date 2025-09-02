import { createApp } from 'vue'
import VueCountdown from '@chenfengyuan/vue-countdown';
import './assets/main.css'
import App from './App.vue'

const app = createApp(App);
app.component(VueCountdown.name || 'Daily Cat Quotes', VueCountdown);
app.mount('#app');

// createApp(App).mount('#app')

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(err => {
        console.error('Service Worker registration failed:', err);
      });
  });
}