import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IDocument } from '../models/document';

@Injectable({
  providedIn: 'root'
})

export class DocumentService {

  private url: string = environment.api_endpoint;

  constructor(private http: HttpClient) { }

  insert(document: IDocument): Observable<any>{
    return this.http.post<IDocument>(`${this.url}/documents`, document);
  }

  getAll(document: IDocument): Observable<IDocument[]>{
    return this.http.get<IDocument[]>(`${this.url}/documents`);
  }

}
