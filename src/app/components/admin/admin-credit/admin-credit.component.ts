import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as Notiflix from 'notiflix';
import { ServiceDataService } from 'src/app/services/service-data.service';
import { TransactionsService } from 'src/app/services/transactions.service';
import { userLevelAccess } from 'src/app/services/userLevel.service';

@Component({
  selector: 'app-admin-credit',
  templateUrl: './admin-credit.component.html',
  styleUrls: ['./admin-credit.component.css']
})
export class AdminCreditComponent implements OnInit{

  allCreditUsers: any = []
  userProfilePic ="";
  defaultDetailsLocalStorage: any;

  defaultImageProfile = "<span class='badge badge-center rounded-pill bg-label-warning w-px-30 h-px-30 me-2'><i class='bx bx-user bx-xs'></i></span>";

  isLoading: boolean = false;

  myLocalDatails = JSON.parse(localStorage.getItem('userData')|| '{}');

  total_count : any;

  totalRecord: number = 0;
  pagination: number = 1;
  pageSize: number = 15;
  totalPages: number = 1;

  isFormSubmit = false;
  isDeleteSubmit = false;
  displayName: string = '';

  confirmModalActive: boolean = false;

  user_current_bal: any = '';
  userID: any = ''
  formDataReceive:any = {};

  creditForm = new FormGroup({
    current_bal: new FormControl('', [Validators.required]),
    sending_amt: new FormControl('', [Validators.required]),
    credit_date: new FormControl('', [Validators.required]),
    credit_status: new FormControl('', Validators.required),
    credit_note: new FormControl('', [Validators.required, Validators.maxLength(250)]),
    credit_sender_id: new FormControl('', [Validators.required]),
  });


  constructor(private _dataService: ServiceDataService,
    private _router: Router,
    private _transService: TransactionsService,
    private _authLevel: userLevelAccess){}

  ngOnInit(): void {
    this.getCreditUser()
  }

  yearNow: number = new Date().getFullYear();
  month = new Date().getMonth()+1;

  monthNames = ["January", "February", "March", "April", "May","June","July", "August", "September", "October", "November","December"];
  dayNames = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday"];
  monthName = new Date();

  obj2 = {
    "tid": (this.randomString(25)),
    'tr_year': this.yearNow,
    'sender_id': this.userID,
    'tr_month': this.monthNames[this.monthName.getMonth()]
  };
  // get all users data
  getCreditUser(){
    this.isLoading=true;
    setTimeout(() => {
      this._dataService.fetchUsersAll(this.pagination, this.pageSize).subscribe(res =>{
      this.allCreditUsers = res.data;
      this.totalRecord = res.total_record;
      this.totalPages = window.Math.ceil(this.totalRecord/this.pageSize);
      this.userProfilePic = this._dataService.backenServerUrl;
        //console.log("All Users", this.registerUser)
      this.isLoading=false;
      })
    }, 500);
  }
  renderPage(event: number) {
    this.pagination = event;
    this.reloadTable();
  }

  reloadTable(){
      // refresh the counters of active, pending, blocked users
      this._dataService.fetchUsersAll(this.pagination, this.pageSize).subscribe(res =>{
        this.allCreditUsers = res.data;
        this.totalRecord = res.total_record;
        this.totalPages = window.Math.ceil(this.totalRecord/this.pageSize);
        this.userProfilePic = this._dataService.backenServerUrl;
    })
  }

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

       this._transService.postUserCredit(merged).subscribe(res =>{
        if(res.msg == '201'){
          Notiflix.Notify.success('Account Credited Successfully', {
            width: '400px',
            showOnlyTheLastOne: true,
            position: 'center-bottom',
            fontSize: '18px',
          });
          this.closeConfirmCreditModal();
          this.closeCreditModal();
          this.reloadTable();
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
    //console.log("Credit Details", )
  }

  // credit user account modal dialog here
  displayStyle = "none";
  displayStyleConfirm = "none";
  openCreditModal(id: any, bal:any, dataName:any) {
    this.userID = id;
    this.user_current_bal = bal
    this.displayName = dataName;
    // use patched value to set form value when you want to do update of user details
    this.creditForm.patchValue({
      current_bal: this.user_current_bal,
      credit_sender_id: this.userID
    });
    //console.log("confirm delete", id, bal);
    this.displayStyle = "block";
  }
  closeCreditModal() {
    this.displayStyle = "none";
    this.userID ='';
    this.user_current_bal = '';
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
