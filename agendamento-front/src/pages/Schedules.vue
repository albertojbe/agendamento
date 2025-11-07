<script setup>
import { ref, onMounted } from 'vue';
import api from '../config/api';
import CalendarComponent from '../components/CalendarComponent.vue';
import RowOptions from '../components/shared/RowOptions.vue';

const rooms = ref([])

onMounted(async () => {
  try {
    const response = await api.get('/rooms')
    rooms.value = response.data
    for (const room of rooms.value) {
      console.log(room.name)
    }
  } catch (err) {
    console.error('Erro ao buscar salas:', err)
  }
})
</script>

<template>
    <div class="container mx-auto my-10 bg-base-100 shadow-base-300/20 shadow-sm p-10 rounded-2xl gap-7"
        style="display: flex; flex-direction: row; max-height: 85vh;">
        <div class="flex mt-15">
            <RowOptions :rooms="rooms" />
        </div>
        <div class="w-full max-h-[90%] overflow-auto">
            <CalendarComponent />
        </div>
    </div>
</template>