import { Routes } from '@angular/router';
import { StudentList } from './student-list/student-list';
import { StudentProfile } from './student-profile/student-profile';

export const routes: Routes = [
  {
    path: '',
    component: StudentList
  },
  {
    path: 'profile',
    component: StudentProfile
  }
];