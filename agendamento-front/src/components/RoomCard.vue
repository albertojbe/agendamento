<script setup>
import { BASE_URL } from '../config/api';

const props = defineProps({
  room: {
    type: Object,
    required: true
  }
});

</script>

<template>
    <div class="card group hover:shadow-sm sm:max-w-sm">
        <figure class="bg-gray-50">
            <img :src="`${BASE_URL}${room.imagePath.substring(7)}`" alt="Sala"
                class="transition-transform duration-500 group-hover:scale-110 object-cover h-40 w-full" />
        </figure>

        <div class="card-body">
            <h5 class="card-title mb-1.5">{{ room.name }}</h5>

            <p class="text-sm text-gray-600 mb-1">
                <strong>Localização:</strong> {{ room.location }}
            </p>

            <p class="text-sm text-gray-600 mb-1">
                <strong>Capacidade:</strong> {{ room.capacity }} pessoas
            </p>

            <p v-if="room.detail" class="text-sm text-gray-600 mb-4">
                <strong>Detalhes:</strong> {{ room.detail }}
            </p>

            <div class="card-actions flex gap-2 mt-2">
                <button data-overlay="#room-modal" class="btn btn-primary flex-1">Editar</button>
                <button @click="$emit('deleteRoom', room.id)" class="btn btn-error btn-soft flex-1">Excluir</button>
            </div>
        </div>
    </div>
</template>