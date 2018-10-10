import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './view-model/user/user.component';
import { UsersComponent } from './view-model/users/users.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    pathMatch: 'full',
  },
  {
    path: ':id',
    component: UserComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
