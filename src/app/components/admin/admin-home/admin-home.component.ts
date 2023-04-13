import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ServiceDataService } from 'src/app/services/service-data.service';
import { userLevelAccess } from 'src/app/services/userLevel.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit{


  registerUser: any[] = [];
  activeUser: any[] = [];
  roiProfit: any = {};
  allTransactions: any[] = [];
  userActivities: any[] = [];
  recentTransactions: any[] = []
  allRecentTransactions: any[] = []
  allInvestments: any[] =[]

  isLoading: boolean = false;

  myLocalDatails = JSON.parse(localStorage.getItem('userData')|| '{}');

  constructor(private _dataService: ServiceDataService,
    private _router: Router,
    private _authLevel: userLevelAccess){}

  ngOnInit(): void {

    this.getAllUser();
    this.getAllActiveUser();
    this.getAllUserTransaction();
    this.getInvestment();
  }


  // get all users data
  getAllUser(){
    this._dataService.fetchAllUsers().subscribe(res =>{
      this.registerUser = res.data;
      //console.log("All Users", this.registerUser)
    })
  }

  // get all active users
  getAllActiveUser(){
    this._dataService.fetchActiveUsers().subscribe(res =>{
      this.activeUser = res.data;
      //console.log("All Active Users", this.activeUser)
    })
  }

  // get all transactions
  getAllUserTransaction(){
    this.isLoading=true;
    setTimeout(() => {
      this._dataService.fetchUsersTransaction().subscribe(res =>{

        this.allTransactions = res.data;
        this.allRecentTransactions = res.recent
        this.isLoading=false;
        //console.log("All Transaction", this.allTransactions)
      })
    }, 1000);
  }


  // get all user investment transactions
  getInvestment(){
    this._dataService.fetchUsersInvestment().subscribe(res =>{
      this.allInvestments = res.data;
      //console.log("All Investment", this.allInvestments)
    })
  }
}
