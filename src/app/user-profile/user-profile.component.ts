import { Component, inject, input } from '@angular/core'; 
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { UserService } from '../user.service';
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
  #user = inject(UserService);

  userId = input.required<string>();

  profile$ = toObservable(this.userId).pipe(
    switchMap(id => this.#user.profile(id))
  );
}
