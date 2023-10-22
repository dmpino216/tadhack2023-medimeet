import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeCamComponent } from './home-cam.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HomeCamComponent],
  exports: [ HomeCamComponent ]
})
export class HomeCamModule { }
