import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../components/models/user';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {

  private API_BACK = 'https://demochat-vhu4.onrender.com/api/v2';

  constructor(private http: HttpClient) { }

  public login(user: User): Observable<any>{    
    return this.http.post(`${this.API_BACK}/demochat/login`, user);
  }

  public userActive(): Observable<any>{    
    return this.http.get(`${this.API_BACK}/demochat/active-session`);
  }

  public setUser(user: User){
    localStorage.setItem("userLogged", JSON.stringify(user));
  }

  public getUser(): User {
    if (localStorage.getItem('userLogged') !== null) {
      let user = localStorage.getItem('userLogged');
      user == null ? user = '' : user;
      return JSON.parse(user);
    }else{
      return null;
    }
  }

}
