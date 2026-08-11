import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CourseCard } from '../course-card/course-card';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CourseCard, FormsModule],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css'
})
export class StudentList {

  searchText = '';

  courses: any[] = [];

  apiData: any[] = [];
  displayData: any[] = [];

  loading = false;
  errorMessage = '';

  constructor(
    private courseService: CourseService,
    private cdr: ChangeDetectorRef
  ) {
    this.courses = this.courseService.getCourses();
  }

  loadApiData() {

    this.loading = true;
    this.errorMessage = '';

    this.courseService.getFromApi().subscribe({
      
      next: (data: any) => {

        console.log('API Data:', data);

        this.apiData = data;
        this.displayData = data.slice(0, 5);

        console.log('First 5 records:', this.displayData);

        this.loading = false;

        // Force Angular to update the page
        this.cdr.detectChanges();
      },

      error: (error) => {

        console.error('API Error:', error);

        this.errorMessage = 'Failed to load API data.';
        this.loading = false;

        this.cdr.detectChanges();
      }
    });
  }

  get filteredCourses() {

    return this.courses.filter(course =>
      course.name
        .toLowerCase()
        .includes(this.searchText.toLowerCase())
    );

  }
}