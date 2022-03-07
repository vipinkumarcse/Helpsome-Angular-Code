import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApilistService } from 'src/app/services/api/apilist.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { SocketService } from 'src/app/socket/socket.service';
declare const $;

@Component({
  selector: 'app-header-customer',
  templateUrl: './header-customer.component.html',
  styleUrls: ['./header-customer.component.scss']
})
export class HeaderCustomerComponent implements OnInit {
  @ViewChild('heroFormheader', { static: false }) public heroFormheader: NgForm
  email;
  description;
  baseImgUrlCust="https://api-dev.hjelpsom.app/static/";
  user;
  profilePic;
  isLoading: boolean=false;
  constructor(private socketService: SocketService,private http: HttpClient, public apiList: ApilistService, private authenticationService: AuthenticationService, private router: Router) { 
    
  }
  // 

  ngOnInit(): void {
    this.isLoading=false;

    this.authenticationService.currentPhotoUrl.subscribe(photoUrl => this.profilePic = photoUrl);
    console.log("this.authenticationService.userData"+this.profilePic);
    
    // if(this.authenticationService.userData){
    //   this.user=this.authenticationService.userData;
     
    //   if(this.user.profilePic){
    //     this.profilePic=this.user.profilePic;
        
    //   }

    // }
    
    // if(localStorage.getItem("user")){
    //   this.user=JSON.parse(localStorage.getItem("user"));
     
    //   if(this.user.profilePic){
    //     this.profilePic=this.user.profilePic;
        
    //   }

    // }
  

    
    this.HidePopups();
  }

  closeFeedback(){
    $('#exampleModalCenter_contact_us').modal('hide');
  }


  HidePopups() {
    $('#exampleModalCenter_contact_us').modal('hide');
    // $("#alert_div").hide();
  }

  logout() {

    this.authenticationService.logoutcustomer().subscribe(res => {
      this.socketService.disconnectConnection();
      this.authenticationService.openSnackBar("Logged out successfully", 'Done', '5000','blue-snackbar' ,'end','center'
);
      setTimeout(() => {
        this.router.navigate(['/splashscreen']);
        localStorage.clear();
        window.location.reload();
      }, 500)

    });
  }

  openFeedback() {
    this.email = null;
    this.description = null;
    $('#exampleModalCenter_contact_us').modal({
      backdrop: 'static',
      keyboard: false,
      show: true
    });
  }


  submitFeedback() {

if(this.description){
  if(this.description.trim()!==""){
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('loader_active');
this.isLoading=true;
    const params = {

      "email": this.email,
      "description": this.description

    }

    console.log("params are" + JSON.stringify(params));
    this.authenticationService.feedbackCustomer(params).subscribe((res) => {
      if (!res.isError) {
        console.log("inside success");
        // $('#exampleModalCenter_signup').modal('show');

        this.authenticationService.openSnackBar("Feedback sent successfully", 'Done', '5000','blue-snackbar' ,'end','center'
);
        $('#exampleModalCenter_contact_us').modal('hide');
        this.heroFormheader.resetForm();


      }
      else {


        this.authenticationService.openSnackBar("Error while sending feedback", 'Done', '5000','red-snackbar' ,'end','center'
);
      }
    }
      , (err: any) => {

        this.authenticationService.openSnackBar(err.error.message, 'Done', '5000','red-snackbar' ,'end','center'
);
        return;

      }

    ).add(() => { this.isLoading=false;body.classList.remove('loader_active'); })
  }
  else{
    this.authenticationService.openSnackBar("Please enter valid description", 'Done', '5000','red-snackbar' ,'end','center'
);
    return;
  }
}
else{
  this.authenticationService.openSnackBar("Please enter valid description", 'Done', '5000','red-snackbar' ,'end','center'
);
  return;
}

    


  }

}
