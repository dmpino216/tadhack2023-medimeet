import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ScriptService } from '../../services/script.service';
import { User } from '../models/user';
import { ResourcesService } from '../../services/resources.service';

@Component({
  selector: 'app-home-cam',
  templateUrl: './home-cam.component.html',
  styleUrls: ['./home-cam.component.css']
})
export class HomeCamComponent implements OnInit, AfterViewInit {

  user: User;
  horaActual: string;

  constructor(private scriptService: ScriptService, private resourceService: ResourcesService) { }

  ngAfterViewInit(): void {
  }

  ngOnInit() {
    this.initValues();
    this.obtenerHoraSistema();
    this.resourceService.reload();    
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
    document.getElementById("userIdentity").setAttribute('value', value);

    document.getElementById("callTo").setAttribute('value', '800145');    
  }

  generarNumeroAleatorio(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  obtenerHoraSistema() {
    const ahora = new Date();
    this.horaActual = ahora.toLocaleTimeString();
    // Actualiza la hora cada segundo (opcional)
    setInterval(() => {
      const nuevaHora = new Date();
      this.horaActual = nuevaHora.toLocaleTimeString();
    }, 1000);
  }
}
