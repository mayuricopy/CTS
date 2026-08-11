import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './student-profile.html',
  styleUrl: './student-profile.css'
})
export class StudentProfile {

  submitted = false;

  profileForm = new FormGroup({
    name: new FormControl('', Validators.required),

    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),

    semester: new FormControl(1, [
      Validators.required,
      Validators.min(1),
      Validators.max(8)
    ])
  });

  onSubmit() {
    if (this.profileForm.valid) {
      this.submitted = true;

      console.log('Profile:', this.profileForm.value);
    } else {
      this.submitted = false;

      this.profileForm.markAllAsTouched();
    }
  }
}