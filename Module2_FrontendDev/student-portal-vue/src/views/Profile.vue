<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useEnrollmentStore } from '../stores/enrollment'

const router = useRouter()
const enrollmentStore = useEnrollmentStore()

const name = ref('')
const email = ref('')
const semester = ref('')
const submitted = ref(false)

function saveProfile() {
  submitted.value = true
}

function goToCourses() {
  router.push('/courses')
}

function unenroll(code) {
  enrollmentStore.unenrollCourse(code)
}
</script>

<template>
  <section class="profile-page">

    <!-- Profile Header -->
    <div class="profile-header">

      <div>
        <p class="eyebrow">STUDENT ACCOUNT</p>

        <h2>My Profile</h2>

        <p>
          Update your personal and academic information.
        </p>
      </div>

      <div class="profile-icon">
        👤
      </div>

    </div>

    <!-- Profile Form -->
    <form @submit.prevent="saveProfile">

      <div class="form-group">

        <label>Full Name</label>

        <input
          v-model="name"
          type="text"
          placeholder="Enter your name"
          required
        />

      </div>

      <div class="form-group">

        <label>Email Address</label>

        <input
          v-model="email"
          type="email"
          placeholder="Enter your email"
          required
        />

      </div>

      <div class="form-group">

        <label>Current Semester</label>

        <input
          v-model="semester"
          type="number"
          min="1"
          max="8"
          placeholder="Enter semester"
          required
        />

      </div>

      <button type="submit">
        💾 Save Profile
      </button>

    </form>

    <!-- Profile Saved -->
    <div
      v-if="submitted"
      class="success-card"
    >

      <div class="success-icon">
        ✓
      </div>

      <div>

        <h3>
          Profile Saved Successfully!
        </h3>

        <p>
          Your information has been updated.
        </p>

        <div class="summary">

          <p>
            <strong>Name:</strong>
            {{ name }}
          </p>

          <p>
            <strong>Email:</strong>
            {{ email }}
          </p>

          <p>
            <strong>Semester:</strong>
            {{ semester }}
          </p>

        </div>

      </div>

    </div>

    <!-- Enrollment Summary -->
    <div class="enrollment-section">

      <div class="section-header">

        <div>
          <p class="eyebrow">ACADEMIC SUMMARY</p>

          <h3>My Enrollments</h3>
        </div>

        <div class="credits-badge">

          <span>Total Credits</span>

          <strong>
            {{ enrollmentStore.totalCredits }}
          </strong>

        </div>

      </div>

      <!-- No Courses -->
      <div
        v-if="enrollmentStore.enrolledCourses.length === 0"
        class="no-enrollments"
      >

        <div>📚</div>

        <h3>No Courses Enrolled</h3>

        <p>
          You haven't enrolled in any courses yet.
        </p>

        <button
          class="browse-button"
          @click="goToCourses"
        >
          Browse Courses
        </button>

      </div>

      <!-- Enrolled Courses -->
      <div
        v-else
        class="enrolled-list"
      >

        <div
          v-for="course in enrollmentStore.enrolledCourses"
          :key="course.code"
          class="enrolled-course"
        >

          <div class="course-info">

            <h4>
              {{ course.name }}
            </h4>

            <p>
              {{ course.code }}
              • {{ course.credits }} Credits
            </p>

          </div>

          <div class="course-actions">

            <span class="grade">
              {{ course.grade }}
            </span>

            <button
              class="remove-button"
              @click="unenroll(course.code)"
            >
              Remove
            </button>

          </div>

        </div>

      </div>

    </div>

  </section>
</template>

<style scoped>

.profile-page {
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
}

/* Header */

.profile-header {
  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: 25px;
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

  margin: 5px 0;
}

.profile-header p {
  color: #64748b;
}

.profile-icon {
  width: 70px;

  height: 70px;

  border-radius: 18px;

  background:
    linear-gradient(
      135deg,
      #6366f1,
      #8b5cf6
    );

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 30px;

  color: white;
}

/* Form */

form {
  background: white;

  padding: 30px;

  border-radius: 20px;

  box-shadow:
    0 10px 30px
    rgba(79, 70, 229, 0.08);
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;

  margin-bottom: 7px;

  font-weight: bold;

  color: #334155;
}

input {
  width: 100%;

  padding: 13px;

  border: 2px solid #e2e8f0;

  border-radius: 10px;

  font-size: 15px;

  outline: none;
}

input:focus {
  border-color: #6366f1;
}

form button {
  width: 100%;

  padding: 13px;

  border: none;

  border-radius: 10px;

  background:
    linear-gradient(
      135deg,
      #4f46e5,
      #7c3aed
    );

  color: white;

  font-weight: bold;

  cursor: pointer;
}

/* Success */

.success-card {
  display: flex;

  gap: 15px;

  margin-top: 25px;

  padding: 20px;

  background: #f0fdf4;

  border: 1px solid #bbf7d0;

  border-radius: 15px;
}

.success-icon {
  width: 40px;

  height: 40px;

  background: #22c55e;

  color: white;

  border-radius: 50%;

  display: flex;

  justify-content: center;

  align-items: center;
}

.success-card h3 {
  margin: 0;

  color: #15803d;
}

.summary p {
  color: #334155;
}

/* Enrollment */

.enrollment-section {
  margin-top: 30px;
}

.section-header {
  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: 15px;
}

.section-header h3 {
  color: #1e1b4b;

  font-size: 24px;

  margin: 5px 0;
}

.credits-badge {
  background: #eef2ff;

  color: #4338ca;

  padding: 12px 18px;

  border-radius: 12px;

  text-align: center;
}

.credits-badge span {
  display: block;

  font-size: 12px;
}

.credits-badge strong {
  display: block;

  font-size: 24px;
}

/* Empty */

.no-enrollments {
  background: white;

  padding: 40px;

  text-align: center;

  border-radius: 18px;

  box-shadow:
    0 8px 25px
    rgba(0, 0, 0, 0.05);
}

.no-enrollments > div {
  font-size: 40px;
}

.no-enrollments h3 {
  color: #312e81;
}

.no-enrollments p {
  color: #64748b;
}

.browse-button {
  border: none;

  padding: 11px 20px;

  border-radius: 10px;

  background: #4f46e5;

  color: white;

  font-weight: bold;

  cursor: pointer;
}

/* Enrolled Courses */

.enrolled-list {
  display: flex;

  flex-direction: column;

  gap: 12px;
}

.enrolled-course {
  background: white;

  padding: 18px 20px;

  border-radius: 14px;

  display: flex;

  justify-content: space-between;

  align-items: center;

  box-shadow:
    0 5px 15px
    rgba(0, 0, 0, 0.05);
}

.course-info h4 {
  margin: 0;

  color: #312e81;

  font-size: 17px;
}

.course-info p {
  margin: 5px 0 0;

  color: #64748b;

  font-size: 13px;
}

.course-actions {
  display: flex;

  align-items: center;

  gap: 10px;
}

.grade {
  background: #dcfce7;

  color: #15803d;

  padding: 6px 10px;

  border-radius: 8px;

  font-weight: bold;
}

.remove-button {
  border: none;

  background: #fee2e2;

  color: #dc2626;

  padding: 7px 12px;

  border-radius: 8px;

  cursor: pointer;

  font-weight: bold;
}

/* Mobile */

@media (max-width: 600px) {

  .profile-header {
    flex-direction: column;

    align-items: flex-start;

    gap: 15px;
  }

  .section-header {
    flex-direction: column;

    align-items: flex-start;

    gap: 15px;
  }

  .enrolled-course {
    flex-direction: column;

    align-items: flex-start;

    gap: 15px;
  }

}

</style>