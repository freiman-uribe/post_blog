<script setup lang="ts">
import type { inputProps } from '@/types/componets.type';

interface Emits {
    (e: 'update:modelValue', value: string): void;
}

const props = withDefaults(defineProps<inputProps>(), {
    placeholder: '',
    type: 'text',
    inputClass: '',
});

const emit = defineEmits<Emits>();

const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emit('update:modelValue', target.value);
};
</script>
<template>
    <input
        :class=" inputClass"
        :placeholder="placeholder"
        :type="type"
        :value="modelValue"
        @input="handleInput"
    />
</template>