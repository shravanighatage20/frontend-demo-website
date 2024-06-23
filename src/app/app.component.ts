import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StudentService } from './student.service';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,  
    HttpClientModule
  ],
  providers: [StudentService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  studentForm: FormGroup;
  operationForm: FormGroup;
  selectedStudent: any;

  constructor(private fb: FormBuilder, private studentService: StudentService) {
    this.studentForm = this.fb.group({
      prn: [''],
      name: [''],
      age: [''],
      class: ['']
    });

    this.operationForm = this.fb.group({
      prnForOperation: ['']
    });
  }

  ngOnInit(): void {}

  addOrUpdateStudent() {
    this.studentService.addOrUpdateStudent(this.studentForm.value).subscribe(response => {
      alert('Student information saved successfully.');
      this.studentForm.reset();
    }, error => {
      alert('Error saving student information.');
    });
  }

  getStudent() {
    const prn = this.operationForm.get('prnForOperation')?.value;
    this.studentService.getStudent(prn).subscribe(response => {
      this.selectedStudent = response;
    }, error => {
      alert('Error fetching student information.');
    });
  }

  deleteStudent() {
    const prn = this.operationForm.get('prnForOperation')?.value;
    this.studentService.deleteStudent(prn).subscribe(response => {
      alert('Student deleted successfully.');
      this.selectedStudent = null;
    }, error => {
      alert('Error deleting student information.');
    });
  }
}
