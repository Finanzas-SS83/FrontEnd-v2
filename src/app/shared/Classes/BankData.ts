import {UserData} from "../interfaces/form";
import {calcularSaldo, calcularTEA, calcularTEM, determinarTasa} from "../funciones";

export class BankData {
    private pCI: number = 0.20;
    private pCF: number = 35 / 100;
    public NDxA: number = 360;
    public frec: number = 30;
    private PC: string = "Diaria";
    private pSegRie: number = 0.00388 / 100;
    private pSegDes: number = 0.050/100;
    private tasa: number = 15 / 100;
    private GastosAdm: number = -10;
    private date: Date = new Date();

    calcularValores(datosForm: UserData): any {

        const PV  = datosForm.monto;
        this.tasa= determinarTasa(PV)/100;
        console.log("tasa", this.tasa);
        const tpTasa = datosForm.tipoTasaInteres;
        const N = datosForm.plazoPago;

        const pSegDesPer = this.pSegDes * this.frec / 30;
        const SegRiePer = (this.pSegRie * 12 / 365) * PV * this.frec;
        const TEA = calcularTEA(tpTasa, this.tasa, this.NDxA, this.PC);
        const TEM = calcularTEM(TEA, this.frec, this.NDxA);
        const CI = this.pCI * datosForm.monto;
        const CF = PV * this.pCF;

        const Prestamo = PV - CI;
        const GastosAdm= -10;
        const Saldo = calcularSaldo(Prestamo, CF, TEM, N);

        return {
            N,
            Saldo,
            TEM,
            pSegDesPer,
            CF,
            CI,
            SegRiePer,
            Prestamo,
            GastosAdm,
            PV,
            TEA
        };
    }
}
