import { createMemoryHistory, createRouter } from 'vue-router'
import Home from '../pages/Home.vue';
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';

const routes = [
  { path: '/home', component: Home},
  { path: '/', component: Login },
  { path: '/registrar', component: Register },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;