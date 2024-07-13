import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../cors/service/api.service';
import { DialogboxService } from '../../../Dialogbox/services/dialogbox.service';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent implements OnInit {

  messageForm!: FormGroup;
  errorMSG: any;
  succesMSG: any;


  constructor(
    private apiService: ApiService,
    private confirmationDialogService: DialogboxService
  ) {

  }

  ngOnInit(): void {
    this.formControl();

  }

  // Custom validator function
  emailValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValid = emailRegex.test(control.value);
      return isValid ? null : { 'invalidFormat': true };
    };
  }

  formControl() {
    this.messageForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, this.emailValidator()]),
      message: new FormControl('', Validators.required),

    });

  }




  get name() {
    return this.messageForm.get('name');
  }

  get email() {
    return this.messageForm.get('email');
  }

  get message() {
    return this.messageForm.get('message');
  }

  submitMessage() {
    const base_url = environment.BASE_URL + "api/submit-form";
    // console.log("messageForm data:-", this.messageForm.value);
    // console.log("form validation:-", this.messageForm.valid);
    this.messageForm.markAllAsTouched();
    this.errorMSG = '';
    this.succesMSG = '';
    // Handle form submission here
    if (this.messageForm.valid) {
      this.apiService.postCall(base_url, this.messageForm.value).subscribe(
        (response) => {
          console.log("formsubmitresponse:-", response);

          this.succesMSG = response.message
        }, (error) => {

          console.log("formsubmiterror:-", error);
          this.errorMSG = error;
        }
      );
    }
  }



}
