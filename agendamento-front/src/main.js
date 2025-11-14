import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import "flyonui/flyonui";
import ToastPlugin from 'vue-toast-notification';
import router from './routes/index.js';

const app = createApp(App);
app.use(router);
app.use(ToastPlugin);
app.mount('#app');
