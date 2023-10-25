import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from "../../services/login-service/login.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    firstName: string = '';
    lastName: string = '';
    userEmail: string | null = null;

    constructor(private route: ActivatedRoute, private loginService: LoginService) {}

    ngOnInit() {
        // Obtiene el email del usuario desde el enrutamiento
        this.userEmail = this.route.snapshot.paramMap.get('email');

        if (this.userEmail) {
            // Utiliza el email para obtener los datos del usuario desde el fake API
            this.loginService.getUserData(this.userEmail).subscribe((userData) => {
                if (userData) {
                    this.firstName = userData.firstName;
                    this.lastName = userData.lastName;
                }
            });
        }
    }
}
