import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApilistService } from './services/api/apilist.service';
import { AuthenticationService } from './services/authentication/authentication.service';
import { SocketService } from './socket/socket.service';
import { StarRatingComponent } from 'ng-starrating';
// import { MessagingService } from '../app/messaging.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from '../environments/environment';
declare var $: any;
import Swal from 'sweetalert2';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'hjelpsom-app';
  ringToneAudio: any;
  userActivity;
  userInactive: Subject<any> = new Subject();

  constructor(private socketService: SocketService,private http: HttpClient,private router: Router, public apiList: ApilistService, private authenticationService: AuthenticationService
    ) {
  
    localStorage.user !== undefined ?
    this.socketService.joinUser() : null;
    localStorage.user !== undefined ?
    this.socketService.setupSocketConnection() : null;
    this.setTimeout();
    this.userInactive.subscribe(() =>{
      this.logout();
    } 
    );

    
    // if ("serviceWorker" in navigator) {
    //   //  console.log('--------in service qorker condition')
    //     window.addEventListener("load",  () => {
    //       console.log("inside")
    //       navigator.serviceWorker.register("../firebase-messaging-sw.js").then(
    //          (registration) => {
    //           console.log(
    //             "ServiceWorker registration successful with scope: ",
    //             registration.scope
    //           );
    //         },
    //         (err) => {
    //           // registration failed :(
    //          // console.log("ServiceWorker registration failed: ", err);
    //         }
    //       );
    //     });
    //   }
    //  this.messagingService.requestPermission();
      this.socketService.userJoined.subscribe((message:any)=>{
        // alert();
        console.log(message,"message received---------#######")
        if(message.data){
if(message.data.notificationType){


        if (message.data.notificationType === "joinvideocall") {
          this.playAudio();
          console.log(message.data, "data")
          Swal.fire({
            title: 'Getting a call from ' + message.data.senderPhone,
            imageWidth: 200,
            imageHeight: 200,
            imageUrl: '../assets/images/callIcon.jpg',
            showCancelButton: true,
            confirmButtonColor: '#5ed4be;',
            cancelButtonColor: '#9d9d9d',
            confirmButtonText: 'Answer',
            showCloseButton: true,
            allowOutsideClick: false
          }).then((result: any) => {
            if (result.value) {
              this.pauseAudio();
              var fd = new FormData
              fd.append('channelID', message.data.invitationId )
              this.authenticationService.connectAgora(message.data.invitationId ).subscribe((res: any) => {
                if (!res.isError) {
                  this.pauseAudio();
                  localStorage.setItem("rtcToken", res.token);
                  // this.common.hideSpinner();
                  this.router.navigate(["videoCall"], { queryParams: { 'id': message.data.invitationId ,'token':res.token,'callId' : message.data.callId}});
                  // this.router.navigate(['/video_call',message.data.receiverId,res.token])
  
                }
                else {
                  this.pauseAudio();
                  // this.common.hideSpinner();
                  // this.common.error(res.message)
                }
              }).add(() => { this.pauseAudio();  });
  
              // this.socketService.createCall(this.callObject.callTo, false, true, false, undefined);
              // this.pauseAudio();
              // window.open(sessionLink, '_blank');
            }
            if (result.dismiss === 'cancel') {
              this.pauseAudio();
               this.rejectCall(message.data.invitationId,message.data.callId);
            }
          })
        }
      }
    }
        // if(message.data.notificationType =='disconnectvideocall'){
        //   this.router.navigate(['/'])
        // }

})  

this.socketService.userCancelled.subscribe((message: any) => {
  if(message.data){
  if(message.data.notificationType){
  if(message.data.notificationType =='disconnectvideocall'){
    this.router.navigate(['/'])
  }
}
}


})


  

   }

   logout() {

    this.authenticationService.logoutcustomer().subscribe(res => {
      this.socketService.disconnectConnection();
      this.authenticationService.openSnackBar("Logged out due to inactivity", 'Done', '5000','blue-snackbar' ,'end','center'
);
      setTimeout(() => {
        this.router.navigate(['/splashscreen']);
        localStorage.clear();
        window.location.reload();
      }, 500)

    });
  }
  ngOnInit() {
    if(localStorage.getItem("user")){
        this.authenticationService.userData=JSON.parse(localStorage.getItem("user"));
       var userType=localStorage.getItem("userType");

       if(userType=="company"){
        if(this.authenticationService.userData.logo){
          this.authenticationService.changeMemberPhoto(this.authenticationService.userData.logo);
          
        }
       }
       else{
        if(this.authenticationService.userData.profilePic){
          this.authenticationService.changeMemberPhoto(this.authenticationService.userData.profilePic);
          
        }
       }
        
  
      }

     // this.message.receiveMessage();
      this.socketService.userJoined.subscribe((message: any) => {
        // alert();
        console.log(message, "message received---------#######");
        if(message.data){
        if(message.data.notificationType){
        if (message.data.notificationType === "joinvideocall") {
          console.log(message.data, "data")
          this.playAudio();
          Swal.fire({
            title: 'Getting a call from ' + message.data.senderPhone,
            imageWidth: 200,
            imageHeight: 200,
            imageUrl: '../assets/images/callIcon.jpg',
            showCancelButton: true,
            confirmButtonColor: '#5ed4be;',
            cancelButtonColor: '#9d9d9d',
            confirmButtonText: 'Answer',
            showCloseButton: true,
            allowOutsideClick: false
          }).then((result: any) => {
            if (result.value) {
              this.pauseAudio();
              var fd = new FormData
              fd.append('channelID', message.data.invitationId )
              this.authenticationService.connectAgora(message.data.invitationId ).subscribe((res: any) => {
                if (!res.isError) {
                  this.pauseAudio();
                  localStorage.setItem("rtcToken", res.token);
                  // this.common.hideSpinner();
                  this.router.navigate(["videoCall"], { queryParams: { 'id': message.data.invitationId ,'token':res.token}});
                  // this.router.navigate(['/video_call',message.data.receiverId,res.token])
  
                }
                else {
                  this.pauseAudio();
                  // this.common.hideSpinner();
                  // this.common.error(res.message)
                }
              }).add(() => { this.pauseAudio();  });
  
              // this.socketService.createCall(this.callObject.callTo, false, true, false, undefined);
              // this.pauseAudio();
              // window.open(sessionLink, '_blank');
            }
            if (result.dismiss === 'cancel') {
              this.pauseAudio();
               this.rejectCall(message.data.invitationId,message.data.callId);
            }
          })
        }
      }
    }
        // if(message.data.notificationType =='disconnectvideocall'){
        //   this.router.navigate(['/'])
        // }
     
      
      })


      this.socketService.userCancelled.subscribe((message: any) => {
        if(message.data){
        if(message.data.notificationType){
        if(message.data.notificationType =='disconnectvideocall'){
          this.router.navigate(['/'])
        }
      }
    }
     
      
      })
    }

    rejectCall(invitationid,callId){

      var data={
        "invitationId" : invitationid,
        "callId" : callId
      }

      this.authenticationService.disconnectCall(data).subscribe((res) => {
        if (!res.isError) {

          this.authenticationService.openSnackBar("Call Disconnected", 'Done', '5000','red-snackbar' ,'end','center'
);
         // console.log("inside success videocall"+JSON.stringify(res));
  
          this.router.navigate(["/"]);
         
        }
        
        else {
  
  
          this.authenticationService.openSnackBar("Error while caliing", 'Done', '5000','red-snackbar' ,'end','center'
);
        }
      }
        , (err: any) => {
  
          this.authenticationService.openSnackBar(err.error.message, 'Done', '5000','red-snackbar' ,'end','center'
);
          return;
  
        }
        
  
      ).add(() => {  this.pauseAudio() });
  

    }

    playAudio() {
      this.ringToneAudio = document.getElementById('ringToneAudio');
      if (this.ringToneAudio !== undefined) {
        this.ringToneAudio.loop = true;
        if (this.ringToneAudio.paused) {
          this.ringToneAudio.play();
        }
      }
    }
    pauseAudio() {
      if (this.ringToneAudio !== undefined) {
        this.ringToneAudio.pause();
        this.ringToneAudio.currentTime = 0;
      }
    }

    
  setTimeout() {
    this.userActivity = setTimeout(() => this.userInactive.next(undefined), 900000);
  }

  @HostListener('window:mousemove') refreshUserState() {
    clearTimeout(this.userActivity);
    this.setTimeout();
  }
  }


  
