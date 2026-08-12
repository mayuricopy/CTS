<script setup>
defineProps({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  credits: {
    type: Number,
    required: true
  },
  grade: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="course-card">
    <h3>{{ name }}</h3>

    <p class="course-code">{{ code }}</p>

    <div class="course-info">
      <div>
        <span>Credits</span>
        <strong>{{ credits }}</strong>
      </div>

      <div>
        <span>Grade</span>
        <strong>{{ grade }}</strong>
      </div>
    </div>
  </div>
</template>

<style scoped>
.course-card {
  background: white;
  padding: 20px;
  border-radius: 15px;
  border: 1px solid #e0e7ff;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
}

.course-card h3 {
  margin: 0 0 8px;
  color: #312e81;
}

.course-code {
  color: #6366f1;
  font-weight: bold;
}

.course-info {
  display: flex;
  gap: 30px;
  margin-top: 15px;
}

.course-info span {
  display: block;
  font-size: 12px;
  color: #64748b;
}

.course-info strong {
  color: #1e293b;
}
</style>