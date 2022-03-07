import { Injectable, ɵbypassSanitizationTrustResourceUrl } from '@angular/core';
import * as io from 'socket.io-client';
import { BehaviorSubject, Subject, ReplaySubject, Observable } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
export interface Iscallended {
  ended: boolean;
  room: string;
}

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket;
  public isTypingSubject = new Subject();
  public notificationCount = new BehaviorSubject<any[]>([]);
  public agencyUserChatList = new BehaviorSubject<any[]>([]);
  public resetUserSession = new BehaviorSubject(false);
  public disconnectRequest = new Subject<any>();
  public onGoingSessions = new ReplaySubject<any>();
  public runningSession = new BehaviorSubject<any>([]);
  public artistUserChatList = new BehaviorSubject<any[]>([]);
  public deleteCall = new ReplaySubject<Iscallended>();
  public OnlineArtistUsers = new Subject<any>();
  public OnlineAgencyUsers = new Subject<any>();
  public joinCallObj = new Subject<any>();
  public TwilioActiveRooms = new Subject<any>();
  public onReciveMessage = new BehaviorSubject([]);
  public onReciveSingleMessage = new BehaviorSubject({});
  public invitationupdated = new BehaviorSubject({});
  public roomIsUpdatedData=new BehaviorSubject({});
  public invitationcompleted = new BehaviorSubject({});

  public userJoined = new BehaviorSubject({});
  public userCancelled = new BehaviorSubject({});
  initialvalue:any=0;

  public messageUnseen = new BehaviorSubject({totalUnSeenCount:0});
  
  public unReadCount = new Subject<any>();
  public isUserTyping = new Subject<any>();
  constructor( private router: Router) {
    this.router.events.subscribe((e) => {
      if (localStorage.user) {
        if (e instanceof NavigationEnd) {
           this.joinUser();
        }
      }

      if (localStorage.token) {
        if (e instanceof NavigationEnd) {
          // var token=localStorage.getItem("token");
          // this.socket = io(environment.CurrentSocketServer,{
          //   reconnection:true,reconnectionAttempts:50,reconnectionDelay:500,
            
          //   query: {
          //     token:token
          //   }
          // });
         
// this.getSocket().connect();

this.getSocket().on('typing', (data) => {
  this.isUserTyping.next(data);
});

this.getSocket().on('unSeenCountUpdated', (data) => {
  this.messageUnseen.next(data);
});

this.getSocket().on('userJoinedVideoCall', (data) => {
  this.userJoined.next(data);
});
this.getSocket().on('userDisconnectedVideoCall', (data) => {
  this.userCancelled.next(data);
});
this.getSocket().on('roomData',(data)=>{
  console.log("inside roomData");
  this.agencyUserChatList.next(data.rooms);
  console.log("inside join room agencydetails");
  console.log(this.agencyUserChatList)
})

this.getSocket().on('invitationIsUpdated',(data)=>{
  console.log("inside invitationIsUpdated");
  this.invitationupdated.next(data);
});

this.getSocket().on('roomIsUpdated',(data)=>{
  console.log("inside roomIsUpdated");
  this.roomIsUpdatedData.next(data);
});
this.getSocket().on('someAssignmentCompleted',(data)=>{
  console.log("inside someAssignmentCompleted");
  this.invitationcompleted.next(data);
})
this.getSocket().on('receivedmessage', (data) => {
  console.log("inside recieve single"+JSON.stringify(data));
  this.onReciveSingleMessage.next(data);
});

this.getSocket().on('allmessages', (data) => {
  console.log("inside recieve"+JSON.stringify(data.messages));
  this.onReciveMessage.next(data.messages);
});
this.getSocket().on('getNotification', (data) => {
  this.notificationCount.next(data.notifications);
});
this.getSocket().on('AgencyChatList', (data) => {
  this.agencyUserChatList.next(data.AgencyChatList);
});
this.getSocket().on('user reset', (data) => {
  this.resetUserSession.next(data);
});
this.getSocket().on('roomData', (data) => {
  this.artistUserChatList.next(data.rooms);
});
this.getSocket().on('join call', (data) => {
  this.joinCallObj.next(data);
});
this.getSocket().on('Reject call', (data) => {
  this.disconnectRequest.next(data.room);
});
this.getSocket().on('disconnect call', (data) => {
  this.deleteCall.next(data);
});
this.getSocket().on('artistUsers', (data) => {
  this.OnlineArtistUsers.next(data);
});
this.getSocket().on('agencyUsers', (data) => {
  this.OnlineAgencyUsers.next(data);
});
this.getSocket().on('OnGoingSessions', (sessions) => {
  this.onGoingSessions.next(sessions);
  this.runningSession.next(sessions);
});
this.getSocket().on('GetTwilioAlert', (response) => {
  this.TwilioActiveRooms.next(response);
});


console.log("connected socket");

          // this.joinUser(JSON.parse(localStorage.user)._id, JSON.parse(localStorage.user).user.signUpType);
        }
      }

    });
   
  }
  joinUser() {
    console.log("inside joinuser");
    return this.getSocket().emit('join', {});
  }

  roomseen(id: string) {
    return this.getSocket().emit('roomSeen', { roomid : id });
  }
  refreshRooms() {
    console.log("inside refresh room");
    return this.getSocket().emit('refreshRooms', {});
  }
  joinChat(userId: any, to: string, usertype: any, room: string) {
    return this.getSocket().emit('joinChat', { userId, to, userType: usertype, room });
  }
  onJoinAgency(room: any) {
    return this.getSocket().emit('enterARoom', { roomid:room });
  }
  onJoinArtist(fromId: any, room: any) {
    return this.getSocket().emit('onArtistJoin', { fromId, room });
  }
  leftUser(userId: any) {
    return this.getSocket().emit('left', { userId });
  }
  sendMessage(to,msg: string, room) {
    return this.getSocket().emit('sendMessage', { to : to,messageContent: msg, roomid:room });
  }
  pushNotification(message: string, type: string, from: string, to: string) {
    return this.getSocket().emit('push notification', { message, type, from, to, isSeen: false });
  }
  getAgencyRooms(fromId) {
    return this.getSocket().emit('agency Rooms', { fromId });
  }
  getArtistRooms(ToId) {
    return this.getSocket().emit('artist Rooms', { ToId });
  }

  updateRooms(artistId, agencyId) {
    return this.getSocket().emit('updateRooms', { artistId, agencyId });
  }
  receiveNotification(to) {
    return this.getSocket().emit('pull notification', { to });
  }
  updateNotification(to) {
    return this.getSocket().emit('update notification', { to });
  }
  onTypingUser(room) {
    this.getSocket().emit('isTyping', { roomid:room });
  }
  createCall(to, isAnswered, isRejected, isRings, payload) {
    const initialCallObj = {
      callTo: to,
      isAnswered,
      isRejected,
      isRings,
      payload
    };
    return this.getSocket().emit('onCreateCall', { callCreative: initialCallObj });
  }
  onRejectCall(room: string) {
    return this.getSocket().emit('onRejectCall', { room });
  }
  onDisconnectCall(isEnded: boolean, room: string) {
    return this.getSocket().emit('onDisconnectCall', { isEnded, room });
  }
  resetCall(id: string) {
    return this.getSocket().emit('resetUser', { UserId: id });
  }
  setOnGoingCalls(sessions: any) {
    return this.getSocket().emit('setOnGoingSession', { sessions });
  }
  removeSessionCall(room) {
    return this.getSocket().emit('removeSession', { room });
  }
  setConnectedTwilioRooms(itemName, value, room) {
    return this.getSocket().emit('SetTwilioAlert', { itemName, value, room });
  }

  disconnectConnection(){
    console.log("inside disconnect");
    this.socket=null;
    return this.getSocket().emit('disconnect');
  }

  setupSocketConnection() {
    if (localStorage.token) {
     
        // var token=localStorage.getItem("token");
        // this.socket = io(environment.CurrentSocketServer,{
        //   reconnection:true,reconnectionAttempts:50,reconnectionDelay:500,
          
        //   query: {
        //     token:token
        //   }
        // });
       
// this.getSocket().connect();

this.getSocket().on('typing', (data) => {
this.isUserTyping.next(data);
});
this.getSocket().on('unSeenCountUpdated', (data) => {
  this.messageUnseen.next(data);
});

this.getSocket().on('userJoinedVideoCall', (data) => {
  this.userJoined.next(data);
});
this.getSocket().on('userDisconnectedVideoCall', (data) => {
  this.userCancelled.next(data);
});

this.getSocket().on('roomData',(data)=>{
console.log("inside join room");
this.agencyUserChatList.next(data.rooms);

console.log("inside join room agencydetails");
console.log(this.agencyUserChatList);
})
this.getSocket().on('invitationIsUpdated',(data)=>{
  console.log("inside invitationIsUpdated");
  this.invitationupdated.next(data);
});
this.getSocket().on('roomIsUpdated',(data)=>{
  console.log("inside roomIsUpdated");
  this.roomIsUpdatedData.next(data);
});
this.getSocket().on('someAssignmentCompleted',(data)=>{
  console.log("inside someAssignmentCompleted");
  this.invitationcompleted.next(data);
})
this.getSocket().on('receivedmessage', (data) => {
  console.log("inside recieve single"+JSON.stringify(data));
  this.onReciveSingleMessage.next(data);
});

this.getSocket().on('allmessages', (data) => {
  console.log("inside recieve"+JSON.stringify(data.messages));
  this.onReciveMessage.next(data.messages);
});
this.getSocket().on('getNotification', (data) => {
this.notificationCount.next(data.notifications);
});
this.getSocket().on('AgencyChatList', (data) => {
this.agencyUserChatList.next(data.AgencyChatList);
});
this.getSocket().on('user reset', (data) => {
this.resetUserSession.next(data);
});
this.getSocket().on('roomData', (data) => {
this.artistUserChatList.next(data.rooms);
});
this.getSocket().on('join call', (data) => {
this.joinCallObj.next(data);
});
this.getSocket().on('Reject call', (data) => {
this.disconnectRequest.next(data.room);
});
this.getSocket().on('disconnect call', (data) => {
this.deleteCall.next(data);
});
this.getSocket().on('artistUsers', (data) => {
this.OnlineArtistUsers.next(data);
});
this.getSocket().on('agencyUsers', (data) => {
this.OnlineAgencyUsers.next(data);
});
this.getSocket().on('OnGoingSessions', (sessions) => {
this.onGoingSessions.next(sessions);
this.runningSession.next(sessions);
});
this.getSocket().on('GetTwilioAlert', (response) => {
this.TwilioActiveRooms.next(response);
});


console.log("connected socket");

        // this.joinUser(JSON.parse(localStorage.user)._id, JSON.parse(localStorage.user).user.signUpType);
      
    }

    // this.socket = io(this.comm.imageUrl);
    // if(!this.getSocket().connected) return;
    // this.getSocket().on('connect', () => {
    //   this.getSocket().emit('', {userId: id})
    // })
  }

  getSocket() {
    var token=localStorage.getItem("token");
    // this.socket = io(environment.CurrentSocketServer,{
    //   reconnection:true,reconnectionAttempts:50,reconnectionDelay:500,enabledTransports: ["ws", "wss"],
      
    //   query: {
    //     token:token
    //   }
    // });
    if(token){
      if(!this.socket){
        this.socket = io(environment.CurrentSocketServer,{
          reconnection:true,reconnectionAttempts:50,reconnectionDelay:500,enabledTransports: ["ws", "wss"],
          
          query: {
            token:token
          }
        });
      }
      return this.socket;
    }
    
  }

  
}
