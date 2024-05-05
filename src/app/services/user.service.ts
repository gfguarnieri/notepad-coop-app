import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url: string = environment.api_endpoint;

  constructor(private http: HttpClient) { }

  insert(user: IUser):Observable<void>{
    return this.http.post<void>(`${this.url}/users/`, user)
  }
}
