import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  // variable to check if user click on the submit button
  isFormSubmit = false;
  selectedFile = '';
  imageFilesDetails = '' ;
  userDataReceived: any = {}


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
    currency_type: new FormControl(''),
    username: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    address: new FormControl('', [Validators.required, Validators.maxLength(150)]),
    image_photo: new FormControl(''),
  });
  constructor(private _auth: AuthServiceService,
    private _router: Router){}

  ngOnInit(): void {

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
    formData.append('file', this.imageFilesDetails);

    this._auth.registerNewUser(formData).subscribe(res =>{
    //console.log(res)
    //localStorage.setItem('token', res.email);
    if(res.msg == '201')
      {
        Notiflix.Notify.success('Application Submitted Successfully', {
          success: {
              background: '#1EAAE7',
              },
              width: '350px',
              showOnlyTheLastOne: true,
              fontSize: '18px',
          });
          this.isFormSubmit = false
          this.registerForm.reset(); // clear the form input
          Notiflix.Loading.remove(); // remove the loading indicator
          this._router.navigate(['/login']); // after registration, go back to login page
      }
      else {
            Notiflix.Notify.warning('Error! Something went wrong, try again', {
                width: '350px',
                showOnlyTheLastOne: true,
                fontSize: '18px',
              });
              Notiflix.Loading.remove();
          }
  }, err =>{
        if(err.status == "401"){
          Notiflix.Notify.warning('Error! Invalid details', {
            width: '300px',
            showOnlyTheLastOne: true,
            fontSize: '18px',
          });
            }
            else if(err.status == "400"){
          Notiflix.Notify.warning('Error! Some fields missing..', {
                width: '300px',
                showOnlyTheLastOne: true,
                fontSize: '18px',
              });
          }
          else if(err.status == '409'){
            Notiflix.Notify.warning('Error! Username Already Exist', {
               width: '300px',
               showOnlyTheLastOne: true,
               fontSize: '18px',
             });
             Notiflix.Loading.remove();
           }
           else if(err.status == '500'){
            Notiflix.Notify.warning('Error! Server errored occurred', {
               width: '300px',
               showOnlyTheLastOne: true,
               fontSize: '18px',
             });
             Notiflix.Loading.remove();
           }
           else if(err.status == '403'){
            Notiflix.Notify.warning('Error! No image selected', {
               width: '300px',
               showOnlyTheLastOne: true,
               fontSize: '18px',
             });
             Notiflix.Loading.remove();
           }
          Notiflix.Loading.remove();
          })
      }
}
