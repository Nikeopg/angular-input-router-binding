import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [JsonPipe, AsyncPipe],
  template: `
    <h1>User Profile</h1>
    <p>User - {{ user$ | async| json}}</p>
  `
})
export class UserProfileComponent {
  #activatedRoute = inject(ActivatedRoute);
  id$ = this.#activatedRoute.params.pipe(
    map(params => params['id'])
  );

  #user = inject(UserService);

  user$ = this.id$.pipe(
    switchMap(id => this.#user.profile(id))
  );
}
