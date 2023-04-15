import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as Notiflix from 'notiflix';
import { ServiceDataService } from 'src/app/services/service-data.service';
import { TransactionsService } from 'src/app/services/transactions.service';
import { userLevelAccess } from 'src/app/services/userLevel.service';

@Component({
  selector: 'app-admin-investment-earning',
  templateUrl: './admin-investment-earning.component.html',
  styleUrls: ['./admin-investment-earning.component.css']
})
export class AdminInvestmentEarningComponent implements OnInit{


  angroInvestmentCount: any;
  stockInvestmentCount: any =[];
  fxInvestmentCount: any =[];

  allEarning: any = [];

  isLoading: boolean = false;

  myLocalDatails = JSON.parse(localStorage.getItem('userData')|| '{}');

  displayName = "";
  userID = "";
  investType = "";
  investName = "";
  investAmount = "";
  investPersonID = "";

  total_count : any;

  totalRecord: number = 0;
  pagination: number = 1;
  pageSize: number = 15;
  totalPages: number = 1;

  userProfilePic ="";
  defaultDetailsLocalStorage: any;

  defaultImageProfile = "<span class='badge badge-center rounded-pill bg-label-warning w-px-30 h-px-30 me-2'><i class='bx bx-user bx-xs'></i></span>";

  isFormSubmit = false;
  isDeleteSubmit = false;
  formDataReceive:any = {};
  deleteID = '';
  confirmModalActive: boolean = false;

  earningCreditForm = new FormGroup({
    invest_plan: new FormControl('', [Validators.required]),
    invest_type: new FormControl('', [Validators.required]),
    sending_amt: new FormControl('', [Validators.required]),
    credit_date: new FormControl('', Validators.required),
    credit_note: new FormControl('', [Validators.required, Validators.maxLength(250)]),
    credit_receiver_id: new FormControl('', [Validators.required]),
    credit_record_id: new FormControl('', [Validators.required]),
    creditor_name: new FormControl('', [Validators.required]),
  });

  constructor(private _dataService: ServiceDataService,
    private _router: Router,
    private _transService: TransactionsService,
    private _authLevel: userLevelAccess){}

  ngOnInit(): void {
    this.fetchAllEarning();
    this.fetchInvestmentCount();
  }

  fetchAllEarning(){
    this.isLoading=true;
    setTimeout(() => {
      this._dataService.getAllInvestorsEarnings(this.pagination, this.pageSize).subscribe(res =>{
      this.allEarning = res.data;
      this.totalRecord = res.total_record;
      this.totalPages = window.Math.ceil(this.totalRecord/this.pageSize);
      this.userProfilePic = this._dataService.backenServerUrl;
      this.isLoading=false;
      //console.log("All Transaction", this.allEarning)
      })
    }, 500);

  }

  reloadAllEarning(){
      this._dataService.getAllInvestorsEarnings(this.pagination, this.pageSize).subscribe(res =>{
      this.allEarning = res.data;
      this.totalRecord = res.total_record;
      this.totalPages = window.Math.ceil(this.totalRecord/this.pageSize);
      this.userProfilePic = this._dataService.backenServerUrl;
      })
    }
    renderPage(event: number) {
    this.pagination = event;
    this.reloadAllEarning();
  }

  fetchInvestmentCount(){
    this.isLoading=true;
    setTimeout(() => {
      this._dataService.getInvestorsAnalysis().subscribe(res =>{
      this.angroInvestmentCount = res.data;
      this.stockInvestmentCount = res.stock_investor;
      this.fxInvestmentCount = res.fx_investors;
      this.isLoading=false;
      //console.log("All Active Users", this.activeUser)
      })
    }, 500);

  }

  obj2 = {
    "tid": (this.randomString(25)),
    'sender_id': this.myLocalDatails._id,
  };

  creditInvestors(){
    this.isDeleteSubmit = true
    this.isFormSubmit = true;
    if(this.earningCreditForm.invalid){
      this.isDeleteSubmit = false
      this.closeConfirmModal();
     }
     else if(this.earningCreditForm.valid){

      this.formDataReceive = this.earningCreditForm.value
      const merged = Object.assign(this.formDataReceive, this.obj2 );
      //console.log("Data received ", merged)
       this._transService.creditInvestorsROI(merged).subscribe(res =>{
        if(res.msg == '201'){
          Notiflix.Notify.success('Account Credited Successfully', {
            width: '400px',
            showOnlyTheLastOne: true,
            position: 'center-bottom',
            fontSize: '18px',
          });
          this.closeConfirmModal();
          this.closeCreditModal();
          this.reloadAllEarning();
        }
        else{
          Notiflix.Notify.failure('Failed, something went wrong', {
            width: '400px',
            showOnlyTheLastOne: true,
            position: 'center-bottom',
            fontSize: '18px',
          });
          this.closeConfirmModal();
          this.closeCreditModal();
        }

        }, err =>{
          if(err.status == "402"){
            Notiflix.Notify.failure('Error! Account not found.', {
              width: '350px',
              showOnlyTheLastOne: true,
              position: 'center-bottom',
              fontSize: '18px',
            });
            } else if(err.status == "403"){

              Notiflix.Notify.failure('Error, Account not active', {
                width: '350px',
                showOnlyTheLastOne: true,
                position: 'center-bottom',
                fontSize: '18px',
              });
              }
              else if(err.status == "401"){

                Notiflix.Notify.failure('Failed, Investment not approved', {
                  width: '350px',
                  showOnlyTheLastOne: true,
                  position: 'center-bottom',
                  fontSize: '18px',
                });
                }
              else if(err.status == "405"){
                Notiflix.Notify.failure('Failed, Account balance is low', {
                  width: '350px',
                  showOnlyTheLastOne: true,
                  position: 'center-bottom',
                  fontSize: '18px',
                });
           }
              else if(err.status == "500"){
                Notiflix.Notify.failure('Sorry, Server error! Try again', {
                  width: '350px',
                  showOnlyTheLastOne: true,
                  position: 'center-bottom',
                  fontSize: '17px',
                });
              }
          this.isDeleteSubmit = false;
          this.closeConfirmModal();
          })
     }
  }

  // credit user account modal dialog here
  displayStyle = "none";
  displayStyleConfirm = "none";
  openCreditModal(id: any, investUserName:any, investType:any, investName:any, investUserID:any) {
    this.userID = id;
    //console.log("Record ID: " + this.userID)
    this.displayName = investUserName;
    this.investType = investType;
    this.investName = investName;
    this.investPersonID = investUserID;
    // use patched value to set form value when you want to do update of user details
    this.earningCreditForm.patchValue({
      credit_receiver_id: this.investPersonID,
      invest_plan: this.investName,
      invest_type: this.investType,
      credit_record_id: this.userID,
      creditor_name: this.displayName

    });
    //console.log("confirm delete", id, bal);
    this.displayStyle = "block";
  }
  closeCreditModal() {
    this.displayStyle = "none";
    this.userID ='';
    this.earningCreditForm.reset();
    this.isFormSubmit = false;
    this.isDeleteSubmit =false
  }

  // confirm before crediting user account modal dialog here
  openConfirmModal() {
    this.displayStyleConfirm = "block";
    this.isFormSubmit =true;
    this.confirmModalActive = true;
  }
  closeConfirmModal() {
    this.displayStyleConfirm = "none";
    this.isDeleteSubmit =false
    this.confirmModalActive = false;
  }

  // generate random string for tracking transaction
  randomString(length: any) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  }
}
