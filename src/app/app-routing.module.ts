import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HeaderContentComponent} from "./PlandePagos/components/header-content/header-content.component";
import {ConsultaPageComponent} from "./Consulta/consulta-page/consulta-page.component";
import {FormContentComponent} from "./Consulta/form-content/form-content.component";
import {PageNotFoundComponent} from "./PlandePagos/components/page-not-found/page-not-found.component";
import {DataHistoryComponent} from "./PlandePagos/components/data-history/data-history.component";
import {LoginComponent} from "./PlandePagos/components/login/login.component";
import {SignupComponent} from "./PlandePagos/components/signup/signup.component";
import {SessionContentComponent} from "./Consulta/session-content/session-content.component";
import {ProfileComponent} from "./PlandePagos/components/profile/profile.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'home', component: FormContentComponent},
  {path: 'historial', component: DataHistoryComponent},
  {path: 'form', component: FormContentComponent },
  {path: 'consulta', component:ConsultaPageComponent },
  {path: 'header', component:HeaderContentComponent },
  {path: 'login', component: LoginComponent },
  {path: 'signup', component: SignupComponent },
  {path: 'session', component: SessionContentComponent },
  { path: 'profile/:studentId', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
