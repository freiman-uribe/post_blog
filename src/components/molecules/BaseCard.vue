<script setup lang="ts">
import type { Post } from '@/types/post.type';
defineProps<{ post: Post }>();
</script>

<template>
    <div
        class="group bg-card-grey card-border rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/40 transition-all duration-300 flex flex-col">
        <div class="p-6 flex flex-col flex-1">
            <h3 class="text-lg font-bold text-white mb-3 group-hover:text-primary transition-colors">{{ post.title }}</h3>
            <p class="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                {{ post.body }}
            </p>
            <div class="mt-auto flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <div class="size-6 rounded-full bg-white/10 bg-center bg-cover"
                        style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCJai5dcNFQ8TOujWcPep4uIZfC0JwlvFjirq91lQEY0R2ZwKBSPq3L1_ILKQ6si_disistGHMc87QoX8zHdmHh5XL0eUGtgWeTHSU1Vpcs_NRqz5ATAerAVREH60P9IduHDsWOP1JAbGqiQHWz6-MDh_lE_zYVxAVgC1jpMZfliWcKeRZd3J28kJKBsqH9j1edFM5jwUghPDqrqOA0yn0AoqeYNhZWC7swcvjGIZe35hJXXbtZmF3AcBXQRsGWsNt8AFOgCM0n8Gys");'>
                    </div>
                    <span class="text-xs font-medium text-gray-400">{{post.user?.name}}</span>
                </div>
                <RouterLink :to="`/posts/${post.id}`"
                    class="px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg hover:brightness-110 shadow-lg shadow-primary/20 transition-all">
                    Ver detalles
                </RouterLink>
            </div>
        </div>
    </div>
</template>