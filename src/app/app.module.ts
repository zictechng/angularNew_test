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
import { StockInvestmentComponent } from './components/dashboard/stock-investment/stock-investment.component';
import { AngroInvestmentComponent } from './components/dashboard/angro-investment/angro-investment.component';
import { FxInvestmentComponent } from './components/dashboard/fx-investment/fx-investment.component';
import { IsAuthenticatedGuard } from './services/is-authenticated.guard';
import { userLevelAccess } from './services/userLevel.service';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AdminSideBarComponent } from './components/partials/admin-side-bar/admin-side-bar.component';
import { AdminAllUsersComponent } from './components/admin/admin-all-users/admin-all-users.component';
import { AdminPendingAccountComponent } from './components/admin/admin-pending-account/admin-pending-account.component';
import { AdminTransactionComponent } from './components/admin/admin-transaction/admin-transaction.component';
import { AdminCreditComponent } from './components/admin/admin-credit/admin-credit.component';
import { AdminDebitComponent } from './components/admin/admin-debit/admin-debit.component';
import { AdminInvestComponent } from './components/admin/admin-invest/admin-invest.component';
import { AdminUsersComponent } from './components/admin/admin-users/admin-users.component';
import { AdminSystemLogComponent } from './components/admin/admin-system-log/admin-system-log.component';
import { AdminAllLogComponent } from './components/admin/admin-all-log/admin-all-log.component';

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
    AccountOfficerComponent,
    StockInvestmentComponent,
    AngroInvestmentComponent,
    FxInvestmentComponent,
    AdminHomeComponent,
    AdminSideBarComponent,
    AdminAllUsersComponent,
    AdminPendingAccountComponent,
    AdminTransactionComponent,
    AdminCreditComponent,
    AdminDebitComponent,
    AdminInvestComponent,
    AdminUsersComponent,
    AdminSystemLogComponent,
    AdminAllLogComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,


  ],
  providers: [
    AuthServiceService, IsAuthenticatedGuard,
    userLevelAccess
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
