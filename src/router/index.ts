import { createRouter, createWebHistory } from 'vue-router';
import FonasaLayout from '@/modules/fonasa/layouts/FonasaLayout.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'fonasa',
      redirect: { name: 'home' },
      component: FonasaLayout,
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import('@/modules/fonasa/views/HomeView.vue'),
        },
        {
          path: 'hospital/:id',
          name: 'hospital',
          props: true,
          component: () => import('@/modules/hospital/views/HospitalView.vue'),
        },
      ],
    },
  ],
});

export default router;
