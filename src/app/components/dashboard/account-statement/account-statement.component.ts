import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceDataService } from 'src/app/services/service-data.service';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-account-statement',
  templateUrl: './account-statement.component.html',
  styleUrls: ['./account-statement.component.css']
})
export class AccountStatementComponent implements OnInit{

  myId : any = JSON.parse(localStorage.getItem('userData')|| '{}');

  statementData:any[] = [];
  summaryData:any[] = [];
  loading:Boolean = false;

  showLoader:boolean = true;
  total_count : any;

  totalRecord: number = 0;
  pagination: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;

  showSpinner: Boolean = false;

  paginationStatementData:any [] = [];

  constructor(private _dataService: ServiceDataService,
    private _transactService: TransactionsService,
    private _router: Router) {}


  ngOnInit(): void {
    this.fetchAccountStatementData();
    this.fetchAccountSummary();
  }

  // method to fetch user statement of account
  // fetchAccountStatementData() {
  //   this.showSpinner = true
  //   this._dataService.getUserAcctStatement2(this.pagination, this.pageSize).subscribe(res =>{
  //     this.showLoader = false;
  //     this.statementData = res.docs;
  //     console.log("Result", res)
  //     //this.statementData = res.data;
  //     this.totalRecord = res.total_record;
  //     this.totalPages = window.Math.ceil(this.totalRecord/this.pageSize);
  //     this.showSpinner = false
  //   });
  // }
 // method to fetch user statement of account
   fetchAccountStatementData() {
    this.showSpinner = true
    this._dataService.getUserAcctStatement(this.pagination, this.pageSize, this.myId._id).subscribe(res =>{
      this.showLoader = false;
      this.statementData = res;
      this.statementData = res.data;
      this.totalRecord = res.total_record;
      this.totalPages = window.Math.ceil(this.totalRecord/this.pageSize);
      this.showSpinner = false
    });
  }

  renderPage(event: number) {
    this.pagination = event;
    this.reloadTable();
  }

  reloadTable(){
      this._dataService.getUserAcctStatement(this.pagination, this.pageSize, this.myId._id).subscribe(res =>{
      this.showLoader = false;
      this.statementData = res;
      this.statementData = res.data;
      this.totalRecord = res.total_record;
      this.totalPages = window.Math.ceil(this.totalRecord/this.pageSize);
    });
  }
  //get user summary of transaction and sum them out
  fetchAccountSummary() {
    this._dataService.getUserAcctSummary(this.myId._id).subscribe(res =>{
      this.summaryData = res;
      });
  }

}
