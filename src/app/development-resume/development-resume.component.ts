import { Component, ElementRef, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas'; // Add this line

// import * as html2pdf from 'html2pdf.js';


declare var html2pdf: any;


@Component({
  selector: 'app-development-resume',
  standalone: true,
  imports: [],
  templateUrl: './development-resume.component.html',
  styleUrl: './development-resume.component.scss'
})
export class DevelopmentResumeComponent {

  @ViewChild('dataToExport', { static: false }) public dataToExport!: ElementRef;



  pdfName = 'Manish-kumar-fullstack-developer.pdf';

  public downloadAsPdf(): void {
    let nbPages = 2; // Example: Set the number of pages manually
    const element = document.getElementById('contentToConvert');
    const opt = {

      margin: [20, 10, 50, 10], // top, left, bottom, right margins in points
      // margin: 1,
      filename: this.pdfName,
      image: { type: 'jpeg', quality: 0.98 },
      // html2canvas: { scale: 2 },
      html2canvas: {
        dpi: 192,
        letterRendering: true,
        width: 800,
        // height: 1448 * nbPages
      },

      jsPDF: {
        unit: 'pt',
        format: 'a4', // A4 size
        orientation: 'portrait',
        pagebreak: {
          before: function (currentPage: number, totalPages: number) {
            if (currentPage > 1) {
              return {
                margin: [8, 0, 0, 0] // top, right, bottom, left
              };
            } else {
              return {
                margin: [0, 0, 8, 0] // top, right, bottom, left
              };
            }
          }
        }
      }
    };

    html2pdf().from(element).set(opt).save();
  }
  // public downloadAsPdf(): void {
  //   let nbPages = 2; // Example: Set the number of pages manually
  //   const element = document.getElementById('contentToConvert');
  //   const opt = {

  //     margin: [20, 10, 20, 10], // top, left, bottom, right margins in points
  //     filename: this.pdfName,
  //     image: { type: 'jpeg', quality: 0.98 },
  //     // html2canvas: { scale: 2 },
  //     html2canvas: {
  //       dpi: 192,
  //       letterRendering: true,
  //       width: 800,
  //       height: 1448 * nbPages
  //     },

  //     jsPDF: {
  //       unit: 'pt',
  //       format: 'a4', // A4 size
  //       orientation: 'portrait',
  //       pagebreak: {
  //         before: function (currentPage: number, totalPages: number) {
  //           if (currentPage > 1) {
  //             return {
  //               margin: [8, 0, 0, 0] // top, right, bottom, left
  //             };
  //           } else {
  //             return {
  //               margin: [0, 0, 8, 0] // top, right, bottom, left
  //             };
  //           }
  //         }
  //       }
  //     }
  //   };

  //   html2pdf().from(element).set(opt).save();
  // }




}
