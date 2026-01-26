<script setup lang="ts">
import { computed } from 'vue';
import type { loaderProps } from '@/types/componets.type';

const props = withDefaults(defineProps<loaderProps>(), {
    size: 'md',
    text: '',
    fullScreen: false,
});

const sizeClasses = computed(() => {
    const sizes = {
        sm: 'w-6 h-6 border-blue-500',
        md: 'w-10 h-10 border-blue-600',
        lg: 'w-16 h-16 border-blue-700',
    };
    return sizes[props.size];
});

const containerClasses = computed(() => {
    return props.fullScreen ? 'min-h-screen' : 'py-8';
});

const spinnerClasses = computed(() => {
    return 'flex items-center';
});
</script>

<template>
    <div class="justify-items-center" :class="containerClasses">
        <div :class="spinnerClasses" role="status" aria-label="Cargando">
            <div class="animate-spin rounded-full border-4 border-t-transparent" :class="sizeClasses"></div>
        </div>
        <br>
        <p v-if="text" class="ml-3 text-gray-600">{{ text }}</p>
    </div>
</template>