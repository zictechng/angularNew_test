import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Notiflix from 'notiflix';
import { ServiceDataService } from 'src/app/services/service-data.service';
import { userLevelAccess } from 'src/app/services/userLevel.service';

@Component({
  selector: 'app-admin-all-log',
  templateUrl: './admin-all-log.component.html',
  styleUrls: ['./admin-all-log.component.css']
})
export class AdminAllLogComponent implements OnInit{


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


  deleteID: any = ''

  constructor(private _dataService: ServiceDataService,
    private _router: Router,
    private _authLevel: userLevelAccess){}



  ngOnInit(): void {
    this.getSystemUsersLogs();
  }


    // get all system activities data
    getSystemUsersLogs(){
      this.isLoading=true;
      setTimeout(() => {
        this._dataService.systemActivityLog(this.pagination, this.pageSize).subscribe(res =>{
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
      this._dataService.systemActivityLog(this.pagination, this.pageSize).subscribe(res =>{
        this.allUserLogs = res.data;
        this.totalRecord = res.total_record;
        this.totalPages = window.Math.ceil(this.totalRecord/this.pageSize);
      });
    }

    renderPage(event: number) {
      this.pagination = event;
      this.reloadTable();
    }

    //delete user record from table
    deleteLog(){
    this.isDeleteSubmit = true
    //console.log("Deleted ID", this.deleteID);
    this._dataService.deleteUserDetail(this.deleteID).subscribe(res =>{
      if(res.msg == 200){
        Notiflix.Notify.success('Deleted successfully', {
          width: '350px',
          showOnlyTheLastOne: true,
          fontSize: '18px',
          position: 'center-bottom',
        });
       this.reloadTable();
        this.closeConfirmDelete();
        this.isDeleteSubmit = false;
      }
      else if(res.msg == 403){

        Notiflix.Notify.failure('Error! Record not found', {
          width: '350px',
          showOnlyTheLastOne: true,
          fontSize: '18px',
          position: 'center-bottom',
        });
        this.isDeleteSubmit = false;
        this.closeConfirmDelete()
      }
      else{
       Notiflix.Notify.failure('Sorry! Something went wrong', {
          width: '350px',
          showOnlyTheLastOne: true,
          fontSize: '18px',
          position: 'center-bottom',
        });
      }
      this.closeConfirmDelete()
      this.isDeleteSubmit = false;
    }, err =>{
    if(err.status == "500"){
     Notiflix.Notify.warning('Error! Server errored occurred', {
        width: '350px',
        showOnlyTheLastOne: true,
        fontSize: '18px',
        position: 'center-bottom',
      });
      console.log(err.message)
      this.closeConfirmDelete()
      this.isDeleteSubmit = false;
    }}
    );
  }

  // confirm modal dialog here
  displayStyle = "none";
  openConfirmDelete(id: any) {
    this.deleteID = id;
    //console.log("confirm delete", id);
    this.displayStyle = "block";
  }
  closeConfirmDelete() {
    this.displayStyle = "none";
  }

}
