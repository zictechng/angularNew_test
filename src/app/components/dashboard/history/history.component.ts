import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceDataService } from 'src/app/services/service-data.service';
import { ServiceTransactions } from 'src/app/services/serviceTransaction.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit{

  myId = JSON.parse(localStorage.getItem('userData')|| '{}');

  historyData:any[] = [];
  summaryData:any[] = [];
  loading:Boolean = false;

  activePage: any = 1;

  total_count : any;

  totalRecord: number = 0;
  pagination: number = 1;
  pageSize: number = 5;
  totalPages: number = 1;
  showSpinner: Boolean = false;
  paginationStatementData:any [] = [];

  constructor(private _dataService: ServiceDataService,
    private _transactService: ServiceTransactions,
    private _router: Router) {}


  ngOnInit(): void {
    this.historyStatement();
    this.fetchAccountSummary();
    //console.log("MyUser ID", this.myId._id)
  }


  historyStatement(){
    this.showSpinner = true
    this._dataService.getUserTranHistory(this.pagination, this.pageSize, this.myId._id).subscribe((res: any) =>{
      this.historyData = res.data;
      this.totalRecord = res.total_record;
      this.totalPages = window.Math.ceil(this.totalRecord/this.pageSize);
     // console.log(this.totalRecord);
      this.showSpinner = false
    });
  }


  renderPage(event: number) {
    this.pagination = event;
    this.historyStatement();
  }

  //get user summary of transaction and sum them out
  fetchAccountSummary() {
    this._dataService.getUserAcctSummary(this.myId._id).subscribe(res =>{
      this.summaryData = res;
      });
  }

}
