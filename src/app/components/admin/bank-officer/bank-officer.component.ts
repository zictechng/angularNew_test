import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as Notiflix from 'notiflix';
import { ServiceDataService } from 'src/app/services/service-data.service';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-bank-officer',
  templateUrl: './bank-officer.component.html',
  styleUrls: ['./bank-officer.component.css']
})
export class BankOfficerComponent implements OnInit{


  myId : any = JSON.parse(localStorage.getItem('userData')|| '{}');
  defaultImageProfile: string = '';
  defaultDetailsLocalStorage: any;
  userProfilePhoto = '';
  userProfilePic = '';
  myData : any = this.myId;
  isbuttonClick = false;

  officerDataDetails:any = [];

  selectedFile = '';
  imageFilesDetails = '' ;
  userDataReceived: any = {}

  regOfficerForm = new FormGroup({
    surname: new FormControl(''),
    first_name: new FormControl(''),
    gender: new FormControl(''),
    email: new FormControl(''),
    username: new FormControl(''),
    office_type: new FormControl(''),
    staff_id: new FormControl(''),
    branch_office: new FormControl(''),
    bank_name: new FormControl(''),
    acct_status: new FormControl(''),
    address: new FormControl(''),
    image_photo: new FormControl(''),
    user_id: new FormControl(this.myId._id),
    });


  constructor(private _dataService: ServiceDataService,
    private _transactService: TransactionsService,
    private _serviceData: ServiceDataService,
    private _router: Router) {}


  ngOnInit(): void {
    this.getAccountOfficerDetials();
    this.defaultImageProfile = this._serviceData.getDefaultImage();
  }


  //fetch bank officers information
  getAccountOfficerDetials(){
    this._serviceData.officerAcctDetails().subscribe(res =>{
    this.officerDataDetails = res.data
    //console.log("New Data", this.officerDataDetails);
    //console.log("Data : ", res.data)
    //this.userProfilePic = this._dataService.backenServerUrl;
    this.userProfilePhoto = res.data.image_photo;
    this.userProfilePic = this._dataService.backenServerUrl;
    this.regOfficerForm.patchValue({
      surname: this.officerDataDetails[0].surname,
      first_name: this.officerDataDetails[0].first_name,
      gender: this.officerDataDetails[0].gender,
      email: this.officerDataDetails[0].email,
      username: this.officerDataDetails[0].username,
      office_type: this.officerDataDetails[0].staff_type,
      staff_id: this.officerDataDetails[0].staff_id,
      branch_office: this.officerDataDetails[0].branch,
      bank_name: this.officerDataDetails[0].bank_name,
     });

     })
 }

 saveUpdate(){
        //console.log("Submitted Data", this.regOfficerForm.value)
        this.userDataReceived  = this.regOfficerForm.value;
        Notiflix.Loading.standard('Processing...');
        const formData = new FormData();
        formData.append('file', this.imageFilesDetails);
        formData.append('surname',this.userDataReceived.surname);
        formData.append('first_name', this.userDataReceived.first_name);
        formData.append('gender', this.userDataReceived.gender);
        formData.append('email', this.userDataReceived.email);
        formData.append('phone', this.userDataReceived.phone);
        formData.append('username', this.userDataReceived.username);
        formData.append('office_type', this.userDataReceived.office_type);
        formData.append('staff_id', this.userDataReceived.staff_id);
        formData.append('branch_office', this.userDataReceived.branch_office);
        formData.append('bank_name', this.userDataReceived.bank_name);
        formData.append('acct_status', this.userDataReceived.acct_status);
        formData.append('user_id', this.userDataReceived.user_id);

        this._serviceData.updateOfficerProfile(formData).subscribe(res =>{
          if(res.msg == '200')
        {
          Notiflix.Notify.success('Profile Updated Successfully', {
            success: {
                background: '#1EAAE7',
                },
                width: '350px',
                showOnlyTheLastOne: true,
                fontSize: '18px',
            });

            Notiflix.Loading.remove();
            this.getAccountOfficerDetials()
        }
        else{
          Notiflix.Notify.failure('Not Successfully', {
              width: '350px',
                showOnlyTheLastOne: true,
                fontSize: '18px',
            });
          }
          Notiflix.Loading.remove()
        })
      }

    //reset the file upload input field here
    clearImage(){
      this.regOfficerForm.controls['image_photo'].reset();
    }
    // onFileSelected(event: any){
    //   //console.log(event);
    //   this.selectedFile = event.target.files[0];
    //   let fileType = event.target.files[0].type;
    //   if(fileType.match(/image\/*/)){
    //     let reader = new FileReader();
    //     reader.readAsDataURL(event.target.files[0]);
    //     reader.onload = (event: any) =>{
    //       this.defaultImageProfile = event.target.result;
    //       this.userProfilePhoto = event.target.result;
    //       this.userProfilePic = event.target.result;
    //     }
    //   }
    //   else{
    //     Notiflix.Notify.failure('Sorry, file type not supported',
    //           {
    //           width: '300px',
    //           position: 'center-bottom',
    //           });
    //           // clear the input fields
    //         this.clearImage();
    //         return;
    //     //window.alert("Select image file only!");
    //   }
    // }


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
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (event: any) =>{
        this.defaultImageProfile = event.target.result;
        this.userProfilePhoto = event.target.result;
        this.userProfilePic = event.target.result;
      }
      }
      //console.log("Image details", fileType, this.imageFilesDetails)
    }
}
