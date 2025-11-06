<template>
  <div class="card flex not-prose p-4 w-full">
    <div id="calendar-custom"></div>
  </div>

  <!-- Modal trigger (hidden) -->
  <button
    type="button"
    class="btn hidden"
    id="modalTrigger"
    aria-haspopup="dialog"
    aria-expanded="false"
    aria-controls="calendar-event-modal"
    data-overlay="#calendar-event-modal"
  ></button>

  <!-- Modal -->
  <div
    id="calendar-event-modal"
    class="overlay modal overlay-open:opacity-100 overlay-open:duration-300 hidden"
    role="dialog"
    tabindex="-1"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title" id="modalTitle">Event</h3>
          <button
            type="button"
            class="btn btn-text btn-circle btn-sm absolute end-3 top-3"
            aria-label="Close"
            data-overlay="#calendar-event-modal"
          >
            <span class="icon-[tabler--x] size-4"></span>
          </button>
        </div>

        <form id="eventForm">
          <div class="modal-body pt-0">
            <div class="mb-4">
              <label class="label-text" for="eventTitle">Add event title below</label>
              <input type="text" id="eventTitle" class="input" placeholder="Event title" required />
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-soft btn-secondary" data-overlay="#calendar-event-modal">Close</button>
            <button type="submit" class="btn btn-primary">Save changes</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";

onMounted(() => {
  const calendarEl = document.getElementById("calendar-custom");
  if (!calendarEl) return;

  const today = new Date();

  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const formatDate = (date) =>
    date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const events = [
    { title: "All Day Event", start: addDays(today, 2).toISOString().split("T")[0], classNames: ["fc-event-info"] },
    { title: "Conference", start: addDays(today, 9).toISOString().split("T")[0], end: addDays(today, 10).toISOString().split("T")[0], classNames: ["fc-event-primary"] },
    { title: "Meeting", start: addDays(today, 9).toISOString().split("T")[0] + "T10:30:00", classNames: ["fc-event-error"] },
  ];

  let selectedEvent = null;
  let selectedDateInfo = null;

  const calendar = new Calendar(calendarEl, {
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
    initialView: "dayGridMonth",
    editable: true,
    selectable: true,
    dayMaxEvents: 2,
    headerToolbar: {
      left: "prev,next title",
      right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
    },
    buttonText: {
      month: "Month",
      week: "Week",
      day: "Day",
      list: "List",
    },
    events,
    select(info) {
      selectedEvent = null;
      selectedDateInfo = info;
      document.getElementById("modalTitle").textContent = formatDate(info.start);
      document.getElementById("eventForm").reset();
      document.getElementById("modalTrigger").click();
    },
    eventClick(info) {
      selectedEvent = info.event;
      document.getElementById("modalTitle").textContent = formatDate(info.event.start);
      document.getElementById("eventTitle").value = info.event.title;
      document.getElementById("modalTrigger").click();
    },
    eventTimeFormat: {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    },
    allDayText: "All day",
  });

  calendar.render();

  document.getElementById("eventForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("eventTitle").value;
    if (title) {
      if (selectedEvent) {
        selectedEvent.setProp("title", title);
      } else {
        calendar.addEvent({
          title,
          start: selectedDateInfo.startStr,
          end: selectedDateInfo.endStr,
          allDay: true,
        });
      }
      window.HSOverlay.close("#calendar-event-modal");
    }
  });
});
</script>
