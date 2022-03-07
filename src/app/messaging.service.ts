// import { Injectable, Input  } from '@angular/core';
// import { AngularFireDatabase } from '@angular/fire/database';
// import { AngularFireAuth } from '@angular/fire/auth';
// import { AngularFireMessaging } from '@angular/fire/messaging';
// import { mergeMapTo } from 'rxjs/operators';
// import { take } from 'rxjs/operators';
// import { BehaviorSubject } from 'rxjs';
// // import  firebase from 'firebase/app';
// // import { EventsService } from './events/events.service';
// import '@firebase/messaging';
// import  firebase from 'firebase/app';
// import 'firebase/database'; // If using Firebase database
// import 'firebase/storage';
// import 'rxjs/add/operator/take';
// import { ApilistService } from './services/api/apilist.service';
// import { AuthenticationService } from './services/authentication/authentication.service';
// @Injectable()
// export class MessagingService {
//   angularFireMessaging = firebase.messaging();

//   token: any = "";
//   currentMessage = new BehaviorSubject(null);
//   constructor(
//     private angularFireDB: AngularFireDatabase,
//     private angularFireAuth: AngularFireAuth,
//     private authenticationService: AuthenticationService,
//     // public events:EventsService
//     ) {
//   }
//   updateToken(token:any) {
//     this.angularFireAuth.authState.take(1).subscribe(user => {
//       if (!user) return;
//       const data = { [user.uid]: token }
//       this.angularFireDB.object('fcmTokens/').update(data)
//     })
//   }
//   requestPermission() {
//     this.angularFireMessaging.requestPermission()
//       .then(() => {
//         return this.angularFireMessaging.getToken()
//       })
//       .then(token => {
//         this.token = token;
//         // console.log(token,"devicetoken#####################");
//         localStorage.user !== undefined ?
//         this.authenticationService.fcmUpdate({"fcmToken":this.token}) : null;
//              console.log(token,"devicetoken#####################");
//         localStorage.setItem('deviceToken',JSON.stringify(token))

//         this.updateToken(token)
//       })
//       .catch((err) => {
//         console.log('Unable to get permission to notify.', err);
//       });
//   }

//    receiveMessage() {
//     this.angularFireMessaging.onMessage((payload) => {
//       console.log("Message Recieved--------------------here#############33333",payload);
//       this.sendPushNotification(payload);
//       this.currentMessage.next(payload)
      
//       // this.events.publishSomeData({ 'refresh_header': 'refresh_header' });
//     //  this.checkRecentChat()
//     });


//     this.angularFireMessaging.onMessage
//   }
//   sendPushNotification(msg:any) {
//     const title = msg.notification.title;
//     var data = msg.data;
//     const options = {
//       body: msg.notification.body,
//       // chatRoomName:data.chatRoomName,
//       // senderId:data.senderId,
//       // supplierName:data.supplierName,
//       icon: "",
//       content_available:true,priority:"high",delayWhileIdle:false,
//       vibrate: [200, 100, 200],
//       data : {
//         click_action : data.click_action,
//         requestId : data.invitationId
//       }
//     };
//     console.log(options);
//     navigator.serviceWorker.ready.then(function(serviceWorker) {
//       serviceWorker.showNotification(title, options);
//     });
//     // navigator.serviceWorker.
//   }
// }