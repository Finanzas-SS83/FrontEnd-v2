import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../../services/data.service";
import {TablasApiService} from "../../services/tablas-api.service";
import {calcularSaldo, calcularTEA, calcularTEM, IRR} from "../../shared/funciones";
import {UtilsService} from "../../shared/utils.service";
import {CalculadoraService} from "../../shared/calculadora";
import {TableFee} from "../../PlandePagos/interfaces/table-fee";

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

  private pCI : number= 0.20;
  private cPG : number= 3;
  private pCF : number= 35 / 100;
  private NDxA: number = 360; //Num. de dias por a;o
  private frec: number = 30;
  private PC: string = "Diaria"; //Periodo de capitalizacion
  private pSegRie: number = 4.72 / 100;
  private pSegDes: number = (0.05 / 100);
  tasa: number = 15 / 100; // tasa bcp calculador
  public GastosAdm: number= -10;


  ngOnInit() {
    this.datosForm = this.dataService.getData();
    console.log("DATOSFORMS",this.datosForm);

    if (this.datosForm) {
      this.flujos = [];
        this.tabledata = this.calcularvalores.calcularValores(this.datosForm, this.pCI,
            this.cPG, this.pCF, this.NDxA, this.frec, this.PC, this.pSegRie,
            this.pSegDes, this.tasa);
      //TABLA DE CUOTAS
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
        Saldo: this.Saldo,
        TEM: this.TEM,
        pSegDesPer: this.pSegDesPer,
        CF: this.CF,
        SegRiePer: this.SegRiePer,
        GastosAdm: this.GastosAdm,
        tipoMoneda: this.datosForm.tipoMoneda,
        cPG: this.cPG
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
