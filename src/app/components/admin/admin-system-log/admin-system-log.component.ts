import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceDataService } from 'src/app/services/service-data.service';
import { userLevelAccess } from 'src/app/services/userLevel.service';

@Component({
  selector: 'app-admin-system-log',
  templateUrl: './admin-system-log.component.html',
  styleUrls: ['./admin-system-log.component.css']
})
export class AdminSystemLogComponent implements OnInit{

  allUserLogs: any[] = []
  userProfilePic ="";
  defaultDetailsLocalStorage: any;

  defaultImageProfile = "<span class='badge badge-center rounded-pill bg-label-warning w-px-30 h-px-30 me-2'><i class='bx bx-user bx-xs'></i></span>";

  isLoading: boolean = false;

  myLocalDatails = JSON.parse(localStorage.getItem('userData')|| '{}');

  total_count : any;

  totalRecord: number = 0;
  pagination: number = 1;
  pageSize: number = 15;
  totalPages: number = 1;


  isFormSubmit = false;
  isDeleteSubmit = false;

  constructor(private _dataService: ServiceDataService,
    private _router: Router,
    private _authLevel: userLevelAccess){}

  ngOnInit(): void {
    this.getAllUsersLogs();
  }

   // get all users logs data
   getAllUsersLogs(){
    this.isLoading=true;
    setTimeout(() => {
      this._dataService.logUserActivity(this.pagination, this.pageSize).subscribe(res =>{
      this.allUserLogs = res.data;
      this.totalRecord = res.total_record;
      this.totalPages = window.Math.ceil(this.totalRecord/this.pageSize);
        //console.log("All Users", this.registerUser)
      this.isLoading=false;
      })
    }, 500);
  }

  reloadTable(){
    // refresh the table data after deleting
    this._dataService.logUserActivity(this.pagination, this.pageSize).subscribe(res =>{
      this.allUserLogs = res.data;
      this.totalRecord = res.total_record;
      this.totalPages = window.Math.ceil(this.totalRecord/this.pageSize);
    });
  }

  renderPage(event: number) {
    this.pagination = event;
    this.reloadTable();
  }



}
