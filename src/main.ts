import { createApp } from 'vue'
import VueCountdown from '@chenfengyuan/vue-countdown';
import './assets/main.css'
import App from './App.vue'

const app = createApp(App);
app.component(VueCountdown.name || 'Daily Cat Quotes', VueCountdown);
app.mount('#app');
