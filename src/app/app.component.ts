import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
  <a routerLink="/1">User ID - 1</a>
  <a routerLink="/2">User ID - 2</a>
    <router-outlet />
  `,
})
export class AppComponent {}
