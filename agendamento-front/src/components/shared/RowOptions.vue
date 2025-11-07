<script setup>
import { onMounted } from 'vue';

const props = defineProps({
    rooms: {
        type: Array,
        required: true,
        default: () => []
    }
})

onMounted(() => {
    console.log(props.rooms)
});

</script>
<template>
    <nav class="tabs flex-col items-start space-y-1" aria-label="Tabs" role="tablist" data-tabs-vertical="true"
        aria-orientation="horizontal">
        <ul>
            <li v-for="room in props.rooms" :key="room.id">
                <button type="button"
                    class="btn btn-primary active-tab:bg-primary active-tab:text-white hover:text-primary hover:bg-primary/20 w-full"
                    :id="`tabs-pill-vertical-item-${room.id}`" :data-tab="`#tabs-pill-vertical-${room.id}`" role="tab">
                    {{ room.name }}
                </button>
            </li>
        </ul>
    </nav>
</template>