<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '../config/api';

const router = useRouter();

function handleLogout() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  router.push('/login');
}

function linkClass(route) {
  return router.currentRoute.value.path === route
    ? 'text-bg-soft-neutral'
    : '';
}

onMounted(() => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    router.push('/login');
  } else {
    api.post('/auth/validate', { token: token }).then((response) => {
      localStorage.setItem('user', JSON.stringify(response.data.user));
      const user = JSON.parse(localStorage.getItem('user'));
      console.log(user)
    }).catch((error) => {
      router.push('/login');
    });
  }
});

</script>

<template>
  <div data-theme="light" class="bg-base-200" style="height: 100vh;">
    <nav j
      class="navbar rounded-b-2xl flex w-full items-center justify-between gap-2 shadow-base-300/20 shadow-sm px-40">
      <div class="navbar-start flex flex-row items-center max-md:w-1/4">
        <span class="icon-[tabler--calendar] size-8 mx-4"></span>
        <a class="link text-base-content link-neutral text-xl font-bold no-underline" href="#">
          Agendamento
        </a>
      </div>
      <div class="navbar-end max-md:hidden">
        <ul class="menu menu-horizontal p-0 font-medium">
          <li>
            <RouterLink :class="linkClass('/agendamentos')" to="/agendamentos">Agendamentos</RouterLink>
          </li>
          <li>
            <RouterLink :class="linkClass('/salas')" to="/salas">Salas</RouterLink>
          </li>
          <li>
            <RouterLink :class="linkClass('/recursos')" to="/recursos">Recursos</RouterLink>
          </li>
        </ul>
      </div>
      <label class="swap swap-rotate px-5">
        <input type="checkbox" value="dark" class="theme-controller" />
        <span class="swap-off icon-[tabler--sun] size-7"></span>
        <span class="swap-on icon-[tabler--moon] size-7"></span>
      </label>
      <button @click="handleLogout" class="btn max-md:btn-square btn-primary" href="#">
        <span class="max-md:hidden">Sair</span>
      </button>
    </nav>
    <main>
      <div class="container my-5 mx-auto">
        <RouterView />
      </div>
    </main>
  </div>
</template>