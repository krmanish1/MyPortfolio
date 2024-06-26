import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment.development';
import { ApiService } from '../../cors/service/api.service';
import { DialogboxService } from '../../Dialogbox/services/dialogbox.service';

interface InterestItem {
  name: string;
  value: string;
}

@Component({
  selector: 'app-persional-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './persional-info.component.html',
  styleUrl: './persional-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersionalInfoComponent implements OnInit {

  fileObject: File | null = null; // or some default File object
  persionalInfoForm!: FormGroup;
  formData = new FormData();
  @ViewChild('fileInput') fileInput!: ElementRef;
  errorMSG!: string



  myinterests: InterestItem[] = [
    { name: "Watching Sports", value: "watching-ports" },
    { name: "Reading Books", value: "reading-ooks" },
    { name: "Stock Marketing", value: "stock-marketing" },
  ];

  myhobbies: InterestItem[] = [
    { name: "Football", value: "football" },
    { name: "Music", value: "music" },
    { name: "Movie", value: "movie" },
    { name: "Painting", value: "painting" },
    { name: "Swimming", value: "swimming" },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private confirmationDialogService: DialogboxService
  ) {

    this.formControl();
  }

  ngOnInit(): void {

  }


  formControl() {
    this.persionalInfoForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNo: ['', [Validators.required, Validators.pattern(/^[0-9]{1,10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
      SelfIntro: ['', Validators.required],
      shortBio: ['', Validators.required],
      profilePhoto: ['', Validators.required],
      githublink: ['', [Validators.required, this.urlValidator()]],
      linkedinlink: ['', [Validators.required, this.urlValidator()]],
      instalink: ['', [Validators.required, this.urlValidator()]],
      interests: this.formBuilder.array([]),
      hobbies: this.formBuilder.array([]),
    });

    this.addCheckboxes();
  }

  urlValidator() {
    return (control: AbstractControl) => {
      if (!control.value) {
        return null; // If empty, don't validate (required validator will handle empty)
      }

      // Regular expression for URL format
      const urlPattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;

      if (!urlPattern.test(control.value)) {
        return { invalidUrl: true }; // Return validation error if URL format is invalid
      }

      return null; // Return null if URL format is valid
    };
  }


  get firstName() {
    return this.persionalInfoForm.get('firstName');
  }

  get lastName() {
    return this.persionalInfoForm.get('lastName');
  }

  get phoneNo() {
    return this.persionalInfoForm.get('phoneNo');
  }

  get email() {
    return this.persionalInfoForm.get('email');
  }

  get streetAddress() {
    return this.persionalInfoForm.get('streetAddress');
  }

  get city() {
    return this.persionalInfoForm.get('city');
  }

  get state() {
    return this.persionalInfoForm.get('state');
  }

  get zipCode() {
    return this.persionalInfoForm.get('zipCode');
  }

  get SelfIntro() {
    return this.persionalInfoForm.get('SelfIntro');
  }

  get shortBio() {
    return this.persionalInfoForm.get('shortBio');
  }

  get profilePhoto() {
    return this.persionalInfoForm.get('profilePhoto');
  }

  get githublink() {
    return this.persionalInfoForm.get('githublink');
  }

  get linkedinlink() {
    return this.persionalInfoForm.get('linkedinlink');
  }

  get instalink() {
    return this.persionalInfoForm.get('instalink');
  }


  private addCheckboxes() {
    this.myinterests.forEach(() => this.interestsArray.push(new FormControl(false)));
    this.myhobbies.forEach(() => this.hobbiesArray.push(new FormControl(false)));
  }

  get interestsArray() {
    return this.persionalInfoForm.controls['interests'] as FormArray;
  }

  get hobbiesArray() {
    return this.persionalInfoForm.controls['hobbies'] as FormArray;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    const dropzone = document.getElementById('dropzone');
    if (dropzone) {
      dropzone.classList.add('border-indigo-600');
    }
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    const dropzone = document.getElementById('dropzone');
    if (dropzone) {
      dropzone.classList.remove('border-indigo-600');
    }
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const dropzone = document.getElementById('dropzone');
    if (dropzone) {
      dropzone.classList.remove('border-indigo-600');
    }
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      this.fileObject = file;
      this.displayPreview(file);
    }
  }

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target && target.files && target.files.length > 0) {
      const file = target.files[0];
      this.fileObject = file;
      // Validate file type
      const fileType = file.type;
      const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
      if (!validImageTypes.includes(fileType)) {
        alert('Invalid file type. Please select an image file (gif, jpeg, png).');
        return;
      }

      // Validate file size (e.g., 10MB)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        alert('File size exceeds 10MB. Please select a smaller file.');
        return;
      }
      this.displayPreview(file);
    }
  }

  displayPreview(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const preview = document.getElementById('preview') as HTMLImageElement;
      if (preview) {
        preview.src = reader.result as string;
        preview.classList.remove('hidden');
      } else {
        console.error('Element with ID "preview" not found.');
      }
    };
  }


  submitPersonalInfoData() {

    const base_url = environment.BASE_URL + "api/create-profiles";

    this.persionalInfoForm.markAllAsTouched();

    const selectedInterests = this.persionalInfoForm.value.interests
      .map((checked: boolean, i: number) => checked ? this.myinterests[i].value : null)
      .filter((v: string | null) => v !== null);
    const selectedHobbies = this.persionalInfoForm.value.hobbies
      .map((checked: boolean, i: number) => checked ? this.myhobbies[i].value : null)
      .filter((v: string | null) => v !== null);

    // console.log('Selected interests:', selectedInterests);
    // console.log('Selected hobbies:', selectedHobbies);

    var address: any = {
      'streetAddress': this.streetAddress?.value,
      'city': this.city?.value,
      'state': this.state?.value,
      'ZIPcode': this.zipCode?.value,
    }

    var socialLinks: any = {
      'githublink': this.githublink?.value,
      'linkedinlink': this.linkedinlink?.value,
      'instalink': this.instalink?.value
    }

    if (this.persionalInfoForm.valid) {
      this.formData.append('firstName', this.firstName?.value);
      this.formData.append('lastName', this.lastName?.value);
      this.formData.append('phoneNo', this.phoneNo?.value);
      this.formData.append('email', this.email?.value);
      this.formData.append('address', JSON.stringify(address));
      this.formData.append('SelfIntro', this.SelfIntro?.value);
      this.formData.append('shortBio', this.shortBio?.value);

      if (this.fileObject) {
        this.formData.append('profilePhoto', this.fileObject);
      }


      this.formData.append('socialLinks', JSON.stringify(socialLinks));
      this.formData.append('interests', JSON.stringify(selectedInterests));
      this.formData.append('hobbies', JSON.stringify(selectedHobbies));


      // console.log('this.persionalInfoForm.value:', this.persionalInfoForm.value);
      // console.log('formData:', this.formData);

      // // Log the FormData contents
      // for (let pair of (this.formData as any).entries()) {
      //   console.log(pair[0] + ', ' + pair[1]);
      // }


      this.apiService.postCall(base_url, this.formData).subscribe(
        (response) => {
          this.confirmationDialogService.confirm('Success',
            response.message,
            'OK',
            'Cancel',
            'sm',
            'success')
            .then(async (confirmed) => {
              if (confirmed) {

              }
              console.log('User confirmed:', confirmed)
            }
            )
            .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
          this.persionalInfoForm.reset();
        }, (error) => {
          console.log(error);
          this.errorMSG = error;
          this.confirmationDialogService.confirm('error',
            error,
            'OK',
            'Cancel',
            'sm',
            'error')
            .then(async (confirmed) => {
              if (confirmed) {

              }
              console.log('User confirmed:', confirmed)
            }
            )
            .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
          this.persionalInfoForm.reset();
        }
      );
    } else {
      this.confirmationDialogService.confirm('error',
        "Fill All the required field......Form is not valid!!!",
        'OK',
        'Cancel',
        'sm',
        'error')
        .then(async (confirmed) => {
          if (confirmed) {

          }
          console.log('User confirmed:', confirmed)
        }
        )
        .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
      // this.persionalInfoForm.reset();
    }
  }

  json(item: object) {
    return JSON.stringify(item);
  }

}
