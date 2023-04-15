import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

// base url of the server
const serverUrl = 'http://localhost:3500/';

@Injectable({
  providedIn: 'root'
})
export class ServiceDataService {
  backenServerUrl = 'http://localhost:3500/';
  recordId:any = '';
  userId : any = '';

    myLocalDatails: any

    defaultProfileImage:String = '';

    // get profile default profile image here
    getDefaultImage(){
    return this.defaultProfileImage = '/assets/img/profile/default_profile.png'; // this is for default image if user don't have
    }

    // get default profile local storage details
    getUserLocalInfomation(){
      return this.myLocalDatails = JSON.parse(localStorage.getItem('userData')|| '{}');
      }

    // server endpoint that receives information goes here
 private _userProfileUrl = serverUrl+'api/profile/';
 private _userFinancialUrl = serverUrl+'api/income_details/';
 private _userRecentRecordUrl = serverUrl+'api/recent_transactions/';
 private _userWireFundTransfer = serverUrl+'api/wire_transfer_funds/';
 private _userAccountStatement = serverUrl+'api/user_acct_statement';
 private _usertranTotalSummary = serverUrl+'api/user_acct_summary/';
 private _usertranHistory = serverUrl+'api/user_tran_history';
 private _blockUserAcctUrl = serverUrl+'api/block_user_acct';
 private _accountOfficerUrl = serverUrl+'api/officer_details';
 private _registerOfficerUrl = serverUrl+'api/add_officer';
 private _ticketSubmitUrl = serverUrl+'api/submit_ticket';
 private _investPlanSubmitUrl = serverUrl+'api/submit_investment';
 private _financeChartUrl = serverUrl+'api/user_finance_chart/';

 // admin route goes here
 private _getAllUserUrl = serverUrl+'api/all-users';
 private _getAllActiveUserUrl = serverUrl+'api/active-users';
 private _getAllUserTransactionUrl = serverUrl+'api/users-transactions';
 private _getUserInvestmentUrl = serverUrl+'api/users-investments';
 private _getUserDetailsUrl = serverUrl+'api/user-details';
 private _regNewUserUrl = serverUrl+'api/add-user';
 private _userDataFetchEditUrl = serverUrl+'api/fetch_edit_user/';
 private _updateDataDetailUrl = serverUrl+'api/update_user';
 private _deleteUserDetailsUrl = serverUrl+'api/delete_user_details/';
 private _fetchPendingUserUrl = serverUrl+'api/pending_users/';
 private _userTransactionsUrl = serverUrl+'api/user_tran';
 private _deleteTransactionsUrl = serverUrl+'api/delete_transactions/';
 private _updateAngroInvestUrl = serverUrl+'api/update_angro_invest';
 private _updateStockInvestUrl = serverUrl+'api/update_stock_invest';
 private _updateFXInvestUrl = serverUrl+'api/update_fx_invest';
 private _allAdminInvestPlanUrl = serverUrl+'api/all_invest_plan';
 private _allInvestorsDataUrl = serverUrl+'api/all_investors';
 private _investorsAnalysisDataUrl = serverUrl+'api/investors_analysis';
 private _investorsDeleteDataUrl = serverUrl+'api/delete_investors/';
 private _investorsEarningDataUrl = serverUrl+'api/investors_earnings';
 private _approveInvestorsInvestUrl = serverUrl+'api/approve_invest_investors/';
 private _adminUserUrl = serverUrl+'api/admin_users';
 private _registerAdminUserUrl = serverUrl+'api/register_admin_users';
 private _updateAdminUserDetailsUrl = serverUrl+'api/update_admin_users';

 private _userLogActivityUrl = serverUrl+'api/user_logs';
 private _userSystemActivityUrl = serverUrl+'api/user_system_logs';
 private _systemLogsDeleteUrl = serverUrl+'api/system_logs_delete/';
 private _updateOfficerDetailsUrl = serverUrl+'api/update_officer';






 constructor(private http: HttpClient,
   private _router: Router) { }

  // get user profile details here
getMyData(id:any){
  return this.http.get<any>(this._userProfileUrl + id);
}
// get user profile details here
getMyIncomeFlow(user_id:any){
  return this.http.get<any>(this._userFinancialUrl + user_id);
}
// get user profile details here
getRecentRecord(user_id:any){
  return this.http.get<any>(this._userRecentRecordUrl + user_id);
}

// fund transfer request goes here
wireTransferFunds(transactionData:any){
  return this.http.post<any>(this._userWireFundTransfer, transactionData);
}

// get user account statement here
getUserAcctStatement(page: number, pageSize: number, id: any){
  return this.http.get<any>(this._userAccountStatement+'?page='+page+'&pageSize='+pageSize+'&id='+id);
}

// get user account summary statement and sum them out here
getUserAcctSummary(myId: string){
  return this.http.get<any>(this._usertranTotalSummary + myId);
}

// get user account history here
getUserTranHistory(page: number, pageSize: number, id: any){
  return this.http.get<any>(this._usertranHistory+'?page='+page+'&pageSize='+pageSize+'&id='+id);
}

// User request to block their account
userAcctBlocked(userID: any){
  return this.http.post<any>(this._blockUserAcctUrl, userID)
}

// User request to block their account
officerAcctDetails(){
  return this.http.get<any>(this._accountOfficerUrl)
}

// User request to block their account
registerOfficerDetails(officerData:any){
  return this.http.post<any>(this._registerOfficerUrl, officerData)
}

// Submit ticket request goes here
sendTicket(ticketData:any){
  return this.http.post<any>(this._ticketSubmitUrl, ticketData)
}

// Submit ticket request goes here
sendInvestment(investData:any){
  return this.http.post<any>(this._investPlanSubmitUrl, investData)
}

// Submit ticket request goes here
financeChartReport(userID:any){
  return this.http.get<any>(this._financeChartUrl + userID)
}

// admin routes goes here

// fetch all user accounts
fetchAllUsers(){
  return this.http.get<any>(this._getAllUserUrl);
}


// fetch all active users accounts
fetchActiveUsers(){
  return this.http.get<any>(this._getAllActiveUserUrl);
}
// user all transactions
fetchUsersTransaction(){
  return this.http.get<any>(this._getAllUserTransactionUrl);
}

// user investment transactions
fetchUsersInvestment(){
  return this.http.get<any>(this._getUserInvestmentUrl);
}

// user investment transactions
fetchUsersAll(page: number, pageSize: number){
  return this.http.get<any>(this._getUserDetailsUrl+'?page='+page+'&pageSize='+pageSize);
}

// register new user account
regUserNew(userData: any){
  return this.http.post<any>(this._regNewUserUrl, userData);
}

// fetch edit user account
fetchEditUser(user_ID: any){
  return this.http.get<any>(this._userDataFetchEditUrl + user_ID);
}

// post reguest to update user details
updateUserDetail(updateData: any){
  return this.http.post<any>(this._updateDataDetailUrl, updateData);
}

// delete user details
deleteUserDetail(deleteID: any){
  return this.http.delete<any>(this._deleteUserDetailsUrl+ deleteID);
}

// get pending user details
fetchPendingUser(page: number, pageSize: number){
  return this.http.get<any>(this._fetchPendingUserUrl+'?page='+page+'&pageSize='+pageSize);
}

// get all transaction done by user details
getAllTran(page: number, pageSize: number){
  return this.http.get<any>(this._userTransactionsUrl+'?page='+page+'&pageSize='+pageSize);
}

// get all transaction done by user details
deleteTranRecord(deleID: any){
  return this.http.delete<any>(this._deleteTransactionsUrl + deleID);
}

// post angro investment RIO update by admin
angroInvestUpdateRecord(starterData: any){
  return this.http.post<any>(this._updateAngroInvestUrl, starterData);
}

// post stock investment RIO update by admin
stockInvestUpdateRecord(stockData: any){
  return this.http.post<any>(this._updateStockInvestUrl, stockData);
}

// post fx investment RIO update by admin
fxInvestUpdateRecord(fxData: any){
  return this.http.post<any>(this._updateFXInvestUrl, fxData);
}

// post fx investment RIO update by admin
getAllAdminInvest(){
  return this.http.get<any>(this._allAdminInvestPlanUrl);
}

// fetch all investors data by admin
getAllInvestors(page: number, pageSize: number){
  return this.http.get<any>(this._allInvestorsDataUrl+'?page='+page+'&pageSize='+pageSize);
}
// fetch all investors data by admin
getAllInvestorsEarnings(page: number, pageSize: number){
  return this.http.get<any>(this._investorsEarningDataUrl+'?page='+page+'&pageSize='+pageSize);
}
// fetch all investors data by admin
getInvestorsAnalysis(){
  return this.http.get<any>(this._investorsAnalysisDataUrl);
}

// fetch all investors data by admin
investorsDelete(id:any){
  return this.http.delete<any>(this._investorsDeleteDataUrl + id);
}

// approve investor investment data by admin
investorsApproval(id:any){
  return this.http.delete<any>(this._approveInvestorsInvestUrl + id);
}
// get all admin users data by admin
fetchAdminUser(page: number, pageSize: number){
  return this.http.get<any>(this._adminUserUrl+'?page='+page+'&pageSize='+pageSize);
}

// register new admin users data by admin
registerAdminUser(adminData: any){
  return this.http.post<any>(this._registerAdminUserUrl, adminData);
}

// update admin users data by admin
updateAdminUser(updateData: any){
  return this.http.post<any>(this._updateAdminUserDetailsUrl, updateData);
}

// get all users log activities from the system request
logUserActivity(page: number, pageSize: number) {
  return this.http.get<any>(this._userLogActivityUrl+'?page='+page+'&pageSize='+pageSize);
}

// get all users system activities from the system request
systemActivityLog(page: number, pageSize: number) {
  return this.http.get<any>(this._userSystemActivityUrl+'?page='+page+'&pageSize='+pageSize);
}

// delete system activities logs data by admin
deleteSystemLogs(id:any){
  return this.http.delete<any>(this._systemLogsDeleteUrl + id);
}

// delete system activities logs data by admin
updateOfficerProfile(officerData:any){
  return this.http.post<any>(this._updateOfficerDetailsUrl , officerData);
}

}
