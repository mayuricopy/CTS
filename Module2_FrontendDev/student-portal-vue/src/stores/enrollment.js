import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useEnrollmentStore = defineStore('enrollment', () => {
  const enrolledCourses = ref([])

  const totalCredits = computed(() => {
    return enrolledCourses.value.reduce(
      (total, course) => total + course.credits,
      0
    )
  })

  function enrollCourse(course) {
    const alreadyEnrolled = enrolledCourses.value.some(
      item => item.code === course.code
    )

    if (!alreadyEnrolled) {
      enrolledCourses.value.push(course)
    }
  }

  function unenrollCourse(code) {
    enrolledCourses.value = enrolledCourses.value.filter(
      course => course.code !== code
    )
  }

  function isEnrolled(code) {
    return enrolledCourses.value.some(
      course => course.code === code
    )
  }

  return {
    enrolledCourses,
    totalCredits,
    enrollCourse,
    unenrollCourse,
    isEnrolled
  }
})