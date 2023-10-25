import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from "../../services/login-service/login.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: boolean = false;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;

      this.loginService.login(formData.email, formData.password).subscribe(
        (success) => {
          if (success) {

              this.router.navigate(['/home', { email: formData.email }]);
          } else {
            this.loginError = true;
          }
        },
        (error) => {
          this.loginError = true;
          console.error('Error en la solicitud de inicio de sesión:', error);
        }
      );
    }
  }
}
