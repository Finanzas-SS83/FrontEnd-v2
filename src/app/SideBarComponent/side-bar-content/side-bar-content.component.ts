import { Component, OnInit } from '@angular/core';
import { UserServiceService} from "../../PlandePagos/services/user-service/user-service.service";
import { SignupData} from "../../shared/interfaces/signupdata";

@Component({
  selector: 'app-side-bar-content',
  templateUrl: './side-bar-content.component.html',
  styleUrls: ['./side-bar-content.component.css']
})
export class SideBarContentComponent implements OnInit {
  userData: SignupData | null = null;

  constructor(private userService: UserServiceService) {}

  ngOnInit() {


    this.userService.user$.subscribe((user) => {
      this.userData = user;
    });
  }
}


