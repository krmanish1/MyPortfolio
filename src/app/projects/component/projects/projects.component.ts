import { Component } from '@angular/core';
import { DevelopmentResumeComponent } from "../../../development-resume/development-resume.component";
import { ProjectsSectionComponent } from "../../../landing-page/components/projects-section/projects-section.component";

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [DevelopmentResumeComponent, ProjectsSectionComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {

}
