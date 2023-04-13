import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as Notiflix from 'notiflix';
import { ServiceDataService } from 'src/app/services/service-data.service';
import { userLevelAccess } from 'src/app/services/userLevel.service';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.css']
})
export class UpdateAccountComponent implements OnInit{


userID: any
updateUserData:any ={}

isFormSubmit = false;
selectedFile = '';
imageFilesDetails = '' ;
userDataReceived: any = {}

myLocalDatails = JSON.parse(localStorage.getItem('userData')|| '{}');
userProfilePic = '';
defaultImageProfile = "<span class='badge badge-center rounded-pill bg-label-warning w-px-30 h-px-30 me-2'><i class='bx bx-user bx-xs'></i></span>";


updateUserForm = new FormGroup({
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
  acct_status: new FormControl(''),
  image_photo: new FormControl(''),
});

  constructor(private _dataService: ServiceDataService,
    private _router: Router,
    private _authLevel: userLevelAccess,
    private _route: ActivatedRoute){}

  ngOnInit(): void {
    // get the Edit ID passed by the page via url here
    let userID = this._route.snapshot.paramMap.get('id');
    this._dataService.fetchEditUser(this._route.snapshot.paramMap.get('id')).subscribe(res =>{
      console.log("Result Edit data", res)
      this.updateUserData = res
      this.userProfilePic = this._dataService.backenServerUrl;
      })
    //console.log("Get ID", userID);

  }

   //reset the file upload input field here
   clearImage(){
    this.updateUserForm.controls['image_photo'].reset();
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
  updateUserDetails(){
    //console.log("Update Date Sending ", this.updateUserForm.value)
    this.isFormSubmit = true
    this.userDataReceived  = this.updateUserForm.value;
    Notiflix.Loading.standard('Updating...');

    const formData = new FormData();
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
    formData.append('_id', this.updateUserData.data[0]._id);
    formData.append('acct_status', this.userDataReceived.acct_status);

    //console.log("API Data", formData);
    this._dataService.updateUserDetail(formData).subscribe(res =>{
      if(res.msg == '201')
      {
        Notiflix.Notify.success('Updated successfully', {
          success: {
              background: '#1EAAE7',
              },
              width: '400px',
              showOnlyTheLastOne: true,
              fontSize: '18px',
              position: 'center-bottom',

          });
          this.isFormSubmit = false
           // clear the form input
          Notiflix.Loading.remove(); // remove the loading indicator
          this._router.navigate(['/admin/all-users']) // fetch all the users
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
  // confirm modal dialog here
  displayStyle = "none";
  openConfirmUpdate() {
    this.displayStyle = "block";
  }
  closeConfirmUpdate() {
    this.displayStyle = "none";
  }
}
