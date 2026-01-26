<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { usePostsStore } from '@/stores/posts.store';
import BaseLoader from '@/components/molecules/BaseLoader.vue';
import BaseAlert from '@/components/molecules/BaseAlert.vue';
import BaseSearch from '@/components/molecules/BaseSearch.vue';
import BaseCard from '@/components/molecules/BaseCard.vue';
import BasePagination from '@/components/molecules/BasePagination.vue';

const postsStore = usePostsStore();

const {
    paginatedPosts,
    isLoading,
    error,
    currentPage,
    totalPages,
    filteredPosts,
} = storeToRefs(postsStore);

onMounted(async () => {
    if (postsStore.posts.length === 0) {
        await postsStore.fetchPostsByPage(1, 10);
    }
});

const filteredPostsCount = computed(() => filteredPosts.value.length);

const searchQuery = computed({
    get: () => postsStore.searchQuery,
    set: (value: string) => postsStore.setSearchQuery(value),
});

const handlePageChange = (page: number) => {
    postsStore.setCurrentPage(page);
};


</script>

<template>
    <main class="pt-10 pb-12 px-6 max-w-7xl mx-auto">
        <BaseLoader v-if="isLoading" size="lg" text="Cargando posts..." />
        <BaseAlert v-else-if="error" :message="error" type="Error" />
        <div v-else-if="!isLoading && !error">
            <div class="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 class="text-3xl font-bold text-white mb-2">Lista de Post</h2>
                    <p class="text-gray-400">Descubre las últimas ideas publicadas.</p>
                </div>
            </div>

            <div class="mb-8">
                <BaseSearch v-model="searchQuery" :results-count="filteredPostsCount" />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <BaseCard v-for="post in paginatedPosts" :key="post.id" :post="post" />
            </div>

            <BasePagination v-if="totalPages > 1" :current-page="currentPage" :total-pages="totalPages"
                @change="handlePageChange" />
        </div>
    </main>
</template>