import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable()
export class UserApiService {

  constructor(private http: HttpClient,
              @Inject(PLATFORM_ID) private platformId) {
  }

  users(): Observable<User[]> {
    console.log(`fetching users /api/users`);
    return this.http.get<User[]>(`/api/users`);
  }

  user(id: string): Observable<User> {
    console.log(`fetching user /api/users/${id}`);
    return this.http.get<User>(`/api/users/${id}`);
  }
}
