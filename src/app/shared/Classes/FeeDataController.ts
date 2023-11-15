import {TableFee} from "./table-fee";
import {UserData} from "../interfaces/form";
import {BankData} from "./BankData";
import {BankFee} from "../interfaces/bank-fee";
import {Finance} from "financejs";
import {TablasApiService} from "../../services/tablas-api.service";

export class FeeDataController {

    public bankFees: BankFee[]=[];
    public tableFee: TableFee;
    public flujos : number[] = [];
    public cok :number;
    public coki :number;
    public tir :number;
    public tcea :number;
    public van :number;

    public dataform: UserData;
    public databank: BankData;
    public feeData: any;
    public tableApiServices: TablasApiService;

    constructor(dataForm: UserData, dataBank: BankData, tableApiService: TablasApiService, studentId: number | null) {
        this.tableApiServices= tableApiService;

        this.dataform = dataForm;
        this.databank= dataBank;
        this.feeData= this.databank.calcularValores(this.dataform);
        this.tableFee = this.generateTableFee(studentId)

        this.bankFees = this.generateBankFees();
        this.cok  = this.calculateCock(50);
        this.coki = this.calculateCocki(this.cok, dataBank.frec, dataBank.NDxA);
        this.tir  = this.calculateTIR(0.01,this.feeData.Prestamo);
        this.tcea = this.calculateTCEA(this.tir, dataBank.NDxA, dataBank.frec);
        this.van  =  this.calculateVAN(this.feeData.Prestamo, this.flujos);

        this.tableApiServices.sendDataToAPI(this.tableFee).subscribe();
        }


    generateTableFee(studentId: number | null): TableFee{
        const{ N, Saldo, TEM, pSegDesPer, CF, SegRiePer, GastosAdm } = this.feeData;
        const{ monto,tipoMoneda,cantidadPeriodos , tipoPeriodoGracia} = this.dataform;
        console.log("tipopERIDOS", tipoPeriodoGracia);
        return new TableFee({N, monto, Saldo, TEM, Portes:0, Gps:0, pSegDesPer, CF, SegRiePer, GastosAdm, tipoMoneda, tipoPeriodo:tipoPeriodoGracia, cPG: cantidadPeriodos, fechaConsulta: new Date(),studentId: studentId});
    }

    generateBankFees(): BankFee[]{
        return this.tableFee.generate_Table(this.flujos);
    }

    calculateCock(rate: number): number {
        return rate / 100;
    }

    calculateCocki(cok: number, frec: number, nDxA: number): number {
        return Math.pow(1 + cok, frec / nDxA) - 1;
    }

    calculateTIR(guess: number, prestamo: number): number {
        this.flujos.unshift(prestamo);
        console.log("prestamo", prestamo);
        console.log("flujos", this.flujos);
        const tir = this.TIR(guess, this.flujos);
        return tir;
    }

    TIR(guess: number, flujos: number[]): number {
        const epsilon = 0.0001; // Valor pequeño para la precisión
        const maxIter = 1000; // Número máximo de iteraciones

        const f = (rate: number): number => {
            let result = -guess;
            for (let i = 0; i < flujos.length; i++) {
                result += flujos[i] / Math.pow(1 + rate, i + 1);
            }
            return result;
        };

        const fPrime = (rate: number): number => {
            let result = 0;
            for (let i = 0; i < flujos.length; i++) {
                result -= (i + 1) * flujos[i] / Math.pow(1 + rate, i + 2);
            }
            return result;
        };

        let rate = 0.1; // Estimación inicial
        let iter = 0;

        while (Math.abs(f(rate)) > epsilon && iter < maxIter) {
            rate = rate - f(rate) / fPrime(rate);
            iter++;
        }

        if (iter === maxIter) {
            throw new Error('No se pudo calcular la TIR en el número máximo de iteraciones.');
        }

        return rate;
    }

    calculateTCEA(tir: number, nDxA: number, frec: number): number {
        return Math.pow(1 + tir, nDxA / frec) - 1;
    }

    calculateVAN(prestamo: number, flujos: number[]): number {
        flujos.shift(); // Quitar el préstamo del inicio del array

        let van = prestamo; // Iniciar con el negativo del préstamo

        for (let i = 0; i < flujos.length; i++) {
            van += flujos[i] / Math.pow(1 + this.coki, i + 1);
        }

        return van;
    }

}
