import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ListUsersResponse } from '../interfaces/interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private _http: HttpClient
  ) { }

  private API_URL: string = "https://reqres.in/api/users"

  listUsers(url: string): Observable<ListUsersResponse> {
    return this._http.get<ListUsersResponse>(`${this.API_URL}` + url);
  }

  addUser(form: FormData): Observable<any> {
    return this._http.post<any>(`${this.API_URL}`, form);
  }
}
