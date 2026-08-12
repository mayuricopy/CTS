<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const courses = [
  {
    id: 'VUE101',
    name: 'Vue.js Fundamentals',
    credits: 4,
    grade: 'A'
  },
  {
    id: 'JS201',
    name: 'JavaScript Advanced',
    credits: 3,
    grade: 'A+'
  },
  {
    id: 'DB301',
    name: 'Database Management',
    credits: 4,
    grade: 'B+'
  },
  {
    id: 'WEB401',
    name: 'Web Development',
    credits: 3,
    grade: 'A'
  },
  {
    id: 'SE501',
    name: 'Software Engineering',
    credits: 3,
    grade: 'A'
  }
]

const course = computed(() => {
  return courses.find(item => item.id === route.params.id)
})

function goBack() {
  router.push('/courses')
}
</script>

<template>
  <section class="details-page">

    <button class="back-button" @click="goBack">
      ← Back to Courses
    </button>

    <div v-if="course" class="details-card">

      <p class="eyebrow">COURSE DETAILS</p>

      <h2>{{ course.name }}</h2>

      <p class="course-code">
        Course Code: {{ course.id }}
      </p>

      <div class="details-grid">

        <div>
          <span>Credits</span>
          <strong>{{ course.credits }}</strong>
        </div>

        <div>
          <span>Grade</span>
          <strong>{{ course.grade }}</strong>
        </div>

      </div>

    </div>

    <div v-else class="not-found">
      <div>📚</div>
      <h2>Course Not Found</h2>
      <p>The requested course does not exist.</p>
    </div>

  </section>
</template>

<style scoped>
.details-page {
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
}

.back-button {
  border: none;
  background: #eef2ff;
  color: #4338ca;
  padding: 10px 18px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  margin-bottom: 25px;
}

.details-card {
  background: white;
  padding: 35px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(79, 70, 229, 0.1);
}

.eyebrow {
  color: #6366f1;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 1.5px;
}

h2 {
  color: #1e1b4b;
  font-size: 32px;
}

.course-code {
  color: #6366f1;
  font-weight: bold;
}

.details-grid {
  display: flex;
  gap: 20px;
  margin-top: 30px;
}

.details-grid div {
  flex: 1;
  background: #f5f3ff;
  padding: 20px;
  border-radius: 12px;
}

.details-grid span {
  display: block;
  color: #64748b;
  font-size: 13px;
}

.details-grid strong {
  display: block;
  margin-top: 5px;
  color: #312e81;
  font-size: 22px;
}

.not-found {
  text-align: center;
  background: white;
  padding: 50px;
  border-radius: 20px;
}

.not-found div {
  font-size: 45px;
}
</style>