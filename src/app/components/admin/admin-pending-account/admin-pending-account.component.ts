import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Notiflix from 'notiflix';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ServiceDataService } from 'src/app/services/service-data.service';
import { userLevelAccess } from 'src/app/services/userLevel.service';

@Component({
  selector: 'app-admin-pending-account',
  templateUrl: './admin-pending-account.component.html',
  styleUrls: ['./admin-pending-account.component.css']
})
export class AdminPendingAccountComponent implements OnInit{


  allUser: any = []
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
    private _authService: AuthServiceService,
    private _authLevel: userLevelAccess){
    this._authService.defineAccessLevel(this.myLocalDatails.user_role)
    }


  ngOnInit(): void {
    this.getAllUsers();
    this._authService.defineAccessLevel(this.myLocalDatails.user_role)
    // if(this.myLocalDatails.user_role !='Admin'){
    //   this._router.navigate(['/dashboard']);
    // }
  }



  // get all users data
  getAllUsers(){
    this.isLoading=true;
    setTimeout(() => {
      this._dataService.fetchPendingUser(this.pagination, this.pageSize).subscribe(res =>{
      this.allUser = res.data;
      this.totalRecord = res.total_record;
      this.totalPages = window.Math.ceil(this.totalRecord/this.pageSize);
      this.userProfilePic = this._dataService.backenServerUrl;
        //console.log("All Users", this.registerUser)
      this.isLoading=false;
      })
    }, 500);
  }

  renderPage(event: number) {
    this.pagination = event;
    this.getAllUsers();
  }

  reloadTable(){
    // refresh the table data after deleting
    // this._dataService.fetchUsersAll(this.pagination, this.pageSize).subscribe(res =>{
    //   this.allUser = res.data;
    //   this.totalRecord = res.total_record;
    //   this.totalPages = window.Math.ceil(this.totalRecord/this.pageSize);
    // });
      // refresh the counters of active, pending, blocked users
      this._dataService.fetchPendingUser(this.pagination, this.pageSize).subscribe(res =>{
      this.allUser = res.data;
      //console.log("All Users", this.registerUser)
      this.userProfilePic = this._dataService.backenServerUrl;
      this.totalRecord = res.total_record;
      this.totalPages = window.Math.ceil(this.totalRecord/this.pageSize);
    })
  }

  viewUser(id:any){
    //console.log("User ID", id);
    this._router.navigate(['/admin/update-account', id])
  }

  //delete user record from table
  deleteUsers(){
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
