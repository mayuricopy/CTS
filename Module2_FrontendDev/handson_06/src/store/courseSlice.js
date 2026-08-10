import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enrolledCourses: [],
};

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourse: (state, action) => {
      state.enrolledCourses.push(action.payload);
    },

    removeCourse: (state, action) => {
      state.enrolledCourses = state.enrolledCourses.filter(
        (course) => course.id !== action.payload
      );
    },
  },
});

export const { addCourse, removeCourse } = courseSlice.actions;

export default courseSlice.reducer;