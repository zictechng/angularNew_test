import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as Notiflix from 'notiflix';
import { ServiceDataService } from 'src/app/services/service-data.service';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-domestic-pin',
  templateUrl: './domestic-pin.component.html',
  styleUrls: ['./domestic-pin.component.css']
})
export class DomesticPinComponent implements OnInit  {


  isFormSubmit = false;
  isbuttonClick = false;

  record_tid = localStorage.getItem('transaction_id');
  myId : any = localStorage.getItem('userData');
  formData: any = {};

  fundTransferPINForm = new FormGroup({
    pin_code: new FormControl('', [Validators.required, Validators.maxLength(6)]),
   });

   constructor(private _dataService: ServiceDataService,
    private _transactService: TransactionsService,
    private _router: Router){}


  ngOnInit(): void {

  }

  myLocalDatails = this._dataService.getUserLocalInfomation();
    obj2 = {
      "createdBy": (this.myLocalDatails._id),
      "tran_id": this.record_tid
    };


    confirmTransferPin(){
      this.formData = this.fundTransferPINForm.value
     // merged all object and send to api backend
          const merged = Object.assign(this.formData, this.obj2);
          this.isFormSubmit = true;
          this.isbuttonClick = true;
      this._transactService.domesticPinConfirm(merged)
        .subscribe(res => {
          if(res?.msg == '201'){
            Notiflix.Notify.success('Transfer successful', {
              width: '350px',
              showOnlyTheLastOne: true,
              position: 'right-bottom',
              fontSize: '18px',
            });
            console.log("Backend responds", res)
            this.isbuttonClick = false
            // localStorage.setItem('transaction_id', '');
            this._router.navigate(['/dashboard/domestic-successful']).then(() =>{
              window.location.reload()
              }); //this will refresh/reload your page
              // after transfer, go back to dashboard page
          }
          this.fundTransferPINForm.reset();
          this.isFormSubmit = false;
        }, err =>{
          if(err.status == "404"){
            Notiflix.Notify.failure('Error!, Pin code required', {
              width: '300px',
              showOnlyTheLastOne: true,
              position: 'right-bottom',
              fontSize: '18px',
            });
            this.isbuttonClick = false

            //alert("error Account Pin not active")
          } else if(err.status == "403"){
            Notiflix.Notify.failure('Error, Account Pin not active', {
              width: '350px',
              showOnlyTheLastOne: true,
              position: 'right-bottom',
              fontSize: '18px',
            });
            this.isbuttonClick = false
            this.isFormSubmit = false;
          }
          else if(err.status == "406"){
            Notiflix.Notify.failure('Error! Wrong pin code entered', {
              width: '350px',
              showOnlyTheLastOne: true,
              position: 'right-bottom',
              fontSize: '18px',
            });
            this.isbuttonClick = false
            this.isFormSubmit = false;
          }
          else if(err.status == "401"){
            Notiflix.Notify.failure('Sorry! Account is blocked', {
              width: '350px',
              showOnlyTheLastOne: true,
              position: 'right-bottom',
              fontSize: '18px',
            });
            this.isbuttonClick = false
            this.isFormSubmit = false;
          }
          else{
          console.log("System Error: " + err)
           Notiflix.Notify.failure('Error! System error occurred.', {
              width: '350px',
              showOnlyTheLastOne: true,
              position: 'right-bottom',
              fontSize: '18px',
            });
            this.isbuttonClick = false
            this.isFormSubmit = false;
          }
        })
      }
}
