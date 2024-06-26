import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../cors/service/api.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment.development';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects-details-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects-details-page.component.html',
  styleUrl: './projects-details-page.component.scss'
})
export class ProjectsDetailsPageComponent implements OnInit {


  projectResponse: any;

  // Inside your BlogComponent class
  constructor(private route: ActivatedRoute, private apiService: ApiService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    const projectID = this.route.snapshot.paramMap.get('id');
    console.log("projectID", projectID);

    if (projectID) {
      this.fetchProjectDetails(projectID);
    }
  }
  public base_url = environment.BASE_URL + "api/get-projects-details";


  async fetchProjectDetails(projectID: string) {

    const getUrl = `${this.base_url}/${projectID}`;
    try {
      // const response = await this.apiService.getCall(this.base_url).toPromise();
      const response = await firstValueFrom(this.apiService.getCall(getUrl));
      console.log("Response:", response.data);
      this.projectResponse = response.data
    } catch (error) {
      console.log("Error:", error);
    }
  }


  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  // Inside your BlogComponent class
  get backgroundImageUrl(): string {
    // Assuming blogResponse.data.uploadeImage contains the path to the image
    // and you have a base URL defined somewhere in your environment or component
    let formattedPath = this.projectResponse?.projectThumnail.replace(/\\/g, '/');
    // Encode the path if necessary
    // formattedPath = encodeURIComponent(formattedPath);
    const baseUrl = 'http://localhost:3000/';
    // const baseUrl = 'https://modmind-server.onrender.com/';
    return `url(${baseUrl}${formattedPath})`;
  }


}

