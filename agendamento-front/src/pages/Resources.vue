<script setup>
import { ref, onMounted, reactive } from 'vue';
import { api } from '../config/api';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const toast = useToast();
const resources = ref([]);

function activeRowEditing(row) {
  row.editing = true;
  row._edit = {
    name: row.name,
    quantity: row.quantity,
    isActive: row.isActive
  };
}

function cancelRowEditing(row) {
  row.editing = false;
  delete row._edit;
}

async function saveRowEditing(row) {
  try {
    const payload = {
      name: row._edit.name,
      quantity: Number(row._edit.quantity),
      isActive: !!row._edit.isActive
    };
    await api.put(`/resources/${row.id}`, payload);
    row.name = payload.name;
    row.quantity = payload.quantity;
    row.isActive = payload.isActive;
    row.editing = false;
    delete row._edit;
    toast.success('Recurso atualizado com sucesso!');
  } catch (error) {
    toast.error('Erro ao atualizar recurso: ' + (error.response?.data?.message || error.message));
  }
}

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

const createResource = async () => {
  try {
    await api.post('/resources', resourceForm);
    await fetchResources();
    resetForm();
    toast.success('🆗 Recurso criado com sucesso!');
  } catch (error) {
    toast.error('Erro ao criar recurso: ' + (error.response?.data?.message || error.message));
  }
};

const deleteResource = async (resourceId) => {
  try {
    await api.delete(`/resources/${resourceId}`);
    await fetchResources();
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
              <input type="text" placeholder="Projetor" class="input" id="modalFullName" v-model="resourceForm.name"
                autofocus />
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
            <button type="submit" @click.prevent="createResource" class="btn btn-primary"
              data-overlay="#createResourceModal">Enviar</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <header class="container mx-auto flex items-center justify-between mb-4">
    <div>
      <h1 class="text-2xl font-semibold text-gray-800">Recursos</h1>
      <p class="text-sm text-gray-500 mt-1">Gerencie recursos para os eventos — edite ou adicione novos.</p>
    </div>
    <div>
      <button @click="resetForm" class="btn btn-primary btn-gradient" type="button" data-overlay="#createResourceModal">
        Adicionar Recurso
      </button>
    </div>
  </header>

  <div class="rounded-box shadow-base-300/10 bg-base-100 w-full pb-2 shadow-md min-h-[60vh]">
    <div class="overflow-x-auto">
      <table class="table table-fixed responsive-table w-full text-center">
        <thead>
          <tr>
            <th class="py-2 px-3 font-semibold">Nome</th>
            <th class="py-2 px-3 font-semibold">Ativo</th>
            <th class="py-2 px-3 font-semibold">Quantidade</th>
            <th class="py-2 px-3 font-semibold">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="resource in resources" :key="resource.id" class="text-gray-600">
            <td>
              <div v-if="resource.editing">
                <input v-model="resource._edit.name" class="input input-sm" />
              </div>
              <div v-else class="truncate" :title="resource.name">
                <span>{{ resource.name }}</span>
              </div>
            </td>
            <td>
              <div v-if="resource.editing">
                <input type="checkbox" class="checkbox" v-model="resource._edit.isActive" />
              </div>
              <div v-else>
                {{ resource.isActive ? 'Sim' : 'Não' }}
              </div>
            </td>
            <td>
              <div v-if="resource.editing">
                <input type="number" min="1" v-model.number="resource._edit.quantity" class="input input-sm w-24" />
              </div>
              <div v-else>
                <span class="w-24">{{ resource.quantity }}</span>
              </div>
            </td>
            <td>
              <div v-if="resource.editing" class="flex justify-center gap-2">
                <button @click="saveRowEditing(resource)" class="btn btn-circle btn-text btn-sm" aria-label="Salvar">
                  <span class="icon-[tabler--check] size-5"></span>
                </button>
                <button @click="cancelRowEditing(resource)" class="btn btn-circle btn-text btn-sm" aria-label="Cancelar">
                  <span class="icon-[tabler--x] size-5"></span>
                </button>
              </div>
              <div v-else class="flex justify-center gap-2">
                <button @click="activeRowEditing(resource)" class="btn btn-circle btn-text btn-sm" aria-label="Editar recurso">
                  <span class="icon-[tabler--pencil] size-5"></span>
                </button>
                <button @click="deleteResource(resource.id)" class="btn btn-circle btn-text btn-sm" aria-label="Excluir recurso">
                  <span class="icon-[tabler--trash] size-5"></span>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

    </div>
  </div>
</template>

<style scoped>

</style>