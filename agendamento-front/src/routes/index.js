import { createWebHistory, createRouter } from 'vue-router'
import Home from '../pages/Home.vue';
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/registrar', component: Register },
]

const router = createRouter({
  history: createWebHistory(), // ✅ usa o histórico real do navegador
  routes,
});

export default router;
