import {Component, OnInit} from '@angular/core';
import {TablasApiService} from "../../../services/tablas-api.service";
import {UserServiceService} from "../../services/user-service/user-service.service";
import {SignupData} from "../../interfaces/signupdata";

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
      this.datos = data;
      this.userService.user$.subscribe((user) => {
        this.userData = user;
      });

    });
  }
}
