import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderContentComponent } from './PlandePagos/components/header-content/header-content.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import { SideBarContentComponent } from './SideBarComponent/side-bar-content/side-bar-content.component';
import { ConsultaPageComponent } from './Consulta/consulta-page/consulta-page.component';
import { HomeContentComponent } from './home-content/home-content.component';
import {MatCardModule} from "@angular/material/card";
import { TableCuotaComponent } from './Consulta/table-cuota/table-cuota.component';
import {MatTableModule} from "@angular/material/table";
import {FormContentComponent} from "./Consulta/form-content/form-content.component";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {PageNotFoundComponent} from "./PlandePagos/components/page-not-found/page-not-found.component";
import {DataHistoryComponent} from "./PlandePagos/components/data-history/data-history.component";
import { HttpClientModule } from '@angular/common/http';
import {LoginComponent} from "./PlandePagos/components/login/login.component";
import {SignupComponent} from "./PlandePagos/components/signup/signup.component";
import { SessionContentComponent } from './Consulta/session-content/session-content.component';
import { ProfileComponent } from './PlandePagos/components/profile/profile.component'; // Importa HttpClientModule

@NgModule({
  declarations: [
    AppComponent,
    HeaderContentComponent,
    SideBarContentComponent,
    ConsultaPageComponent,
    HomeContentComponent,
    FormContentComponent,
    PageNotFoundComponent,
    DataHistoryComponent,
    LoginComponent,
    SignupComponent,
    SessionContentComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    TableCuotaComponent,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatButtonModule,
    HttpClientModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
