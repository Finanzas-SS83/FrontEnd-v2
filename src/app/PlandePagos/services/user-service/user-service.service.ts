

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SignupData } from "../../../shared/interfaces/signupdata";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private userSubject: BehaviorSubject<SignupData | null> = new BehaviorSubject<SignupData | null>(null);
  user$: Observable<SignupData | null> = this.userSubject.asObservable();

  setUser(user: SignupData): void {
    this.userSubject.next(user);
  }
}
