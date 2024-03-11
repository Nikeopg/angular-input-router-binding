import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from './models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  #http = inject(HttpClient);

  users$ = this.#http.get<User[]>(`https://jsonplaceholder.typicode.com/users`);

  profile(id: string | number) {
    return this.#http.get<User>(`https://jsonplaceholder.typicode.com/users/${id}`);
  }
}
