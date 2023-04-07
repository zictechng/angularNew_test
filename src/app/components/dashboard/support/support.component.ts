import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as Notiflix from 'notiflix';
import { ServiceDataService } from 'src/app/services/service-data.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit{


  isFormSubmit = false;
  isButtonClick = false
  formDataRecieved: any = {};

  ticketForm = new FormGroup({
    subject: new FormControl('', [Validators.required]),
    sender_name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    ticket_message: new FormControl('', [Validators.required, Validators.maxLength(250)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    });

  constructor(private _dataService: ServiceDataService,
    private _router: Router){}

  ngOnInit(): void {

  }

  myLocalDatails = this._dataService.getUserLocalInfomation();
    obj2 = {
      "createdBy": (this.myLocalDatails._id),
      "tick_id": this.randomString(15)
    };

  sendTicket(){
    this.isFormSubmit =true
    this.isButtonClick = true
    this.formDataRecieved = this.ticketForm.value
    const merged = Object.assign(this.formDataRecieved, this.obj2 );
    if(this.ticketForm.valid){
      Notiflix.Loading.standard('Sending..');
      this._dataService.sendTicket(merged).subscribe(res =>{
        if(res.msg == '200')
        {
          Notiflix.Notify.success('Ticket Submitted Successfully', {
            success: {
                background: '#1EAAE7',
                },
                width: '350px',
                showOnlyTheLastOne: true,
                fontSize: '18px',
            });
            this.isFormSubmit = false;
            Notiflix.Loading.remove();
            this.isButtonClick = false;
            this.isButtonClick = false;
        }
        else{
          Notiflix.Notify.failure('Not Successful', {
             width: '350px',
                showOnlyTheLastOne: true,
                fontSize: '18px',
            });
            this.isFormSubmit = false;
            Notiflix.Loading.remove();
            this.isButtonClick = false;
          }

      }, err =>{
        if(err.status == "404"){
          Notiflix.Notify.warning('Error! User not exist', {
            width: '300px',
            showOnlyTheLastOne: true,
            fontSize: '18px',
          });
            }
          else if(err.status == '500'){
            Notiflix.Notify.warning('Error! Server errored occurred', {
               width: '300px',
               showOnlyTheLastOne: true,
               fontSize: '18px',
             });
           }
           this.isFormSubmit = false;
           this.isButtonClick = false;
           Notiflix.Loading.remove();
          })
      }
    else if(this.ticketForm.invalid){
      Notiflix.Notify.failure('All field are required', {
         width: '350px',
            showOnlyTheLastOne: true,
            fontSize: '18px',
            position: 'center-bottom',
          });
          this.isButtonClick= false
    }
  }


  // generate random string for tracking transaction
  randomString(length: any) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  }
}
