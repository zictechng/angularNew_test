import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceDataService } from 'src/app/services/service-data.service';
import {Chart, registerables} from 'node_modules/chart.js';
Chart.register(...registerables);
declare var $: any;
declare var jQuery:any;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{

  chartdata:any;

   labeldata:any[]=[];
   realdata:any[]=[];
   colordata:any[]=[];


  userLocalStorageDetails:any

  myLocalDatails = JSON.parse(localStorage.getItem('userData')|| '{}');

//parse it
  myInfo:any;
  userLocalDetails: any;
  showLocalData: any
  myTransaction:any
  userRecentTransaction: any = []
  maskAccNumber:any = '';
  lastFiv:String = '';
  mydate: any;
  myData: any = {};
  fullname: any;


constructor(private _dataService: ServiceDataService,
  _router: Router){}

  ngOnInit(): void {

   this.getUserProfileData();
   this.getMyIncomeStatement();
   this.myRecentTransaction();
   this.getFinanceChart();
  }

  RenderChart(labeldata:any, maindata:any, colordata:any, type:any, id:any){
    const myChart = new Chart(id, {
      type: type,
      data: {
          labels: labeldata,
          datasets: [{
              label: 'Record Statistic',
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
  // get loggin user profile details here
  getUserProfileData(){
    this._dataService.getMyData(this.myLocalDatails._id).subscribe(res =>{
      this.myData = res.others;
      this.fullname = this.myData.surname + ' ' + this.myData.first_name
      this.lastFiv = String(this.myData.acct_number || '123456').slice(-4)
      this.maskAccNumber = "******" + this.lastFiv;
      //console.log('Backend Profile', this.myData);
    });
  }

  //get user financial information
  getMyIncomeStatement(){
    this._dataService.getMyIncomeFlow(this.myLocalDatails._id).subscribe(res =>{
      this.myTransaction = res;
    });
  }

  //get user recent financial transactions
  myRecentTransaction(){
    this._dataService.getRecentRecord(this.myLocalDatails._id).subscribe(res =>{
      this.userRecentTransaction = res;
    });
  }

  getFinanceChart(){
    this._dataService.financeChartReport(this.myLocalDatails._id).subscribe(res =>{
      this.chartdata = res;
      //console.log(this.labeldata)
      if(this.chartdata!=null){
        for(let i=0; i<this.chartdata.length; i++){
          //console.log(this.chartdata[i]);
          this.labeldata.push(this.chartdata[i].tr_year)
          this.realdata.push(this.chartdata[i].amount)
          this.colordata.push(this.chartdata[i].colorcode)
        }
        this.RenderChart(this.labeldata, this.realdata, this.colordata, 'bar', 'barchart');
        this.RenderChart(this.labeldata, this.realdata, this.colordata, 'pie', 'piechart');
        this.RenderChart(this.labeldata, this.realdata, this.colordata, 'line', 'dochart');
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

}
