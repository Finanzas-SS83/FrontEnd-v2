
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {UserServiceService} from "../user-service/user-service.service";
import {Observable, tap} from "rxjs";
import {SignupData} from "../../../shared/interfaces/signupdata";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private userService: UserServiceService) {}

  login(credentials: { email: string, password: string }): Observable<SignupData> {
    const loginUrl = `${this.apiUrl}/login`;

    return this.http.post<SignupData>(loginUrl, credentials).pipe(
      tap((user: SignupData) => {
        this.userService.setUser(user);
        // Guardar el usuario en el almacenamiento local
        localStorage.setItem('user', JSON.stringify(user));
      })
    );
  }

  logout(): void {
    // Lógica de cierre de sesión, por ejemplo, limpiar el usuario del servicio de usuario
    this.userService.setUser(null);
    // Eliminar el usuario del almacenamiento local
    localStorage.removeItem('user');
  }
}
