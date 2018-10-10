import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './view-model/users/users.component';
import { UserComponent } from './view-model/user/user.component';
import { UserApiService } from './services/user-api.service';
import { FakeBackendInterceptor } from './services/user-mock-backend';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule
  ],
  declarations: [
    UsersComponent,
    UserComponent
  ],
  providers: [
    UserApiService
  ],
})
export class UsersModule {
}
