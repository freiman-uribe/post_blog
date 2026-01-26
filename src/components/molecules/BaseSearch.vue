<script setup lang="ts">
import { ref, watch } from 'vue';
import BaseInput from '@/components/atoms/BaseInput.vue';
import type { searchProps } from '@/types/componets.type';

interface Emits {
    (e: 'update:modelValue', value: string): void;
}

const props = withDefaults(defineProps<searchProps>(), {
    modelValue: '',
    resultsCount: null,
});

const emit = defineEmits<Emits>();
const searchValue = ref(props.modelValue);

const handleSearch = () => {
    emit('update:modelValue', searchValue.value);
};

watch(
    () => props.modelValue,
    (newValue) => {
        searchValue.value = newValue;
    }
);
</script>

<template>
    <div class="flex relative group">
        <div
            class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-primary transition-colors"
        >
            <span class="material-symbols-outlined">search</span>
        </div>
        <BaseInput
            v-model="searchValue"
            inputClass="block w-full pl-10 pr-4 py-2 bg-white/5 border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl text-sm text-white placeholder-gray-500 transition-all"
            placeholder="Buscar por título..." 
            type="search"
            @update:model-value="handleSearch" 
        />
    </div>
</template>