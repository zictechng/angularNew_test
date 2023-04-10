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
import { StockInvestmentComponent } from './components/dashboard/stock-investment/stock-investment.component';
import { AngroInvestmentComponent } from './components/dashboard/angro-investment/angro-investment.component';
import { FxInvestmentComponent } from './components/dashboard/fx-investment/fx-investment.component';
import { IsAuthenticatedGuard } from './services/is-authenticated.guard';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AdminAllUsersComponent } from './components/admin/admin-all-users/admin-all-users.component';
import { AdminPendingAccountComponent } from './components/admin/admin-pending-account/admin-pending-account.component';
import { AdminTransactionComponent } from './components/admin/admin-transaction/admin-transaction.component';
import { AdminCreditComponent } from './components/admin/admin-credit/admin-credit.component';
import { AdminDebitComponent } from './components/admin/admin-debit/admin-debit.component';
import { AdminInvestComponent } from './components/admin/admin-invest/admin-invest.component';
import { AdminUsersComponent } from './components/admin/admin-users/admin-users.component';
import { AdminSystemLogComponent } from './components/admin/admin-system-log/admin-system-log.component';
import { AdminAllLogComponent } from './components/admin/admin-all-log/admin-all-log.component';

const routes: Routes = [
  // pubic route here ...
  {path: '', component: AuthPageComponent },
  {path: 'login', component: AuthPageComponent },

  {path: 'register', component: RegisterPageComponent },
  {path: 'reset-password', component: ResetPasswordPageComponent },

  // private routes here ...
  {path: 'dashboard', component: HomePageComponent,
  canActivate:[IsAuthenticatedGuard] },
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
  {path: 'dashboard/stock-invest', component: StockInvestmentComponent },
  {path: 'dashboard/agro-invest', component: AngroInvestmentComponent },
  {path: 'dashboard/fx-invest', component: FxInvestmentComponent },


  //Admin routes start from here
  {path: 'admin', component: AdminHomeComponent},
  {path: 'admin/all-users', component: AdminAllUsersComponent},
  {path: 'admin/pending-account', component: AdminPendingAccountComponent},
  {path: 'admin/all-transactions', component: AdminTransactionComponent},
  {path: 'admin/credit-account', component: AdminCreditComponent},
  {path: 'admin/debit-account', component: AdminDebitComponent},
  {path: 'admin/user-investment', component: AdminInvestComponent},
  {path: 'admin/admin-users', component: AdminUsersComponent},
  {path: 'admin/users-logs', component: AdminSystemLogComponent},
  {path: 'admin/system-logs', component: AdminAllLogComponent},
  // {path: 'reset-password', component: HomePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
