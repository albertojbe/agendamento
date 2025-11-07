<script setup>
import { onMounted } from 'vue';


onMounted(function () {
    document.getElementById('teste').addEventListener('keyup', function (e) {
        console.log(e.target.value)
    })
})
</script>

<template>
    <button type="button" class="btn btn-primary" aria-haspopup="dialog" aria-expanded="false"
        aria-controls="basic-modal" data-overlay="#basic-modal"> Open modal </button>

    <div id="basic-modal" class="overlay modal overlay-open:opacity-100 hidden overlay-open:duration-300" role="dialog"
        tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">Dialog Title</h3>
                    <button type="button" class="btn btn-text btn-circle btn-sm absolute end-3 top-3" aria-label="Close"
                        data-overlay="#basic-modal">
                        <span class="icon-[tabler--x] size-4"></span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="w-96">
                        <label class="label-text" for="eventname">Nome do evento*</label>
                        <input type="text" placeholder="Reunião semanal" class="input" id="eventName" />
                    </div>

                    <div class="w-96 flex flex-col" style="flex-direction: column;">
                        <label class="label-text" for="start">Horário de início*</label>
                        <input type="time" class="input" id="start" />
                        <label class="label-text" for="end">Horário de fim*</label>
                        <input type="time" class="input" id="end" />
                    </div>

                    <div class="w-96 flex flex-col" style="flex-direction: column;">
                        <label class="label-text" for="start">Descrição</label>
                        <textarea class="textarea max-w-sm"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-soft btn-secondary" data-overlay="#basic-modal">Close</button>
                    <button type="button" data-overlay="#basic-modal" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>
</template>