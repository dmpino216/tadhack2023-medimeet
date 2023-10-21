import { Component, OnInit } from '@angular/core';
import { ScriptService } from '../../services/script.service';

@Component({
  selector: 'app-home-cam',
  templateUrl: './home-cam.component.html',
  styleUrls: ['./home-cam.component.css']
})
export class HomeCamComponent implements OnInit {

  constructor(private scriptService: ScriptService) { }

  ngOnInit() {
    this.scriptService.loadScript({id: 'my-script', url : 'assets/js/main.js'})
    .then(data => {
        console.log('script loaded ', data);
    }).catch(error => console.log(error));
  }
}
