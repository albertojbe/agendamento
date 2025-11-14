<script setup>
import { ref, onMounted, reactive } from 'vue';
import api from '../config/api';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const toast = useToast();
const resources = ref([]);


const resourceForm = reactive({
  id: null,
  name: '',
  quantity: 1,
  isActive: true,
});

const resetForm = () => {
  resourceForm.id = null;
  resourceForm.name = '';
  resourceForm.quantity = 1;
  resourceForm.isActive = true;
};

const fetchResources = async () => {
  try {
    const response = await api.get('/resources');
    resources.value = response.data;
  } catch (error) {
    toast.error('Erro ao buscar recursos: ' + (error.response?.data?.message || error.message));
  }
};

const changeResourceForm = (resource) => {
  resourceForm.id = resource.id;
  resourceForm.name = resource.name;
  resourceForm.quantity = resource.quantity;
  resourceForm.isActive = resource.isActive;
};

const updateResource = async () => {
  try {
    await api.put(`/resources/${resourceForm.id}`, resourceForm);
    await fetchResources();
    resetForm();
    toast.success('Recurso atualizado com sucesso!');
  } catch (error) {
    toast.error('Erro ao atualizar recurso: ' + (error.response?.data?.message || error.message));
  }
};

const createResource = async () => {
  try {
    await api.post('/resources', resourceForm);
    await fetchResources();
    resetForm();
    toast.success('Recurso criado com sucesso!');
  } catch (error) {
    toast.error('Erro ao criar recurso: ' + (error.response?.data?.message || error.message));
  }
};

const deleteResource = async (resourceId) => {
  try {
    await api.delete(`/resources/${resourceId}`);
    fetchResources();
    toast.success('Recurso excluído com sucesso!');
  } catch (error) {
    toast.error('Erro ao excluir recurso: ' + (error.response?.data?.message || error.message));
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

  <div id="updateResourceModal"
    class="overlay modal overlay-open:opacity-100 overlay-open:duration-300"
    role="dialog" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Atualizar Recurso</h3>
          <button type="button" class="btn btn-text btn-circle btn-sm absolute end-3 top-3" aria-label="Close"
            data-overlay="#updateResourceModal">
            <span class="icon-[tabler--x] size-4"></span>
          </button>
        </div>
        <form>
          <div class="modal-body pt-0">
            <div class="mb-4">
              <label class="label-text" for="updateName"> Nome </label>
              <input type="text" placeholder="Projetor" class="input" id="updateName" v-model="resourceForm.name" autofocus />
            </div>
            <div class="mb-0.5">
              <label class="label-text" for="updateQuantity"> Quantidade </label>
              <input type="number" placeholder="1" class="input" id="updateQuantity" v-model="resourceForm.quantity" />
            </div>
            <div class="mb-0.5 mt-5 flex flex-row items-center gap-2">
              <label class="label-text font-semibold" for="updateIsActive"> Ativo </label>
              <input type="checkbox" class="checkbox" id="updateIsActive" v-model="resourceForm.isActive" />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-soft btn-secondary" data-overlay="#updateResourceModal">Fechar</button>
            <button type="submit" @click.prevent="updateResource()" class="btn btn-primary" data-overlay="#updateResourceModal">Enviar</button>
          </div>
        </form>
      </div>
    </div>
  </div>

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
            <button type="submit" @click.prevent="createResource" class="btn btn-primary" data-overlay="#createResourceModal">Enviar</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <div class="container mx-auto flex flex-row justify-end mb-4">
    <button @click="resetForm" class="btn btn-primary btn-gradient" type="button" data-overlay="#createResourceModal">
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
            <td>{{ resource.isActive ? 'Sim' : 'Não' }}</td>
            <td>{{ resource.quantity }}</td>
            <td>
              <button @click="changeResourceForm(resource)" class="btn btn-circle btn-text btn-sm" aria-label="Editar evento" data-overlay="#updateResourceModal"><span
                  class="icon-[tabler--pencil] size-5"></span></button>
              <button @click="deleteResource(resource.id)" class="btn btn-circle btn-text btn-sm" aria-label="Excluir evento"><span
                  class="icon-[tabler--trash] size-5"></span></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>