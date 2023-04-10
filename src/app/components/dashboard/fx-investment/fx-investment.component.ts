import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as Notiflix from 'notiflix';
import { delay } from 'rxjs/internal/operators/delay';
import { ServiceDataService } from 'src/app/services/service-data.service';

declare let $: any;

@Component({
  selector: 'app-fx-investment',
  templateUrl: './fx-investment.component.html',
  styleUrls: ['./fx-investment.component.css']
})
export class FxInvestmentComponent implements OnInit{

  isFormSubmit = false
  isButtonClick = false

  plan_invest:any = '';
  plan_amt:any = '';

  investmentError = false
  investAmtError = '';
  investmentSuccess = false;

  formDataRecieved: any = {};

  fxForm = new FormGroup({
    plan_type: new FormControl('', [Validators.required]),
    invest_amt: new FormControl('', [Validators.required]),

  });


  constructor(private _dataService: ServiceDataService,
    private _router: Router){}

  myLocalDatails = this._dataService.getUserLocalInfomation();

  additionalData = {
    "createdBy": (this.myLocalDatails._id),
    "invest_id": this.randomString(15),
    "sender_name": this.myLocalDatails.surname + ' '+this.myLocalDatails.first_name,
    "investment_name": 'FX Investment',
    "username": this.myLocalDatails.username,
    "email": this.myLocalDatails.email,
  };


  ngOnInit(): void {

  }

  submitFXInvestment(){
    //Notiflix.Loading.standard('Processing...');
    this.isFormSubmit =true
    this.isButtonClick = true
    if(this.fxForm.invalid){
      Notiflix.Notify.failure('Missing fields required', {
        width: '350px',
           showOnlyTheLastOne: true,
           fontSize: '18px',
           position: 'center-bottom',
       });
       this.isButtonClick = false
    }
    if(this.fxForm.valid){
       this.plan_invest = this.fxForm.value.plan_type;
       this.plan_amt = this.fxForm.value.invest_amt;

       if(this.plan_invest =="Premier" && this.plan_amt < '5000'){
        Notiflix.Notify.failure('Failed, Minimum is invest amount is $5,000', {
          width: '450px',
          showOnlyTheLastOne: true,
          fontSize: '18px',
          position: 'center-bottom',
         });
         this.investmentError = true;
         this.investAmtError = '$5,000';
         this.isFormSubmit = false;
         this.isButtonClick = false;
       }
       else if(this.plan_invest =="Gold" && this.plan_amt < '10000'){
        Notiflix.Notify.failure('Failed, Minimum is invest amount is $10,000', {
          width: '500px',
          showOnlyTheLastOne: true,
          fontSize: '18px',
          position: 'center-bottom',
         });
         this.investmentError = true;
         this.investAmtError = '$10,000',
         this.isFormSubmit = false;
         this.isButtonClick = false;
       }

       else{
        this.isButtonClick = true;
        this.formDataRecieved = this.fxForm.value;
        const merged = Object.assign(this.formDataRecieved, this.additionalData );
        this._dataService.sendInvestment(merged).pipe(delay(1000)).subscribe(res =>{

          if(res.msg == '200'){
            Notiflix.Notify.success('Application submitted successfully.', {
              width: '350px',
              showOnlyTheLastOne: true,
              fontSize: '18px',
              position: 'right-top',
             });
             this.investmentSuccess = true;
             //this._router.navigate(['/dashboard']);
          }
          else{
            Notiflix.Notify.failure('Sorry! Failed to place investment', {
              width: '400px',
              showOnlyTheLastOne: true,
              fontSize: '18px',
              position: 'center-bottom',
             });
          }
          this.fxForm.reset();
          this.isFormSubmit = false;
          this.isButtonClick = false;
       }, err =>{
          if(err.status == "401"){
            Notiflix.Notify.warning('Error! Investment already running', {
              width: '450px',
              showOnlyTheLastOne: true,
              fontSize: '18px',
              position:'center-bottom'
            });
              }
            else if(err.status == '500'){
              Notiflix.Notify.warning('Error! Server errored occurred', {
                 width: '350px',
                 showOnlyTheLastOne: true,
                 fontSize: '18px',
                 position:'center-bottom'
               });
             }
             this.isFormSubmit = false;
             this.isButtonClick = false;
             this.fxForm.reset()
             Notiflix.Loading.remove();
            })
       }

    }
  }

  //modal method here
openFxModal(id:String){
  $('#'+id).modal('show');
}
closeFxModal(id: String){
$('#'+ id).modal('hide');
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
