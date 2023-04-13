import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Notiflix from 'notiflix';
import { ServiceDataService } from 'src/app/services/service-data.service';
import { userLevelAccess } from 'src/app/services/userLevel.service';

@Component({
  selector: 'app-admin-transaction',
  templateUrl: './admin-transaction.component.html',
  styleUrls: ['./admin-transaction.component.css']
})
export class AdminTransactionComponent implements OnInit{


  allTransactions: any = []
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
    this.getAllUserTran()
  }

  // get all users data
  getAllUserTran(){
    this.isLoading=true;
    setTimeout(() => {
      this._dataService.getAllTran(this.pagination, this.pageSize).subscribe(res =>{
      this.allTransactions = res.data;
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
    this.getAllUserTran();
  }

  reloadTable(){
    // refresh the table data after deleting
    // this._dataService.fetchUsersAll(this.pagination, this.pageSize).subscribe(res =>{
    //   this.allUser = res.data;
    //   this.totalRecord = res.total_record;
    //   this.totalPages = window.Math.ceil(this.totalRecord/this.pageSize);
    // });
      // refresh the counters of active, pending, blocked users
      this._dataService.getAllTran(this.pagination, this.pageSize).subscribe(res =>{
        this.allTransactions = res.data;
        this.totalRecord = res.total_record;
        this.totalPages = window.Math.ceil(this.totalRecord/this.pageSize);
        this.userProfilePic = this._dataService.backenServerUrl;
    })
  }

  // viewUser(id:any){
  //   //console.log("User ID", id);
  //   this._router.navigate(['/admin/update-account', id])
  // }

  //delete user record from table
  deleteUsers(){
    this.isDeleteSubmit = true
    //console.log("Deleted ID", this.deleteID);
    this._dataService.deleteTranRecord(this.deleteID).subscribe(res =>{
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
      else{
        Notiflix.Notify.warning('Failed to delete', {
          width: '350px',
          showOnlyTheLastOne: true,
          fontSize: '18px',
          position: 'center-bottom',
        });
        this.reloadTable();
        this.closeConfirmDelete();
        this.isDeleteSubmit = false;
      }
    }, err =>{
    if(err.status == "500"){
     Notiflix.Notify.warning('Error! Server error occurred', {
        width: '350px',
        showOnlyTheLastOne: true,
        fontSize: '18px',
        position: 'center-bottom',
      });
      console.log(err.message)
      this.closeConfirmDelete()
      this.isDeleteSubmit = false;
    }
    else if(err.status == 403){

      Notiflix.Notify.failure('Error! Record not found', {
        width: '350px',
        showOnlyTheLastOne: true,
        fontSize: '18px',
        position: 'center-bottom',
      });
      this.isDeleteSubmit = false;
      this.closeConfirmDelete()
    }
    else if(err.status === 404){
     Notiflix.Notify.failure('Sorry! Record not deleted', {
        width: '350px',
        showOnlyTheLastOne: true,
        fontSize: '18px',
        position: 'center-bottom',
      });
    }
    this.closeConfirmDelete()
    this.isDeleteSubmit = false;

  }
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
