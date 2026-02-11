import { Component, signal, viewChildren, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvPage } from "../cv-page/cv-page";

@Component({
  selector: 'app-cv-builder',
  standalone: true,
  imports: [CommonModule, CvPage],
  templateUrl: './cv-builder.html',
  styleUrl: './cv-builder.css'
})
export class CvBuilder {
  // UI State
  accentColor = signal<string>('#3b82f6'); // Default Tailwind Blue
  isEditMode = signal<boolean>(true);
  
  // Page State: An array of IDs to track how many pages exist
  pages = signal<{ id: number }[]>([{ id: Date.now() }]);

  addPage() {
    this.pages.update(p => [...p, { id: Date.now() }]);
  }

  removePage(id: number) {
    if (this.pages().length > 1) {
      this.pages.update(p => p.filter(page => page.id !== id));
    }
  }

  downloadPdf() {
    // window.print() is the most reliable way to bundle A4 divs into a multi-page PDF
    // with CSS @page rules handling the breaks.
    window.print();
  }
}