<script setup lang="ts">
import { onMounted, computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { usePostsStore } from '@/stores/posts.store';
import BaseLoader from '@/components/molecules/BaseLoader.vue';
import BaseAlert from '@/components/molecules/BaseAlert.vue';

const route = useRoute();
const postsStore = usePostsStore();

const postId = computed(() => Number(route.params.id));

const { currentPost, commentsPost, isLoading, error } = storeToRefs(postsStore);

const numberInitialComments = ref<number>(2);

const showAllComments = ref(false);

const displayedComments = computed(() => {
    if (!commentsPost.value) return [];
    if (showAllComments.value || commentsPost.value.length <= numberInitialComments.value) {
        return commentsPost.value;
    }
    return commentsPost.value.slice(0, numberInitialComments.value);
});

onMounted(() => {
    loadPost();
    loadComments();
});

const loadPost = async () => {
    if (postId.value) {
        await postsStore.fetchPostById(postId.value);
    }
};

const loadComments = async () => {
    if (postId.value) {
        await postsStore.fetchCommentsByPostId(postId.value);
    }
};

watch(() => route.params.id, () => {
    showAllComments.value = false; // Reset al cambiar de post
    loadPost();
    loadComments();
});

</script>

<template>
    <div class="flex-1 flex flex-col items-center py-8 px-4 md:px-0">
        <div  class="w-full max-w-[1300px] flex flex-col gap-6">
            <div class="flex justify-start">
                <RouterLink :to="'/'"
                    class="flex items-center justify-center rounded-lg h-10 px-4 bg-slate-800/50 hover:bg-slate-800 text-primary border border-primary/20 gap-2 text-sm font-bold transition-all shadow-lg">
                    <span class="material-symbols-outlined text-[20px]">arrow_back</span>
                    <span>Back to Articles</span>
                </RouterLink>
            </div>
            <BaseLoader v-if="isLoading" :fullScreen="true" text="Cargando artículo..." />
            <BaseAlert v-else-if="error" :message="error" type="Error" />
            <div v-else-if="!isLoading && !error" class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <article class="lg:col-span-8 bg-dark-slate rounded-xl shadow-2xl overflow-hidden flex flex-col border border-slate-700">
                    <div class="p-8 md:p-12">
                        <div class="lg:hidden mb-8 border-b border-slate-700 pb-8">
                            <div class="flex items-center gap-4">
                                <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-16 ring-2 ring-primary/40"
                                    data-alt="Professional headshot of author"
                                    style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBP69l8IVlIzgKk3vz9OCBvoag-9Tu-ZDdonvTT9lJPO_Rye-O4uLHntsdrMyLPK_ZfLX_v9XYknZz63Ngv1aBoyATrLZsFNXrRtMw3bJBxrw4_3kau7Vkda7FgobIrTV7xDxdaDjkyh9CVqsw8Zm3nqYZOeVPi_tq68dbvRbwqQKaqkl503RvDJLc6X8R9sdckWhpCPXZLAR9Ck_hhaO-Z3seIYZwhDKKZvxJc5MBchgV1WyXW6WpoYXxUlrc8JvHOy4u-hp2LXnGM");'>
                                </div>
                                <div>
                                    <p class="font-bold text-off-white">Author ID: {{ currentPost?.userId }}</p>
                                    <p class="text-slate-400 text-sm">{{ currentPost?.user?.name }}</p>
                                    <p class="text-slate-400 text-sm">{{ currentPost?.user?.email }}</p>
                                </div>
                            </div>
                        </div>
                        <h1
                            class="text-off-white tracking-tight text-[32px] md:text-[40px] font-bold leading-[1.15] mb-8">
                            {{ currentPost?.title }}
                        </h1>
                        <div class="prose-container mx-auto space-y-6 text-light-grey text-lg leading-relaxed">
                            <p>{{ currentPost?.body }}</p>
                        </div>
                        <div class="mt-12 pt-8 border-t border-slate-700 flex flex-wrap gap-4">
                           <div class="sidebar-card rounded-xl p-6">
                                <h3 class="text-off-white font-bold mb-4">Comentarios ({{ commentsPost?.length || 0 }})</h3>
                                <div v-if="commentsPost && commentsPost.length > 0" class="space-y-4">
                                    <div v-for="comment in displayedComments" :key="comment.id" class="space-y-4">
                                        <span class="text-[11px] text-slate-500 uppercase font-bold tracking-wider">
                                            {{ comment.name }} <br /> • {{ comment.email }}
                                        </span>
                                        
                                        <p class="text-sm font-medium text-slate-200 transition-colors line-clamp-2">
                                            {{ comment.body }}
                                        </p>
                                        <hr />
                                    </div>
                                    <button 
                                        v-if="commentsPost.length > numberInitialComments && !showAllComments"
                                        @click="showAllComments = true"
                                        class="w-full mt-4 py-2 px-4 bg-slate-800 hover:bg-slate-700 text-primary border border-primary/20 rounded-lg text-sm font-bold transition-all">
                                        Ver más comentarios ({{ commentsPost.length - numberInitialComments }} más)
                                    </button>
                                    <button 
                                        v-if="showAllComments && commentsPost.length > numberInitialComments"
                                        @click="showAllComments = false"
                                        class="w-full mt-4 py-2 px-4 bg-slate-800 hover:bg-slate-700 text-primary border border-primary/20 rounded-lg text-sm font-bold transition-all">
                                        Ver menos
                                    </button>
                                </div>
                                <p v-else class="text-slate-400 text-sm text-center py-4">
                                    No hay comentarios aún
                                </p>
                            </div>
                        </div>
                    </div>
                </article>
                <aside  class="hidden lg:flex lg:col-span-4 flex-col gap-6">
                    <div class="sidebar-card rounded-xl p-6">
                        <div class="flex items-center gap-4">
                            <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-16 ring-2 ring-primary/40"
                                data-alt="Professional headshot of author"
                                style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBP69l8IVlIzgKk3vz9OCBvoag-9Tu-ZDdonvTT9lJPO_Rye-O4uLHntsdrMyLPK_ZfLX_v9XYknZz63Ngv1aBoyATrLZsFNXrRtMw3bJBxrw4_3kau7Vkda7FgobIrTV7xDxdaDjkyh9CVqsw8Zm3nqYZOeVPi_tq68dbvRbwqQKaqkl503RvDJLc6X8R9sdckWhpCPXZLAR9Ck_hhaO-Z3seIYZwhDKKZvxJc5MBchgV1WyXW6WpoYXxUlrc8JvHOy4u-hp2LXnGM");'>
                            </div>
                            <div>
                                <p class="text-off-white text-lg font-bold leading-tight">Author ID: {{ currentPost?.userId }}
                                </p>
                                <p class="text-slate-400 text-sm">{{currentPost?.user?.name }}</p>
                                <p class="text-slate-400 text-sm">{{ currentPost?.user?.email }}</p>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    </div>
</template>