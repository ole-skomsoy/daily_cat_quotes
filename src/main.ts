import { createApp } from 'vue'
import VueCountdown from '@chenfengyuan/vue-countdown';
import './assets/main.css'
import App from './App.vue'

const app = createApp(App);
app.component(VueCountdown.name, VueCountdown);
app.mount('#app');
