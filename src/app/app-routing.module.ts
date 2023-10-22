import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/components/login/login.component';
import { HomeCamComponent } from './views/components/home-cam/home-cam.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'home-cam', component: HomeCamComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
