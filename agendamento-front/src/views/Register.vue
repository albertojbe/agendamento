<script setup>
import { reactive } from 'vue';
import api from '../config/api';

const userData = {
    name: '',
    email: '',
    password: ''
};

const messages = reactive({
    success: '',
    error: ''
});

function handleRegister() {
    messages.success = '';
    messages.error = '';
    // Implement registration logic here
    api.post('/users', userData, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        if (response.status === 201) {
            messages.success = 'Conta criada com sucesso! Você já pode entrar.';
            userData.name = '';
            userData.email = '';
            userData.password = '';
        } else {
            messages.error = 'Ocorreu um erro ao criar a conta. Por favor, tente novamente.';
        }
    }).catch((error) => {
        messages.error = error.response?.data?.message || 'Ocorreu um erro ao criar a conta. Por favor, tente novamente.';
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
                            <label class="label-text" for="userName">Nome*</label>
                            <input type="text" v-model="userData.name" placeholder="Digite seu nome completo"
                                class="input" id="userName" required />
                        </div>
                        <div>
                            <label class="label-text" for="userEmail">Email*</label>
                            <input type="email" v-model="userData.email" placeholder="Digite seu endreço de email"
                                class="input" id="userEmail" required />
                        </div>
                        <div>
                            <label class="label-text" for="userPassword">Senha*</label>
                            <div class="input">
                                <input id="userPassword" v-model="userData.password" type="password"
                                    placeholder="············" required />
                                <button type="button" data-toggle-password='{ "target": "#userPassword" }'
                                    class="block cursor-pointer" aria-label="userPassword">
                                    <span
                                        class="icon-[tabler--eye] password-active:block hidden size-5 shrink-0"></span>
                                    <span
                                        class="icon-[tabler--eye-off] password-active:hidden block size-5 shrink-0"></span>
                                </button>
                            </div>
                        </div>
                        <div v-show="messages.success" class="alert alert-outline alert-success" role="alert">
                            {{ messages.success }}
                        </div>
                        <div v-show="messages.error" class="alert alert-outline alert-warning" role="alert">
                            {{ messages.error }}
                        </div>

                        <!-- <div class="flex items-center justify-between gap-y-2">
                            <div class="flex items-center gap-2">
                                <input type="checkbox" class="checkbox checkbox-primary" id="rememberMe" />
                                <label class="label-text text-base-content/80 p-0 text-base" for="rememberMe">Remember
                                    Me</label>
                            </div>
                            <a href="#" class="link link-animated link-primary font-normal">Forgot Password?</a>
                        </div> -->
                        <button @click.prevent="handleRegister"
                            class="btn btn-lg btn-primary btn-gradient btn-block">Criar Conta</button>
                    </form>
                    <p class="text-base-content/80 mb-4 text-center">
                        <router-link to="/" class="link link-animated link-primary font-normal">Entrar</router-link>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>