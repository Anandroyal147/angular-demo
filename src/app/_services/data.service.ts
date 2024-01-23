import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private loggedInStatus = new BehaviorSubject<any>('');
  loggedInStatus$ = this.loggedInStatus.asObservable();

  setLoggedInStatus(data: boolean) {
    this.loggedInStatus.next(data);
  }
}
