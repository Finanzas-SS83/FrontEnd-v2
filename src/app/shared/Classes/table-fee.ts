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
  n: number = 0;
  monto: number = 0;
  saldo: number = 0;
  tem: number = 0;
  portes: number = 0;
  gps: number = 0;
  psegDesPer: number = 0;
  cf: number = 0;
  segRiePer: number = 0;
  gastosAdm: number = 0;
  tipoMoneda: string = "";
  tipoPeriodo: string = "";
  cpg: number = 0;
  fechaConsulta: Date = new Date();
  constructor(data: Partial<TableFee>) {
    Object.assign(this, data);
    if (this.tipoPeriodo=='S'){
      this.cpg =0;
    }
  }

  generarCuota(Ncuota: number, periodoGracia: string, saldoFinalAnterior: number,
               saldoCap: number, referencia: { sFCAnterior: number }): BankFee {
    const { n, saldo, tem, psegDesPer,
      cf, segRiePer, gastosAdm,cpg,fechaConsulta } = this;
    if(cpg==0){
      saldoCap=saldo;
    }

    const { SegDesCF, ACF, SFCF}= new FinalFeeSchedule(Ncuota, cf, tem, n,psegDesPer, referencia.sFCAnterior);

    const NC = Ncuota;
    const PG = periodoGracia;
    const SI = calcularSaldoInicial(NC, n, saldo, saldoFinalAnterior);
    const I = (-1 * SI) * tem; //interes
    const Cuota = calcularCuota(NC, n, PG, I, tem, saldoCap,cpg);
    const SegDes = (-1 * SI) * psegDesPer * (12/365)*30;
    const SegRie = calcularSeguroRiesgo(NC, n, segRiePer);
    const A = calcularAmort(NC, n, PG, Cuota, I, SegDes, SegDesCF, SegRie, 0, 0, gastosAdm);
    const SF = calcularSaldoFinal( PG, SI, I, A);
    const flujo = calcularFlujo(NC,n,Cuota, SegRie, SegDesCF,0, 0, gastosAdm, PG, SegDes, ACF);

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
      GastosAdm: -1 * roundToTwoDecimals(gastosAdm),
      SF: roundToTwoDecimals(SF),
      flujo: -1 * roundToTwoDecimals(flujo),
    };
  }


  generate_Table(flujos?: number[]): BankFee[] {
    const cuotas: BankFee[] = [];
    let { n, cpg } = this;
    let saldoCap = 0;
    const referencia = { sFCAnterior: 0 }; // Objeto que contiene la propiedad sFCAnterior

    for (let i = 0; i <= n; i++) {
      let PG = '';

      if (i < cpg) {
        PG = this.tipoPeriodo;
      } else {
        PG = 'S';
      }

      let anteriorSF = i > 0 ? cuotas[i - 1].SF : 0;
      const nuevaCuota = this.generarCuota(i + 1, PG, anteriorSF, saldoCap, referencia);
      if(i+1==cpg && cpg!=0){
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
