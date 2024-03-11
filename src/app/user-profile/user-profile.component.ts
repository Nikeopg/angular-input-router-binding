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
    <main>
      @if (profile$ | async; as user) {
        <h1>{{user.name}}</h1>
        <ul class="user-data">
          <li>
            <span class="key">ID:</span>
            <span class="value">{{user.id}}</span>
          </li>
          <li>
            <span class="key">Email:</span> 
            <span class="value">{{user.email}}</span>
          </li>
          <li>
            <span class="key">Address:</span> 
            <span class="value">
              {{user.address.zipcode}},
              {{user.address.city}},
              {{user.address.street}},
              {{user.address.suite}}
            </span>
          </li>
        </ul>
      }
    </main>
  `
})
export class UserProfileComponent {
  #activatedRoute = inject(ActivatedRoute);
  userId$ = this.#activatedRoute.params.pipe(
    map(params => params['userId'])
  );

  #user = inject(UserService);

  profile$ = this.userId$.pipe(
    switchMap(id => this.#user.profile(id))
  );
}
