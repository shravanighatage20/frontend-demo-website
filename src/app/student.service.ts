import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'YOUR_API_GATEWAY_URL';

  constructor(private http: HttpClient) { }

  addOrUpdateStudent(student: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/students`, student);
  }

  getStudent(prn: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/students/${prn}`);
  }

  deleteStudent(prn: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/students/${prn}`);
  }
}
