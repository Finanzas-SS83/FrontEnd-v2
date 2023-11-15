  import {Component, Input, OnInit} from '@angular/core';
  import {MatButtonToggleModule} from "@angular/material/button-toggle";
  import {MatTableModule} from "@angular/material/table";
  import {MatButtonModule} from "@angular/material/button";
  import {CurrencyPipe, NgForOf, NgIf, NgStyle} from "@angular/common";
  import {
  formatoMosneda
  } from "../../shared/funciones";

  import {TablasApiService} from "../../services/tablas-api.service";
  import {TableFee} from "../../shared/Classes/table-fee";

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
    @Input() SendToApi: any;
    @Input() bankFees: any;
    @Input() tipoMoneda: any;

    columnNames: string[]=[];

    data: any
    constructor(private tablasApiService: TablasApiService) { }

    isNumberExcludingNC(value: any, column: any): boolean {
          return column !== 'NC' && typeof value === 'number';
    }

    ngOnInit(){

      if (this.bankFees) {
           this.data = this.bankFees;

          if (this.data && this.data.length > 0) {
            this.columnNames = this.displayedColumns.filter(column => column.visible).map(column => column.columnName);
          }
      }
    }

    displayedColumns: ColumnConfig[] = [
      { columnName: 'NC', displayName:'Numero de cuota', visible: true },
      { columnName: 'fechaCuota', displayName:'Fecha', visible: true },
      { columnName: 'PG', displayName:'Periodo de gracia', visible: true },
      { columnName: 'SI', displayName:'Saldo inicial', visible: true },
      { columnName: 'I', displayName:'Interes', visible: true },
      { columnName: 'Cuota', displayName:'Cuota', visible: true },
      { columnName: 'SegDes', displayName:'Seguro desgravamen', visible: true },
      { columnName: 'A', displayName:'Amortizacion', visible: true },
      { columnName: 'SegRie', displayName:'Seguro Bien', visible: true },
      { columnName: 'GastosAdm', displayName:'Estados de Cuenta', visible: true },
      { columnName: 'SF', displayName:'Saldo final', visible: true },
      { columnName: 'flujo', displayName:'Flujo', visible: true },
    ];
    stickyColumns :string[] = ['header-1', 'NC'];
    EndstickyColumns:string[] = ['flujo'];

    isSticky(id: string) {
      return this.stickyColumns.includes(id);
    }

    isStickyEnd(id: string) {
      return this.EndstickyColumns.includes(id);
    }

    protected readonly formatoMosneda = formatoMosneda;
  }

  interface ColumnConfig {
    columnName: string;
    visible: boolean;
    displayName: string;
  }




