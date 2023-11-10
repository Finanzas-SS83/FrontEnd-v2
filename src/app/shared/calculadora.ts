import {Injectable, Input} from '@angular/core';
import {UserData} from "../PlandePagos/interfaces/form";
import {calcularSaldo, calcularTEA, calcularTEM} from "./funciones";

@Injectable({
  providedIn: 'root'
})
export class CalculadoraService {

  calcularValores(datosForm: UserData, pCI: number, cPG: number,
                  pCF:number, NDxA: number, frec: number,
                  PC: string, pSegRie: number, pSegDes: number,
                  tasa: number): any {

    const PV  = datosForm.monto;
    const tpTasa = datosForm.tipoTasaInteres;
    const N = datosForm.plazoPago;

    const pSegDesPer = pSegDes * frec / 31;
    const SegRiePer = (pSegRie * 31 / 365) * PV;
    const TEA = calcularTEA(tpTasa, tasa, NDxA, PC);
    const TEM = calcularTEM(TEA, frec, NDxA);
    const CI = pCI * datosForm.monto;
    const CF = PV * pCF;

    const Prestamo = PV - CI;

    const Saldo = calcularSaldo(Prestamo, CF, TEM, pSegDes, N);

    return {
      N,
      Saldo,
      TEM,
      pSegDesPer,
      CF,
      CI,
      SegRiePer,
      Prestamo,
      PV,
      TEA
    };
  }


  constructor() { }

}
