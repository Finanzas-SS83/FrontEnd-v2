import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BankFee} from "../shared/interfaces/bank-fee";
import {TableFee} from "../shared/Classes/table-fee";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TablasApiService {
  private apiUrl = 'http://localhost:8081/api/v1'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) {}

    getDatos(): Observable<TableFee[]> {
        return this.http.get<DataToSend[]>(`${this.apiUrl}/tables`).pipe(
            map((data: DataToSend[]) => {
                // Transformación de DataToSend a TableFee
                return data.map((item: DataToSend) => {
                    const tableFee: TableFee = new TableFee({
                        N: item.n,
                        monto: item.monto,
                        Saldo: item.saldo,
                        TEM: item.tem,
                        pSegDesPer: item.psegDesPer,
                        CF: item.cf,
                        SegRiePer: item.segRiePer,
                        GastosAdm: item.gastosAdm,
                        tipoMoneda: item.tipoMoneda,
                        cPG: item.cpg,
                        fechaConsulta: new Date(item.fechaConsulta),
                        tipoPeriodo: item.tipoPeriodo,
                        studentId: item.studentId// Convertir la cadena de texto a tipo Date
                    });

                    return tableFee;
                });
            })
        );
    }
  sendDataToAPI(userid:number,data: TableFee) {
    console.log(data);
    const dataToSend = {
      monto: data.monto,
      tipoMoneda: data.tipoMoneda,
      tipoPeriodo: data.tipoPeriodo,
      fechaConsulta: data.fechaConsulta,
      saldo: data.Saldo,
      portes: data.Portes,
      gps: data.Gps,
      cf: data.CF,
      tem: data.TEM,
      segRiePer: data.SegRiePer,
      cpg: data.cPG,
      n: data.N,
      gastosAdm: data.GastosAdm,
      psegDesPer: data.pSegDesPer,
        studentId: data.studentId,
    }
    console.log("datos nuevos enviados al api", dataToSend);
    return this.http.post<any>(`${this.apiUrl}/tables/${userid}`, dataToSend);
  }

  deleteDataFromAPI(id: number) {
    console.log(`Enviando solicitud DELETE para el ID: ${id}`);
    return this.http.delete<any>(`${this.apiUrl}/tables/${id}`);
  }

}
export interface DataToSend {
  monto: number;
  tipoMoneda: string;
  tipoPeriodo: string;
  fechaConsulta: string;
  saldo: number;
  portes: number;
  gps: number;
  cf: number;
  tem: number;
  segRiePer: number;
  cpg: number;
  n: number;
  gastosAdm: number;
  psegDesPer: number;
  studentId: number;
}
