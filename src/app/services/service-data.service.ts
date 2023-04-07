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




}
