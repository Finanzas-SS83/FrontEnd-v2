import {Component, Input, OnInit} from '@angular/core';
import {UtilsService} from "../../shared/utils.service";

import {
 formatoMosneda
} from "../../shared/funciones";

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
