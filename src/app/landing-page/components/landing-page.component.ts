import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { HomeComponent } from "./home/home.component";
import { RouterModule, RouterOutlet } from '@angular/router';
import { ProjectsSectionComponent } from "./projects-section/projects-section.component";
import { SkillsSectionComponent } from "./skills-section/skills-section.component";
import { AboutmeSectionComponent } from "./aboutme-section/aboutme-section.component";
import { ContactFormComponent } from "./contact-form/contact-form.component";
import { FooterComponent } from "./footer/footer.component";
import { ApiService } from '../../cors/service/api.service';
import { environment } from '../../../environments/environment.development';
import { DialogboxService } from '../../Dialogbox/services/dialogbox.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  imports: [SharedModule, NavbarComponent, HomeComponent, RouterModule, RouterOutlet, SkillsSectionComponent, AboutmeSectionComponent, ContactFormComponent, FooterComponent]
})
export class LandingPageComponent implements OnInit {

  profileData: any[] = [];
  callSource: string = "landingapage";
  constructor(
    private apiService: ApiService,
    private confirmationDialogService: DialogboxService
  ) { }

  ngOnInit(): void {
    this.getProfile();
  }

  async getProfile() {

    const base_url = environment.BASE_URL + "api/get-profile";
    try {
      const response = await this.apiService.getCall(base_url).toPromise();
      this.profileData = response[0];
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

}
