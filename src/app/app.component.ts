import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from './user.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, AsyncPipe],
  template: `
    <section class="header">
      <img width="120" src="./assets/logo-01.png" />
    </section>
    <section class="user-list">
      @for (user of users$ | async; track user.id) {
        <a [routerLink]="[user.id]" class="profile-link">{{ user.name }}</a>
      }
    </section>
    <router-outlet />
  `,
})
export class AppComponent {
  users$ = inject(UserService).users$;
}
