import { TestBed } from '@angular/core/testing';
import { RouterTestingHarness } from '@angular/router/testing';
import { UserProfileComponent } from './user-profile.component';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { UserService } from '../user.service';
import { asyncScheduler, scheduled } from 'rxjs';
import { User } from '../models';

const fakeUser: User = {
  id: 1,
  name: 'test',
  email: 'test@test.clm',
  address: {
    city: 'Test',
    street: 'Test Street',
    suite: '',
    zipcode: '1234'
  }
}
// simple unit test demo

describe('UserProfile', () => {
  let routerHarness: RouterTestingHarness;
  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj<UserService>('UserService', ['profile']);
    userServiceSpy.profile.and.returnValue(scheduled([fakeUser], asyncScheduler));
    
    await TestBed.configureTestingModule({
      providers: [
        provideRouter(
          [
            { path: 'profile/:userId', component: UserProfileComponent }
          ],
          withComponentInputBinding()
        ),
        {
          provide: UserService,
          useValue: userServiceSpy
        }
      ]
    });
    routerHarness = await RouterTestingHarness.create();
  });

  it('should call user profile with the param from router', async () => {
    await routerHarness.navigateByUrl('profile/1', UserProfileComponent);
    const userService = TestBed.inject(UserService);
    expect(userService.profile).toHaveBeenCalledWith('1'); 
    // ... in real use cases you might have other expectations

    // More about Unit testing in Angular
    // @link - https://courses.decodedfrontend.io/courses/conscious-angular-testing
  });
});
