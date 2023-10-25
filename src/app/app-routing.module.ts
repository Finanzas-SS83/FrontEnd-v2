import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./PlandePagos/components/home/home.component";
import {LoginComponent} from "./PlandePagos/components/login/login.component";
import {SignupComponent} from "./PlandePagos/components/signup/signup.component";

const routes: Routes = [


  { path: '', redirectTo: '/card', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
