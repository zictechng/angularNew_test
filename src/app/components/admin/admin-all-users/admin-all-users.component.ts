import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as Notiflix from 'notiflix';
import { ServiceDataService } from 'src/app/services/service-data.service';
import { userLevelAccess } from 'src/app/services/userLevel.service';

@Component({
  selector: 'app-admin-all-users',
  templateUrl: './admin-all-users.component.html',
  styleUrls: ['./admin-all-users.component.css']
})
export class AdminAllUsersComponent implements OnInit{


  registerUser: any[] = [];
  activeUser: any[] = [];
  allUser: any[] = []
  pendingUsers: any[] =[];
  blockedUsers: any[] =[];
  userProfilePic ="";
  defaultDetailsLocalStorage: any;

  defaultImageProfile = "<span class='badge badge-center rounded-pill bg-label-warning w-px-30 h-px-30 me-2'><i class='bx bx-user bx-xs'></i></span>";

  isLoading: boolean = false;

  myLocalDatails = JSON.parse(localStorage.getItem('userData')|| '{}');

  total_count : any;

  totalRecord: number = 0;
  pagination: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;


  isFormSubmit = false;
  isDeleteSubmit = false;
  selectedFile = '';
  imageFilesDetails = '' ;
  userDataReceived: any = {}

  deleteID: any = ''

  registerForm = new FormGroup({
    surname: new FormControl('', [Validators.required, Validators.maxLength(25)]),
    first_name: new FormControl('', [Validators.required, Validators.maxLength(25)]),
    gender: new FormControl('', [Validators.required]),
    dob: new FormControl('', [Validators.required]),
    email: new FormControl(''),
    phone: new FormControl(''),
    state: new FormControl(''),
    city: new FormControl(''),
    country: new FormControl(''),
    acct_type: new FormControl(''),
    acct_number: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    acct_cot: new FormControl('', [Validators.required, Validators.maxLength(6)]),
    acct_imf_code: new FormControl('', [Validators.required, Validators.maxLength(6)]),
    acct_tax_code: new FormControl('', [Validators.required, Validators.maxLength(6)]),
    acct_pin: new FormControl('', [Validators.required, Validators.maxLength(6)]),
    currency_type: new FormControl(''),
    username: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    address: new FormControl('', [Validators.required, Validators.maxLength(150)]),
    image_photo: new FormControl(''),
  });

  constructor(private _dataService: ServiceDataService,
    private _router: Router,
    private _authLevel: userLevelAccess){}


  ngOnInit(): void {
    this.getAllUser();
    this.getAllActiveUser();
    this.getAllUsers();
    //console.log("Image path", this.userProfilePic)
   }

    //reset the file upload input field here
  clearImage(){
    this.registerForm.controls['image_photo'].reset();
  }

  onFileSelected(event: any){
    this.selectedFile = event.target.files[0];
    let fileType = event.target.files[0].type;
    let fileSize = event.target.files[0].size;
    let fileName = event.target.files[0].name;
    let sizeOfFile = Math.round(fileSize / 1024);

    if(fileType === "image/png" ||
      fileType === "image/jpg" ||
      fileType === "image/jpeg" ){
    // the file is OK
    //console.log("file type Okay")
    } else {
        Notiflix.Notify.failure('Sorry, file type not supported',
        {
        width: '300px',
        position: 'center-bottom',
        });
        // clear the input fields
      this.clearImage();
      return;
      }

    if (sizeOfFile > 5*1024) {
      Notiflix.Notify.failure('Sorry, file to large to upload',
      {
      width: '300px',
      position: 'center-bottom',
      });
      // clear the input fields
    this.clearImage();
    return;
    }

    if(fileType.match(/image\/*/)){
      this.imageFilesDetails = this.selectedFile
    }
    //console.log("Image details", fileType, this.imageFilesDetails)
  }

  userRegister(){
    this.isFormSubmit = true
    this.userDataReceived  = this.registerForm.value;
    Notiflix.Loading.standard('Processing...');

    const formData = new FormData();
    //console.log("Form values Sending to backend", this.userDataReceived);
    //formData.append('file', this.imageFilesDetails);
    formData.append('surname',this.userDataReceived.surname);
    formData.append('first_name', this.userDataReceived.first_name);
    formData.append('gender', this.userDataReceived.gender);
    formData.append('dob', this.userDataReceived.dob);
    formData.append('email', this.userDataReceived.email);
    formData.append('phone', this.userDataReceived.phone);
    formData.append('state', this.userDataReceived.state);
    formData.append('city', this.userDataReceived.city);
    formData.append('country', this.userDataReceived.country);
    formData.append('acct_type', this.userDataReceived.acct_type);
    formData.append('currency_type', this.userDataReceived.currency_type);
    formData.append('username', this.userDataReceived.username);
    formData.append('password', this.userDataReceived.password);
    formData.append('address', this.userDataReceived.address);
    formData.append('acct_number', this.userDataReceived.acct_number);
    formData.append('file', this.imageFilesDetails);
    formData.append('acct_cot', this.userDataReceived.acct_cot);
    formData.append('acct_imf_code', this.userDataReceived.acct_imf_code);
    formData.append('acct_tax_code', this.userDataReceived.acct_tax_code);
    formData.append('acct_pin', this.userDataReceived.acct_pin);

    this._dataService.regUserNew(formData).subscribe(res =>{
    //console.log(res)
    //localStorage.setItem('token', res.email);
    if(res.msg == '201')
      {
        Notiflix.Notify.success('Application Submitted Successfully', {
          // success: {
          //     background: '#1EAAE7',
          //     },
              width: '400px',
              showOnlyTheLastOne: true,
              fontSize: '18px',
              position: 'center-bottom',

          });
          this.isFormSubmit = false
          this.registerForm.reset(); // clear the form input
          Notiflix.Loading.remove(); // remove the loading indicator
          this.getAllUsers(); // fetch all the users
          this.reloadTable();
      }
      else {
            Notiflix.Notify.warning('Error! Something went wrong, try again', {
                width: '400px',
                showOnlyTheLastOne: true,
                fontSize: '18px',
                position: 'center-bottom',
              });
              Notiflix.Loading.remove();
          }
  }, err =>{
        if(err.status == "401"){
          Notiflix.Notify.warning('Error! Invalid details', {
            width: '300px',
            showOnlyTheLastOne: true,
            fontSize: '18px',
            position: 'center-bottom',
          });
            }
            else if(err.status == "400"){
          Notiflix.Notify.warning('Error! Some fields missing..', {
                width: '350px',
                showOnlyTheLastOne: true,
                fontSize: '18px',
                position: 'center-bottom',
              });
          }
          else if(err.status == '409'){
            Notiflix.Notify.warning('Error! Username Already Exist', {
               width: '350px',
               showOnlyTheLastOne: true,
               fontSize: '18px',
               position: 'center-bottom',
             });
             Notiflix.Loading.remove();
           }
           else if(err.status == '500'){
            Notiflix.Notify.warning('Error! Server errored occurred', {
               width: '350px',
               showOnlyTheLastOne: true,
               fontSize: '18px',
               position: 'center-bottom',
             });
             Notiflix.Loading.remove();
           }
           else if(err.status == '403'){
            Notiflix.Notify.warning('Error! No image selected', {
               width: '300px',
               showOnlyTheLastOne: true,
               fontSize: '18px',
               position: 'center-bottom',
             });
             Notiflix.Loading.remove();
           }
          Notiflix.Loading.remove();
          })
      }
  // get all users data
  getAllUser(){
    this.isLoading=true;
    setTimeout(() => {
      this._dataService.fetchAllUsers().subscribe(res =>{
        this.registerUser = res.data;
        //console.log("All Users", this.registerUser)
        this.userProfilePic = this._dataService.backenServerUrl;
        this.isLoading=false;
      })
    }, 500);

  }

  // get all users data
  getAllUsers(){
    this.isLoading=true;
    setTimeout(() => {
      this._dataService.fetchUsersAll(this.pagination, this.pageSize).subscribe(res =>{
      this.allUser = res.data;
      this.totalRecord = res.total_record;
      this.totalPages = window.Math.ceil(this.totalRecord/this.pageSize);
        //console.log("All Users", this.registerUser)
      this.isLoading=false;
      })
    }, 500);
  }

  reloadTable(){
    // refresh the table data after deleting
    this._dataService.fetchUsersAll(this.pagination, this.pageSize).subscribe(res =>{
      this.allUser = res.data;
      this.totalRecord = res.total_record;
      this.totalPages = window.Math.ceil(this.totalRecord/this.pageSize);
    });

      this._dataService.fetchActiveUsers().subscribe(res =>{
      this.activeUser = res.data;
      this.pendingUsers = res.pending;
      this.blockedUsers = res.blocked;
      });
      // refresh the counters of active, pending, blocked users
      this._dataService.fetchAllUsers().subscribe(res =>{
      this.registerUser = res.data;
      //console.log("All Users", this.registerUser)
      this.userProfilePic = this._dataService.backenServerUrl;
      this.isLoading=false;
    })
  }
  // get all active users
  getAllActiveUser(){
    this.isLoading=true;
    setTimeout(() => {
      this._dataService.fetchActiveUsers().subscribe(res =>{
      this.activeUser = res.data;
      this.pendingUsers = res.pending;
      this.blockedUsers = res.blocked;
      this.isLoading=false;
        //console.log("All Active Users", this.activeUser)
      })
    }, 500);
  }

  renderPage(event: number) {
    this.pagination = event;
    this.getAllUsers();
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
