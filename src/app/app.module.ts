import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderContentComponent } from './PlandePagos/components/header-content/header-content.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import { HomeComponent } from './PlandePagos/components/home/home.component';
import { SignupComponent } from './PlandePagos/components/signup/signup.component';
import { LoginComponent } from './PlandePagos/components/login/login.component';
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    AppComponent,
    HeaderContentComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,

  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatInputModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        MatButtonModule,

    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
