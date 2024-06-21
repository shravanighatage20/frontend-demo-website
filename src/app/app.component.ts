import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StudentService } from './student.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  student = { prn: '', name: '', age: 0, class: '' };
  prnForOperation = '';
  selectedStudent: any;

  constructor(private studentService: StudentService) { }

  addOrUpdateStudent() {
    this.studentService.addOrUpdateStudent(this.student).subscribe(response => {
      alert('Student information saved successfully.');
      this.student = { prn: '', name: '', age: 0, class: '' };
    }, error => {
      alert('Error saving student information.');
    });
  }

  getStudent() {
    this.studentService.getStudent(this.prnForOperation).subscribe(response => {
      this.selectedStudent = response;
    }, error => {
      alert('Error fetching student information.');
    });
  }

  deleteStudent() {
    this.studentService.deleteStudent(this.prnForOperation).subscribe(response => {
      alert('Student deleted successfully.');
      this.selectedStudent = null;
    }, error => {
      alert('Error deleting student information.');
    });
  }
}
