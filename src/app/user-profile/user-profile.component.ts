import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { AsyncPipe } from '@angular/common';
import { map, switchMap } from 'rxjs';
import { DataTableComponent } from '../data-table/data-table.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [AsyncPipe, DataTableComponent],
  template: `
    <main>
      @if (profile$ | async; as profile) {
        <h1>{{profile.name}}</h1>
        <app-data-table [data]="profile" />
      }
    </main>
  `
})
export class UserProfileComponent {
  #activatedRoute = inject(ActivatedRoute);
  #user = inject(UserService);

  userId$ = this.#activatedRoute.params.pipe(
    map(params => params['userId'])
  );

  profile$ = this.userId$.pipe(
    switchMap(id => this.#user.profile(id))
  );
}
