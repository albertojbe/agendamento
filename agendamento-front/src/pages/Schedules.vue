<script setup>
import { ref, onMounted, onBeforeMount } from 'vue';
import { api } from '../config/api';
import CalendarComponent from '../components/CalendarComponent.vue';
import { useToast } from 'vue-toast-notification';
import axios from 'axios';

const toast = useToast();

const schedules = ref([]);
const rooms = ref([]);
const resources = ref([]);
const requestType = ref('room');
const scheduleToShow = ref(null);
const editingSchedule = ref(false);
const calendarEvents = ref([]);

const scheduleForm = ref({
  title: '',
  description: '',
  participantsQuantity: null,
  start: '',
  end: '',
  resourceId: null,
  roomId: null
});

const resetForm = () => {
  scheduleForm.value = {
    title: '',
    description: '',
    participantsQuantity: null,
    start: '',
    end: '',
    resourceId: null,
    roomId: null
  };
};

const activateEditing = (schedule) => {
  editingSchedule.value = true;
  // carregar dados do agendamento no formulário
  scheduleForm.value = {
    id: schedule.id,
    title: schedule.title,
    description: schedule.description,
    participantsQuantity: schedule.participantsQuantity,
    start: schedule.start.slice(0,16),
    end: schedule.end.slice(0,16),
    resourceId: schedule.resourceId,
    roomId: schedule.roomId
  };
  console.log(scheduleForm.value);
  console.log(editingSchedule.value);

};


function formatLocalDateTime(date) {
  const d = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return d.toISOString().slice(0, 16);
}

const handleEventClick = async (eventId) => {
  try {
    const response = await api.get(`/schedules/${eventId}`);
    const eventData = response.data;
    scheduleToShow.value = eventData;
    console.log('Event details:', eventData);
  } catch (error) {
    toast.error('Erro ao buscar detalhes do evento');
    console.error('Error fetching event details:', error);
  }
};

const handleDateSelect = async (start, end) => {
  scheduleForm.value.start = formatLocalDateTime(new Date(start));
  scheduleForm.value.end = formatLocalDateTime(new Date(end));
};

const fetchSchedules = async () => {
  try {
    const response = await api.get('/schedules');
    schedules.value = response.data;
    // atualiza calendarEvents sempre que buscar schedules
    calendarEvents.value = schedules.value.map(s => ({
      id: String(s.id),
      title: s.title,
      start: s.start,
      end: s.end
    }));
  } catch (error) {
    toast.error('Erro ao carregar agendamentos');
    console.error('Error fetching schedules:', error);
  }
};

const fetchRooms = async () => {
  try {
    const response = await api.get('/rooms');
    rooms.value = response.data;
  } catch (error) {
    toast.error('Erro ao carregar salas');
    console.error('Error fetching rooms:', error);
  }
};

const fetchResources = async () => {
  try {
    const response = await api.get('/resources');
    resources.value = response.data;
  } catch (error) {
    toast.error('Erro ao carregar recursos');
    console.error('Error fetching resources:', error);
  }
};

const createSchedule = async () => {
  try {
    const payload = {
      title: scheduleForm.value.title,
      description: scheduleForm.value.description,
      participantsQuantity: scheduleForm.value.participantsQuantity ? Number(scheduleForm.value.participantsQuantity) : null,
      roomId: Number(scheduleForm.value.roomId),
      resourceId: scheduleForm.value.resourceId ? Number(scheduleForm.value.resourceId) : null,
      start: scheduleForm.value.start,
      end: scheduleForm.value.end
    };

    console.log(payload)

    const response = await api.post('/schedules', payload);
    schedules.value.push(response.data);

    calendarEvents.value.push({
      id: String(response.data.id),
      title: response.data.title,
      start: response.data.start,
      end: response.data.end
    });
    toast.success('Agendamento criado com sucesso');
    resetForm();
  } catch (error) {
    console.error('Error creating event:', error);
    toast.error(error.response?.data?.message || 'Erro ao criar evento');
  }
};

const updateSchedule = async () => {
  try {
    const payload = {
      title: scheduleForm.value.title,
      description: scheduleForm.value.description,
      participantsQuantity: scheduleForm.value.participantsQuantity ? Number(scheduleForm.value.participantsQuantity) : null,
      roomId: Number(scheduleForm.value.roomId),
      resourceId: scheduleForm.value.resourceId ? Number(scheduleForm.value.resourceId) : null,
      start: scheduleForm.value.start,
      end: scheduleForm.value.end
    };

    const response = await api.put(`/schedules/${scheduleForm.value.id}`, payload);
    const index = schedules.value.findIndex(s => s.id === scheduleForm.value.id);
    if (index !== -1) {
      schedules.value[index] = response.data;

      const eventIndex = calendarEvents.value.findIndex(e => e.id === String(scheduleForm.value.id));
      if (eventIndex !== -1) {
        calendarEvents.value[eventIndex] = {
          id: String(response.data.id),
          title: response.data.title,
          start: response.data.start,
          end: response.data.end
        };
      }
    }
    toast.success('Agendamento atualizado com sucesso');
    resetForm();
    editingSchedule.value = false;
    scheduleToShow.value = null;
  } catch (error) {
    console.error('Error updating event:', error);
    toast.error(error.response?.data?.message || 'Erro ao atualizar evento');
  }
};

const deleteSchedule = async (scheduleId) => {
  try {
    await api.delete(`/schedules/${scheduleId}`);
    schedules.value = schedules.value.filter(schedule => schedule.id !== scheduleId);
    calendarEvents.value = calendarEvents.value.filter(e => e.id !== String(scheduleId));
    if (scheduleToShow.value?.id === scheduleId) scheduleToShow.value = null;
    toast.success('Agendamento deletado com sucesso');
  } catch (error) {
    toast.error(error.response?.data?.message || 'Erro ao deletar agendamento');
    console.error('Error deleting event:', error);
  }
};

const closeDetails = () => {
  scheduleToShow.value = null;
};

onBeforeMount(async () => {
  await fetchRooms();
  await fetchSchedules();
  await fetchResources();
});

const handleModalButton = () => {
  document.getElementById('handle-modal-button').click();
};
</script>

<template>

  <div class="container mx-auto flex flex-row items-center justify-between mb-4">
    <div>
      <h1 class="text-2xl font-semibold">Agendamentos</h1>
      <p class="text-sm text-gray-500 mt-1">Gerencie agendamentos para sala ou recurso — clique em um evento para ver detalhes.</p>
    </div>
  </div>

  <div id="schedule-modal" class="overlay modal overlay-open:opacity-100 hidden overlay-open:duration-300" role="dialog"
    tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">{{ editingSchedule ? 'Editar agendamento' : 'Criar agendamento' }}</h3>
          <button type="button" class="btn btn-text btn-circle btn-sm absolute end-3 top-3" aria-label="Close"
            data-overlay="#schedule-modal">
            <span class="icon-[tabler--x] size-4"></span>
          </button>
        </div>
        <div class="modal-body">
          <div class="space-y-4">
            <div>
              <label class="label-text" for="scheduleTitle">Título do agendamento*</label>
              <input id="scheduleTitle" v-model="scheduleForm.title" type="text" placeholder="Reunião de Projeto"
                class="input" />
            </div>
            <div>
              <label class="label-text" for="scheduleDescription">Descrição</label>
              <textarea id="scheduleDescription" v-model="scheduleForm.description"
                placeholder="Detalhes do agendamento" class="textarea"></textarea>
            </div>
            <div class="grid grid-cols-1 gap-3 md:grid-cols-8">
              <div class="md:col-span-5" v-if="requestType === 'room'">
                <label class="label-text" for="scheduleRoom">Sala</label>
                <select id="scheduleRoom" v-model="scheduleForm.roomId" class="select">
                  <option value="default" selected="true" disabled>Selecione uma sala</option>
                  <option v-for="r in rooms" :key="r.id" :value="r.id">{{ r.name }}</option>
                </select>
              </div>
              <div class="md:col-span-5" v-else>
                <label class="label-text" for="scheduleResource">Recurso</label>
                <select id="scheduleResource" v-model="scheduleForm.resourceId" class="select">
                  <option value="default" selected="true" disabled>Selecione um recurso</option>
                  <option v-for="r in resources" :key="r.id" :value="r.id">{{ r.name }}</option>
                </select>
              </div>
              <div class="md:col-span-3">
                <label class="label-text" for="requestType">Tipo de Pedido</label>
                <select id="requestType" v-model="requestType" class="select">
                  <option value="room">Sala</option>
                  <option value="resource">Recurso</option>
                </select>
              </div>
            </div>
            <div v-if="requestType === 'room'">
              <label class="label-text" for="participantsQuantity">Quantidade de Participantes</label>
              <input id="participantsQuantity" v-model="scheduleForm.participantsQuantity" type="number" min="1"
                placeholder="5" class="input" />
            </div>
            <div>
              <label class="label-text" for="scheduleStart">Início*</label>
              <input id="scheduleStart" v-model="scheduleForm.start" type="datetime-local" class="input" />
            </div>
            <div>
              <label class="label-text" for="scheduleEnd">Fim*</label>
              <input id="scheduleEnd" v-model="scheduleForm.end" type="datetime-local" class="input" />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-soft btn-secondary" data-overlay="#schedule-modal">Fechar</button>
          <button v-if="editingSchedule" type="button" class="btn btn-primary" @click="updateSchedule"
            data-overlay="#schedule-modal">Salvar</button>
          <button v-else type="button" class="btn btn-primary" @click="createSchedule"
            data-overlay="#schedule-modal">Agendar</button>
        </div>
      </div>
    </div>
  </div>

  <div class="rounded-box shadow-base-300/10 bg-base-100 w-full pb-2 shadow-md min-h-[80vh] flex gap-6">
    <div class="p-6 flex-1 min-w-0">
      <CalendarComponent
        :calendarEvents="calendarEvents"
        @handle-date-select="handleDateSelect"
        @handle-event-click="handleEventClick" />
    </div>

    <!-- Sidebar aparece somente quando um evento for selecionado -->
    <transition name="slide-fade" appear>
      <aside v-if="scheduleToShow" class="w-80 md:w-96 lg:w-[34%] border-l border-gray-200 p-6 bg-white overflow-auto">
        <div class="mb-4 flex items-start justify-between gap-3">
          <div>
            <h2 class="text-lg font-semibold">Detalhes do Agendamento</h2>
            <p class="text-sm text-gray-500">Informações do evento selecionado</p>
          </div>
          <button @click="closeDetails" class="btn btn-sm btn-ghost">Fechar</button>
        </div>

        <div class="space-y-4">
          <div class="bg-gray-50 p-4 rounded">
            <h3 class="text-md font-medium">Título</h3>
            <p class="text-sm text-gray-700">{{ scheduleToShow.title }}</p>
          </div>

          <div class="bg-gray-50 p-4 rounded">
            <h3 class="text-md font-medium">Descrição</h3>
            <p class="text-sm text-gray-700">{{ scheduleToShow.description }}</p>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div v-if="scheduleToShow.resourceId" class="bg-gray-50 p-3 rounded w-full">
              <div class="text-xs text-gray-500">Recurso</div>
              <div class="font-medium">{{ resources.find(resource => resource.id === scheduleToShow?.resourceId)?.name || '—' }}</div>
            </div>

            <div v-if="scheduleToShow.roomId" class="bg-gray-50 p-3 rounded">
              <div class="text-xs text-gray-500">Sala</div>
              <div class="font-medium">{{ rooms.find(room => room.id === scheduleToShow?.roomId)?.name || '—' }}</div>
            </div>

            <div v-if="scheduleToShow.roomId" class="bg-gray-50 p-3 rounded">
              <div class="text-xs text-gray-500">Participantes</div>
              <div class="font-medium">{{ scheduleToShow.participantsQuantity }}</div>
            </div>

            <div v-if="scheduleToShow.roomId" class="bg-gray-50 p-3 rounded">
              <div class="text-xs text-gray-500">Capacidade da Sala</div>
              <div class="font-medium">{{ rooms.find(room => room.id === scheduleToShow?.roomId)?.capacity || '—' }}</div>
            </div>
          </div>

          <div class="bg-gray-50 p-3 rounded">
            <div class="text-xs text-gray-500">Início</div>
            <div class="font-medium">{{ new Date(scheduleToShow.start).toLocaleString().substring(0, 17) }}</div>
          </div>
          <div class="bg-gray-50 p-3 rounded">
            <div class="text-xs text-gray-500">Fim</div>
            <div class="font-medium">{{ new Date(scheduleToShow.end).toLocaleString().substring(0, 17) }}</div>
          </div>
        </div>

        <div class="flex gap-3 mt-4">
          <button @click="handleModalButton(); activateEditing(scheduleToShow)" class="btn btn-outline btn-sm flex-1" data-overlay="#schedule-modal">Editar</button>
          <button @click="deleteSchedule(scheduleToShow.id)" class="btn btn-error btn-sm flex-1">Excluir</button>
        </div>
      </aside>
    </transition>
  </div>
  <button id="handle-modal-button" class="btn hidden" data-overlay="#schedule-modal"></button>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 320ms cubic-bezier(.2,.9,.2,1);
}
.slide-fade-leave-active {
  transition: all 200ms ease;
}
.slide-fade-enter-from, .slide-fade-leave-to {
  transform: translateX(18px);
  opacity: 0;
}
.slide-fade-enter-to, .slide-fade-leave-from {
  transform: translateX(0);
  opacity: 1;
}

@media (max-width: 768px) {
  .rounded-box {
    flex-direction: column;
  }
  aside {
    width: 100% !important;
    border-left: none;
    border-top: 1px solid #e5e7eb;
  }
}
</style>