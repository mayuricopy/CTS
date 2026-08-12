<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useEnrollmentStore } from '../stores/enrollment'
import CourseCard from './CourseCard.vue'

const router = useRouter()
const enrollmentStore = useEnrollmentStore()

const searchText = ref('')

const courses = ref([
  {
    name: 'Vue.js Fundamentals',
    code: 'VUE101',
    credits: 4,
    grade: 'A'
  },
  {
    name: 'JavaScript Advanced',
    code: 'JS201',
    credits: 3,
    grade: 'A+'
  },
  {
    name: 'Database Management',
    code: 'DB301',
    credits: 4,
    grade: 'B+'
  },
  {
    name: 'Web Development',
    code: 'WEB401',
    credits: 3,
    grade: 'A'
  },
  {
    name: 'Software Engineering',
    code: 'SE501',
    credits: 3,
    grade: 'A'
  }
])

const filteredCourses = computed(() => {
  return courses.value.filter(course =>
    course.name.toLowerCase().includes(searchText.value.toLowerCase()) ||
    course.code.toLowerCase().includes(searchText.value.toLowerCase())
  )
})

function viewCourse(course) {
  router.push(`/courses/${course.code}`)
}

function enroll(course) {
  enrollmentStore.enrollCourse(course)
}

function unenroll(course) {
  enrollmentStore.unenrollCourse(course.code)
}

function isEnrolled(course) {
  return enrollmentStore.isEnrolled(course.code)
}
</script>

<template>
  <section class="courses-page">

    <div class="header">
      <div>
        <p class="eyebrow">ACADEMIC DASHBOARD</p>

        <h2>My Courses</h2>

        <p>
          Search, view and manage your courses.
        </p>
      </div>

      <div class="course-count">
        <strong>{{ filteredCourses.length }}</strong>
        <span>Courses</span>
      </div>
    </div>

    <!-- Search -->
    <div class="search-box">
      🔍

      <input
        v-model="searchText"
        type="text"
        placeholder="Search courses..."
      />
    </div>

    <!-- Enrolled information -->
    <div class="enrollment-summary">
      <div>
        <span>Enrolled Courses</span>
        <strong>{{ enrollmentStore.enrolledCourses.length }}</strong>
      </div>

      <div>
        <span>Total Credits</span>
        <strong>{{ enrollmentStore.totalCredits }}</strong>
      </div>
    </div>

    <!-- Course cards -->
    <div class="course-list">

      <div
        v-for="course in filteredCourses"
        :key="course.code"
        class="course-wrapper"
      >

        <CourseCard
          :name="course.name"
          :code="course.code"
          :credits="course.credits"
          :grade="course.grade"
        />

        <div class="course-actions">

          <button
            class="details-button"
            @click="viewCourse(course)"
          >
            View Details
          </button>

          <button
            v-if="!isEnrolled(course)"
            class="enroll-button"
            @click="enroll(course)"
          >
            Enroll
          </button>

          <button
            v-else
            class="unenroll-button"
            @click="unenroll(course)"
          >
            Unenroll
          </button>

        </div>

      </div>

    </div>

    <!-- No results -->
    <div
      v-if="filteredCourses.length === 0"
      class="empty"
    >
      <div>📚</div>

      <h3>No courses found</h3>

      <p>
        Try searching for another course.
      </p>
    </div>

  </section>
</template>

<style scoped>

.courses-page {
  max-width: 1000px;
  margin: 40px auto;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.eyebrow {
  color: #6366f1;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 1.5px;
}

h2 {
  font-size: 32px;
  color: #1e1b4b;
  margin: 5px 0;
}

.header p {
  color: #64748b;
}

.course-count {
  width: 90px;
  height: 90px;
  border-radius: 20px;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: white;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.course-count strong {
  font-size: 28px;
}

.course-count span {
  font-size: 13px;
}

/* Search */

.search-box {
  margin: 25px 0;

  padding: 12px 16px;

  background: white;

  border: 2px solid #e0e7ff;

  border-radius: 12px;

  max-width: 600px;
}

.search-box input {
  border: none;
  outline: none;

  margin-left: 10px;

  font-size: 15px;

  width: 90%;
}

/* Enrollment summary */

.enrollment-summary {
  display: flex;
  gap: 20px;

  margin-bottom: 25px;
}

.enrollment-summary div {
  background: white;

  padding: 15px 25px;

  border-radius: 12px;

  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.enrollment-summary span {
  display: block;

  color: #64748b;

  font-size: 13px;
}

.enrollment-summary strong {
  display: block;

  color: #4338ca;

  font-size: 22px;

  margin-top: 5px;
}

/* Courses */

.course-list {
  display: grid;

  grid-template-columns:
    repeat(auto-fit, minmax(270px, 1fr));

  gap: 20px;
}

.course-wrapper {
  display: flex;

  flex-direction: column;

  gap: 10px;
}

.course-actions {
  display: flex;

  gap: 8px;
}

.course-actions button {
  flex: 1;

  padding: 10px;

  border: none;

  border-radius: 9px;

  cursor: pointer;

  font-weight: bold;
}

/* Buttons */

.details-button {
  background: #eef2ff;

  color: #4338ca;
}

.enroll-button {
  background: #22c55e;

  color: white;
}

.unenroll-button {
  background: #ef4444;

  color: white;
}

.details-button:hover {
  background: #ddd6fe;
}

.enroll-button:hover {
  background: #16a34a;
}

.unenroll-button:hover {
  background: #dc2626;
}

/* Empty state */

.empty {
  text-align: center;

  margin-top: 30px;

  padding: 40px;

  background: white;

  border-radius: 15px;
}

.empty div {
  font-size: 40px;
}

.empty h3 {
  color: #312e81;
}

.empty p {
  color: #64748b;
}

/* Mobile */

@media (max-width: 600px) {

  .header {
    flex-direction: column;

    align-items: flex-start;

    gap: 20px;
  }

  .enrollment-summary {
    flex-direction: column;
  }

  .course-actions {
    flex-direction: column;
  }

}

</style>