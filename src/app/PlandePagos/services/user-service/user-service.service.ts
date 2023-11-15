import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SignupData} from "../../../shared/interfaces/signupdata";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private userSubject: BehaviorSubject<SignupData | null>;
  user$: Observable<SignupData | null>;

  constructor() {
    // Recuperar el usuario desde el almacenamiento local al iniciar el servicio
    const storedUser = localStorage.getItem('user');
    const initialUser = storedUser ? JSON.parse(storedUser) : null;

    this.userSubject = new BehaviorSubject<SignupData | null>(initialUser);
    this.user$ = this.userSubject.asObservable();
  }

  setUser(user: SignupData | null): void {
    // Almacenar el usuario en el almacenamiento local
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  }

  getUser(): SignupData | null {
    return this.userSubject.value;
  }
}
