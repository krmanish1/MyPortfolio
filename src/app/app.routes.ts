import { RouterModule, Routes } from '@angular/router';
import { PagenotfoundComponent } from './shared/components/pagenotfound/pagenotfound.component';
import { LandingPageComponent } from './landing-page/components/landing-page.component';
import { AboutComponent } from './about/component/about/about.component';
import { ProjectsComponent } from './projects/component/projects/projects.component';
import { AdminModule } from './admin/admin.module';
import { NgModule } from '@angular/core';
import { ProjectsDetailsPageComponent } from './landing-page/components/projects-details-page/projects-details-page.component';

export const routes: Routes = [
    { path: "", redirectTo: 'hello', pathMatch: "full" },
    { path: "hello", component: LandingPageComponent },
    { path: "about", component: AboutComponent },
    { path: "projects", component: ProjectsComponent },
    { path: "get-projects-details/:id", component: ProjectsDetailsPageComponent },

    { path: "updation-portal", loadChildren: () => import('./admin/admin.module').then(m => AdminModule) },

    //!page not found
    { path: '**', component: PagenotfoundComponent }
];
