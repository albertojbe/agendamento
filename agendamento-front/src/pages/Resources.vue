<script setup>
import { ref, onMounted } from 'vue';
import api from '../config/api';

const resources = ref([]);

const resourceForm = ref({
  name: '',
  isActive: true,
  quantity: 1,
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
    await api.post('/resources', resourceForm.value);
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
  <div class="container mx-auto flex flex-row justify-end mb-4">
    <button class="btn btn-primary btn-gradient" type="button" data-overlay="#event-modal">
      Adicionar Evento
    </button>
  </div>

  <div id="event-modal" class="overlay modal overlay-open:opacity-100 hidden overlay-open:duration-300" role="dialog"
    tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Criar evento</h3>
          <button type="button" class="btn btn-text btn-circle btn-sm absolute end-3 top-3" aria-label="Close"
            data-overlay="#event-modal">
            <span class="icon-[tabler--x] size-4"></span>
          </button>
        </div>
        <div class="modal-body">
          <div class="w-96 space-y-4">
            <div>
              <label class="label-text" for="eventTitle">Título do evento*</label>
              <input id="eventTitle" v-model="eventForm.title" type="text" placeholder="Reunião de Projeto"
                class="input" />
            </div>
            <div>
              <label class="label-text" for="eventRoom">Sala*</label>
              <select id="eventRoom" v-model="eventForm.roomId" class="select w-full">
                <option value="" disabled>Selecione uma sala</option>
                <option v-for="r in rooms" :key="r.id" :value="r.id">{{ r.name }}</option>
              </select>
            </div>
            <div>
              <label class="label-text" for="eventStart">Início*</label>
              <input id="eventStart" v-model="eventForm.start" type="datetime-local" class="input" />
            </div>
            <div>
              <label class="label-text" for="eventEnd">Fim*</label>
              <input id="eventEnd" v-model="eventForm.end" type="datetime-local" class="input" />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-soft btn-secondary" data-overlay="#event-modal">Fechar</button>
          <button type="button" class="btn btn-primary" @click="createEvent" data-overlay="#event-modal">Salvar</button>
        </div>
      </div>
    </div>
  </div>

  <div class="rounded-box shadow-base-300/10 bg-base-100 w-full pb-2 shadow-md">
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
          <tr v-for="event in events" :key="event.id">
            <td>{{ event.title }}</td>
            <td>{{rooms.find(r => r.id === event.roomId)?.name || event.roomId}}</td>
            <td>{{ event.start }}</td>
            <td>{{ event.end }}</td>
            <td>
              <button class="btn btn-circle btn-text btn-sm" aria-label="Editar evento"><span
                  class="icon-[tabler--pencil] size-5"></span></button>
              <button @click="deleteEvent(event.id)" class="btn btn-circle btn-text btn-sm"
                aria-label="Excluir evento"><span class="icon-[tabler--trash] size-5"></span></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>