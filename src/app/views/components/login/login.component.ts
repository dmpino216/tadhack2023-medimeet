import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ResourcesService } from '../../services/resources.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl(null),
    password: new FormControl(null)
  });

  user: User = new User();

  constructor(private resourceService: ResourcesService, private router: Router) { }

  ngOnInit() {
  }

  onLogin(){
    this.user.username = this.loginForm.controls.username.value;
    this.user.password = this.loginForm.controls.password.value;

    this.resourceService.login(this.user).toPromise().then(response =>{
      if(response){
        this.resourceService.setUser(response.usuario);
        this.router.navigate([`home-cam`]);        
      }
    }).catch(e => {
      console.log(e.error.mensaje)
    })
  }

}
