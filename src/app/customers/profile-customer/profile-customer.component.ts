import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApilistService } from 'src/app/services/api/apilist.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { SocketService } from 'src/app/socket/socket.service';

@Component({
  selector: 'app-profile-customer',
  templateUrl: './profile-customer.component.html',
  styleUrls: ['./profile-customer.component.scss']
})
export class ProfileCustomerComponent implements OnInit {
  isLoading: boolean=false;
  userDetails;
  baseImgUrl="https://api-dev.hjelpsom.app/static/";
  profilePic: string;
  messageUnseenVal=0;
  constructor(public socketService: SocketService,private http: HttpClient, private fb: FormBuilder, public apiList: ApilistService, private authenticationService: AuthenticationService, private router: Router) {
    this.socketService.messageUnseen.subscribe((data)=>{
      //console.log("data count"+JSON.stringify(data));
this.messageUnseenVal=data.totalUnSeenCount;
    })
   }

  ngOnInit(): void {

    this.getCustomerProfile();
  }
  getCustomerProfile(){
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('loader_active');
this.isLoading=true;

    this.authenticationService.getCustomerProfile().subscribe((res) => {
      if (!res.isError) {
        
        console.log("response"+JSON.stringify(res));
       // this.totalItems=res.totalItems;
        this.userDetails=res.user;
        this.authenticationService.userData=res.user;
        localStorage.setItem("user",JSON.stringify(res.user));
        this.authenticationService.changeMemberPhoto(res.user.profilePic); 
        if(this.userDetails.profilePic){
  this.profilePic = this.baseImgUrl+this.userDetails.profilePic;
}
        //   this.router.navigate(['/verification'])
        // $('#exampleModalCenter_signup').modal('show');



       


      }
      else {


            this.authenticationService.openSnackBar("Error while login", 'Done', '5000','red-snackbar' ,'end','center'
);
      }
    }
      , (err: any) => {

        this.authenticationService.openSnackBar(err.error.message, 'Done', '5000','red-snackbar' ,'end','center'
);
        return;

      }

    ).add(() => { this.isLoading=false;body.classList.remove('loader_active'); });
  }

}
