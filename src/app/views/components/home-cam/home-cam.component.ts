import { Component, OnInit } from '@angular/core';
import { ScriptService } from '../../services/script.service';
import { User } from '../models/user';
import { ResourcesService } from '../../services/resources.service';

@Component({
  selector: 'app-home-cam',
  templateUrl: './home-cam.component.html',
  styleUrls: ['./home-cam.component.css']
})
export class HomeCamComponent implements OnInit {

  user: User;

  constructor(private scriptService: ScriptService, private resourceService: ResourcesService) { }

  ngOnInit() {
    this.initValues();
  }

  initValues(){
    this.scriptService.loadScript({id: 'my-script', url : 'assets/js/main.js'})
    .then(data => {
        console.log('script loaded ', data);
    }).catch(error => console.log(error));

    this.user = this.resourceService.getUser();

    this.initData();    
  }

  initData(){
    const value = this.user.username + this.generarNumeroAleatorio(9999,1000)
    document.getElementById("userIdentity").setAttribute('value',value);

    document.getElementById("callTo").setAttribute('value', '800415');
  }

  generarNumeroAleatorio(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
