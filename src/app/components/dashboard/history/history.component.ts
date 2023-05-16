import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceDataService } from 'src/app/services/service-data.service';
import { TransactionsService } from 'src/app/services/transactions.service';
import { Chart, registerables } from 'node_modules/chart.js';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import * as Notiflix from 'notiflix';

Chart.register(...registerables);

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  myId = JSON.parse(localStorage.getItem('userData') || '{}');

  historyData: any[] = [];
  summaryData: any[] = [];
  loading: Boolean = false;

  chartdata: any;

  labeldata: any[] = [];
  realdata: any[] = [];
  colordata: any[] = [];

  activePage: any = 1;

  total_count: any;

  totalRecord: number = 0;
  pagination: number = 1;
  pageSize: number = 1000;
  totalPages: number = 1;
  showSpinner: Boolean = false;
  paginationStatementData: any[] = [];
  colordatas: any[] = ['green', 'red'];
  myLocalDatails = JSON.parse(localStorage.getItem('userData') || '{}');
  searchTerm: string = '';
  allhistoryData: any[] = [];

  constructor(private _dataService: ServiceDataService,
    private _transactService: TransactionsService,
    private _router: Router) { }


  ngOnInit(): void {
    this.historyStatement();
    this.fetchAccountSummary();
    this.getFinanceChart();
    //console.log("MyUser ID", this.myId._id)
  }


  historyStatement() {
    this.showSpinner = true
    this._dataService.getUserTranHistory(this.pagination, this.pageSize, this.myId._id).subscribe((res: any) => {
      if (res.msg == "200") {
        debugger
        this.allhistoryData = res.data;
        this.historyData = this.allhistoryData;
        this.totalRecord = res.total_record;
        this.totalPages = window.Math.ceil(this.totalRecord / this.pageSize);
        // console.log(this.totalRecord);
        this.showSpinner = false
      }
      else if (res.message === 'jwt malformed') {
        console.log("JWT Malformed error", res.message)
        Notiflix.Notify.failure('Access denied!, Login to continue', {
          width: '400px',
          showOnlyTheLastOne: true,
          position: 'right-bottom',
          fontSize: '18px',
        });
        this.showSpinner = false

      }
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          // console.log
          console.log("Page error", err.message)
          Notiflix.Notify.failure('Access denied!, Login to continue', {
            width: '400px',
            showOnlyTheLastOne: true,
            position: 'right-bottom',
            fontSize: '18px',
          });
          this.showSpinner = false
        }
      }
      else if (err.status === 500) {
        Notiflix.Notify.failure('System!, Login to continue', {
          width: '400px',
          showOnlyTheLastOne: true,
          position: 'right-bottom',
          fontSize: '18px',
        });
      }
    })
  }

  reloadTable() {
    this._dataService.getUserTranHistory(this.pagination, this.pageSize, this.myId._id).subscribe((res: any) => {
      this.allhistoryData = res.data;
      this.totalRecord = res.total_record;
      this.totalPages = window.Math.ceil(this.totalRecord / this.pageSize);
      // console.log(this.totalRecord);
    });
  }

  renderPage(event: number) {
    this.pagination = event;
    this.reloadTable();
  }

  //get user summary of transaction and sum them out
  fetchAccountSummary() {
    this._dataService.getUserAcctSummary(this.myId._id).subscribe(res => {
      this.summaryData = res;
    });
  }

  RenderChart(labeldata: any, maindata: any, colordata: any, type: any, id: any) {
    const myChart = new Chart(id, {
      type: type,
      data: {
        labels: ['Credit', 'Debit'],
        datasets: [{
          label: 'Amount',
          data: maindata,
          backgroundColor: colordata,
          borderColor: ['#D2D2D2'],
          borderWidth: 1,
          borderRadius: 5,
        },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
      }
    });
  }

  getFinanceChart() {
    this._dataService.financeChartReport(this.myLocalDatails._id).subscribe(res => {
      this.chartdata = res.data;
      //console.log("chart details", res.data)
      if (this.chartdata != null) {
        for (let i = 0; i < this.chartdata.length; i++) {
          //console.log(this.chartdata[i]);
          if (this.chartdata[i]._id == "Credit") {
            this.labeldata.push(this.chartdata[i]._id)
            this.realdata.push(this.chartdata[i].amount)
            this.colordata.push('green')
          } else {
            this.labeldata.push(this.chartdata[i]._id)
            this.realdata.push(this.chartdata[i].amount)
            this.colordata.push(this.chartdata[i].colordatas)
          }

        }
        // this.RenderChart(this.labeldata, this.realdata, this.colordata, 'bar', 'barchart');
        this.RenderChart(this.labeldata, this.realdata, this.colordatas, 'pie', 'piechart');
        // this.RenderChart(this.labeldata, this.realdata, this.colordata, 'line', 'dochart');
      }
    });
  }

  performSearch() {
    debugger
    if (this.searchTerm.trim() !== '') {
      this.historyData = this.allhistoryData.filter((item) =>
        Object.values(item).some((value: any) =>
          value.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      );
      this.totalRecord = this.historyData.length;
      this.totalPages = window.Math.ceil(this.totalRecord / this.pageSize);
    } else {
      this.historyData = this.allhistoryData;
      this.totalRecord = this.historyData.length;
      this.totalPages = window.Math.ceil(this.totalRecord / this.pageSize);
    }
  }

}
