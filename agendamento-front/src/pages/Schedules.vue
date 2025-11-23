<script setup>
import { ref, onMounted } from 'vue';
import { api } from '../config/api';
import CalendarComponent from '../components/CalendarComponent.vue';

const events = ref([]);
const rooms = ref([]);

const eventForm = ref({
  title: '',
  roomId: null,
  start: '',
  end: ''
});

const fetchRooms = async () => {
  try {
    const response = await api.get('/rooms');
    rooms.value = response.data;
  } catch (error) {
    console.error('Error fetching rooms:', error);
  }
};

const fetchEvents = async () => {
  try {
    const response = await api.get('/events');
    events.value = response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
  }
};

const createEvent = async () => {
  try {
    if (!eventForm.value.title || !eventForm.value.roomId || !eventForm.value.start || !eventForm.value.end) {
      return alert('Título, sala, início e fim são obrigatórios.');
    }

    const payload = {
      title: eventForm.value.title,
      roomId: Number(eventForm.value.roomId),
      start: eventForm.value.start,
      end: eventForm.value.end
    };

    const response = await api.post('/events', payload);
    events.value.push(response.data);

    // reset form
    eventForm.value.title = '';
    eventForm.value.roomId = null;
    eventForm.value.start = '';
    eventForm.value.end = '';

    const overlay = document.querySelector('#event-modal');
    if (overlay) {
      overlay.classList.remove('overlay-open');
      overlay.classList.add('hidden');
    }
  } catch (error) {
    console.error('Error creating event:', error);
    alert(error.response?.data?.message || 'Erro ao criar evento');
  }
};

const deleteEvent = async (eventId) => {
  try {
    await api.delete(`/events/${eventId}`);
    events.value = events.value.filter(event => event.id !== eventId);
  } catch (error) {
    console.error('Error deleting event:', error);
  }
};

onMounted(() => {
  fetchRooms();
  fetchEvents();
});
</script>

<template>

  <div class="container mx-auto flex flex-row items-center justify-between mb-4">
    <div>
      <h1 class="text-2xl font-semibold">Agendamentos</h1>
      <p class="text-sm text-gray-500 mt-1">Gerencie agendamentos para os eventos — edite ou adicione novos.</p>
    </div>
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

  <div class="rounded-box shadow-base-300/10 bg-base-100 w-full pb-2 shadow-md min-h-[60vh]">
    <CalendarComponent :events="events" @delete-event="deleteEvent" />
  </div>
</template>