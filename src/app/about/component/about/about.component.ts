import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../cors/service/api.service';
import { DialogboxService } from '../../../Dialogbox/services/dialogbox.service';
import { environment } from '../../../../environments/environment.development';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {


  aboutme: any;
  callSource: string = "landingapage";
  constructor(
    private apiService: ApiService,
    private confirmationDialogService: DialogboxService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.getProfile();
  }

  async getProfile() {

    const base_url = environment.BASE_URL + "api/get-profile";
    try {
      const response = await this.apiService.getCall(base_url).toPromise();
      this.aboutme = response[0];
      console.log("this.aboutme:-", this.aboutme);

    } catch (error: any) {
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
    }
  }

  parseHTML(value: string) {

    return this.sanitizer.bypassSecurityTrustHtml(value);

  }

  getImageUrl(imagePath: string): string {
    return `https://myportfolio-server-ztte.onrender.com/${imagePath}`;
    // return `http://localhost:3000/${imagePath}`;
  }

}
