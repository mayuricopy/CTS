import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../components/Courses.vue')
    },

    {
      path: '/courses',
      name: 'courses',
      component: () => import('../components/Courses.vue')
    },

    {
      path: '/courses/:id',
      name: 'course-details',
      component: () => import('../views/CourseDetails.vue')
    },

    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/Profile.vue'),
      meta: {
        requiresProfile: true
      }
    }
  ]
})

router.beforeEach((to) => {
  if (to.meta.requiresProfile) {
    return true
  }

  return true
})

export default router