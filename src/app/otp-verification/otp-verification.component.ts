import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
// import { MessagingService } from '../messaging.service';
import { ApilistService } from '../services/api/apilist.service';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { SocketService } from '../socket/socket.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.scss']
})
export class OtpVerificationComponent implements OnInit {
  @ViewChild('ngOtpInput', {static: true}) ngOtpInput:any;
  otp: string;
  countryCode;
  phone;
  operationType;
  userType: string;
  isLoading:boolean=false;
  messagee: any;

  constructor(private socketService: SocketService,private http: HttpClient,private router: Router, public apiList: ApilistService, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.isLoading=false;
    this.otp="";
    this.countryCode=localStorage.getItem("countryCode");
    this.phone=localStorage.getItem("phone");
    this.operationType=localStorage.getItem("operationType");

    if(localStorage.getItem("userType")){
      this.userType=localStorage.getItem("userType");
    }
   // this.setvalueotp(this.otp);
  }

  onOtpChange(otp) {
    
    this.otp = otp;
    if(this.otp.length==6){
      console.log('callback')
      this.redirect();
    }
  }
  // setvalueotp(data){
  //   console.log("inside otp");
  //   this.ngOtpInput.setValue(data);
  // }
redirect() {
  this.isLoading=true;
  // this.messagingService.receiveMessage();
  // this.messagee = this.messagingService.currentMessage;
  const params = {
  
    "countryCode": this.countryCode,
    "phone": this.phone.toString(),
    "otp": this.otp
    
  }
  if(this.operationType=="login"){

if(this.userType=="company"){

  console.log("params are" + JSON.stringify(params));
  this.authenticationService.verificationCompany(params).subscribe((res) => {
    if (!res.isError) {
      console.log("inside success");
      // $('#exampleModalCenter_signup').modal('show');

      this.authenticationService.openSnackBar("Logged in successfully", 'Done', '5000','blue-snackbar' ,'end','center'
);
      console.log("reposne otp is"+JSON.stringify(res));
      setTimeout(()=>{
        localStorage.setItem("user",JSON.stringify(res.company));
        this.authenticationService.userData=res.company;
        this.authenticationService.changeMemberPhoto(res.company.logo); 
        localStorage.setItem("token",res.token);
        localStorage.setItem('loginStatus',"true");
         this.router.navigate(['/company/homepagecompany']);
       
         localStorage.user !== undefined ?
         this.socketService.joinUser() : null;
         localStorage.user !== undefined ?
         this.socketService.setupSocketConnection() : null;
      },500);


    }
    else {


      this.authenticationService.openSnackBar("Error while signup", 'Done', '5000','red-snackbar','end','center');
    }
  }
    , (err: any) => {

      this.authenticationService.openSnackBar(err.error.message, 'Done', '5000','red-snackbar','end','center');
      return;

    }

  ).add(() => { this.isLoading=false; });
}

else{

  
  console.log("params are" + JSON.stringify(params));
  this.authenticationService.verificationCustomer(params).subscribe((res) => {
    console.log(res)
    if (!res.isError) {
      console.log("inside success");
      // $('#exampleModalCenter_signup').modal('show');
       console.log('hi')
      this.authenticationService.openSnackBar("Logged in successfully", 'Done', '5000','blue-snackbar' ,'end','center'
);
      console.log("reposne otp is"+JSON.stringify(res));
      setTimeout(()=>{
        localStorage.setItem("user",JSON.stringify(res.user));
        this.authenticationService.userData=res.user;
        this.authenticationService.changeMemberPhoto(res.user.profilePic); 
        localStorage.setItem("token",res.token);
        localStorage.setItem('loginStatus',"true");
         this.router.navigate(['/customers/homepagecustomer']);
       
         localStorage.user !== undefined ?
         this.socketService.joinUser() : null;
         localStorage.user !== undefined ?
         this.socketService.setupSocketConnection() : null;
      },500);
   }
    else {
     this.authenticationService.openSnackBar("Error while signup", 'Done', '5000','red-snackbar','end','center');
    }
  }
    , (err: any) => {

      this.authenticationService.openSnackBar(err.error.message, 'Done', '5000','red-snackbar','end','center');
      return;

    }

  ).add(() => { this.isLoading=false; });

}


  }
  else{
this.isLoading=false;
  }
  
    
  }

  resendOtp(){
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('loader_active');
    this.isLoading=true;
    const params = {
  
      "countryCode": this.countryCode,
      "phone": this.phone.toString(),
      
    }
    console.log("params are" + JSON.stringify(params));

    if(this.operationType=="login"){

      if(this.userType=="company"){

    this.authenticationService.resendOtpCompany(params).subscribe((res) => {
      if (!res.isError) {
        console.log("inside success");
        // $('#exampleModalCenter_signup').modal('show');

        this.authenticationService.openSnackBar("Otp sent successfully", 'Done', '5000','blue-snackbar' ,'end','center'
);


      }
      else {


        this.authenticationService.openSnackBar("Error while signup", 'Done', '5000','red-snackbar','end','center');
      }
    }
      , (err: any) => {

        this.authenticationService.openSnackBar(err.error.message, 'Done', '5000','red-snackbar','end','center');
        return;

      }

    ).add(() => { this.isLoading=false;body.classList.remove('loader_active'); });

      }
      else{
        this.authenticationService.resendOtpCustomer(params).subscribe((res) => {
          if (!res.isError) {
            console.log("inside success");
            // $('#exampleModalCenter_signup').modal('show');
    
            this.authenticationService.openSnackBar("Otp sent successfully", 'Done', '5000','blue-snackbar' ,'end','center'
);
    
    
          }
          else {
    
    
            this.authenticationService.openSnackBar("Error while signup", 'Done', '5000','red-snackbar','end','center');
          }
        }
          , (err: any) => {
    
            this.authenticationService.openSnackBar(err.error.message, 'Done', '5000','red-snackbar','end','center');
            return;
    
          }
    
        ).add(() => { this.isLoading=false;body.classList.remove('loader_active'); });
      }
    }
      else{
        body.classList.remove('loader_active');
        this.isLoading=false;

      }
  }
}


