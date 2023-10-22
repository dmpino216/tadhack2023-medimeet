import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/components/login/login.component';
import { HomeCamComponent } from './views/components/home-cam/home-cam.component';
import { HomePageComponent } from './views/components/home-page/home-page.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: HomePageComponent},
  {path: 'home-cam', component: HomeCamComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
