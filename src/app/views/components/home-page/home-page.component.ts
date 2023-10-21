import { Component } from '@angular/core';
import { ScriptService } from '../../services/script.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  constructor(private scriptService: ScriptService) { }

  ngOnInit() {
    this.scriptService.loadScript({id: 'my-script2', url : 'assets/js/header.js'})
    .then(data => {
        console.log('script loaded ', data);
    }).catch(error => console.log(error));
  }
}
