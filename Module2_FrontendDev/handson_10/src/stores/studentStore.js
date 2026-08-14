import { defineStore } from "pinia";
import api from "../services/api";

export const useStudentStore = defineStore("students", {
    state: () => ({
        students: [],
        selectedStudent: null,
        loading: false,
        error: null
    }),

    getters: {
        studentCount: (state) => state.students.length,

        selectedStudentName: (state) =>
            state.selectedStudent
                ? state.selectedStudent.name
                : "No student selected"
    },

    actions: {
        async fetchStudents() {
            this.loading = true;
            this.error = null;

            try {
                const response = await api.get("/users");
                this.students = response.data;
            } catch (error) {
                this.error = "Failed to fetch students.";
                console.error(error);
            } finally {
                this.loading = false;
            }
        },

        selectStudent(student) {
            this.selectedStudent = student;
        },
        async addStudent(studentData) {
    this.loading = true;
    this.error = null;

    try {
        const response = await api.post("/users", studentData);

        // JSONPlaceholder returns the newly created object.
        this.students.push(response.data);

        return response.data;
    } catch (error) {
        this.error = "Failed to add student.";
        console.error(error);

        return null;
    } finally {
        this.loading = false;
    }
}
    }
});