import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as Notiflix from 'notiflix';
import { ServiceDataService } from 'src/app/services/service-data.service';
declare let $: any;


@Component({
  selector: 'app-investment-plans',
  templateUrl: './investment-plans.component.html',
  styleUrls: ['./investment-plans.component.css']
})
export class InvestmentPlansComponent implements OnInit{

  isFormSubmit = false
  isButtonClick = false

  plan_invest:any = '';
  plan_amt:any = '';

  investmentError = false
  investAmtError = '';
  investmentSuccess = false;

  fxInvestPlansData:any = [];
  stockInvestPlansData:any = [];
  angInvestPlansData:any = [];

  formDataRecieved: any = {};
  formStockDataRecieved: any ={};
  formFXDataRecieved: any ={};

  fxForm = new FormGroup({
    starter_amt: new FormControl('', [Validators.required]),
    premier_amt: new FormControl('', [Validators.required]),
    gold_amt: new FormControl('', [Validators.required]),
  });

  constructor(private _dataService: ServiceDataService,
    private _router: Router) {}

  ngOnInit(): void {
    this.fetchInvestedPlans()
  }

  // get all investment plans
  fetchInvestedPlans(){
    this._dataService.getAllAdminInvest().subscribe(res =>{
      this.fxInvestPlansData = res.fx_data;
      this.stockInvestPlansData = res.stock_data;
      this.angInvestPlansData = res.angro_data;
      //console.log("FX Data", this.fxInvestPlansData)
    })
  }

  sendStarterPackUpdate(){
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
      this.isButtonClick = true;
        this.formDataRecieved = this.fxForm.value;
        const merged = Object.assign(this.formDataRecieved );
        this._dataService.angroInvestUpdateRecord(merged).subscribe(res =>{

          if(res.msg == '200'){
            Notiflix.Notify.success('Record updated successfully.', {
              width: '350px',
              showOnlyTheLastOne: true,
              fontSize: '18px',
              position: 'right-top',
             });
             this.investmentSuccess = true;
             this.closeAgroModal('backAgroModal');
             this.fetchInvestedPlans();
             //this._router.navigate(['/dashboard']);
          }
          else{
            Notiflix.Notify.failure('Sorry! Failed to update', {
              width: '400px',
              showOnlyTheLastOne: true,
              fontSize: '18px',
              position: 'center-bottom',
             });
          }
          this.fxForm.reset();
          this.isFormSubmit = false;
          this.isButtonClick = false;
        },err =>{
          if(err.status == "404"){
            Notiflix.Notify.warning('Error! record found', {
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
            }
        )
    }
  }

  sendStockPackUpdate(){
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
      this.isButtonClick = true;
        this.formStockDataRecieved = this.fxForm.value;
        const merged = Object.assign(this.formStockDataRecieved );
        this._dataService.stockInvestUpdateRecord(merged).subscribe(res =>{

          if(res.msg == '200'){
            Notiflix.Notify.success('Record updated successfully.', {
              width: '350px',
              showOnlyTheLastOne: true,
              fontSize: '18px',
              position: 'right-top',
             });
             this.investmentSuccess = true;
             this.closeStockModal('backStockModal');
             this.fetchInvestedPlans();
             //this._router.navigate(['/dashboard']);
          }
          else{
            Notiflix.Notify.failure('Sorry! Failed to update', {
              width: '400px',
              showOnlyTheLastOne: true,
              fontSize: '18px',
              position: 'center-bottom',
             });
          }
          this.fxForm.reset();
          this.isFormSubmit = false;
          this.isButtonClick = false;
        },err =>{
          if(err.status == "404"){
            Notiflix.Notify.warning('Error! record found', {
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
            }
        )
    }
  }

  sendFXPackUpdate(){
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
      this.isButtonClick = true;
        this.formFXDataRecieved = this.fxForm.value;
        const merged = Object.assign(this.formFXDataRecieved );
        this._dataService.fxInvestUpdateRecord(merged).subscribe(res =>{

          if(res.msg == '200'){
            Notiflix.Notify.success('Record updated successfully.', {
              width: '350px',
              showOnlyTheLastOne: true,
              fontSize: '18px',
              position: 'right-top',
             });
             this.investmentSuccess = true;
             this.closeFXModal('backFXModal');
             this.fetchInvestedPlans();
             //this._router.navigate(['/dashboard']);
          }
          else{
            Notiflix.Notify.failure('Sorry! Failed to update', {
              width: '400px',
              showOnlyTheLastOne: true,
              fontSize: '18px',
              position: 'center-bottom',
             });
          }
          this.fxForm.reset();
          this.isFormSubmit = false;
          this.isButtonClick = false;
        },err =>{
          if(err.status == "404"){
            Notiflix.Notify.warning('Error! record found', {
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
            }
        )
    }
  }


  //modal method here
openAgroModal(id:String){
  $('#'+id).modal('show');
}
closeAgroModal(id: String){
$('#'+ id).modal('hide');
}

 //Stock modal method here
 openStockModal(id:String){
  $('#'+id).modal('show');
}
closeStockModal(id: String){
$('#'+ id).modal('hide');
}

//FX modal method here
openFXModal(id:String){
  $('#'+id).modal('show');
}
closeFXModal(id: String){
$('#'+ id).modal('hide');
}

}
