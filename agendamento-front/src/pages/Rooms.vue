<script setup>
import { ref, onMounted } from 'vue';
import api from '../config/api';
import { useToast } from 'vue-toast-notification';

const toast = useToast();

const rooms = ref([]);

function activeRowEditing(row) {
  row.editing = true;
  row._edit = {
    name: row.name,
    location: row.location,
    capacity: row.capacity,
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
      location: row._edit.location,
      capacity: Number(row._edit.capacity)
    };
    await api.put(`/rooms/${row.id}`, payload);
    // aplica alterações locais
    row.name = payload.name;
    row.location = payload.location;
    row.capacity = payload.capacity;
    row.editing = false;
    delete row._edit;
    toast.success('Sala atualizada com sucesso!');
  } catch (error) {
    toast.error('Erro ao atualizar sala: ' + (error.response?.data?.message || error.message));
  }
}

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
    toast.error(error.response?.data?.message || 'Erro ao buscar salas');
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

    roomForm.value = {
      id: null,
      name: '',
      location: '',
      capacity: null
    }

    toast.success('Sala criada com sucesso!');
  } catch (error) {
    toast.error(error.response?.data?.message || 'Erro ao criar sala');
  }
};

const deleteRoom = async (roomId) => {
  try {
    await api.delete(`/rooms/${roomId}`);
    rooms.value = rooms.value.filter(room => room.id !== roomId);
    toast.success('Sala excluída com sucesso!');
  } catch (error) {
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
      <table class="table responsive-table text-center w-full">
        <thead>
          <tr>
            <th class="py-2 px-3 font-semibold">Nome</th>
            <th class="py-2 px-3 font-semibold">Localização</th>
            <th class="py-2 px-3 font-semibold">Capacidade</th>
            <th class="py-2 px-3 font-semibold">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="room in rooms" :key="'room' + room.id">
            <td>
              <div v-if="room.editing">
                <input v-model="room._edit.name" class="input input-sm w-full" />
              </div>
              <div class="w-full" v-else>{{ room.name }}</div>
            </td>
            <td>
              <div v-if="room.editing">
                <input v-model="room._edit.location" class="input input-sm" />
              </div>
              <div v-else>{{ room.location }}</div>
            </td>
            <td>
              <div v-if="room.editing">
                <input v-model="room._edit.capacity" type="number" min="1" class="input input-sm w-24" />
              </div>
              <div v-else>{{ room.capacity }}</div>
            </td>
            <td>
              <div v-if="room.editing" class="flex justify-center gap-2">
                <button @click="saveRowEditing(room)" class="btn btn-circle btn-text btn-sm" aria-label="Salvar">
                  <span class="icon-[tabler--check] size-5"></span>
                </button>
                <button @click="cancelRowEditing(room)" class="btn btn-circle btn-text btn-sm" aria-label="Cancelar">
                  <span class="icon-[tabler--x] size-5"></span>
                </button>
              </div>
              <div v-else class="flex justify-center gap-2">
                <button @click="activeRowEditing(room)" class="btn btn-circle btn-text btn-sm" aria-label="Editar sala">
                  <span class="icon-[tabler--pencil] size-5"></span>
                </button>
                <button @click="deleteRoom(room.id)" class="btn btn-circle btn-text btn-sm" aria-label="Excluir sala">
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