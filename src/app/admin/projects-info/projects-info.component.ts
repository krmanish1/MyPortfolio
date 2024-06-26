import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../cors/service/api.service';
import { DialogboxService } from '../../Dialogbox/services/dialogbox.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment.development';

interface skills {
  name: string;
  value: string;
}

@Component({
  selector: 'app-projects-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './projects-info.component.html',
  styleUrl: './projects-info.component.scss'
})
export class ProjectsInfoComponent implements OnInit {



  fileObject: File | null = null; // or some default File object
  projectInfoForm!: FormGroup;
  @ViewChild('fileInput') fileInput!: ElementRef;
  errorMSG!: string



  myskills: skills[] = [
    { name: "Angular", value: "angular" },
    { name: "JavaScript", value: "javascript" },
    { name: "HTML", value: "html" },
    { name: "CSS", value: "css" },
    { name: "Tailwind Css", value: "tailwindcss" },
    { name: "Bootstrap", value: "bootstrap" },
    { name: "Figma", value: "figma" },
    { name: "Nodejs", value: "nodejs" },
    { name: "MongoDB", value: "mongodb" },
    { name: "MongoDB", value: "mongodb" },
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
    this.projectInfoForm = this.formBuilder.group({
      projectTitle: ['', Validators.required],
      projectTags: ['', Validators.required],
      projectLink: ['', [Validators.required, this.urlValidator()]],
      shortDesription: ['', Validators.required],
      projectThumnail: ['', Validators.required],
      skills: this.formBuilder.array([]),
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


  get projectTitle() {
    return this.projectInfoForm.get('projectTitle');
  }

  get shortDesription() {
    return this.projectInfoForm.get('shortDesription');
  }

  get projectThumnail() {
    return this.projectInfoForm.get('projectThumnail');
  }

  get projectLink() {
    return this.projectInfoForm.get('projectLink');
  }

  get projectTags() {
    return this.projectInfoForm.get('projectTags');
  }




  private addCheckboxes() {
    this.myskills.forEach(() => this.skillsArray.push(new FormControl(false)));
  }

  // private addCheckboxes() {
  //   this.myinterests.forEach(() => this.interestsArray.push(new FormControl(false)));
  //   this.myhobbies.forEach(() => this.hobbiesArray.push(new FormControl(false)));
  // }

  get skillsArray() {
    return this.projectInfoForm.controls['skills'] as FormArray;
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


  submitProjectInfoData() {

    const base_url = environment.BASE_URL + "api/create-projects";
    const formData = new FormData();


    this.projectInfoForm.markAllAsTouched();

    const selectedskills = this.projectInfoForm.value.skills
      .map((checked: boolean, i: number) => checked ? this.myskills[i].value : null)
      .filter((v: string | null) => v !== null);


    // console.log('Selected interests:', selectedskills);
    // console.log('Selected hobbies:', selectedHobbies);



    if (this.projectInfoForm.valid) {
      formData.append('projectTitle', this.projectTitle?.value);
      formData.append('projectLink', this.projectLink?.value);
      formData.append('projectTags', this.projectTags?.value);

      formData.append('shortDesription', this.shortDesription?.value);

      if (this.fileObject) {
        formData.append('projectThumnail', this.fileObject);
      }


      formData.append('skills', JSON.stringify(selectedskills));


      // console.log('this.projectInfoForm.value:', this.projectInfoForm.value);
      // console.log('formData:', this.formData);

      // // Log the FormData contents
      // for (let pair of (this.formData as any).entries()) {
      //   console.log(pair[0] + ', ' + pair[1]);
      // }


      this.apiService.postCall(base_url, formData).subscribe(
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
          this.projectInfoForm.reset();
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
          this.projectInfoForm.reset();
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
      // this.projectInfoForm.reset();
    }
  }

  json(item: object) {
    return JSON.stringify(item);
  }

}
