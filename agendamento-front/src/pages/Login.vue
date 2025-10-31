<script setup>
import api from '../config/api';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const userCredentials = {
    email: '',
    password: ''
};

const errorText = ref('');

function handleLogin() {
    errorText.value = '';
    api.post('/auth/token', userCredentials, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        localStorage.setItem('authToken', response.data.token);
        router.push('/home');
        console.log(response.data.token);
    }).catch((error) => {
        errorText.value = 'Credenciais inválidas. Por favor, tente novamente.';
    });
};
</script>

<template>
    <div data-theme="light"
        class="flex h-auto min-h-screen items-center justify-center overflow-x-hidden bg-[url('https://cdn.flyonui.com/fy-assets/blocks/marketing-ui/auth/auth-background-2.png')] bg-cover bg-center bg-no-repeat py-10">
        <div class="relative flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div
                class="bg-base-100 shadow-base-300/20 z-1 w-full space-y-6 rounded-xl p-6 shadow-md sm:min-w-md lg:p-8">
                <div class="flex items-center gap-3">
                    <!-- <img src="https://cdn.flyonui.com/fy-assets/logo/logo.png" class="size-8" alt="brand-logo" /> -->
                    <h2 class="text-base-content text-xl font-bold">Agendamento</h2>
                </div>
                <!-- <div>
                    <h3 class="text-base-content mb-1.5 text-2xl font-semibold">Sign in to FlyonUI</h3>
                    <p class="text-base-content/80">Ship Faster and Focus on Growth.</p>
                </div> -->
                <!-- <div class="flex flex-wrap gap-4 sm:gap-6">
                    <a href="#" class="btn btn-outline btn-primary grow">Login como Usuário</a>
                    <a href="#" class="btn btn-outline btn-primary grow">Login como Adminsitrador</a>
                </div> -->
                <div class="space-y-4">
                    <form class="mb-4 space-y-4" onsubmit="return false;">
                        <div>
                            <label class="label-text" for="userEmail">Email*</label>
                            <input type="email" placeholder="Digite seu endreço de email" class="input" id="userEmail"
                                v-model="userCredentials.email" required />
                        </div>
                        <div>
                            <label class="label-text" for="userPassword">Senha*</label>
                            <div class="input">
                                <input id="userPassword" type="password" placeholder="············"
                                    v-model="userCredentials.password" required />
                                <button type="button" data-toggle-password='{ "target": "#userPassword" }'
                                    class="block cursor-pointer" aria-label="userPassword">
                                    <span
                                        class="icon-[tabler--eye] password-active:block hidden size-5 shrink-0"></span>
                                    <span
                                        class="icon-[tabler--eye-off] password-active:hidden block size-5 shrink-0"></span>
                                </button>
                            </div>
                        </div>
                        <div v-show="errorText" class="alert alert-outline alert-warning flex " role="alert">
                            <span class="icon-[tabler--alert-triangle] shrink-0 size-6"></span>
                            <p>{{ errorText }}</p>
                        </div>
                        <input type="submit" @click.prevent="handleLogin"
                            class="btn btn-lg btn-primary btn-gradient btn-block" value="Entrar" />
                    </form>
                    <p class="text-base-content/80 mb-4 text-center">
                        <router-link to="/registrar" class="link link-animated link-primary font-normal">Criar uma
                            conta</router-link>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>