import { ReportDetailComponent } from './components/main/report/detail/reportDetail.component';
import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ReportService } from './services/report.service';

import { LoginComponent } from './components/main/login/login.component';
import { MailService } from './services/mail.service';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ProspectService } from './services/prospect.service';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { APP_ROUTING } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorStateMatcher, MatSliderModule, ShowOnDirtyErrorStateMatcher } from '@angular/material';
import { HeaderComponent } from './components/shared/header/header.component';
import { MaterialModule } from './material.module';
import { ProspectComponent } from './components/main/prospect/prospect.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GeneralService } from './services/general.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ModalComponent } from './components/shared/modal/modal.component';
import { RECAPTCHA_SETTINGS, RecaptchaSettings, RecaptchaModule, RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from "ng-recaptcha";
import { FormComponent } from './components/main/form/form.component';
import { ValidationService } from './services/validation.service';
import { ReportComponent } from './components/main/report/report.component';
import { PaginacionSetComponent } from './components/shared/pagination/paginacion-set.component';
import { PaginacionInfoComponent } from './components/shared/pagination/paginacion-info.component';
import { CommonModule } from '@angular/common';
import { PaginacionModule } from './components/shared/pagination/paginacion.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProspectComponent,
    ModalComponent,
    ReportDetailComponent,
    LoginComponent,
    FormComponent,
    ReportComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    APP_ROUTING,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    RecaptchaModule
  ],
  providers: [
    ProspectService,
    GeneralService,
    MailService,
    ValidationService,
    ReportService,
    BsDropdownConfig
  ],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent,ReportDetailComponent]
})
export class AppModule { }