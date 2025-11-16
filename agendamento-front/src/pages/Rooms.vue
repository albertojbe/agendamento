<script setup>
import { ref, onMounted } from 'vue';
import api from '../config/api';

const rooms = ref([]);

const roomForm = ref({
  name: '',
  location: '',
  capacity: null
});

const fetchRooms = async () => {
  try {
    const response = await api.get('/rooms');
    rooms.value = response.data;
  } catch (error) {
    console.error('Error fetching rooms:', error);
  }
};

const createRoom = async () => {
  try {
    if (!roomForm.value.name || !roomForm.value.capacity) {
      return alert('Nome e capacidade são obrigatórios.');
    }

    const payload = {
      name: roomForm.value.name,
      location: roomForm.value.location || null,
      capacity: Number(roomForm.value.capacity)
    };

    const response = await api.post('/rooms', payload);
    rooms.value.push(response.data);

    roomForm.value.name = '';
    roomForm.value.location = '';
    roomForm.value.capacity = null;

    const overlay = document.querySelector('#room-modal');
    if (overlay) overlay.classList.remove('overlay-open');
  } catch (error) {
    console.error('Error creating room:', error);
    alert(error.response?.data?.message || 'Erro ao criar sala');
  }
};

const deleteRoom = async (roomId) => {
  try {
    await api.delete(`/rooms/${roomId}`);
    rooms.value = rooms.value.filter(room => room.id !== roomId);
  } catch (error) {
    console.error('Error deleting room:', error);
  }
};

onMounted(() => {
  fetchRooms();
});
</script>

<template>
  <div class="container mx-auto flex flex-row items-center justify-between mb-4">
    <div>
      <h1 class="text-2xl font-semibold text-gray-800">Salas</h1>
      <p class="text-sm text-gray-500 mt-1">Gerencie salas para os eventos — edite ou adicione novas.</p>
    </div>
    <button class="btn btn-primary btn-gradient" type="button" data-overlay="#room-modal">
      Adicionar Sala
    </button>
  </div>

  <div id="room-modal" class="overlay modal overlay-open:opacity-100 hidden overlay-open:duration-300" role="dialog"
    tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Adicionar Sala</h3>
          <button type="button" class="btn btn-text btn-circle btn-sm absolute end-3 top-3" aria-label="Close"
            data-overlay="#room-modal">
            <span class="icon-[tabler--x] size-4"></span>
          </button>
        </div>
        <div class="modal-body">
          <div class="w-96 space-y-4">
            <div>
              <label class="label-text" for="roomName">Nome da sala*</label>
              <input id="roomName" v-model="roomForm.name" type="text" placeholder="Sala de Reunião 01" class="input" />
            </div>
            <div>
              <label class="label-text" for="roomLocation">Localização</label>
              <input id="roomLocation" v-model="roomForm.location" type="text" placeholder="Bloco A - 1º Andar"
                class="input" />
            </div>
            <div>
              <label class="label-text" for="roomCapacity">Capacidade*</label>
              <input id="roomCapacity" v-model="roomForm.capacity" type="number" min="1" placeholder="10"
                class="input" />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-soft btn-secondary" data-overlay="#room-modal">Fechar</button>
          <button type="button" class="btn btn-primary" @click="createRoom" data-overlay="#room-modal">Salvar</button>
        </div>
      </div>
    </div>
  </div>

  <div class="rounded-box shadow-base-300/10 bg-base-100 w-full pb-2 shadow-md min-h-[60vh]">
    <div class="overflow-x-auto">
      <table class="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Localização</th>
            <th>Capacidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="room in rooms" :key="'room' + room.id">
            <td>{{ room.name }}</td>
            <td>{{ room.location }}</td>
            <td>{{ room.capacity }}</td>
            <td>
              <button class="btn btn-circle btn-text btn-sm" aria-label="Editar sala"><span
                  class="icon-[tabler--pencil] size-5"></span></button>
              <button @click1="deleteRoom(room.id)" class="btn btn-circle btn-text btn-sm"
                aria-label="Excluir sala"><span class="icon-[tabler--trash] size-5"></span></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>