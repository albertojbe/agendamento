<script setup>
import { onMounted, ref, watch } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import ptBrLocale from '@fullcalendar/core/locales/pt-br'

const emits = defineEmits(['handle-date-select', 'handle-event-click'])

const props = defineProps({
  calendarEvents: {
    type: Array,
    default: () => []
  }
})

function handleDateSelect(start, end) {
  document.getElementById('handle-modal-button').click()
  emits('handle-date-select', start, end)
}

function handleEventClick(eventId) {
  emits('handle-event-click', eventId)
}

const calendarOptions = ref({
  height: '100%',
  plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
  initialView: 'timeGridWeek',
  locale: ptBrLocale,
  selectable: true,
  select: (info) => handleDateSelect(info.start, info.end),
  eventClick: (info) => handleEventClick(info.event.id),
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  },
  events: props.calendarEvents
})

watch(() => props.calendarEvents, (newEvents) => {
  calendarOptions.value.events = newEvents
})

onMounted(() => {
  calendarOptions.value.events = props.calendarEvents
})
</script>

<template>
  <FullCalendar :options="calendarOptions" />
  <button id="handle-modal-button" class="btn hidden" data-overlay="#schedule-modal"></button>
</template>
