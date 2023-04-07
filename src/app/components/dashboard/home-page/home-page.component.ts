import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceDataService } from 'src/app/services/service-data.service';
declare var $: any;
declare var jQuery:any;
declare const require: any;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{



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
   this.myRecentTransaction()
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


// get logged in user profile details here from the local storage
// getUserLocalData(){
//   this.userLocalDetails = localStorage.getItem('userData');
//   this.showLocalData = (JSON.parse(this.userLocalDetails))
//   console.log("My ID 2", this.showLocalData._id);

//   const nowData = (JSON.parse(this.myLocalDatails))
//   console.log("Data 2", nowData._id)

//   }

}
