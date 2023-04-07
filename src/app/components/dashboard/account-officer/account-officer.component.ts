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


  regOfficerForm = new FormGroup({
    surname: new FormControl(''),
    first_name: new FormControl(''),
    gender: new FormControl(''),
    email: new FormControl(''),
    username: new FormControl(''),
    });

  userDatas: any;
  userProfilePhoto = '';
  userProfilePic = '';
  defaultImageProfile: string = '';

  constructor(private _serviceData: ServiceDataService,
    private _router: Router){}


  ngOnInit(): void {
    this.getAccountOfficerDetials();
    this.defaultImageProfile = this._serviceData.getDefaultImage();

  }


  getAccountOfficerDetials(){
       this._serviceData.officerAcctDetails().subscribe(res =>{
       this.officerData = res.data

       this.userProfilePhoto = res.data.image_photo;
       this.userProfilePic = res.data.image_photo;
        })
    }

    saveOfficer(){
      //console.log("Submitted Data", this.regOfficerForm.value)
      this._serviceData.registerOfficerDetails(this.regOfficerForm.value).subscribe(res =>{
        if(res.msg == '200')
      {
        Notiflix.Notify.success('Application Submitted Successfully', {
          success: {
              background: '#1EAAE7',
              },
              width: '350px',
              showOnlyTheLastOne: true,
              fontSize: '18px',
          });
      }
      else{
        Notiflix.Notify.failure('Not Successfully', {
           width: '350px',
              showOnlyTheLastOne: true,
              fontSize: '18px',
          });
        }
      })
    }

}
