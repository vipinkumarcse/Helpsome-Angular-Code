import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApilistService } from 'src/app/services/api/apilist.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { SocketService } from 'src/app/socket/socket.service';

declare const $;

@Component({
  selector: 'app-header-company',
  templateUrl: './header-company.component.html',
  styleUrls: ['./header-company.component.scss']
})
export class HeaderCompanyComponent implements OnInit {
  @ViewChild('heroFormheader', { static: false }) public heroFormheader: NgForm
  email;
  description;
  isLoading: boolean=false;
  user: any;
  profilePic: any;
  baseImgUrlCust="https://api-dev.hjelpsom.app/static/";
  constructor(private socketService: SocketService,private http: HttpClient, public apiList: ApilistService, private authenticationService: AuthenticationService, private router: Router) {
    
   }
   //

  ngOnInit(): void {
    this.isLoading=false;
    this.authenticationService.currentPhotoUrl.subscribe(photoUrl => this.profilePic = photoUrl);
    console.log("this.authenticationService.userData"+this.profilePic);
    // console.log("this.authenticationService.userData"+JSON.stringify(this.authenticationService.userData));
    // if(this.authenticationService.userData){
    //   this.user=this.authenticationService.userData;
     
    //   if(this.user.logo){
    //     this.profilePic=this.user.logo;
        
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

    this.authenticationService.logout().subscribe(res => {
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
      this.authenticationService.getCompanyProfileAfterLogin().subscribe((res:any)=>{
      this.email = res.company.email
    })

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
    this.authenticationService.feedbackCompany(params).subscribe((res) => {
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
