import {
  calcularAmort,
  calcularCuota,
  calcularFlujo,
  calcularSaldoFinal,
  calcularSaldoInicial,
  calcularSeguroRiesgo,
  roundToTwoDecimals,
} from "../funciones";

import { TablasApiService } from "../../services/tablas-api.service";
import { format } from "date-fns";
import { BankFee } from "../interfaces/bank-fee";

export class TableFee {
  N: number = 0;
  monto: number = 0;
  Saldo: number = 0;
  TEM: number = 0;
  pSegDesPer: number = 0;
  CF: number = 0;
  SegRiePer: number = 0;
  GastosAdm: number = 0;
  tipoMoneda: string = "";
  cPG: number = 0;
  fechaConsulta: Date = new Date();

  constructor(data: Partial<TableFee>) {
    Object.assign(this, data);
  }

  generarCuota(Ncuota: number, periodoGracia: string, saldoFinalAnterior: number): BankFee {
    const { N, Saldo, TEM, pSegDesPer, CF, SegRiePer, GastosAdm, fechaConsulta } = this;
    const NC = Ncuota;
    const PG = periodoGracia;
    const SI = calcularSaldoInicial(NC, N, Saldo, saldoFinalAnterior);
    const I = (-1 * SI) * TEM; //interes
    const Cuota = calcularCuota(NC, N, PG, I, TEM, pSegDesPer, SI);
    const SegDes = (-1 * SI) * pSegDesPer;
    const A = calcularAmort(NC, N, PG, Cuota, I, SegDes, CF);
    const SegRie = calcularSeguroRiesgo(NC, N, SegRiePer);
    const SF = calcularSaldoFinal(NC, N, PG, SI, I, A);
    const flujo = calcularFlujo(Cuota, SegRie, 0, 0, GastosAdm, PG, SegDes, NC, N, CF);

    const date = new Date(fechaConsulta);
    date.setMonth(date.getMonth() + (NC - 1));
    const fechaCuota = format(date, 'dd/MM/yyyy');

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


   generate_Table(): BankFee[] {
    const cuotas: BankFee[] = [];
    const { N } = this;

    for (let i = 0; i <= N; i++) {
      let PG = '';
      if (i < 3) {
        PG = 'T';
      } else if (i < 6) {
        PG = 'P';
      } else {
        PG = 'S';
      }
      let anteriorSF = i > 0 ? cuotas[i - 1].SF : 0;
      const nuevaCuota = this.generarCuota(i + 1, PG, anteriorSF);
      cuotas.push(nuevaCuota);
    }

    return cuotas;
  }

}

