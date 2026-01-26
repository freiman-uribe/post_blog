<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { alertProps } from '@/types/componets.type';

const props = withDefaults(defineProps<alertProps>(), {
    type: 'Success',
});

const className = ref<string>('');

onMounted(() => {
    typeAlert();
});

function typeAlert() {
    switch (props.type) {
        case 'Success':
            className.value = 'text-green-800 border-green-300 bg-green-50';
            break;
        case 'Error':
            className.value = 'text-red-800 border-red-300 bg-red-50';
            break;
        case 'Warning':
            className.value = 'text-yellow-800 border-yellow-300 bg-yellow-50';
            break;
        default:
            className.value = 'text-blue-800 border-blue-300 bg-blue-50';
            break;
    }
};
</script>

<template>
    <div :class="`flex p-4 mb-4 text-sm border rounded-lg bg-white ${className}`" role="alert">
        <svg class="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            fill="currentColor" viewBox="0 0 20 20">
            <path
                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <div>
            {{ message }}
        </div>
    </div>
</template>