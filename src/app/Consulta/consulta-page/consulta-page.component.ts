import {Component, Input, OnInit} from '@angular/core';
import {UtilsService} from "../../shared/utils.service";

import {
  calcularAmort,
  calcularCuota, calcularFlujo, calcularSaldo, calcularSaldoFinal, calcularSaldoInicial,
  calcularSeguroRiesgo, calcularTasa, calcularTEA,
  calcularTEM, formatoMosneda, IRR,
} from "../../shared/funciones";
import {BankFee} from "../../shared/interfaces/bank-fee";
import {ActivatedRoute, Router} from "@angular/router";
import {ThisReceiver} from "@angular/compiler";
import { format } from 'date-fns';
import {DataService} from "../../services/data.service";
import {TablasApiService} from "../../services/tablas-api.service";

@Component({
  selector: 'app-consulta-page',
  templateUrl: './consulta-page.component.html',
  styleUrls: ['./consulta-page.component.css']
})
export class ConsultaPageComponent implements OnInit {
  @Input() datosForm: any;
  @Input() Prestamo: any;
  @Input() tasa: any;
  @Input() PV: any;
  @Input() TEA: any;
  @Input() TEM: any;
  @Input() CI: any;
  @Input() CF: any;
  @Input() VAN: any;
  @Input() TIR: any;
  tipoMoneda: any;
  ngOnInit() {
   this.tipoMoneda = this.datosForm.tipoMoneda;
  }
  constructor() {
  }

  protected readonly formatoMosneda = formatoMosneda;
}
