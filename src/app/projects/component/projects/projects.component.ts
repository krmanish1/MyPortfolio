import { Component } from '@angular/core';
import { DevelopmentResumeComponent } from "../../../development-resume/development-resume.component";

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [DevelopmentResumeComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {

}
