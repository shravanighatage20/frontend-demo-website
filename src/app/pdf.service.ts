import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  private baseUrl = 'https://qi2gp0txsa.execute-api.ca-central-1.amazonaws.com/production/shravani-serverless-s3-dynamo-lambda';

  constructor(private http: HttpClient) {}

  uploadPdf(pdf: string, pdfName: string): Observable<any> {
    const body = { pdf, pdfName };
    return this.http.post(`${this.baseUrl}`, body);
  }

  getPdf(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  deletePdf(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  updatePdf(id: string, pdf: string, pdfName: string): Observable<any> {
    const body = { pdf, pdfName };
    return this.http.put(`${this.baseUrl}/${id}`, body);
  }
}
