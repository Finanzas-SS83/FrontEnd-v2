import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from "rxjs/operators";
import {Observable, of} from "rxjs";
import {SignupData} from "../../shared/interfaces/signupdata";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private basePath = 'http://localhost:3000/api/v1';

  constructor(private http: HttpClient) {  }

  getUserData(email: string): Observable<SignupData | null> {
    return this.http.get<SignupData[]>(`${this.basePath}/students`).pipe(
      map((students) => {
        // Encuentra al estudiante con el correo electrónico proporcionado
        const user = students.find((student) => student.email === email);
        return user || null; // Devuelve null si no se encuentra el usuario
      }),
      catchError((error) => {
        // Manejar errores de la solicitud HTTP
        console.error('Error al obtener datos del usuario:', error);
        return of(null);
      })
    );
  }
  login(email: string, password: string) {

    return this.http.get<SignupData[]>(`${this.basePath}/students`).pipe(
      map((students) => {

        const user = students.find((student) => student.email === email);

        if (user && user.password === password) {

          return true;
        } else {

          return false;
        }
      }),
      catchError((error) => {

        console.error('Error en la solicitud de inicio de sesión:', error);
        return of(false);
      })
    );
  }
}
