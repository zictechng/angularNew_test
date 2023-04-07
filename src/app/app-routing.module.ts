import { DomesticPinComponent } from './components/dashboard/domestic-pin/domestic-pin.component';
import { HomePageComponent } from './components/dashboard/home-page/home-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from './components/auth/auth-page/auth-page.component';
import { ResetPasswordPageComponent } from './components/auth/reset-password-page/reset-password-page.component';
import { RegisterPageComponent } from './components/auth/register-page/register-page.component';
import { WireTransferComponent } from './components/dashboard/wire-transfer/wire-transfer.component';
import { AccountStatementComponent } from './components/dashboard/account-statement/account-statement.component';
import { HistoryComponent } from './components/dashboard/history/history.component';
import { MyProfileComponent } from './components/dashboard/my-profile/my-profile.component';
import { SupportComponent } from './components/dashboard/support/support.component';
import { SettingComponent } from './components/dashboard/setting/setting.component';
import { DomesticTransferComponent } from './components/dashboard/domestic-transfer/domestic-transfer.component';
import { WirepinComponent } from './components/dashboard/wirepin/wirepin.component';
import { WirecotComponent } from './components/dashboard/wirecot/wirecot.component';
import { WireimfComponent } from './components/dashboard/wireimf/wireimf.component';
import { SuccessfulComponent } from './components/dashboard/successful/successful.component';
import { DomesticSuccessfulComponent } from './components/dashboard/domestic-successful/domestic-successful.component';
import { AccountOfficerComponent } from './components/dashboard/account-officer/account-officer.component';

const routes: Routes = [
  // pubic route here ...
  {path: '', component: AuthPageComponent },
  {path: 'login', component: AuthPageComponent },

  {path: 'register', component: RegisterPageComponent },
  {path: 'reset-password', component: ResetPasswordPageComponent },

  // private routes here ...
  {path: 'dashboard', component: HomePageComponent },
  {path: 'dashboard/index', component: HomePageComponent },
  {path: 'dashboard/wire-transfer', component: WireTransferComponent },
  {path: 'dashboard/account-statement', component: AccountStatementComponent },
  {path: 'dashboard/account-history', component: HistoryComponent },
  {path: 'dashboard/profile', component: MyProfileComponent },
  {path: 'dashboard/support', component: SupportComponent },
  {path: 'dashboard/user-setting', component: SettingComponent },
  {path: 'dashboard/domestic-transfer', component: DomesticTransferComponent },
  {path: 'dashboard/confirm-pin', component: WirepinComponent },
  {path: 'dashboard/confirm-cot', component: WirecotComponent },
  {path: 'dashboard/confirm-imf', component: WireimfComponent },
  {path: 'dashboard/transfer-successful', component: SuccessfulComponent },
  {path: 'dashboard/domestic-pin', component: DomesticPinComponent },
  {path: 'dashboard/domestic-successful', component: DomesticSuccessfulComponent },
  {path: 'dashboard/domestic-successful', component: DomesticSuccessfulComponent },
  {path: 'dashboard/officer-profile', component: AccountOfficerComponent },

  // {path: 'reset-password', component: HomePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
