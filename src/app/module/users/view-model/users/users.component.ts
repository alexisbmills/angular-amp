import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../services/user';
import { UserApiService } from '../../services/user-api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit, OnDestroy {

  private counter = 0;

  private _users: Observable<User[]>;
  get users(): Observable<User[]> {
    return this._users;
  }

  constructor(private service: UserApiService) {
  }

  ngOnInit(): void {
    this._users = this.service.users();
  }

  ngOnDestroy(): void {
  }

  userClass() {
    if (this.counter === 0) {
      this.counter++;
      return {first: true};
    }
    return {first: false};
  }
}
