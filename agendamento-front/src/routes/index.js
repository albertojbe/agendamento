import { createWebHistory, createRouter } from 'vue-router'
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Rooms from '../pages/Rooms.vue';
import Schedules from '../pages/Schedules.vue';
import Resources from '../pages/Resources.vue';

const routes = [
  {
    path: '/', component: Home, redirect: '/agendamentos', children: [
      {
        path: 'salas',
        component: Rooms
      },
      {
        path: 'agendamentos',
        component: Schedules
      },
      {
        path: 'recursos',
        component: Resources
      }
    ]
  },
  { path: '/login', component: Login },
  { path: '/registrar', component: Register },
]

const router = createRouter({
  history: createWebHistory(), // ✅ usa o histórico real do navegador
  routes,
});

router.afterEach(async (to, from, failure) => {
  if (!failure) setTimeout(() => window.HSStaticMethods.autoInit(), 100);
});

export default router;
