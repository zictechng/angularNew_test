import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as Notiflix from 'notiflix';
import { ServiceDataService } from 'src/app/services/service-data.service';
import { userLevelAccess } from 'src/app/services/userLevel.service';
declare let $: any;
@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit{

  registerUser: any[] = [];
  activeUser: any[] = [];
  allAdminUser: any[] = []
  pendingUsers: any[] =[];
  blockedUsers: any[] =[];
  userProfilePic ="";
  defaultDetailsLocalStorage: any;
  userID: string = "";

  defaultImageProfile = "<span class='badge badge-center rounded-pill bg-label-warning w-px-30 h-px-30 me-2'><i class='bx bx-user bx-xs'></i></span>";

  isLoading: boolean = false;

  myLocalDatails = JSON.parse(localStorage.getItem('userData')|| '{}');

  total_count : any;

  totalRecord: number = 0;
  pagination: number = 1;
  pageSize: number = 15;
  totalPages: number = 1;

  isButtonClick = false

  isUpdating: boolean = false

  isFormSubmit = false;
  isDeleteSubmit = false;
  selectedFile = '';
  imageFilesDetails = '' ;
  userDataReceived: any = {}
  investmentSuccess = false;
  deleteID: any = '';
  displayName:string = '';

  //editing variables data here
  first_name = ''
  gender = '';
  email = '';
  phone = '';
  username = '';
  password = '';
  image_photo = '';


  registerForm = new FormGroup({
    surname: new FormControl('', [Validators.required, Validators.maxLength(25)]),
    first_name: new FormControl('', [Validators.required, Validators.maxLength(25)]),
    gender: new FormControl('', [Validators.required]),
    email: new FormControl(''),
    phone: new FormControl(''),
    username: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    image_photo: new FormControl(''),
    user_id: new FormControl(''),
  });
  surname: any;

  constructor(private _dataService: ServiceDataService,
    private _router: Router,
    private _authLevel: userLevelAccess){}


  ngOnInit(): void {
    this.getAllAdminUsers()
  }


   // get all users data
   getAllAdminUsers(){
    this.isLoading=true;
    setTimeout(() => {
      this._dataService.fetchAdminUser(this.pagination, this.pageSize).subscribe(res =>{
      this.allAdminUser = res.data;
      this.totalRecord = res.total_record;
      this.userProfilePic = this._dataService.backenServerUrl;
      this.totalPages = window.Math.ceil(this.totalRecord/this.pageSize);
        //console.log("All Users", this.registerUser)
      this.isLoading=false;
      })
    }, 500);
  }

  reloadTable(){
    // refresh the table data after deleting
    this._dataService.fetchAdminUser(this.pagination, this.pageSize).subscribe(res =>{
      this.allAdminUser = res.data;
      this.totalRecord = res.total_record;
      this.totalPages = window.Math.ceil(this.totalRecord/this.pageSize);
      this.userProfilePic = this._dataService.backenServerUrl;
      this.isLoading=false;
    });
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

  renderPage(event: number) {
    this.pagination = event;
    this.reloadTable();
  }

  registerAdmin(){

    this.isFormSubmit = true
    this.userDataReceived  = this.registerForm.value;
    Notiflix.Loading.standard('Processing...');
    const formData = new FormData();
    //console.log("Form values Sending to backend", this.userDataReceived);
    //formData.append('file', this.imageFilesDetails);
    formData.append('surname',this.userDataReceived.surname);
    formData.append('first_name', this.userDataReceived.first_name);
    formData.append('gender', this.userDataReceived.gender);
    formData.append('username', this.userDataReceived.username);
    formData.append('password', this.userDataReceived.password);
    formData.append('phone', this.userDataReceived.phone);
    formData.append('email', this.userDataReceived.email);
    formData.append('file', this.imageFilesDetails);

    this._dataService.registerAdminUser(formData).subscribe(res =>{
      if(res.msg == '201')
      {
        Notiflix.Notify.success('Application Submitted Successfully', {
              width: '400px',
              showOnlyTheLastOne: true,
              fontSize: '18px',
              position: 'center-bottom',

          });
          this.isFormSubmit = false
          this.registerForm.reset(); // clear the form input
          Notiflix.Loading.remove(); // remove the loading indicator
          this.reloadTable();
          this.investmentSuccess = true;
          this.closeAddModal('backAgroModal');
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
        Notiflix.Notify.failure('Error! Invalid details', {
          width: '300px',
          showOnlyTheLastOne: true,
          fontSize: '18px',
          position: 'center-bottom',
        });
          }
          else if(err.status == "400"){
        Notiflix.Notify.failure('Error! Some fields missing..', {
              width: '350px',
              showOnlyTheLastOne: true,
              fontSize: '18px',
              position: 'center-bottom',
            });
        }
        else if(err.status == '409'){
          Notiflix.Notify.failure('Error! Username Already Exist', {
             width: '350px',
             showOnlyTheLastOne: true,
             fontSize: '18px',
             position: 'center-bottom',
           });
           Notiflix.Loading.remove();
         }
         else if(err.status == '500'){
          Notiflix.Notify.failure('Error! Server errored occurred', {
             width: '350px',
             showOnlyTheLastOne: true,
             fontSize: '18px',
             position: 'center-bottom',
           });
           Notiflix.Loading.remove();
         }
         else if(err.status == '403'){
          Notiflix.Notify.failure('Error! No image selected', {
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

  updateAdminUser(){
    this.isFormSubmit =true;
    this.isUpdating = true;
    Notiflix.Loading.standard('Processing...');
    //console.log("Edit data", this.registerForm.value)
    setTimeout(() => {
      this._dataService.updateAdminUser(this.registerForm.value).subscribe(res =>{
        if(res.msg == 201){
          Notiflix.Notify.success('Updated successfully', {
            width: '350px',
            showOnlyTheLastOne: true,
            fontSize: '18px',
            position: 'center-bottom',
          });
          this.reloadTable();
          this.closeEditModal();
          this.isFormSubmit = false;
          Notiflix.Loading.remove();
        }
        else{
          Notiflix.Notify.warning('Failed to updated', {
            width: '350px',
            showOnlyTheLastOne: true,
            fontSize: '18px',
            position: 'center-bottom',
          });
          this.closeEditModal();
          this.isFormSubmit = false;
          Notiflix.Loading.remove();
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
          this.isFormSubmit = false;
        }
        else if(err.status == 401){
          Notiflix.Notify.failure('Error! something went wrong', {
            width: '350px',
            showOnlyTheLastOne: true,
            fontSize: '18px',
            position: 'center-bottom',
          });
          this.isFormSubmit = false;

        }
        else if(err.status === 404){
         Notiflix.Notify.failure('Sorry! Record not found', {
            width: '350px',
            showOnlyTheLastOne: true,
            fontSize: '18px',
            position: 'center-bottom',
          });
        }
        this.isFormSubmit = false;
        Notiflix.Loading.remove();
      })
    }, 500);
  }

  // confirm delete modal dialog here
  displayStyle = "none";
  displayStyleEdit = "none";
  openConfirmDelete(id: any) {
    this.deleteID = id;
    //console.log("confirm delete", id);
    this.displayStyle = "block";
  }
  closeConfirmDelete() {
    this.displayStyle = "none";
  }

  //open edit modal dialog here
  openEditModal(id: any, surname:any, first_name:any, gender:any, email:any, username:any, phone:any, pas:any) {
    this.userID = id;
    this.displayName = surname+' '+first_name;
    this.surname = surname;
    this.first_name = first_name;
    this.gender = gender;
    this.email = email;
    this.username = username;
    this.phone = phone;
    this.password = pas;

    // use patched value to set form value when you want to do update of user details
    this.registerForm.patchValue({
      surname: this.surname,
      first_name: this.first_name,
      gender: this.gender,
      email: this.email,
      username: this.username,
      phone: this.phone,
      password: this.password,
      user_id: this.userID

    });
    //console.log("confirm delete", id, bal);
    this.displayStyleEdit = "block";
  }
  closeEditModal() {
    this.displayStyleEdit = "none";
    this.userID ='';
    this.surname = '';
    this.first_name = '';
    this.gender = '';
    this.email='';
    this.phone = '';
    this.password = '';
    this.phone
    this.registerForm.reset();
    this.isFormSubmit = false;
    this.isDeleteSubmit =false
  }

  //add admin modal method here
openAddModal(id:String){
  $('#'+id).modal('show');
}
closeAddModal(id: String){
$('#'+ id).modal('hide');
}
}
