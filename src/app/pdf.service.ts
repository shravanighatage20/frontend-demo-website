import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
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

  updatePdf(pdfId: string, pdfBase64: string | null, pdfName: string): Observable<any> {
    const body: any = { pdfName };
    if (pdfBase64) {
      body.pdf = pdfBase64;
    }
    return this.http.put(`${this.baseUrl}/update/${pdfId}`, body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }
}
