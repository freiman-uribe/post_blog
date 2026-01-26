import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'posts',
    component: () => import('@/views/PostsListView.vue'),
    meta: {
      title: 'Posts - Blog',
    },
  },
  {
    path: '/posts/:id',
    name: 'post-detail',
    component: () => import('@/views/PostDetailView.vue'),
    meta: {
      title: 'Detalle del Post',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: {
      title: 'Página no encontrada',
    },
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  },
});

// Actualizar el título de la página
router.beforeEach((to, _from, next) => {
  const title = to.meta.title as string || 'Vue 3 App';
  document.title = title;
  next();
});

export default router;
