import { Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DemoComponent } from './demo/demo.component';

export const routes: Routes = [
  {
    component: DemoComponent,
    
    // ?sort=asc
    
    path: 'demo/:entityId',
    data: {
      title: 'Demo',
      description: 'Some component'
    },
  },
  {
    path: ':userId',
    loadComponent: () => import('./user-profile/user-profile.component')
      .then(c => c.UserProfileComponent)
  }
];
