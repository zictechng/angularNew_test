import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as Notiflix from 'notiflix';
import { ServiceDataService } from 'src/app/services/service-data.service';
import { TransactionsService } from 'src/app/services/transactions.service';
import { userLevelAccess } from 'src/app/services/userLevel.service';

@Component({
  selector: 'app-admin-invest',
  templateUrl: './admin-invest.component.html',
  styleUrls: ['./admin-invest.component.css']
})
export class AdminInvestComponent implements OnInit{


  angroInvestmentCount: any;
  stockInvestmentCount: any =[];
  fxInvestmentCount: any =[];

  allInvestorsData: any = [];

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

  creditForm = new FormGroup({
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
    this.fetchAllInvestors();
    this.fetchInvestmentCount();
  }

  fetchAllInvestors(){
    this.isLoading=true;
    setTimeout(() => {
      this._dataService.getAllInvestors(this.pagination, this.pageSize).subscribe(res =>{
      this.allInvestorsData = res.data;
      this.totalRecord = res.total_record;
      this.totalPages = window.Math.ceil(this.totalRecord/this.pageSize);
      this.userProfilePic = this._dataService.backenServerUrl;
      this.isLoading=false;
      //console.log("All Transaction", this.allInvestorsData)
      })
    }, 500);

  }

  reloadAllInvestors(){
      this._dataService.getAllInvestors(this.pagination, this.pageSize).subscribe(res =>{
      this.allInvestorsData = res.data;
      this.totalRecord = res.total_record;
      this.totalPages = window.Math.ceil(this.totalRecord/this.pageSize);
      this.userProfilePic = this._dataService.backenServerUrl;
      })
    }
    renderPage(event: number) {
    this.pagination = event;
    this.reloadAllInvestors();
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

  creditUser(){
    this.isDeleteSubmit = true
    this.isFormSubmit = true;
    if(this.creditForm.invalid){
      this.isDeleteSubmit = false
      this.closeConfirmCreditModal()
     }
     else if(this.creditForm.valid){

      this.formDataReceive = this.creditForm.value
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
          this.closeConfirmCreditModal();
          this.closeCreditModal();
          this.reloadAllInvestors();
        }
        else{
          Notiflix.Notify.failure('Failed, something went wrong', {
            width: '400px',
            showOnlyTheLastOne: true,
            position: 'center-bottom',
            fontSize: '18px',
          });
          this.closeConfirmCreditModal();
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
          this.closeConfirmCreditModal();
          })
     }
  }

//delete user record from table
deleteInvestors(){
  this.isDeleteSubmit = true
  //console.log("Deleted ID", this.deleteID);
  this._dataService.investorsDelete(this.deleteID).subscribe(res =>{
    if(res.msg == 200){
      Notiflix.Notify.success('Deleted successfully', {
        width: '350px',
        showOnlyTheLastOne: true,
        fontSize: '18px',
        position: 'center-bottom',
      });
      this.reloadAllInvestors();
      this.closeConfirmDelete();
      this.isDeleteSubmit = false;
    }
    else{
      Notiflix.Notify.warning('Failed to delete', {
        width: '350px',
        showOnlyTheLastOne: true,
        fontSize: '18px',
        position: 'center-bottom',
      });
      this.reloadAllInvestors();
      this.closeConfirmDelete();
      this.isDeleteSubmit = false;
    }
  }, err =>{
  if(err.status == "500"){
   Notiflix.Notify.warning('Error! Server error occurred', {
      width: '350px',
      showOnlyTheLastOne: true,
      fontSize: '18px',
      position: 'center-bottom',
    });
    console.log(err.message)
    this.closeConfirmDelete()
    this.isDeleteSubmit = false;
  }
  else if(err.status == 403){

    Notiflix.Notify.failure('Error! Record not found', {
      width: '350px',
      showOnlyTheLastOne: true,
      fontSize: '18px',
      position: 'center-bottom',
    });
    this.isDeleteSubmit = false;
    this.closeConfirmDelete()
  }
  else if(err.status === 404){
   Notiflix.Notify.failure('Sorry! Record not deleted', {
      width: '350px',
      showOnlyTheLastOne: true,
      fontSize: '18px',
      position: 'center-bottom',
    });
  }
  this.closeConfirmDelete()
  this.isDeleteSubmit = false;

}
  );
}

//approve investor investment
approveInvestors(){
  this.isDeleteSubmit = true
  //console.log("Deleted ID", this.deleteID);
  this._dataService.investorsApproval(this.deleteID).subscribe(res =>{
    if(res.msg == 200){
      Notiflix.Notify.success('Investment approved successfully', {
        width: '400px',
        showOnlyTheLastOne: true,
        fontSize: '18px',
        position: 'center-bottom',
      });
      this.reloadAllInvestors();
      this.closeConfirmApproval();
      this.isDeleteSubmit = false;
    }
    else{
      Notiflix.Notify.warning('Failed to approve', {
        width: '350px',
        showOnlyTheLastOne: true,
        fontSize: '18px',
        position: 'center-bottom',
      });
      this.reloadAllInvestors();
      this.closeConfirmApproval();
      this.isDeleteSubmit = false;
    }
  }, err =>{
  if(err.status == "500"){
   Notiflix.Notify.warning('Error! Server error occurred', {
      width: '350px',
      showOnlyTheLastOne: true,
      fontSize: '18px',
      position: 'center-bottom',
    });
    console.log(err.message)
    this.closeConfirmApproval()
    this.isDeleteSubmit = false;
  }
  else if(err.status == 403){

    Notiflix.Notify.failure('Error! Record not found', {
      width: '350px',
      showOnlyTheLastOne: true,
      fontSize: '18px',
      position: 'center-bottom',
    });
    this.isDeleteSubmit = false;
    this.closeConfirmApproval()
  }
  else if(err.status === 404){
   Notiflix.Notify.failure('Sorry! Record not approved', {
      width: '350px',
      showOnlyTheLastOne: true,
      fontSize: '18px',
      position: 'center-bottom',
    });
  }
  this.closeConfirmApproval()
  this.isDeleteSubmit = false;
  }
  );
}
// confirm modal dialog here
displayStyleDelete = "none";
openConfirmDelete(id: any) {
  this.deleteID = id;
  //console.log("confirm delete", id);
  this.displayStyleDelete = "block";
}
closeConfirmDelete() {
  this.displayStyleDelete = "none";
}

// confirm approval modal dialog here
displayStyleApproval = "none";
openConfirmApproval(id: any) {
  this.deleteID = id;
  //console.log("confirm delete", id);
  this.displayStyleApproval = "block";
}
closeConfirmApproval() {
  this.displayStyleApproval = "none";
}
  // credit user account modal dialog here
  displayStyle = "none";
  displayStyleConfirm = "none";
  openCreditModal(id: any, investUserName:any, investType:any, investName:any, investUserID:any) {
    this.userID = id;
    this.displayName = investUserName;
    this.investType = investType;
    this.investName = investName;
    this.investPersonID = investUserID;
    // use patched value to set form value when you want to do update of user details
    this.creditForm.patchValue({
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
    this.creditForm.reset();
    this.isFormSubmit = false;
    this.isDeleteSubmit =false
  }

  // confirm before crediting user account modal dialog here
  openConfirmCreditModal() {
    this.displayStyleConfirm = "block";
    this.isFormSubmit =true;
    this.confirmModalActive = true;
  }
  closeConfirmCreditModal() {
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
