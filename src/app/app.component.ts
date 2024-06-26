import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PdfService } from './pdf.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,  
    HttpClientModule,
    FormsModule,
    CommonModule
  ],
  providers: [PdfService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedFile: File | null = null;
  pdfId: string = '';
  pdfUrl: string | null = null;
  
  constructor(private pdfService: PdfService) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadPdf(): void {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const pdfBase64 = (reader.result as string).split(',')[1];
        const pdfName = this.selectedFile?.name || 'untitled.pdf';

        this.pdfService.uploadPdf(pdfBase64, pdfName).subscribe(
          (response) => {
            console.log('Upload successful:', response);
          },
          (error) => {
            console.error('Upload failed:', error);
          }
        );
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  updatePdf(): void {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const pdfBase64 = (reader.result as string).split(',')[1];
        const pdfName = this.selectedFile?.name || 'untitled.pdf';

        this.pdfService.updatePdf(this.pdfId, pdfBase64, pdfName).subscribe(
          (response) => {
            console.log('Update successful:', response);
          },
          (error) => {
            console.error('Update failed:', error);
          }
        );
      };
      reader.readAsDataURL(this.selectedFile);
    } else {
      console.error('No file selected for update');
    }
  }

  deletePdf(): void {
    if (this.pdfId) {
      this.pdfService.deletePdf(this.pdfId).subscribe(
        (response) => {
          console.log('Delete successful:', response);
        },
        (error) => {
          console.error('Delete failed:', error);
        }
      );
    } else {
      console.error('PDF ID is required for delete operation');
    }
  }

  getPdf(): void {
    if (this.pdfId) {
      this.pdfService.getPdf(this.pdfId).subscribe(
        (response) => {
          console.log('Fetch successful:', response);
          this.pdfUrl = response.url;
        },
        (error) => {
          console.error('Fetch failed:', error);
        }
      );
    } else {
      console.error('PDF ID is required for fetch operation');
    }
  }
}
