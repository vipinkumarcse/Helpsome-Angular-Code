import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApilistService } from 'src/app/services/api/apilist.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { SocketService } from 'src/app/socket/socket.service';

@Component({
  selector: 'app-editprofile-customer',
  templateUrl: './editprofile-customer.component.html',
  styleUrls: ['./editprofile-customer.component.scss']
})
export class EditprofileCustomerComponent implements OnInit {

  isLoading: boolean=false;
  userDetails;
  baseImgUrl="https://api-dev.hjelpsom.app/static/";
  url: string;
  fullName;
  email;
  profilePic;
  file: any;
  messageUnseenVal=0;
  constructor(public socketService: SocketService,private http: HttpClient, private fb: FormBuilder, public apiList: ApilistService, private authenticationService: AuthenticationService, private router: Router) {
    this.socketService.messageUnseen.subscribe((data)=>{
      console.log("message unread count"+JSON.stringify(data));
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
        this.fullName=this.userDetails.fullName;
        this.email=this.userDetails.email;
        if(this.userDetails.profilePic){
          this.profilePic = this.baseImgUrl+this.userDetails.profilePic;
        }
       
        console.log(this.profilePic);
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

  uploadProfileImage(event) {
    this.file = event.target.files[0];
    console.log ("evec",event)
    if (event.target.files[0].type.indexOf("image/") == 0) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.profilePic = event.target.result;
      
    }
  }
    else {
      this.authenticationService.openSnackBar("Invalid Image", 'Done', '5000','red-snackbar' ,'end','center'
);

    }

  }

  updateProfile(form: NgForm){
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('loader_active');
this.isLoading=true;
    let formData = new FormData();
    for (let key in form.value) {
      formData.append(`${key}`, form.value[key]);
      console.log(formData, `${key}`)
    }
    if(this.file!==undefined && this.file!==null){
    formData.append('profilePic',this.file);
    }

  if (form.valid) {
    // console.log("inside formdata"+JSON.stringify(formData));
    this.authenticationService.userprofileUpdate(formData).subscribe((res: any) => {

        if (!res.isError) {
           console.log("inside formdata JSON"+JSON.stringify(res));
           this.getCustomerProfile();
           this.authenticationService.openSnackBar("Profile Updated Successfully!", 'Done', '5000','blue-snackbar' ,'end','center'
);
          //localStorage.setItem("sigUp", JSON.stringify(res.user));
          this.router.navigate(['/customers/profilecustomer'])
        } else {
          this.authenticationService.openSnackBar(res.message, 'Done', '5000','red-snackbar' ,'end','center'
);
        }
      }, (err: any) => {

        this.authenticationService.openSnackBar(err.error.message, 'Done', '5000','red-snackbar' ,'end','center'
);
        return;

      }
    ).add(() => { this.isLoading=false;body.classList.remove('loader_active'); });
  }
  else{
    this.isLoading=false;body.classList.remove('loader_active');
  }

  }
  onSubmit(form: NgForm){
   
    console.log("this.profilePic"+this.profilePic);

// if(this.file){


this.updateProfile(form);







  

}
  
}
