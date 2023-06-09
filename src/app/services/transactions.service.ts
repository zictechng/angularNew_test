import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

// base url of the server
const serverUrl = 'http://localhost:3500/';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

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
 //private _userProfileUrl = serverUrl+'api/profile/';
 private _userFinancialUrl = serverUrl+'api/income_details/';
 private _userRecentRecordUrl = serverUrl+'api/recent_transactions/';
 private _userWireFundTransfer = serverUrl+'api/wire_transfer_funds';
 private _pinConfirm = serverUrl+'api/confirm_pin';
 private _cotConfirm = serverUrl+'api/cot_confirm';
 private _imfConfirm = serverUrl+'api/imf_confirm';
 private _getFundTransferDetails = serverUrl+'api/wire_fund_send/';
 private _domesticFundTransferUrl = serverUrl+'api/domestic_fund_send/';
 private _domesticPinUrl = serverUrl+'api/domestic_pin/';
 private _userCreditUrl = serverUrl+'api/credit_user';
 private _usersDebitUrl = serverUrl+'api/debit_user';
 private _creditInvestorsDataUrl = serverUrl+'api/credit_investors';


 constructor(private http: HttpClient,
   private _router: Router) { }

//   // get user profile details here
// getMyData(id:any){
//   return this.http.get<any>(this._userProfileUrl + id);
// }
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

// confirm wire pin fund transfer request goes here
wirePinConfirm(pinData:any){
  return this.http.post<any>(this._pinConfirm, pinData);
}

// confirm wire cot code fund transfer request goes here
wireCOTConfirm(cotData:any){
  return this.http.post<any>(this._cotConfirm, cotData);
}

// confirm wire IMF code fund transfer request goes here
wireIMFConfirm(imfData:any){
  return this.http.post<any>(this._imfConfirm, imfData);
}

// get fund transfer details to success page goes here
wireFundSendDetails(tid_record:any){
  return this.http.get<any>(this._getFundTransferDetails + tid_record);
}

// domestic fund transfer goes here
domesticFundTransfer(transferData:any){
  return this.http.post<any>(this._domesticFundTransferUrl , transferData);
}

// domestic pin fund transfer goes here
domesticPinConfirm(dPinData:any){
  return this.http.post<any>(this._domesticPinUrl , dPinData);
}

// Admin credit users account goes here
postUserCredit(creditData:any){
  return this.http.post<any>(this._userCreditUrl , creditData);
}

// Admin debit users account goes here
postUserDebit(debitData:any){
  return this.http.post<any>(this._usersDebitUrl , debitData);
}

// Credit investors account for investment done by admin
creditInvestorsROI(creditUData:any){
  return this.http.post<any>(this._creditInvestorsDataUrl, creditUData);
}

}
