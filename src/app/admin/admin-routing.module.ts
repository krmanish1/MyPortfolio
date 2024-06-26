import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersionalInfoComponent } from './persional-info/persional-info.component';
import { ProjectsInfoComponent } from './projects-info/projects-info.component';
import { CertificationsComponent } from './certifications/certifications.component';
import { SkillsInfoComponent } from './skills-info/skills-info.component';
import { AdminComponent } from './admin.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'personal-info',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'personal-info',
        component: PersionalInfoComponent,

      },
      {
        path: 'projects-info',
        component: ProjectsInfoComponent
      },
      {
        path: 'skill-info',
        component: SkillsInfoComponent
      },
      {
        path: 'certificate-info',
        component: CertificationsComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
