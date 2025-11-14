<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '../config/api';

const router = useRouter();

onMounted(() => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    router.push('/login');
  } else {
    api.post('/auth/validate', { token: token }).then((response) => {
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }).catch((error) => {
      router.push('/login');
    });
  }
});
</script>

<template>
  <div data-theme="light" style="height: 100vh;">
    <nav j class="navbar rounded-box flex w-full items-center justify-between gap-2 shadow-base-300/20 shadow-sm">
      <div class="navbar-start max-md:w-1/4">
        <a class="link text-base-content link-neutral text-xl font-bold no-underline" href="#">
          Agendamento
        </a>
      </div>
      <div class="navbar-center max-md:hidden">
        <ul class="menu menu-horizontal p-0 font-medium">
          <li><RouterLink to="/agendamentos">Agendamentos</RouterLink></li>
          <li><RouterLink to="/salas">Salas</RouterLink></li>
          <li><RouterLink to="/recursos">Recursos</RouterLink></li>
        </ul>
      </div>
      <div class="navbar-end items-center gap-4">
        <div class="dropdown relative inline-flex md:hidden">
          <button id="dropdown-default" type="button" class="dropdown-toggle btn btn-text btn-secondary btn-square"
            aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
            <span class="icon-[tabler--menu-2] dropdown-open:hidden size-5"></span>
            <span class="icon-[tabler--x] dropdown-open:block hidden size-5"></span>
          </button>
        </div>
        <a class="btn max-md:btn-square btn-primary" href="#">
          <span class="max-md:hidden">Sair</span>
        </a>
      </div>
    </nav>
    <main>
      <div class="container my-15 mx-auto">
        <RouterView />
      </div>
    </main>
  </div>
</template>