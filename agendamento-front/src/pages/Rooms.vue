<script setup>
import { ref, onMounted } from 'vue';
import { api } from '../config/api';
import { useToast } from 'vue-toast-notification';
import RoomCard from '../components/RoomCard.vue';

const toast = useToast();

const rooms = ref([]);

function handleImgUpload(event) {
  roomForm.value.roomImage = event.target.files[0];
}

const roomForm = ref({
  name: '',
  location: '',
  capacity: null,
  detail: '',
  roomImage: null
});

const fetchRooms = async () => {
  try {
    const response = await api.get('/rooms');
    rooms.value = response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Erro ao buscar salas');
  }
};

const createRoom = async () => {
  try {
    if (!roomForm.value.name || !roomForm.value.capacity) {
      return alert('Nome e capacidade são obrigatórios.');
    }

    const payload = new FormData();
    payload.append("name", roomForm.value.name);
    payload.append("location", roomForm.value.location);
    payload.append("capacity", roomForm.value.capacity);
    payload.append("detail", roomForm.value.detail ?? "");
    if (roomForm.value.roomImage) {
      payload.append("roomImage", roomForm.value.roomImage);
    }

    const response = await api.post('/rooms', payload, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    roomForm.value = {
      id: null,
      name: '',
      location: '',
      capacity: null,
      detail: '',
      roomImage: null
    };

    fetchRooms();
    toast.success('Sala criada com sucesso!');
  } catch (error) {
    console.log(error)
    toast.error(error.response?.data?.message || 'Erro ao criar sala');
  }
};

const deleteRoom = async (roomId) => {
  try {
    await api.delete(`/rooms/${roomId}`);
    rooms.value = rooms.value.filter(room => room.id !== roomId);
    toast.success('Sala excluída com sucesso!');
  } catch (error) {
    console.log(error)
    toast.error(error.response?.data?.message || 'Erro ao excluir sala');
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
            <div>
              <label class="label-text" for="roomDetails">Detalhes (Opcional)</label>
              <textarea id="roomDetails" v-model="roomForm.detail" placeholder="Detalhes da sala" class="input" />
            </div>
            <div>
              <label class="label-text" for="roomPhoto">Foto da sala</label>
              <input id="roomPhoto" @change="handleImgUpload" type="file" class="input" />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-soft btn-secondary" data-overlay="#room-modal">Fechar</button>
          <button type="button" @click="createRoom" class="btn btn-primary" data-overlay="#room-modal">Salvar</button>
        </div>
      </div>
    </div>
  </div>

  <div class="overflow-x-auto p-6">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <RoomCard v-for="room in rooms" :key="room.id" :room="room" @deleteRoom="deleteRoom" />
    </div>
  </div>
</template>