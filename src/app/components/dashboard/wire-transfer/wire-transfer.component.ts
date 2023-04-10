import { formatDate } from '@angular/common';
import { Component, AfterViewInit, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as Notiflix from 'notiflix';
import { ServiceDataService } from 'src/app/services/service-data.service';
import { TransactionsService } from 'src/app/services/transactions.service';


declare var $: any;
declare var jQuery:any;
declare const require: any;

@Component({
  selector: 'app-wire-transfer',
  templateUrl: './wire-transfer.component.html',
  styleUrls: ['./wire-transfer.component.css']
})
export class WireTransferComponent implements AfterViewInit, OnInit{


  defaultDetailsLocalStorage: any;
  errorNotification = false

  myLocalDatails = this._dataService.getUserLocalInfomation();

  formDataRecieved:any = {};
  isFormSubmit = false;

  fundTransferForm = new FormGroup({
    send_amt: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    country: new FormControl('', [Validators.required]),
    swift_code: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    acct_number: new FormControl('', [Validators.required]),
    holder_name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    bank_name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
  });
  constructor(private _dataService: ServiceDataService,
    private _transactService: TransactionsService,
    private _router: Router){}

  // this make the toggle of menu and nav-bar to work
  // we are calling the jquery that hold the script after the page is loaded
  // so that angular application can have access to the javascript.
  //../assets/js/main.js
  ngAfterViewInit() {

  }

  yearNow: number = new Date().getFullYear();
  month = new Date().getMonth()+1;

  monthNames = ["January", "February", "March", "April", "May","June","July", "August", "September", "October", "November","December"];
  dayNames = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday"];

  monthName = new Date();
  days = new Date();

  day: number = new Date().getDay();

  ngOnInit(): void {
    // console.log("Today Year: ", this.yearNow, "Month: ", this.month, "Day: ", this.day);
    // console.log("The current month is " + this.monthNames[this.monthName.getMonth()]);
    // console.log("The current days name is " + this.dayNames[this.day]);

  }

  obj2 = {
    "createdBy": (this.myLocalDatails._id),
    "tid": (this.randomString(25)),
    'tr_year': this.yearNow,
    'tr_month': this.monthNames[this.monthName.getMonth()]
  };


     // merged all object and send to api backend
      //merged = Object.assign(this.fundTransferForm.value, this.obj2);

      transferFund(){
        this.formDataRecieved = this.fundTransferForm.value
        const merged = Object.assign(this.formDataRecieved, this.obj2 );

        this.isFormSubmit = true;
        Notiflix.Loading.standard('Loading...', {
          backgroundColor: 'rgba(0,0,0,0.8)',
          });

        if(this.fundTransferForm.invalid){
          Notiflix.Notify.failure('Error! Some fields are missing', {
            width: '350px',
            showOnlyTheLastOne: true,
            position: 'right-bottom',
            fontSize: '18px',
          });
          Notiflix.Loading.remove()
        } else if(this.fundTransferForm.valid){
          this._transactService.wireTransferFunds(merged)
          .subscribe(res => {
            if(res.msg == '200'){
              Notiflix.Notify.success('Transfer Initiated', {
                width: '350px',
                showOnlyTheLastOne: true,
                position: 'right-bottom',
                fontSize: '18px',
              });

              localStorage.setItem('transaction_id', this.obj2.tid);
              this._router.navigate(['/dashboard/confirm-pin']); // after transfer, go back to dashboard page
            }
           this.fundTransferForm.reset();
           this.isFormSubmit = false;
            }, err =>{
              if(err.status == "402"){
                Notiflix.Notify.failure('Error! Account not found.', {
                  width: '350px',
                  showOnlyTheLastOne: true,
                  position: 'right-bottom',
                  fontSize: '18px',
                });
                } else if(err.status == "403"){
                  this.errorNotification = true;
                  // Notiflix.Notify.failure('Error, Account not active', {
                  //   width: '350px',
                  //   showOnlyTheLastOne: true,
                  //   position: 'right-bottom',
                  //   fontSize: '18px',
                  // });
                  }
                  else if(err.status == "405"){
                    Notiflix.Notify.failure('Failed, Account balance is low', {
                      width: '350px',
                      showOnlyTheLastOne: true,
                      position: 'right-bottom',
                      fontSize: '18px',
                    });
               }
                  else if(err.status == "500"){
                    Notiflix.Notify.failure('Sorry, Server error! Try again', {
                      width: '350px',
                      showOnlyTheLastOne: true,
                      position: 'right-bottom',
                      fontSize: '17px',
                    });
                  }
              })
              Notiflix.Loading.remove()
        }
    // console.log('transfer data', merged);
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
