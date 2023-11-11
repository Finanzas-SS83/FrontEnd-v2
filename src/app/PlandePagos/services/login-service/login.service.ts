import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, of, Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { SignupData } from "../../interfaces/signupdata";

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private basePath = 'http://localhost:3000/api/v1';
    private currentUser: SignupData | null = null;
    constructor(private http: HttpClient) { }

    getUserData(email: string): Observable<SignupData | null> {

        if (this.currentUser && this.currentUser.email === email) {
            return of(this.currentUser);
        }

        // Si no, realiza la solicitud HTTP para obtener los datos
        return this.http.get<SignupData[]>(`${this.basePath}/students`).pipe(
            map((students) => {
                const user = students.find((student) => student.email === email);
                this.currentUser = user || null;
                return user || null;
            }),
            catchError((error) => {
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
                    this.currentUser = user;
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
