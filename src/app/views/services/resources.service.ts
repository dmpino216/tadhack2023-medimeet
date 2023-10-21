import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {

  private API_BACK = 'https://demochat-vhu4.onrender.com/api/v2';

  constructor(private http: HttpClient) { }

  public login(): Observable<any>{    
    return this.http.get(this.API_BACK);
  }

}
