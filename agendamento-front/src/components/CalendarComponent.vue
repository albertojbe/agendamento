<script setup>
import { ref } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import ptBrLocale from '@fullcalendar/core/locales/pt-br'

// Função de clique na data
function handleDateClick(arg) {
  console.log(arg.date.toISOString())
  alert('date click! ' + arg.dateStr)
}

// Opções do calendário reativas
const calendarOptions = ref({
  plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
  initialView: 'timeGridWeek',
  locale: ptBrLocale,
  selectable: true,
  dateClick: handleDateClick,
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  },
  events: [
    {
      title: 'Reunião de equipe',
      start: '2025-11-05T09:00:00',
      end: '2025-11-05T10:00:00'
    },
    {
      title: 'Almoço com cliente',
      start: '2025-11-05T12:30:00',
      end: '2025-11-05T13:30:00'
    },
    {
      title: 'Evento teste',
      start: '2025-11-05T13:30:00.000Z',
      end: '2025-11-05T14:00:00.000Z'
    }
  ]
})
</script>

<template>
  <FullCalendar :options="calendarOptions" />
</template>
