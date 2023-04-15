import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as Notiflix from 'notiflix';
import { ServiceDataService } from 'src/app/services/service-data.service';

@Component({
  selector: 'app-account-officer',
  templateUrl: './account-officer.component.html',
  styleUrls: ['./account-officer.component.css']
})
export class AccountOfficerComponent implements OnInit{


  officerData: any = {};

  officerDataDetails:any = []

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
    });



  userDatas: any;
  userProfilePhoto = '';
  userProfilePic = '';
  defaultImageProfile: string = '';

  constructor(private _serviceData: ServiceDataService,
    private _dataService: ServiceDataService,
    private _router: Router){}


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
      acct_status: this.officerDataDetails[0].acct_status,
     });

     })
 }

  // getAccountOfficerDetials(){
  //      this._serviceData.officerAcctDetails().subscribe(res =>{
  //      this.officerData = res.data

  //      this.userProfilePhoto = res.data.image_photo;
  //      this.userProfilePic = res.data.image_photo;
  //       })
  //   }

    // saveOfficer(){
    //   //console.log("Submitted Data", this.regOfficerForm.value)
    //   this._serviceData.registerOfficerDetails(this.regOfficerForm.value).subscribe(res =>{
    //     if(res.msg == '200')
    //   {
    //     Notiflix.Notify.success('Application Submitted Successfully', {
    //       success: {
    //           background: '#1EAAE7',
    //           },
    //           width: '350px',
    //           showOnlyTheLastOne: true,
    //           fontSize: '18px',
    //       });
    //   }
    //   else{
    //     Notiflix.Notify.failure('Not Successfully', {
    //        width: '350px',
    //           showOnlyTheLastOne: true,
    //           fontSize: '18px',
    //       });
    //     }
    //   })
    // }

}
