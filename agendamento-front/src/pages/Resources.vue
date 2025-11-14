<script setup>
import { ref, onMounted, reactive } from 'vue';
import api from '../config/api';

const resources = ref([]);

const resourceForm = reactive({
  name: '',
  quantity: 1,
  isActive: true,
});

const fetchResources = async () => {
  try {
    const response = await api.get('/resources');
    resources.value = response.data;
  } catch (error) {
    console.error('Erro ao buscar recursos:', error);
  }
};



const createResource = async () => {
  try {
    await api.post('/resources', resourceForm);
    fetchResources();
    resourceForm.value = { name: '', isActive: true, quantity: 1 };
  } catch (error) {
    console.error('Erro ao criar recurso:', error);
  }
};

onMounted(() => {
  fetchResources();
});

</script>

<template>
  <header class="w-full py-6">
    <h1 class="text-2xl font-semibold text-gray-800 text-start">
      Recursos
    </h1>
  </header>

  <div id="createResourceModal"
    class="overlay modal overlay-open:opacity-100 overlay-open:duration-300 hidden [--has-autofocus:false]"
    role="dialog" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Adicionar Recurso</h3>
          <button type="button" class="btn btn-text btn-circle btn-sm absolute end-3 top-3" aria-label="Close"
            data-overlay="#createResourceModal">
            <span class="icon-[tabler--x] size-4"></span>
          </button>
        </div>
        <form>
          <div class="modal-body pt-0">
            <div class="mb-4">
              <label class="label-text" for="modalFullName"> Nome </label>
              <input type="text" placeholder="Projetor" class="input" id="modalFullName" v-model="resourceForm.name" autofocus />
            </div>
            <div class="mb-0.5">
              <label class="label-text" for="modalEmail"> Quantidade </label>
              <input type="number" placeholder="1" class="input" id="modalEmail" v-model="resourceForm.quantity" />
            </div>
            <div class="mb-0.5 mt-5 flex flex-row items-center gap-2">
              <label class="label-text font-semibold" for="modalIsActive"> Ativo </label>
              <input type="checkbox" class="checkbox" id="modalIsActive" v-model="resourceForm.isActive" />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-soft btn-secondary" data-overlay="#createResourceModal">Fechar</button>
            <button type="submit" @click.prevent="createResource" class="btn btn-primary">Enviar</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <div class="container mx-auto flex flex-row justify-end mb-4">
    <button class="btn btn-primary btn-gradient" type="button" data-overlay="#createResourceModal">
      Adicionar Recurso
    </button>
  </div>


  <div class="rounded-box shadow-base-300/10 bg-base-100 w-full pb-2 shadow-md min-h-[60vh]">
    <div class="overflow-x-auto">
      <table class="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Ativo</th>
            <th>Quantidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="resource in resources" :key="resource.id">
            <td>{{ resource.name }}</td>
            <td>{{ resource.isActive }}</td>
            <td>{{ resource.quantity }}</td>
            <td>
              <button class="btn btn-circle btn-text btn-sm" aria-label="Editar evento"><span
                  class="icon-[tabler--pencil] size-5"></span></button>
              <button @click="" class="btn btn-circle btn-text btn-sm" aria-label="Excluir evento"><span
                  class="icon-[tabler--trash] size-5"></span></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>