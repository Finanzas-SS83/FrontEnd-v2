import {Component, OnInit} from '@angular/core';
import {TablasApiService} from "../../../services/tablas-api.service";

@Component({
  selector: 'app-data-history',
  templateUrl: './data-history.component.html',
  styleUrls: ['./data-history.component.css']
})
export class DataHistoryComponent implements OnInit {
  datos: any;

  constructor(private tablasApiService: TablasApiService) {}

  ngOnInit(): void {
    this.tablasApiService.getDatos().subscribe((data) => {
      this.datos = data;
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


}
