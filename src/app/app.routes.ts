import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { NotFoundComponent } from '../pages/not-found/not-found.component';
import { ProjectsComponent } from '../pages/projects/projects.component';
import { ProjectDetailComponent } from '../pages/project-details/project-details.component';
import { AboutComponent } from '../pages/about-us/about-us.component';
import { ContactComponent } from '../pages/contact/contact.component';
import { SubmitProjectComponent } from '../pages/submit-project/submit-project.component';

export const routes: Routes = [
  { path: 'projects', component: ProjectsComponent },
  { path: 'projects/:id', component: ProjectDetailComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'submit-project', component: SubmitProjectComponent },
  { path: '', component: HomeComponent }, // Default route
  { path: '**', component: NotFoundComponent }, // Wildcard route for 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
