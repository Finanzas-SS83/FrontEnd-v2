import {Component, Input, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {calcularSaldo, calcularTEA, calcularTEM, IRR} from "../../shared/funciones";
import {CalculadoraService} from "../../shared/calculadora";
import {BankData} from "../../shared/Classes/BankData";
import {FeeDataController} from "../../shared/Classes/FeeDataController";
import {TablasApiService} from "../../services/tablas-api.service";

@Component({
  selector: 'app-session-content',
  templateUrl: './session-content.component.html',
  styleUrls: ['./session-content.component.css']
})
export class SessionContentComponent implements OnInit  {
  datosForm: any;
  tabledata: any;
  bankFees: any;
  bankData: any;
  informationTable: any;
  feeDataController: any;


  ngOnInit() {
    this.datosForm = this.dataService.getData();

    this.bankData = new BankData();
    this.informationTable = this.bankData.calcularValores(this.datosForm);

    if (this.datosForm) {
      this.feeDataController= new FeeDataController(this.datosForm, this.bankData, this.tablasApiService);
      this.bankFees= this.feeDataController.generateBankFees();


    }
  }
  constructor(private dataService: DataService, private tablasApiService: TablasApiService) {

  }


}
