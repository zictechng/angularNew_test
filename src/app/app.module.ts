import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/partials/nav-bar/nav-bar.component';
import { SideBarComponent } from './components/partials/side-bar/side-bar.component';
import { AuthPageComponent } from './components/auth/auth-page/auth-page.component';
import { HomePageComponent } from './components/dashboard/home-page/home-page.component';
import { RegisterPageComponent } from './components/auth/register-page/register-page.component';
import { ResetPasswordPageComponent } from './components/auth/reset-password-page/reset-password-page.component';
import { FooterComponent } from './components/dashboard/footer/footer.component';
import { NavDropMenuComponent } from './components/partials/nav-drop-menu/nav-drop-menu.component';
import { NavNotificationComponent } from './components/partials/nav-notification/nav-notification.component';
import { WireTransferComponent } from './components/dashboard/wire-transfer/wire-transfer.component';
import { DomesticTransferComponent } from './components/dashboard/domestic-transfer/domestic-transfer.component';
import { AccountStatementComponent } from './components/dashboard/account-statement/account-statement.component';
import { HistoryComponent } from './components/dashboard/history/history.component';
import { MyProfileComponent } from './components/dashboard/my-profile/my-profile.component';
import { SupportComponent } from './components/dashboard/support/support.component';
import { AccountSettingComponent } from './components/dashboard/account-setting/account-setting.component';
import { SettingComponent } from './components/dashboard/setting/setting.component';
import { AuthServiceService } from './services/auth-service.service';
import { WirepinComponent } from './components/dashboard/wirepin/wirepin.component';
import { WirecotComponent } from './components/dashboard/wirecot/wirecot.component';
import { WireimfComponent } from './components/dashboard/wireimf/wireimf.component';
import { SuccessfulComponent } from './components/dashboard/successful/successful.component';
import { DomesticPinComponent } from './components/dashboard/domestic-pin/domestic-pin.component';
import { DomesticSuccessfulComponent } from './components/dashboard/domestic-successful/domestic-successful.component';
import { AccountOfficerComponent } from './components/dashboard/account-officer/account-officer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SideBarComponent,
    AuthPageComponent,
    HomePageComponent,
    RegisterPageComponent,
    ResetPasswordPageComponent,
    FooterComponent,
    NavDropMenuComponent,
    NavNotificationComponent,
    WireTransferComponent,
    DomesticTransferComponent,
    AccountStatementComponent,
    HistoryComponent,
    MyProfileComponent,
    SupportComponent,
    AccountSettingComponent,
    SettingComponent,
    WirepinComponent,
    WirecotComponent,
    WireimfComponent,
    SuccessfulComponent,
    DomesticPinComponent,
    DomesticSuccessfulComponent,
    AccountOfficerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [
    AuthServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
