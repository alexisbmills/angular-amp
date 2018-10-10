import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { delay, dematerialize, materialize, mergeMap } from 'rxjs/operators';
import { User, USERS_FIXTURES } from './user';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return of(null).pipe(
      mergeMap(() => {
        if (request.url.endsWith('/api/users') && request.method === 'GET') {
          return of(new HttpResponse({ status: 200, body: USERS_FIXTURES }));
        }

        if (request.url.match(/\/api\/users\//) && request.method === 'GET') {
          const urlParts = request.url.split('/');
          const id = urlParts[urlParts.length - 1];
          const userIndex: number = USERS_FIXTURES.findIndex((userItem: User) => userItem.id === id);
          if (userIndex < 0 ) {
            return of(new HttpResponse({ status: 404, body: {} }));

          }
          return of(new HttpResponse({ status: 200, body: USERS_FIXTURES[userIndex] }));
        }
        return next.handle(request);
      }),
      materialize(),
      delay(500),
      dematerialize()
    );
  }

}