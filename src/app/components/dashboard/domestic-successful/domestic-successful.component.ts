import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceDataService } from 'src/app/services/service-data.service';
import { ServiceTransactions } from 'src/app/services/serviceTransaction.service';

@Component({
  selector: 'app-domestic-successful',
  templateUrl: './domestic-successful.component.html',
  styleUrls: ['./domestic-successful.component.css']
})
export class DomesticSuccessfulComponent implements OnInit{


  isFormSubmit = false;
  isbuttonClick = false;

  errorNotification = false

  record_tid = localStorage.getItem('transaction_id');
  myId : any = localStorage.getItem('userData');

  transactionData: any = {};

  constructor(private _dataService: ServiceDataService,
    private _transactService: ServiceTransactions,
    private _router: Router) {}

  ngOnInit(): void {
    this.getTransferStatement();
  }

  //get user financial information
  getTransferStatement(){
    this._transactService.wireFundSendDetails(this.record_tid).subscribe(res =>{
      this.transactionData = res;

      //console.log("Result: ",this.transactionData);
      //console.log("Fetch Details: ", this.transactionData);
    });
  }

}
