import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  private url: string = environment.api_endpoint;

  constructor(private http: HttpClient) { }

  login(email: string, password: string):Observable<any>{
    return this.http.post<any>(`${this.url}/users/authenticate`, {email, password})
  }
}
