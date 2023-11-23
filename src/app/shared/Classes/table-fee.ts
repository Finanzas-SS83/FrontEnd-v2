import {
  calcularAmort,
  calcularCuota,
  calcularFlujo,
  calcularSaldoFinal,
  calcularSaldoInicial,
  calcularSeguroRiesgo,
  roundToTwoDecimals,
} from "../funciones";

import { format } from "date-fns";
import { BankFee } from "../interfaces/bank-fee";
import {FinalFeeSchedule} from "./FinalFeeSchedule";

export class TableFee {
  N: number = 0;
  monto: number = 0;
  Saldo: number = 0;
  TEM: number = 0;
  Portes: number = 0;
  Gps: number = 0;
  pSegDesPer: number = 0;
  CF: number = 0;
  SegRiePer: number = 0;
  GastosAdm: number = 0;
  tipoMoneda: string = "";
  tipoPeriodo: string = "";
  cPG: number = 0;
  fechaConsulta: Date = new Date();
  studentId: number | null = null;
  constructor(data: Partial<TableFee>) {
    Object.assign(this, data);
    if (this.tipoPeriodo=='S'){
      this.cPG=0;
    }
  }

  generarCuota(Ncuota: number, periodoGracia: string, saldoFinalAnterior: number,
               saldoCap: number, referencia: { sFCAnterior: number }): BankFee {
    const { N, Saldo, TEM, pSegDesPer,
      CF, SegRiePer, GastosAdm,cPG,fechaConsulta } = this;
    if(cPG==0){
      saldoCap=Saldo;
    }

    const { SegDesCF, ACF, SFCF}= new FinalFeeSchedule(Ncuota, CF, TEM, N,pSegDesPer, referencia.sFCAnterior);

    const NC = Ncuota;
    const PG = periodoGracia;
    const SI = calcularSaldoInicial(NC, N, Saldo, saldoFinalAnterior);
    const I = (-1 * SI) * TEM; //interes
    const Cuota = calcularCuota(NC, N, PG, I, TEM, saldoCap,cPG);
    const SegDes = (-1 * SI) * pSegDesPer * (12/365)*30;
    const SegRie = calcularSeguroRiesgo(NC, N, SegRiePer);
    const A = calcularAmort(NC, N, PG, Cuota, I, SegDes, SegDesCF, SegRie, 0, 0, GastosAdm);
    const SF = calcularSaldoFinal( PG, SI, I, A);
    const flujo = calcularFlujo(NC,N,Cuota, SegRie, SegDesCF,0, 0, GastosAdm, PG, SegDes, ACF);

    const date = new Date(fechaConsulta);
    date.setMonth(date.getMonth() + (NC - 1));
    const fechaCuota = format(date, 'dd/MM/yyyy');

    referencia.sFCAnterior =  SFCF;



    return {
      NC: NC,
      fechaCuota : fechaCuota,
      PG : PG,
      SI: roundToTwoDecimals(SI),
      I: -1 * roundToTwoDecimals(I),
      Cuota: -1 * roundToTwoDecimals(Cuota),
      SegDes: -1 * roundToTwoDecimals(SegDes),
      A: -1 * roundToTwoDecimals(A),
      SegRie: -1 * roundToTwoDecimals(SegRie),
      GastosAdm: -1 * roundToTwoDecimals(GastosAdm),
      SF: roundToTwoDecimals(SF),
      flujo: -1 * roundToTwoDecimals(flujo),
    };
  }


  generate_Table(flujos?: number[]): BankFee[] {
    const cuotas: BankFee[] = [];
    let { N, cPG } = this;
    let saldoCap = 0;
    const referencia = { sFCAnterior: 0 }; // Objeto que contiene la propiedad sFCAnterior

    for (let i = 0; i <= N; i++) {
      let PG = '';

      if (i < cPG) {
        PG = this.tipoPeriodo;
      } else {
        PG = 'S';
      }

      let anteriorSF = i > 0 ? cuotas[i - 1].SF : 0;
      const nuevaCuota = this.generarCuota(i + 1, PG, anteriorSF, saldoCap, referencia);
      if(i+1==cPG && cPG!=0){
        saldoCap=nuevaCuota.SI;
      }
      if (flujos) {
        const num = -1* nuevaCuota.flujo;
        flujos.push(num);
      }
      cuotas.push(nuevaCuota);
    }

    return cuotas;
  }

}
