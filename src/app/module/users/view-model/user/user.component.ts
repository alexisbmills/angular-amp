import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../services/user';
import { ActivatedRoute } from '@angular/router';
import { UserApiService } from '../../services/user-api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent implements OnInit {

  private _user: Observable<User>;
  get user(): Observable<User> {
    return this._user;
  }

  constructor(private route: ActivatedRoute, private service: UserApiService) {
  }

  ngOnInit(): void {
    this._user = this.service.user(this.route.snapshot.params['id']);
  }
}
