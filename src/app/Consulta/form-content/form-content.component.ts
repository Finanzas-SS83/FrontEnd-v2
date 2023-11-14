import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from "../../services/data.service";
import { UserData } from "../../shared/interfaces/form";

@Component({
  selector: 'app-form-content',
  templateUrl: './form-content.component.html',
  styleUrls: ['./form-content.component.css']
})
export class FormContentComponent {
  monto: number = 0;
  tipoMoneda: string = "";
  tipoTasaInteres: string = "";
  cantidadPeriodos: number = 0;
  tipoPeriodoGracia: string = "";
  plazoPago: string = "";

  saveData: UserData = {
    monto: this.monto,
    tipoMoneda: this.tipoMoneda,
    tipoTasaInteres: this.tipoTasaInteres,
    cantidadPeriodos: this.cantidadPeriodos,
    tipoPeriodoGracia: this.tipoPeriodoGracia,
    plazoPago: 0 // Asumiendo que el valor es 0 por defecto
  };

  constructor(private router: Router, private dataService: DataService) {}

  onConsultar() {
    this.saveData.plazoPago = Number(this.plazoPago) * 12;
    this.saveAndNavigate();
    this.router.navigate(['/session'], { state: { data: this.saveData } });
  }

  onInputChange() {
    this.saveData = {
      monto: this.monto,
      tipoMoneda: this.tipoMoneda,
      tipoTasaInteres: this.tipoTasaInteres,
      cantidadPeriodos: this.cantidadPeriodos,
      tipoPeriodoGracia: this.tipoPeriodoGracia,
      plazoPago: Number(this.plazoPago) * 12
    };
    this.saveAndNavigate();
  }

  toReset() {
    this.monto = 0;
    this.tipoMoneda = "";
    this.tipoTasaInteres = "";
    this.cantidadPeriodos = 0;
    this.tipoPeriodoGracia = "";
    this.plazoPago = "";
    this.onInputChange();
    this.saveAndNavigate();
  }

  private saveAndNavigate() {
    console.log("savedata", this.saveData);
    this.dataService.saveData(this.saveData);
  }
}
