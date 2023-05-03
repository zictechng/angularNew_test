import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceDataService } from 'src/app/services/service-data.service';
import { Chart, registerables } from 'node_modules/chart.js';
import { userLevelAccess } from 'src/app/services/userLevel.service';
Chart.register(...registerables);
declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  chartdata: any;

  labeldata: any[] = [];
  realdata: any[] = [];
  colordata: any[] = [];


  userLocalStorageDetails: any

  myLocalDatails = JSON.parse(localStorage.getItem('userData') || '{}');

  //parse it
  myInfo: any;
  userLocalDetails: any;
  showLocalData: any
  myTransaction: any
  userRecentTransaction: any = []
  maskAccNumber: any = '';
  lastFiv: String = '';
  mydate: any;
  myData: any = {};
  fullname: any;

  companyLogo: string = '';
  companyShortName: any = [];
  companyNames: any = [];


  myNotifications: any = [];
  creditData: any[]=[];
  debitData: any[]=[];

  constructor(private _dataService: ServiceDataService,
    public _authLevel: userLevelAccess,
    private _router: Router) { }

  ngOnInit(): void {

    this.getUserProfileData();
    this.getMyIncomeStatement();
    this.myRecentTransaction();
    this.getFinanceChart();
    this.getCompanyName()
    // check user access level and redirect
    if (this._authLevel.myLevel != "User") {
      this._router.navigate(['/admin'])
    }

  }

  RenderChart(labeldata: any, creditdata: any,debitdata:any, type: any, id: any) {
    const myChart = new Chart(id, {
      type: type,
      data: {
        labels: labeldata,
        datasets: [
          {
          label: "Credit",
          data: creditdata,
          backgroundColor: 'green'
        },
        {
          label: "Debit",
          data: debitdata,
          backgroundColor: 'red'
        }]
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
  // get loggin user profile details here
  getUserProfileData() {
    this._dataService.getMyData(this.myLocalDatails._id).subscribe(res => {
      this.myData = res.others;
      this.fullname = this.myData.surname + ' ' + this.myData.first_name
      this.lastFiv = String(this.myData.acct_number || '123456').slice(-4)
      this.maskAccNumber = "******" + this.lastFiv;
      //console.log('Backend Profile', this.myData);
    });
  }

  //get user financial information
  getMyIncomeStatement() {
    this._dataService.getMyIncomeFlow(this.myLocalDatails._id).subscribe(res => {
      this.myTransaction = res;
    });
  }

  //get user recent financial transactions
  myRecentTransaction() {
    this._dataService.getRecentRecord(this.myLocalDatails._id).subscribe(res => {
      this.userRecentTransaction = res;
    });
  }

  getFinanceChart() {
    this._dataService.financeChartReport(this.myLocalDatails._id).subscribe(res => {
      this.chartdata = res.resultData;
      debugger
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

      const newData = months.map((month) => {
        const monthData = this.chartdata.filter((d: any) => d.tr_month === month);
        const credit = monthData.reduce((total: any, d: any) => d.tran_type === "Credit" ? total + d.amount : total, 0);
        const debit = monthData.reduce((total: any, d: any) => d.tran_type === "Debit" ? total + d.amount : total, 0);
        const color = credit > debit ? "green" : "red";
        return {
          month,
          credit,
          debit,
        };
      })
      console.log(newData);


      //console.log("Dash Chart", this.chartdata)
      if (newData != null) {
        for (let i = 0; i < newData.length; i++) {
          //console.log(this.chartdata[i]);
          this.labeldata.push(newData[i].month)
          this.creditData.push(newData[i].credit)
          this.debitData.push(newData[i].credit)
        }
        this.RenderChart(this.labeldata, this.creditData,this.debitData, 'bar', 'barchart');
        this.RenderChart(this.labeldata, this.creditData,this.debitData, 'pie', 'piechart');
        this.RenderChart(this.labeldata, this.creditData,this.debitData, 'line', 'dochart');
      }
    });
  }
  // get logged in user profile details here from the local storage
  // getUserLocalData(){
  //   this.userLocalDetails = localStorage.getItem('userData');
  //   this.showLocalData = (JSON.parse(this.userLocalDetails))
  //   console.log("My ID 2", this.showLocalData._id);

  //   const nowData = (JSON.parse(this.myLocalDatails))
  //   console.log("Data 2", nowData._id)

  //   }

  getNotification() {
    this._dataService.fetchUserNotification(this.myLocalDatails._id).subscribe(res => {
      this.myNotifications = res;
      //console.log("My Notification", this.myNotifications)
    })
  }

  getCompanyName() {
    this._dataService.fetchCompanyDetails().subscribe(res => {
      this.companyNames = res;

    })
  }

}
