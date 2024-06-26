import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../../cors/service/api.service';
import { DialogboxService } from '../../../Dialogbox/services/dialogbox.service';
import { environment } from '../../../../environments/environment.development';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects-section.component.html',
  styleUrl: './projects-section.component.scss'
})
export class ProjectsSectionComponent implements OnInit {

  projectData: any[] = [];
  constructor(
    private apiService: ApiService,
    private confirmationDialogService: DialogboxService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getProject();
  }

  async getProject() {

    const base_url = environment.BASE_URL + "api/get-projects";
    try {
      const response = await this.apiService.getCall(base_url).toPromise();
      this.projectData = response;
      console.log(" this.projectData:-", this.projectData);

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


  getprojectImageUrl(imagePath: string): string {
    // return `https://modmind-server.onrender.com/${imagePath}`;
    // Replace backslashes with forward slashes
    let formattedPath = imagePath.replace(/\\/g, '/');
    // Encode the path if necessary
    formattedPath = encodeURIComponent(formattedPath);
    // return formattedPath;
    return `http://localhost:3000/${imagePath}`;
  }


  navigateToProject(projectId: string): void {
    console.log("blog clicked");
    console.log("_id", projectId);

    this.router.navigate(['/get-projects-details', projectId]);
  }

}

