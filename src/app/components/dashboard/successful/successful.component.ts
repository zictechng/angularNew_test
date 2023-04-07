import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceDataService } from 'src/app/services/service-data.service';
import { ServiceTransactions } from 'src/app/services/serviceTransaction.service';

@Component({
  selector: 'app-successful',
  templateUrl: './successful.component.html',
  styleUrls: ['./successful.component.css']
})
export class SuccessfulComponent implements OnInit {


  isFormSubmit = false;
  isbuttonClick = false;

  errorNotification = false

  record_tid = localStorage.getItem('transaction_id');
  myId : any = localStorage.getItem('userData');

  transactionData: any = {};

  constructor(private _dataService: ServiceDataService,
    private _transactService: ServiceTransactions,
    private _router: Router) {}

  ngOnInit() {

    //console.log('record_tid', this.record_tid);
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
