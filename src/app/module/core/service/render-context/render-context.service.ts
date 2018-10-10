import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

export enum RenderContext {
  HTML = 'HTML',
  AMP = 'AMP'
}

@Injectable({
  providedIn: 'root'
})
export class RenderContextService {

  private _current: BehaviorSubject<string>;

  constructor() {
    this._current = new BehaviorSubject(RenderContext.HTML);
  }

  get current(): Observable<string> {
    return this._current.asObservable().pipe(
      distinctUntilChanged()
    );
  }

  update(context: RenderContext) {
    this._current.next(context);
  }
}
