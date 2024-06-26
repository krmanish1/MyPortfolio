import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    RouterModule // Add RouterModule to the imports array
  ],
  exports: [
    RouterModule
  ]
})
export class SharedModule { }
