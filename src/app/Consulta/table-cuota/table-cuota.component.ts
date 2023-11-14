  import {Component, Input, OnInit} from '@angular/core';
  import {MatButtonToggleModule} from "@angular/material/button-toggle";
  import {MatTableModule} from "@angular/material/table";
  import {MatButtonModule} from "@angular/material/button";
  import {CurrencyPipe, NgForOf, NgIf, NgStyle} from "@angular/common";
  import {
    calcularAmort,
    calcularCuota, calcularFlujo,
    calcularSaldoFinal,
    calcularSaldoInicial, calcularSeguroRiesgo, formatoMosneda, roundToTwoDecimals,

  } from "../../shared/funciones";

  import {TablasApiService} from "../../services/tablas-api.service";
  import {format} from "date-fns";
  import {BankFee} from "../../shared/interfaces/bank-fee";

  @Component({
    selector: 'app-table-cuota',
    templateUrl: './table-cuota.component.html',
    standalone: true,
      imports: [
          MatTableModule,
          MatButtonToggleModule,
          MatButtonModule,
          NgForOf,
          NgStyle,
          NgIf,
          CurrencyPipe
      ],
    styleUrls: ['./table-cuota.component.css']
  })
  export class TableCuotaComponent implements OnInit {
    displayedColumns: ColumnConfig[] = [];
    data:any;
    tables = [0];
    stickyColumns :string[] = ['header-1', 'NC'];
    EndstickyColumns:string[] = ['flujo'];


    private  N: any;
    @Input()   SendToApi: any;
    private  Saldo: any;
    private TEM: any;
    private  pSegDesPer: any;
    private  CF: any;
    private  SegRiePer: any;
    private  GastosAdm: any;
    private fechaConsulta: any;
    tipoMoneda: any;

    flujos: number[] = [];
    @Input() tableFee: any;
    columnNames: string[]=[];



    constructor(private tablasApiService:TablasApiService) {
        this.displayedColumns.length = 11;

    }
      isNumberExcludingNC(value: any, column: any): boolean {
          return column !== 'NC' && typeof value === 'number';
      }

    ngOnInit(){
      console.log("DATOSFORMS",this.tableFee);
      if (this.tableFee) {

          this.N= this.tableFee.N;
          this.Saldo = this.tableFee.Saldo;
          this.TEM = this.tableFee.TEM;
          this.pSegDesPer = this.tableFee.pSegDesPer;
          this.CF = this.tableFee.CF;
          this.SegRiePer = this.tableFee.SegRiePer;
          this.GastosAdm = this.tableFee.GastosAdm;
          this.tipoMoneda = this.tableFee.tipoMoneda;
          this.fechaConsulta= this.tableFee.fechaConsulta;

          this.flujos = [];
          this.data = this.generate_Table();
          if(this.SendToApi==true) {
              this.sendDataToAPI(this.tableFee);
          }
      }
        this.tables.push(this.tables.length)

      if (this.data && this.data.length > 0) {

        this.displayedColumns = this.columnSettings;
        this.columnNames = this.displayedColumns.filter(column => column.visible).map(column => column.columnName);
        console.log("asdasdasdasdas",this.columnNames);

      }

    }
    columnSettings: ColumnConfig[] = [
      { columnName: 'NC', displayName:'Numero de cuota', visible: true },
      { columnName: 'fechaCuota', displayName:'Fecha', visible: true },
      { columnName: 'PG', displayName:'Periodo de gracia', visible: true },
      { columnName: 'SI', displayName:'Saldo inicial', visible: false },
      { columnName: 'I', displayName:'Interes', visible: false },
      { columnName: 'Cuota', displayName:'Cuota', visible: false },
      { columnName: 'SegDes', displayName:'Seguro desgravamen', visible: true },
      { columnName: 'A', displayName:'Amortizacion', visible: true },
      { columnName: 'SegRie', displayName:'Seguro Bien', visible: true },
      { columnName: 'GastosAdm', displayName:'Estados de Cuenta', visible: true },
      { columnName: 'SF', displayName:'Saldo final', visible: true },
      { columnName: 'flujo', displayName:'Cuota ', visible: true },
    ];
    isSticky(id: string) {
      return this.stickyColumns.includes(id);
    }

    isStickyEnd(id: string) {
      return this.EndstickyColumns.includes(id);
    }

     generarCuota(Ncuota: number, periodoGracia: string, saldoFinalAnterior: number) {

          const NC = Ncuota;
          const PG = periodoGracia;
          const SI = calcularSaldoInicial(NC, this.N, this.Saldo, saldoFinalAnterior);
          const I = (-1* SI) * this.TEM;//interes
          const Cuota = calcularCuota(NC,this.N,PG, I,this.TEM, this.pSegDesPer , SI);
          const SegDes =  (-1*SI) * this.pSegDesPer;
          const A = calcularAmort(NC,this.N,PG, Cuota, I,SegDes, this.CF);
          const SegRie = calcularSeguroRiesgo(NC,this.N, this.SegRiePer);
          const GastosAdm = this.GastosAdm;
          const SF =  calcularSaldoFinal(NC, this.N,PG,SI,I,A);
          const flujo = calcularFlujo(Cuota,SegRie,0,0,GastosAdm,PG,SegDes,NC, this.N, this.CF);

          const date = new Date(this.fechaConsulta);
          console.log("daate",date);
          date.setMonth(date.getMonth()+(NC-1));
          const fechaCuota = format(date, 'dd/MM/yyyy');

          this.flujos.push(flujo);

          return {
              NC: NC,
              fechaCuota: fechaCuota,
              PG: PG,
              SI: roundToTwoDecimals(SI),
              I: -1* roundToTwoDecimals(I),
              Cuota: -1* roundToTwoDecimals(Cuota),
              SegDes: -1*roundToTwoDecimals(SegDes),
              A: -1*roundToTwoDecimals(A),
              SegRie: -1*roundToTwoDecimals(SegRie),
              GastosAdm: -1* roundToTwoDecimals(GastosAdm),
              SF: roundToTwoDecimals(SF),
              flujo: -1* roundToTwoDecimals(flujo)
          };
      }

      generate_Table(){
          const cuotas: BankFee[] = [];

          for (let i = 0; i <= this.N; i++) {
              let PG = '';
              if (i < 3) {
                  PG = 'T';
              } else if (i < 6) {
                  PG = 'P';
              } else {
                  PG = 'S';
              }
              let anteriorSF = i > 0 ? cuotas[i-1].SF : 0;
              const nuevaCuota = this.generarCuota(i+1, PG, anteriorSF);
              cuotas.push(<BankFee>nuevaCuota);
          }

          return  cuotas;
      }

      sendDataToAPI(data: BankFee[]) {
          this.tablasApiService.sendDataToAPI(data).subscribe(
              (response) => {
                  console.log('Datos guardados en la API:', response);
                  // Aquí puedes manejar la respuesta de la API como quieras
              },
              (error) => {
                  console.error('Error al enviar los datos a la API:', error);
                  // Aquí puedes manejar el error en caso de que la solicitud falle
              }
          );
      }

    protected readonly formatoMosneda = formatoMosneda;
  }

  interface ColumnConfig {
    columnName: string;
    visible: boolean;
    displayName: string;
  }




