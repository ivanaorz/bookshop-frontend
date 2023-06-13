import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import AppHeader from './components/AppHeader.vue';

const app = createApp(App)
app.component('app-header', AppHeader);

app.use(router)

app.mount('#app')
