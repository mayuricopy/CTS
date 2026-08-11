import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  getCourses() {
    return [
      {
        name: 'Angular Fundamentals',
        code: 'ANG101',
        credits: 4,
        grade: 'A'
      },
      {
        name: 'React Development',
        code: 'REACT201',
        credits: 3,
        grade: 'A+'
      },
      {
        name: 'Database Management',
        code: 'DB301',
        credits: 4,
        grade: 'B+'
      }
    ];
  }

  getFromApi() {
    return this.http.get(this.apiUrl);
  }
}