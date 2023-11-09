import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BankFee} from "../PlandePagos/interfaces/bank-fee";

@Injectable({
  providedIn: 'root'
})
export class TablasApiService {
  private apiUrl = 'http://localhost:3000'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) {}

  getDatos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/v1/tablas`);
  }

  sendDataToAPI(data: BankFee[]) {
    return this.http.post<any>(`${this.apiUrl}/api/v1/tablas`, data);
  }
}