import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as Notiflix from 'notiflix';
import { ServiceDataService } from 'src/app/services/service-data.service';
import { ServiceTransactions } from 'src/app/services/serviceTransaction.service';

@Component({
  selector: 'app-domestic-transfer',
  templateUrl: './domestic-transfer.component.html',
  styleUrls: ['./domestic-transfer.component.css']
})
export class DomesticTransferComponent implements OnInit {

  defaultDetailsLocalStorage: any;
  errorNotification = false

  myLocalDatails = this._dataService.getUserLocalInfomation();

  formDataRecieved:any = {};
  isFormSubmit = false;


  domesticFundTransferForm = new FormGroup({
    send_amt: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required, Validators.maxLength(350)]),
    swift_code: new FormControl('', [Validators.required, Validators.maxLength(6)]),
    acct_number: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    holder_name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    bank_name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
  });


  constructor(private _dataService: ServiceDataService,
    private _transactService: ServiceTransactions,
    private _router: Router){}


  ngOnInit(): void {

  }


  obj2 = {
    "createdBy": (this.myLocalDatails._id),
    "tid": (this.randomString(25)),
  };



  domesticTransferFund(){
    this.formDataRecieved = this.domesticFundTransferForm.value
    const merged = Object.assign(this.formDataRecieved, this.obj2 );

    this.isFormSubmit = true;
    Notiflix.Loading.standard('Loading...', {
      backgroundColor: 'rgba(0,0,0,0.8)',
      });

    if(this.domesticFundTransferForm.invalid){
      Notiflix.Notify.failure('Error! Some fields are missing', {
        width: '350px',
        showOnlyTheLastOne: true,
        position: 'right-bottom',
        fontSize: '18px',
      });
      Notiflix.Loading.remove()
    } else if(this.domesticFundTransferForm.valid){
      this._transactService.domesticFundTransfer(merged)
      .subscribe(res => {
        if(res.msg == '200'){
          Notiflix.Notify.success('Transfer Initiated', {
            width: '350px',
            showOnlyTheLastOne: true,
            position: 'right-bottom',
            fontSize: '18px',
          });

          localStorage.setItem('transaction_id', this.obj2.tid);
          this._router.navigate(['/dashboard/domestic-pin']); // after transfer, go back to dashboard page
        }
       this.domesticFundTransferForm.reset();
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
