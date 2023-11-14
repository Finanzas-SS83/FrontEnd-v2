import {Component, Input, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {calcularSaldo, calcularTEA, calcularTEM, IRR} from "../../shared/funciones";
import {CalculadoraService} from "../../shared/calculadora";
import {BankData} from "../../shared/Classes/BankData";

@Component({
  selector: 'app-session-content',
  templateUrl: './session-content.component.html',
  styleUrls: ['./session-content.component.css']
})
export class SessionContentComponent implements OnInit  {
  datosForm: any;
  tabledata: any;

  public PV: any;
  public TEA: any;
  public CI: any;
  public Prestamo: any;

  public N: any;
  public Saldo: any;
  public TEM:  any;
  public CF: any;
  public SegRiePer: any;
  public pSegDesPer: any;

  flujos: number[] = [];

  tableFee: any;

  public VAN: any;
  public TIR: any;

  private cPG : number= 6;
  private NDxA: number = 360; //Num. de dias por a;o
  private frec: number = 30;
  tasa: number = 15 / 100; // tasa bcp calculador
  public GastosAdm: number= -10;
  private date: Date = new Date();

  private bankData : BankData =new BankData();
  ngOnInit() {
    this.datosForm = this.dataService.getData();
    console.log("DATOSFORMS",this.datosForm);

    if (this.datosForm) {
      this.flujos = [];
      this.tabledata = this.bankData.calcularValores(this.datosForm);

      this.N = this.tabledata.N;
      this.Saldo = this.tabledata.Saldo;
      this.TEM = this.tabledata.TEM;
      this.pSegDesPer= this.tabledata.pSegDesPer;
      this.CF = this.tabledata.CF;
      this.SegRiePer= this.tabledata.SegRiePer;

      //TABLA DE ARRIBA
      this.Prestamo=  this.tabledata.Prestamo;
      this.PV= this.tabledata.PV;
      this.TEA= this.tabledata.TEA;
      this.CI= this.tabledata.CI;
      this.CF= this.tabledata.CF;

      this.tableFee = {
        N: this.N,
        monto: this.datosForm.monto,
        Saldo: this.Saldo,
        TEM: this.TEM,
        pSegDesPer: this.pSegDesPer,
        CF: this.CF,
        SegRiePer: this.SegRiePer,
        GastosAdm: this.GastosAdm,
        tipoMoneda: this.datosForm.tipoMoneda,
        cPG: this.cPG,
        fechaConsulta: this.date,
      }

      console.log("TABLEFEE",this.tableFee);

      const COK = 0.50;
      const flujosDescontados = this.flujos.map((flujo, index) => flujo / Math.pow(1 + COK, index + 1));
      const TasaDescuento = Math.pow(1 + COK, this.frec / this.NDxA) - 1;

      const TCEA = Math.pow(1 + this.TIR, this.NDxA / this.frec) - 1;
      this.VAN = this.Prestamo + flujosDescontados.reduce((acc, val) => acc + val, 0);
      this.TIR = IRR(this.flujos, 0.1 );

    }
  }
  constructor(private dataService: DataService, private calcularvalores: CalculadoraService) {

  }





}
