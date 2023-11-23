import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import { SignupData} from "../../../shared/interfaces/signupdata";

@Injectable({
  providedIn: 'root'
})
export class ProfileServiceService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getStudentProfileById(studentId: string): Observable<SignupData> {
    const url = `${this.apiUrl}/students/${studentId}`;
    return this.http.get<SignupData>(url);
  }

  updateStudentProfile(studentId: string, updatedProfile: SignupData): Observable<SignupData> {
    const url = `${this.apiUrl}/users/${studentId}`;
    return this.http.put<SignupData>(url, updatedProfile).pipe(
      tap((user) => {
        // Actualizar el usuario en el almacenamiento local después de la actualización en el servidor
        localStorage.setItem('user', JSON.stringify(user));
      })
    );
  }
}
