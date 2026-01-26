<script setup lang="ts">
import { computed } from 'vue';
import BaseButton from '@/components/atoms/BaseButton.vue';
import type { paginationProps } from '@/types/componets.type';

interface Emits {
    (e: 'update:currentPage', page: number): void;
    (e: 'change', page: number): void;
}

const props = withDefaults(defineProps<paginationProps>(), {
    maxVisiblePages: 5,
});

const emit = defineEmits<Emits>();

const visiblePages = computed(() => {
    const pages: number[] = [];
    const half = Math.floor(props.maxVisiblePages / 2);
    let start = Math.max(1, props.currentPage - half);
    let end = Math.min(props.totalPages, start + props.maxVisiblePages - 1);

    // Ajustar botones que se muestran si se expande la paginacion a 100 items
    if (end - start < props.maxVisiblePages - 1) {
        start = Math.max(1, end - props.maxVisiblePages + 1);
    }

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    return pages;
});

const pageButtonClasses = (page: number) => {
    const activeClasses = page === props.currentPage
        ? ' bg-primary text-white font-bold text-sm shadow-lg shadow-primary/30'
        : 'border border-transparent bg-transparent hover:bg-white/5 transition-colors font-medium text-sm text-gray-400';

    return `${activeClasses}`;
};

const goToPage = (page: number) => {
    if (page !== props.currentPage && page >= 1 && page <= props.totalPages) {
        emit('update:currentPage', page);
        emit('change', page);
    }
};

const goToPrevious = () => {
    if (props.currentPage > 1) {
        goToPage(props.currentPage - 1);
    }
};

const goToNext = () => {
    if (props.currentPage < props.totalPages) {
        goToPage(props.currentPage + 1);
    }
};
</script>

<template>
    <nav class="mt-12 flex items-center justify-center gap-2">
        <BaseButton
        className="flex items-center justify-center size-10 rounded-lg border border-white/10 bg-card-grey hover:bg-white/5 transition-colors text-gray-400"
        :disabled="currentPage === 1" @click="goToPrevious">
            <span class="material-symbols-outlined" >chevron_left</span>
        </BaseButton>

        <BaseButton v-for="page in visiblePages" :key="page" :class="pageButtonClasses(page)" @click="goToPage(page)"
            className="flex items-center justify-center size-10 rounded-lg">
            {{ page }}
        </BaseButton>

        <BaseButton
            className="flex items-center justify-center size-10 rounded-lg border border-white/10 bg-card-grey hover:bg-white/5 transition-colors text-gray-400"
            :disabled="currentPage === totalPages" @click="goToNext">
            <span class="material-symbols-outlined">chevron_right</span>
        </BaseButton>
    </nav>

    <p class="text-center text-sm text-gray-600 mt-3">
        Página {{ currentPage }} de {{ totalPages }}
    </p>

</template>