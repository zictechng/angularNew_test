import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as Notiflix from 'notiflix';
import { ServiceDataService } from 'src/app/services/service-data.service';
import { TransactionsService } from 'src/app/services/transactions.service';
import { userLevelAccess } from 'src/app/services/userLevel.service';

declare let $: any;

@Component({
  selector: 'app-admin-app-setting',
  templateUrl: './admin-app-setting.component.html',
  styleUrls: ['./admin-app-setting.component.css']
})
export class AdminAppSettingComponent implements OnInit{

  isFormSubmit: boolean = false;

  isLoading: boolean = false;
  selectedFile = '';
  imageFilesDetails = '' ;
  width:any = '';
  height:any = '';
  isButtonClicked: boolean = false;

  isFormSubmitLogo:boolean = false;

  userProfilePic = ''

  myLocalDatails = JSON.parse(localStorage.getItem('userData')|| '{}');


  formDataReceive: any
  appSettingForm = new FormGroup({
    business_name: new FormControl('', [Validators.required, Validators.maxLength(25)]),
    user_id: new FormControl(this.myLocalDatails._id),
    business_short_name: new FormControl('', [Validators.required, Validators.maxLength(10)]),

  });

   appSettingLogoForm = new FormGroup({
    image_photo: new FormControl('', [Validators.required]),
    user_id: new FormControl(this.myLocalDatails._id),
   });


   constructor(private _dataService: ServiceDataService,
    private _router: Router,
    private _transService: TransactionsService,
    private _authLevel: userLevelAccess){}


  ngOnInit(): void {

  }
    //reset the file upload input field here
    clearImage(){
      this.appSettingLogoForm.controls['image_photo'].reset();
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
     console.log("file type Okay")
      } else {
          Notiflix.Notify.failure('Sorry, file type not supported',
          {
          width: '300px',
          showOnlyTheLastOne: true,
        position: 'center-bottom',
        fontSize: '18px',
          });
          // clear the input fields
        this.clearImage();
        return;
        }

      if (sizeOfFile > 5*1024) {
        Notiflix.Notify.failure('Sorry, file to large to upload',
        {
        width: '300px',
        showOnlyTheLastOne: true,
        position: 'center-bottom',
        fontSize: '18px',
        });
        // clear the input fields
      this.clearImage();
      return;
      }
      else if(fileType.match(/image\/*/)){
        this.imageFilesDetails = this.selectedFile
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (event: any) =>{
        this.userProfilePic = event.target.result;
        // below line check for image width and height
          const image = new Image();
          image.src = event.target.result;
          image.onload = () => {
            const {
              height,
              width
            } = image;
      if (height > 100 || width > 150) {
        Notiflix.Notify.failure('Sorry, Image dimension is out of range',
        {
        width: '400px',
        showOnlyTheLastOne: true,
        position: 'center-bottom',
        fontSize: '18px',
        });
      console.log("Image details", height, width)
      //this.clearImage();
       return false;
        }
        return true;
        };
      }
    }
      //console.log("Image details", fileType, this.imageFilesDetails)
  }

  saveBusinessName(){
    this.isLoading = true;
    this.isFormSubmit = true;
    //console.log("submitted ", this.appSettingForm.value)

    if(this.appSettingForm.invalid){

      this.closeAppSettingModal('businessNameModal')
      this.isLoading = false;

      }
     else if(this.appSettingForm.valid){
      console.log(this.appSettingForm)
      this.isButtonClicked = true;

      this.formDataReceive = this.appSettingForm.value
      const merged = Object.assign(this.formDataReceive, this.myLocalDatails._id );

       this._dataService.setupSystemInfo(merged).subscribe(res =>{
        if(res.msg == '200'){
          Notiflix.Notify.success('Information updated Successfully', {
            width: '400px',
            showOnlyTheLastOne: true,
            position: 'center-bottom',
            fontSize: '18px',
          });
          this.closeAppSettingModal('businessNameModal');
          this.isLoading = false
          this.isFormSubmit = false
          this.appSettingForm.reset();
          this.isButtonClicked =false;
          }
        else{
          Notiflix.Notify.failure('Failed, something went wrong', {
            width: '400px',
            showOnlyTheLastOne: true,
            position: 'center-bottom',
            fontSize: '18px',
          });
          this.closeAppSettingModal('businessNameModal');
          this.isLoading = false
          this.isFormSubmit = false
          this.isButtonClicked =false;
         }

        }, err =>{
          if(err.status == "402"){
            Notiflix.Notify.failure('Error! Account not found.', {
              width: '350px',
              showOnlyTheLastOne: true,
              position: 'center-bottom',
              fontSize: '18px',
            });
            } else if(err.status == "403"){

              Notiflix.Notify.failure('Error, Account not active', {
                width: '350px',
                showOnlyTheLastOne: true,
                position: 'center-bottom',
                fontSize: '18px',
              });
              }
              else if(err.status == "405"){
                Notiflix.Notify.failure('Failed, Account balance is low', {
                  width: '350px',
                  showOnlyTheLastOne: true,
                  position: 'center-bottom',
                  fontSize: '18px',
                });
           }
              else if(err.status == "500"){
                Notiflix.Notify.failure('Sorry, Server error! Try again', {
                  width: '350px',
                  showOnlyTheLastOne: true,
                  position: 'center-bottom',
                  fontSize: '17px',
                });
              }
              this.isLoading = false
              this.isFormSubmit = false
              this.appSettingForm.reset();
              this.isButtonClicked =false;
              this.closeAppSettingModal('businessNameModal');
          })
     }
  }

  saveBusinessLogo(){
    this.isLoading = true;
    this.isFormSubmitLogo = true;
    console.log("submitted ", this.appSettingLogoForm.value)

    this.formDataReceive = this.appSettingLogoForm.value

    const formData = new FormData();
    formData.append('file', this.imageFilesDetails);
    formData.append('user_id',this.formDataReceive.user_id);

    if(this.imageFilesDetails == '' || this.imageFilesDetails == null) {

      this.closeLogoModal('businessLogoModal')
      this.isLoading = false
      this.isFormSubmitLogo = false
      Notiflix.Notify.failure('Image not selected', {
        width: '300px',
        showOnlyTheLastOne: true,
        position: 'center-bottom',
        fontSize: '18px',
      });
     }

     else if(this.appSettingLogoForm.valid){
        console.log("Data Submitted", formData);
       this._dataService.setupSystemInfo(formData).subscribe(res =>{
        if(res.msg == '200'){
          Notiflix.Notify.success('Information updated Successfully', {
            width: '400px',
            showOnlyTheLastOne: true,
            position: 'center-bottom',
            fontSize: '18px',
          });
          this.closeLogoModal('businessLogoModal');
          this.isLoading = false
          this.isFormSubmitLogo = false
          this.appSettingLogoForm.reset()
          }
        else{
          Notiflix.Notify.failure('Failed, something went wrong', {
            width: '400px',
            showOnlyTheLastOne: true,
            position: 'center-bottom',
            fontSize: '18px',
          });
          this.closeLogoModal('businessLogoModal');
          this.isLoading = false
          this.isFormSubmitLogo = false
         }

        }, err =>{
          if(err.status == "402"){
            Notiflix.Notify.failure('Error! Account not found.', {
              width: '350px',
              showOnlyTheLastOne: true,
              position: 'center-bottom',
              fontSize: '18px',
            });
            } else if(err.status == "403"){

              Notiflix.Notify.failure('Error, Account not active', {
                width: '350px',
                showOnlyTheLastOne: true,
                position: 'center-bottom',
                fontSize: '18px',
              });
              }
              else if(err.status == "405"){
                Notiflix.Notify.failure('Failed, Account balance is low', {
                  width: '350px',
                  showOnlyTheLastOne: true,
                  position: 'center-bottom',
                  fontSize: '18px',
                });
           }
              else if(err.status == "500"){
                Notiflix.Notify.failure('Sorry, Server error! Try again', {
                  width: '350px',
                  showOnlyTheLastOne: true,
                  position: 'center-bottom',
                  fontSize: '17px',
                });
              }
              this.isLoading = false
              this.isFormSubmitLogo = false
              this.closeLogoModal('businessLogoModal');
              this.appSettingLogoForm.reset()
          })
     }
  }

//modal method here
openBusinessNameModal(id:String){
  $('#'+id).modal('show');
}
closeAppSettingModal(id: String){
$('#'+ id).modal('hide');
}


//modal method here
openLogoModal(id:String){
  $('#'+id).modal('show');
}
closeLogoModal(id: String){
$('#'+ id).modal('hide');
}

  // credit user account modal dialog here
  displayStyle = "none";
  displayStyleConfirm = "none";
  openAppSettingModal() {
  //console.log("confirm delete", id, bal);
    this.displayStyleConfirm = "block";
  }

  closeAppSettingModals() {
    this.displayStyleConfirm = "none";
    this.appSettingForm.reset();
    this.isFormSubmit = false;
    this.isLoading =false
  }

}
