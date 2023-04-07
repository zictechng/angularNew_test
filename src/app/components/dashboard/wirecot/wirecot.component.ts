import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as Notiflix from 'notiflix';
import { ServiceDataService } from 'src/app/services/service-data.service';
import { ServiceTransactions } from 'src/app/services/serviceTransaction.service';

@Component({
  selector: 'app-wirecot',
  templateUrl: './wirecot.component.html',
  styleUrls: ['./wirecot.component.css']
})
export class WirecotComponent implements OnInit{

  isFormSubmit = false;
  isbuttonClick = false;

  record_tid = localStorage.getItem('transaction_id');
  myId : any = localStorage.getItem('userData');
  formData: any = {};

  fundTransferCOTForm = new FormGroup({
    cot_code: new FormControl('', [Validators.required, Validators.maxLength(6)]),
   });

  constructor(private _dataService: ServiceDataService,
    private _transactService: ServiceTransactions,
    private _router: Router){}


  ngOnInit(): void {
    //console.log("TID", this.record_tid)
  }

  myLocalDatails = this._dataService.getUserLocalInfomation();
    obj2 = {
      "createdBy": (this.myLocalDatails._id),
      "tran_id": this.record_tid
    };

  wireCOTConfirm(){
    this.formData = this.fundTransferCOTForm.value
   // merged all object and send to api backend
        const merged = Object.assign(this.formData, this.obj2);
        this.isFormSubmit = true;
        this.isbuttonClick = true;
    this._transactService.wireCOTConfirm(merged)
      .subscribe(res => {
        if(res?.msg == '201'){
          Notiflix.Notify.success('COT Code Validated', {
            width: '350px',
            showOnlyTheLastOne: true,
            position: 'right-bottom',
            fontSize: '18px',
          });
          //console.log("Backend responds", res)
          this.isbuttonClick = false
          // localStorage.setItem('transaction_id', '');
          this._router.navigate(['/dashboard/confirm-imf']); // after transfer, go back to dashboard page
        }
        this.fundTransferCOTForm.reset();
        this.isFormSubmit = false;
      }, err =>{
        if(err.status == "404"){
          Notiflix.Notify.failure('Error! COT code required', {
            width: '300px',
            showOnlyTheLastOne: true,
            position: 'right-bottom',
            fontSize: '18px',
          });
          this.isbuttonClick = false

          //alert("error Account Pin not active")
        } else if(err.status == "403"){
          Notiflix.Notify.failure('Error! Account COT Code not active', {
            width: '350px',
            showOnlyTheLastOne: true,
            position: 'right-bottom',
            fontSize: '18px',
          });
          this.isbuttonClick = false
          this.isFormSubmit = false;
        }
          else if(err.status == "406"){
          Notiflix.Notify.failure('Error! Wrong COT code entered', {
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
