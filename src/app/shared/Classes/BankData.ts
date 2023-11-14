import {UserData} from "../interfaces/form";
import {calcularSaldo, calcularTEA, calcularTEM} from "../funciones";

export class BankData {
    private pCI: number = 0.20;
    private cPG: number = 3;
    private pCF: number = 35 / 100;
    private NDxA: number = 360;
    private frec: number = 30;
    private PC: string = "Diaria";
    private pSegRie: number = 4.72 / 100;
    private pSegDes: number = 0.05 / 100;
    private tasa: number = 15 / 100;
    private GastosAdm: number = -10;
    private date: Date = new Date();


    calcularValores(datosForm: UserData): any {

        const PV  = datosForm.monto;
        const tpTasa = datosForm.tipoTasaInteres;
        const N = datosForm.plazoPago;

        const pSegDesPer = this.pSegDes * this.frec / 31;
        const SegRiePer = (this.pSegRie * 31 / 365) * PV;
        const TEA = calcularTEA(tpTasa, this.tasa, this.NDxA, this.PC);
        const TEM = calcularTEM(TEA, this.frec, this.NDxA);
        const CI = this.pCI * datosForm.monto;
        const CF = PV * this.pCF;

        const Prestamo = PV - CI;

        const Saldo = calcularSaldo(Prestamo, CF, TEM, this.pSegDes, N);

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
}
