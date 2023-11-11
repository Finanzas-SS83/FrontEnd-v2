import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {SignupData} from "../../interfaces/signupdata";
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

  updateStudentProfile(studentId: string, updatedProfile: SignupData): Observable<void> {

    const url = `${this.apiUrl}/student/${studentId}`;


    return this.http.put<void>(url, updatedProfile);
  }

}
