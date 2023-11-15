import {Component, OnInit} from '@angular/core';
import {TablasApiService} from "../../../services/tablas-api.service";
import {TableFee} from "../../../shared/Classes/table-fee";
import {UserServiceService} from "../../services/user-service/user-service.service";
import {SignupData} from "../../../shared/interfaces/signupdata";
@Component({
  selector: 'app-data-history',
  templateUrl: './data-history.component.html',
  styleUrls: ['./data-history.component.css']
})
export class DataHistoryComponent implements OnInit {
  datos: any;
  userData: SignupData | null = null;
  constructor(private tablasApiService: TablasApiService,private userService: UserServiceService) {}
  ngOnInit(): void {
    this.tablasApiService.getDatos().subscribe((data) => {
      this.datos =data;
      console.log(data);
    });
    this.userService.user$.subscribe((user) => {
      this.userData = user;
    });
  }
  borrarDato(id: number): void {
    console.log(`Borrando dato con ID: ${id}`);
    this.tablasApiService.deleteDataFromAPI(id).subscribe(() => {
      console.log('Dato borrado exitosamente');
      this.tablasApiService.getDatos().subscribe((data) => {
        this.datos = data;
      });
    });
  }

  table(data: any) {
    const { N, monto, Saldo, TEM, pSegDesPer, CF, SegRiePer, GastosAdm, tipoMoneda, cPG, fechaConsulta } = data;
    const tableFee: TableFee = new TableFee({N, monto, Saldo, TEM, pSegDesPer, CF, SegRiePer, GastosAdm, tipoMoneda, cPG, fechaConsulta});
    const table = tableFee.generate_Table();
    console.log("TABLA", table);
    return table;
  }

}
