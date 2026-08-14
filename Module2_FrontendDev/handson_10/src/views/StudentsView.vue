<script setup>
import { onMounted, reactive } from "vue";
import { storeToRefs } from "pinia";
import { useStudentStore } from "../stores/studentStore";

const studentStore = useStudentStore();

const {
    students,
    loading,
    error,
    studentCount,
    selectedStudentName
} = storeToRefs(studentStore);

const newStudent = reactive({
    name: "",
    username: "",
    email: ""
});

onMounted(() => {
    studentStore.fetchStudents();
});

function selectStudent(student) {
    studentStore.selectStudent(student);
}

async function addStudent() {
    if (!newStudent.name || !newStudent.username || !newStudent.email) {
        return;
    }

    const student = await studentStore.addStudent({
        name: newStudent.name,
        username: newStudent.username,
        email: newStudent.email
    });

    if (student) {
        newStudent.name = "";
        newStudent.username = "";
        newStudent.email = "";
    }
}
</script>

<template>
    <main class="students-page">

        <h1>Student Portal</h1>

        <p>
            <strong>Total Students:</strong>
            {{ studentCount }}
        </p>

        <p>
            <strong>Selected Student:</strong>
            {{ selectedStudentName }}
        </p>

        <!-- ADD STUDENT FORM -->
        <section class="add-student">
            <h2>Add Student</h2>

            <form @submit.prevent="addStudent">

                <label for="student-name">Name</label>
                <input
                    id="student-name"
                    v-model="newStudent.name"
                    type="text"
                    required
                >

                <label for="student-username">Username</label>
                <input
                    id="student-username"
                    v-model="newStudent.username"
                    type="text"
                    required
                >

                <label for="student-email">Email</label>
                <input
                    id="student-email"
                    v-model="newStudent.email"
                    type="email"
                    required
                >

                <button
                    type="submit"
                    :disabled="loading"
                >
                    {{ loading ? "Adding..." : "Add Student" }}
                </button>

            </form>
        </section>

        <p v-if="loading">
            Loading students...
        </p>

        <p v-if="error" class="error">
            {{ error }}
        </p>

        <!-- STUDENT LIST -->
        <section v-if="!loading && !error">

            <h2>Students</h2>

            <article
                v-for="student in students"
                :key="student.id"
                class="student-card"
                @click="selectStudent(student)"
            >
                <h3>{{ student.name }}</h3>

                <p>
                    <strong>Username:</strong>
                    {{ student.username }}
                </p>

                <p>
                    <strong>Email:</strong>
                    {{ student.email }}
                </p>

                <p>
                    <strong>Phone:</strong>
                    {{ student.phone || "Not available" }}
                </p>

                <button
                    type="button"
                    @click.stop="selectStudent(student)"
                >
                    Select Student
                </button>

            </article>

        </section>

    </main>
</template>

<style scoped>

.students-page {
    max-width: 900px;
    margin: 0 auto;
    padding: 30px;
}

.add-student {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    margin: 20px 0;
}

.add-student form {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.add-student input {
    padding: 8px;
    max-width: 400px;
}

.student-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    margin: 15px 0;
    cursor: pointer;
}

.student-card:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

button {
    padding: 8px 14px;
    cursor: pointer;
    width: fit-content;
}

.error {
    color: #c62828;
}

</style>