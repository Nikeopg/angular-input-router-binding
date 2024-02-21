import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { User } from '../models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [JsonPipe, AsyncPipe],
  template: `
    <h1>User Profile</h1>
    <p>User - {{ user$ | async| json}}</p>
  `
})
export class UserProfileComponent implements OnInit {
  #activatedRoute = inject(ActivatedRoute);
  #user = inject(UserService);

  user$!: Observable<User>;
  
  ngOnInit() {
    const userId = this.#activatedRoute.snapshot.params['id'];
    this.user$ = this.#user.profile(userId);
  }
}
