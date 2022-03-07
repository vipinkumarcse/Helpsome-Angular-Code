import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { SocketService } from 'src/app/socket/socket.service';
import 'lodash';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

declare var _:any;


declare var $: any;
@Component({
  selector: 'app-message-center-company',
  templateUrl: './message-center-company.component.html',
  styleUrls: ['./message-center-company.component.scss']
})
export class MessageCenterCompanyComponent implements  OnInit, AfterViewInit, AfterContentChecked, OnDestroy {
  selectedIndex: number = null;
  @ViewChild('scrollMe',{static: false}) private myScrollContainer: ElementRef;
  @ViewChild('wait',{static: false}) private wait: ElementRef;
  @ViewChild('messageToBoSend',{static: false}) messageToBoSend: ElementRef;
  @ViewChild('notificationTone',{static: false}) notificationTone: ElementRef;
  private unsubscribeAll = new Subject();
  subModule: any;
  isSelectedChat = false;
  chatName: any;
  chatRoom: any;
  userChatMessages: BehaviorSubject<Array<any>> = new BehaviorSubject([]);
  toUserSend: any;
  toUser: any;
  currentUserId: any;
  lastestMessage: any;
  fromUser: any;
  isUserTyping = false;
  typingToRoom: any;
  typingUserTo: any;
  userName: string;
  mobileView: boolean;
  ischatlistShow: boolean;
  ischatBoxShow: boolean;
  screenWidth = new BehaviorSubject<number>(window.innerWidth);
  webView: boolean;
  ActiveArtistUsers: any;
  isLoading = false;
  imagebaseUrl: string;
  baseImgUrlCust="https://api-dev.hjelpsom.app/static/";
  agencyProfileImage: string;
  artistProfileImage: string;
  userSelected;
  outGoingInvitations: any;
  selectedTabIndex: number = 0;
  selectedIndexInv: number = null;
  selectedIndexInvcomp:number =null;
  isOutgoingSelected:boolean=false;
  iscompletedSelected:boolean=false;
  userSelectedinv: any;
  completedList: any;
  companyProfile: any;
  baseImgUrlComp="https://api-dev.hjelpsom.app/static/";
  userSelectedinvcomp: any;
  companyProfilecomp: any;
  messageUnseenVal=0;
  languageSelected="en";
  translateTxt="";
  // p: number = 1;
  itemsPerPage:number=3;
  totalItems=15;
    slideConfig = { slidesToShow: 1,  autoplay: true,slidesToScroll: 1,dots:true, arrows: false};
    baseImgUrl="https://api-dev.hjelpsom.app/static/assignment_images/";


  translateMessageItem: any;
  showcarsuel: boolean;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth.next(window.innerWidth);
  }
  constructor(private authenticationService: AuthenticationService,public socketService: SocketService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,private router: Router) {

      this.socketService.messageUnseen.subscribe((data)=>{
        console.log("message unread count"+JSON.stringify(data));
        this.messageUnseenVal=data.totalUnSeenCount;
            })

      this.unsubscribeAll = new Subject();
      this.socketService.isUserTyping.subscribe(response => {
        this.typingToRoom = response.roomid;
        // this.typingUserTo = response.toUser;
        // this.isUserTyping = response.isTyping;
      });
      if (localStorage.user !== undefined && localStorage.user !== null) {
        this.currentUserId = JSON.parse(localStorage.user)._id;
      }
      this.roomUpdated()
      this.recieveMessages();

      this.recieveSingleMessage();
      this.socketService.invitationupdated.subscribe((data)=>{
        this.getinvitationCompany();
        this.getassignmentCompletedList();
      })

      this.socketService.invitationcompleted.subscribe((data)=>{
        this.getinvitationCompany();
        this.getassignmentCompletedList();
      })
      this.socketService.OnlineAgencyUsers.subscribe((response: any) => {
        this.ActiveArtistUsers = response.OnlineUsers;
      });
      
     }

     roomUpdated(){
      this.socketService.roomIsUpdatedData.subscribe((data)=>{
        this.socketService.refreshRooms();
             });
    }

    HidePopups() {
      // $('#exampleModalCenter_apply_job').modal('hide');
       $('#exampleModalCenter_view_profile').modal('hide');
     //  $('#exampleModalCenter_offer_assigment').modal('hide');
     //  $('#exampleModalCenter_invite_assignment').modal('hide');
       
   
       // $("#alert_div").hide();
     }
     recieveMessages(){
      this.socketService.onReciveMessage
      .subscribe((socketResponse: any) => {
        console.log("inside recieved messages");
        this.isLoading = false;
        if (socketResponse.messages !== undefined) {
          if (socketResponse.messages.length > 0) {
            this.userChatMessages.next(_.uniqBy(socketResponse.messages,"_id"));
            var arraymsg=[];
           



            var bar = new Promise((resolve, reject) => {
              this.userChatMessages.forEach((c:any) => {
                if (!arraymsg.includes(c._id)) {
                  arraymsg.push(c);
                }
              });
          });
          
          bar.then(() => {
            console.log("Array message is"+JSON.stringify(arraymsg))
            this.userChatMessages.next(_.uniqBy(arraymsg,"_id"));
            this.cd.detectChanges();
            this.scrollToBottom();
            this.isLoading = false;
          });
           



          
          } else {
            if (this.isSelectedChat) {
              // const currentValue = this.userChatMessages.value;
              // const updatedValue = [...currentValue, socketResponse.messages];
              this.userChatMessages.next( socketResponse.messages);
        //       var arraymsg2=[];
           



        //   var bar2 = new Promise((resolve, reject) => {
        //     this.userChatMessages.forEach((c:any) => {
        //       if (!arraymsg2.includes(c._id)) {
        //         arraymsg2.push(c);
        //       }
        //     });
        // });
        
        // bar2.then(() => {
        //   console.log("Array message is"+JSON.stringify(arraymsg2))
        //   this.userChatMessages.next(_.uniqBy(arraymsg2,"_id"));
        //   this.cd.detectChanges();
        //   this.scrollToBottom();
        // });
        //       this.isLoading = false;
            }
          
            const artists = this.socketService.artistUserChatList.getValue();
            
            console.log(artists,"artist")
            const index = artists.findIndex((element) => element._id === socketResponse.messages.room);
            if (index !== -1) {
              artists[index] = {
                unSeenCountByCompany: 0 ,
                user: socketResponse.user,
                lastMessageId: socketResponse.lastMessageId,
               
              };
                  //  setTimeout(() => {
                  //   socketResponse.messages.user._id === this.currentUserId ? null : this.notificationTone.nativeElement.play();
                  // }, 3000);
            }
            this.socketService.artistUserChatList.next(artists);
          }
        }
      });
      
     }

     setProfile(profile: string) {
      console.log(profile,"Profile")
      if (profile !== undefined) {
        this.imagebaseUrl =this.baseImgUrlCust;
        return this.imagebaseUrl + profile;
      }
    }
  
    onkeyPress(e) {
      if (e.which !== 13) {
        const timerId = setInterval(() => {
          this.socketService.onTypingUser(this.chatRoom);
        }, 100);
        setTimeout(() => {
          clearInterval(timerId);
          this.socketService.onTypingUser(this.chatRoom);
        }, 1500);
      }
    }

  ngOnInit(): void {
    $('#translate_message').modal('hide');
    this.languageSelected="en";
    localStorage.user !== undefined ?
    this.socketService.joinUser() : null;
    localStorage.user !== undefined ?
    this.socketService.setupSocketConnection() : null;
    this.HidePopups();
    this.getinvitationCompany();
    this.getassignmentCompletedList();
    // localStorage.user !== undefined ?
    // this.socketService.joinUser() : null;
    
  //   $(document).ready(function(){
  //     $('.owl-carousel').owlCarousel();
  //   });
    
  //   $('.owl-carousel').owlCarousel({
  //     loop:true,
  //     margin:10,
  //     nav:true,
  //     dots:false,
  //     responsiveClass:true,
  //     responsive:{
  //         0:{
  //             items:1,
  //         },
  //         600:{
  //             items:2,
  //             nav:false
  //         },
  //         1000:{
  //             items:2,
  //             loop:true
  //         }
  //     }
  // })

  

  $(document).ready(function(){
    $(".message_show").click(function(){
      $(".chatbox_show").show();
    });
  
    $(".message_show").click(function(){
      $(".messages_show").hide();
    });
  
    $("#back_message").click(function(){
      $(".messages_show").show();
    });
  
    $("#back_message").click(function(){
      $(".chatbox_show").hide();
    });
  });

  $(document).ready(function(){
    $(".message_show2").click(function(){
      $(".chatbox_show2").show();
    });
  
    $(".message_show2").click(function(){
      $(".messages_show2").hide();
    });
  });

  }


  ngAfterContentChecked() {
    this.cd.detectChanges();
    this.checkView();
    // this.screenWidth.subscribe(item => {
    //   if (item >= 767) {
    //     this.mobileView = false;
    //     this.webView = true;
    //     this.checkView();
    //   } else {
    //     this.mobileView = true;
    //     this.webView = false;
    //     this.checkView();
    //   }
    // });
  }
  checkView() {

    this.ischatlistShow = true;
      // this.ischatBoxShow = true;
    // if (this.webView) {
    //   this.ischatlistShow = true;
    //   this.ischatBoxShow = true;
    //   this.mobileView = false;
    // } else {
    //   this.webView = false;
    //   this.ischatlistShow = true;
    //   if (this.isSelectedChat) {
    //     this.ischatBoxShow = true;
    //     this.ischatlistShow = false;
    //   } else {
    //     this.ischatBoxShow = false;
    //     this.ischatlistShow = true;
    //   }
    // }
  }
  ngAfterViewInit() {
    setTimeout(() => {
      const toUser = this.chatRoom;
      const artists = this.socketService.artistUserChatList.getValue();
      if (artists !== []) {
        if (!toUser) {
          return;
        } else {
          artists.filter((user, index) => {
            if (user.rooms._id === toUser) {
              if (this.webView) { }
              this.setIndex(index, user);
            }
          });
        }
      }
      this.isLoading = false;
    }, 1000);
  }
  sendMessage(message: any) {
    if(message && message.trim() != ''){
      if (message.trim() === '') {
        return false;
      }
      this.isLoading = true;
      console.log("message send");
      this.socketService.sendMessage(this.toUserSend,message,
        this.chatRoom);
        this.socketService.roomseen(this.chatRoom);
      message = '';
      this.messageToBoSend.nativeElement.value = '';
      this.scrollToBottom();

    }

    else{
      this.authenticationService.openSnackBar("Please enter a message first", 'Done', '5000','red-snackbar' ,'end','center'
);
    }
   
  }

  recieveSingleMessage(){
   
      this.socketService.onReciveSingleMessage
      .subscribe((socketResponse: any) => {
        console.log("inside recieved messages");
        this.isLoading = false;
        if (socketResponse.message !== undefined) {
          // if (socketResponse.messages.length > 0) {
            
          //   // this.userChatMessages.push(socketResponse.message)
          //   this.userChatMessages.next(currentValue);
          //   this.cd.detectChanges();
          //   this.scrollToBottom();
          //   this.isLoading = false;
          // } else {
            if (this.isSelectedChat) {
              var userdata=socketResponse.message;
            const currentValue = _.uniqBy(this.userChatMessages.value,"_id");

            currentValue.push(userdata);
            console.log("currentValue"+JSON.stringify(currentValue));
              // const currentValue = this.userChatMessages.value;
              // const updatedValue = [...currentValue, socketResponse.messages];
              this.userChatMessages.next(_.uniqBy(currentValue,"_id"));
              var arraymsg=[];
           



          var bar = new Promise((resolve, reject) => {
            this.userChatMessages.forEach((c:any) => {
              if (!arraymsg.includes(c._id)) {
                console.log("recieved new message");
                console.log(c);
                arraymsg.push(c);
              }
            });
        });
        
        bar.then(() => {
          console.log("Array message is"+JSON.stringify(arraymsg))
          this.userChatMessages.next(_.uniqBy(arraymsg,"_id"));
          this.cd.detectChanges();
          this.scrollToBottom();
        });

        console.log("Array message is"+JSON.stringify(arraymsg))
              this.isLoading = false;
            }
            

            // 42["receivedmessage",{"message":{"isSeen":false,"_id":"610bbd62a2abe83f6f29ba15","message":"okkk","sender":"user","company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"},"user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"room":"610b77f9e84a1630019f3aa0","sendTime":"2021-08-05T10:28:50.246Z","__v":0}}]	

          //   var lastmodified= {
          //     "_id": socketResponse.message,
          //     "message": socketResponse.message.message,
          //     "isSeen": true,
          //     "sendTime":socketResponse.message.sendTime
          // }
          // this.userSelected.lastMessageId=lastmodified
          //   const artists = this.socketService.artistUserChatList.getValue();
          //   console.log(artists,"artist")
          //   const index = artists.findIndex((element) => element._id === socketResponse.message.room);
          //   if (index !== -1) {
          //     artists[index] = this.userSelected;
          //         //  setTimeout(() => {
          //         //   socketResponse.messages.user._id === this.currentUserId ? null : this.notificationTone.nativeElement.play();
          //         // }, 3000);
          //   }
          //   this.socketService.artistUserChatList.next(artists);
          // }
        }
      });
  }
  setIndex(index: number, user) {
    this.languageSelected="en";
    // if (this.selectedIndex !== index) {
       //this.socketService.disconnectConnection();
      // this.ischatBoxShow=true;
      // this.userSelected=user;
      // this.isLoading = true;
      // this.selectedIndex = index;
      // this.isSelectedChat = true;
      // this.toUserSend = user.user._id;
      // this.userName = user.user.fullName;


      // //this.chatName = user.toName;
      // this.agencyProfileImage = user.profilePic !== undefined ? this.baseImgUrlCust + user.profilePic : null;
      // this.artistProfileImage = this.baseImgUrlCust + JSON.parse(localStorage.user).logo;
      
      // this.chatRoom = user._id;
      // this.socketService.onJoinAgency(this.chatRoom);
      // this.recieveMessages();
      // this.checkView();
      // this.socketService.roomseen(this.chatRoom);




      this.isOutgoingSelected=false;
    //  this.socketService.disconnectConnection();
     this.ischatBoxShow=true;
     this.iscompletedSelected=false;
     this.userSelected=user;
     console.log("userSelected"+JSON.stringify(this.userSelected));
     this.isLoading = true;
     this.selectedIndex = index;
     this.isSelectedChat = true;
     this.toUserSend = user.user._id;
     this.userName = user.user.fullName;


     //this.chatName = user.toName;
     this.agencyProfileImage = user.profilePic !== undefined ? this.baseImgUrlCust + user.profilePic : null;
     this.artistProfileImage = this.baseImgUrlCust + JSON.parse(localStorage.user).logo;
     
     this.chatRoom = user._id;
     this.socketService.onJoinAgency(this.chatRoom);
     this.recieveMessages();
     this.checkView();
     this.socketService.roomseen(this.chatRoom);
      // this.screenWidth.subscribe(item => {
      //   // if (item >= 360) {
      //   //   this.mobileView = false;
      //   //   this.webView = true;
      //   //   this.checkView();
      //   // } else {
      //   //   this.mobileView = true;
      //   //   this.webView = false;
      //   //   this.checkView();
      //   // }
      // });
    // } else {
    //   this.scrollToBottom();
    // }
  }
  scrollToBottom() {
    if (this.myScrollContainer !== undefined) {
      setTimeout(() => {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      }, 3000);
      this.socketService.roomseen(this.chatRoom);
      this.cd.detectChanges();
    }
  }
  backtoChatList() {
    this.isSelectedChat = false;
    this.checkView();
  }


 getassignmentCompletedList(){
  const body = document.getElementsByTagName('body')[0];
  body.classList.add('loader_active');
  this.isLoading = true;

  this.authenticationService.assignmentCompletedList().subscribe((res) => {
    if (!res.isError) {

      console.log("response company completed" + JSON.stringify(res));
      this.completedList=res.completedAssignments;


     // response company{"message":"Invitation retrieved successfully","isError":false,"invitations":[{"status":"pending","_id":"60e2d8559872e305b7ffcd14","sendBy":"company","introduction":"test","assignment":{"status":"pending","_id":"60dd7a0e6724b90ddb099708","headline":"Assignment One","description":"Assignment is related to cleaning"},"user":{"_id":"60daabcfb8841b2a124c4bdc"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"60fa48328f558370e0c1ca97","sendBy":"user","introduction":"","assignment":{"status":"pending","_id":"60fa47fe8f558370e0c1ca96","headline":"pp","description":"dd"},"user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"60ff8fac8f558370e0c1cab5","sendBy":"user","introduction":"","assignment":{"status":"pending","_id":"60ff8f9c8f558370e0c1cab4","headline":"testfb","description":"test"},"user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"60ff94238f558370e0c1cab8","sendBy":"user","introduction":"","assignment":{"status":"pending","_id":"60ff94148f558370e0c1cab7","headline":"kjkhy","description":"djhjhjh"},"user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"60ffa3fa96061c67dd9e8684","sendBy":"user","introduction":"","assignment":{"status":"pending","_id":"60ffa3ef96061c67dd9e8683","headline":"kgftf","description":"dddd"},"user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"60ffa77296061c67dd9e8687","sendBy":"user","introduction":"","assignment":{"status":"pending","_id":"60ffa76496061c67dd9e8686","headline":"ghghgg","description":"ffff"},"user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"60ffa7ef96061c67dd9e868a","sendBy":"user","introduction":"","assignment":{"status":"pending","_id":"60ffa7e796061c67dd9e8689","headline":"gffgg","description":"gggf"},"user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"60ffa87b96061c67dd9e868d","sendBy":"user","introduction":"","assignment":{"status":"pending","_id":"60ffa87296061c67dd9e868c","headline":"gfffh","description":"saasd"},"user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"60ffa95796061c67dd9e8690","sendBy":"user","introduction":"","assignment":{"status":"pending","_id":"60ffa94e96061c67dd9e868f","headline":"fghfh","description":"fdgfdg"},"user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"60ffab2896061c67dd9e8693","sendBy":"user","introduction":"","assignment":{"status":"pending","_id":"60ffab1e96061c67dd9e8692","headline":"ggfbgf","description":"cbgfbfg"},"user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"60ffad4f96061c67dd9e8697","sendBy":"user","introduction":"","assignment":{"status":"pending","_id":"60ffad4896061c67dd9e8696","headline":"test headline","description":"test descriptiontest descriptiontetest descriptiontest descriptiontest descriptiontest descriptiontest descriptiontest descriptiontest description"},"user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"60ffadbd96061c67dd9e869a","sendBy":"user","introduction":"","assignment":{"status":"pending","_id":"60ffadb496061c67dd9e8699","headline":"hghjg","description":"hhhhhhhhhhhhhhhhhhhhhbbbbbbbbbbbbbbbb hhhhhhhhhhhhhhhhhhhhhhjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj jjjjjjjjjjjjjjjjjjjjjjjjjjj"},"user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"60ffaeab96061c67dd9e869d","sendBy":"user","introduction":"","assignment":{"status":"pending","_id":"60ffaea296061c67dd9e869c","headline":"nhhhhdfje","description":"copycontentcopycontentcopycontentcopycontentcopycontentcopycontentcopycontentcopycontent copycontentcopycontentcopycontent"},"user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"60ffaf1a96061c67dd9e86a0","sendBy":"user","introduction":"","assignment":{"status":"pending","_id":"60ffaf1196061c67dd9e869f","headline":"jhjkhkhkj","description":"dfjjjjjjjjjjjjjjjjjjjjjjjj fffffffffffffff"},"user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"60ffb02996061c67dd9e86a3","sendBy":"user","introduction":"","assignment":{"status":"pending","_id":"60ffb02296061c67dd9e86a2","headline":"jkhjkhj","description":"eadarear"},"user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"60ffb13696061c67dd9e86a6","sendBy":"user","introduction":"","assignment":{"status":"pending","_id":"60ffb12296061c67dd9e86a5","headline":"hjhjg","description":"hbhjvvj"},"user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"60ffb21a96061c67dd9e86a9","sendBy":"user","introduction":"","assignment":{"status":"pending","_id":"60ffb21196061c67dd9e86a8","headline":"hjbhjh","description":"bjhjh"},"user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"60ffb2e096061c67dd9e86ac","sendBy":"user","introduction":"","assignment":{"status":"pending","_id":"60ffb2d996061c67dd9e86ab","headline":"gfhgfhfg","description":"gbfffffffffff"},"user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"60ffb36596061c67dd9e86af","sendBy":"user","introduction":"","assignment":{"status":"pending","_id":"60ffb35d96061c67dd9e86ae","headline":"fdjhjkfdhj","description":"jkhljvflvdfj"},"user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"60ffb42996061c67dd9e86b2","sendBy":"user","introduction":"","assignment":{"status":"pending","_id":"60ffb42296061c67dd9e86b1","headline":"juh","description":"jhkjhjkhkh nbjbkj"},"user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"61022c3c73d1a20dd93edb65","sendBy":"user","introduction":"","assignment":{"status":"pending","_id":"61022c3573d1a20dd93edb64","headline":"oktest","description":"okdesc"},"user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"61023bff73d1a20dd93edb6c","sendBy":"user","introduction":"","assignment":{"status":"pending","_id":"60fe66bf8f558370e0c1caac","headline":"ok","description":"ok"},"user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"6102541cc271912a85b56bca","sendBy":"user","introduction":"","assignment":{"status":"pending","_id":"60ffac2396061c67dd9e8695","headline":"hjhhg","description":"mghjg"},"user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"610a45a22a4aeb125929a494","sendBy":"user","introduction":"","assignment":{"status":"pending","_id":"610a45962a4aeb125929a493","headline":"hbhjbh","description":"gcgfgfh ghhccc gvvvvvvvvvvvvvvvv gvvvvvvvvvvvvvvvvv hjvvvvvvvvvvvvvvv gvvvvvvvvvvvvvvvvv"},"user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"610a51df1659b513c58adbbb","sendBy":"user","introduction":"","assignment":{"status":"pending","_id":"610a51d51659b513c58adbba","headline":"jjjkj","description":"kjbhkjhjkhkk"},"user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"610a526e1659b513c58adbbe","sendBy":"user","introduction":"","assignment":{"status":"pending","_id":"610a52651659b513c58adbbd","headline":"hjvhghgh","description":"hjghjghjg hvhjvhjhjvh hbhjbhjbhj"},"user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"accepted","_id":"610b77f9e84a1630019f3aa0","sendBy":"user","introduction":"","assignment":{"status":"pending","_id":"610b77e7e84a1630019f3a9f","headline":"jhjkhkj","description":"jnjkhjkn"},"user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"6114a0919b6a46203521c757","sendBy":"user","introduction":"","assignment":{"status":"pending","_id":"6114a0809b6a46203521c755","headline":"math assignments","description":"welcomes"},"user":{"_id":"610a18856926cd0e3d0798ba","fullName":"rupinder"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"611cc81fb2b2a91efd846309","sendBy":"company","introduction":"ok","assignment":{"status":"pending","_id":"61161ecb610b49619cf7a3aa","headline":"fdsa","description":"fdsa"},"user":{"_id":"60f8806d1399bf4af7335415","fullName":"Deepak"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"611cc828b2b2a91efd84630b","sendBy":"company","introduction":"ok","assignment":{"status":"pending","_id":"610a42f22a4aeb125929a48c","headline":"teeeest","description":"A company can be defined as an \"artificial person\", invisible, intangible, created by or under law, with a discrete legal personality, perpetual succession, and welcome"},"user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}}]}
      // this.totalItems=res.totalItems;
    //  this.serviceAreaAll = res.areas;
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

  ).add(() => { this.isLoading = false; body.classList.remove('loader_active'); });
 } 

  getinvitationCompany() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('loader_active');
    this.isLoading = true;

    this.authenticationService.invitationCompany().subscribe((res) => {
      if (!res.isError) {

        console.log("response company" + JSON.stringify(res));
        this.outGoingInvitations=res.invitations;


       // response company{"message":"Invitation retrieved successfully","isError":false,"invitations":[{"status":"pending","_id":"60e2d8559872e305b7ffcd14","sendBy":"company","introduction":"test","assignment":{"status":"pending","_id":"60dd7a0e6724b90ddb099708","headline":"Assignment One","description":"Assignment is related to cleaning"},"user":{"_id":"60daabcfb8841b2a124c4bdc"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"60fa48328f558370e0c1ca97","sendBy":"user","introduction":"","assignment":{"status":"pending","_id":"60fa47fe8f558370e0c1ca96","headline":"pp","description":"dd"},"user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"60ff8fac8f558370e0c1cab5","sendBy":"user","introduction":"","assignment":{"status":"pending","_id":"60ff8f9c8f558370e0c1cab4","headline":"testfb","description":"test"},"user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"60ff94238f558370e0c1cab8","sendBy":"user","introduction":"","assignment":{"status":"pending","_id":"60ff94148f558370e0c1cab7","headline":"kjkhy","description":"djhjhjh"},"user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"60ffa3fa96061c67dd9e8684","sendBy":"user","introduction":"","assignment":{"status":"pending","_id":"60ffa3ef96061c67dd9e8683","headline":"kgftf","description":"dddd"},"user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"60ffa77296061c67dd9e8687","sendBy":"user","introduction":"","assignment":{"status":"pending","_id":"60ffa76496061c67dd9e8686","headline":"ghghgg","description":"ffff"},"user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"60ffa7ef96061c67dd9e868a","sendBy":"user","introduction":"","assignment":{"status":"pending","_id":"60ffa7e796061c67dd9e8689","headline":"gffgg","description":"gggf"},"user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"60ffa87b96061c67dd9e868d","sendBy":"user","introduction":"","assignment":{"status":"pending","_id":"60ffa87296061c67dd9e868c","headline":"gfffh","description":"saasd"},"user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"60ffa95796061c67dd9e8690","sendBy":"user","introduction":"","assignment":{"status":"pending","_id":"60ffa94e96061c67dd9e868f","headline":"fghfh","description":"fdgfdg"},"user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"60ffab2896061c67dd9e8693","sendBy":"user","introduction":"","assignment":{"status":"pending","_id":"60ffab1e96061c67dd9e8692","headline":"ggfbgf","description":"cbgfbfg"},"user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"60ffad4f96061c67dd9e8697","sendBy":"user","introduction":"","assignment":{"status":"pending","_id":"60ffad4896061c67dd9e8696","headline":"test headline","description":"test descriptiontest descriptiontetest descriptiontest descriptiontest descriptiontest descriptiontest descriptiontest descriptiontest description"},"user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"60ffadbd96061c67dd9e869a","sendBy":"user","introduction":"","assignment":{"status":"pending","_id":"60ffadb496061c67dd9e8699","headline":"hghjg","description":"hhhhhhhhhhhhhhhhhhhhhbbbbbbbbbbbbbbbb hhhhhhhhhhhhhhhhhhhhhhjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj jjjjjjjjjjjjjjjjjjjjjjjjjjj"},"user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"60ffaeab96061c67dd9e869d","sendBy":"user","introduction":"","assignment":{"status":"pending","_id":"60ffaea296061c67dd9e869c","headline":"nhhhhdfje","description":"copycontentcopycontentcopycontentcopycontentcopycontentcopycontentcopycontentcopycontent copycontentcopycontentcopycontent"},"user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"60ffaf1a96061c67dd9e86a0","sendBy":"user","introduction":"","assignment":{"status":"pending","_id":"60ffaf1196061c67dd9e869f","headline":"jhjkhkhkj","description":"dfjjjjjjjjjjjjjjjjjjjjjjjj fffffffffffffff"},"user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"60ffb02996061c67dd9e86a3","sendBy":"user","introduction":"","assignment":{"status":"pending","_id":"60ffb02296061c67dd9e86a2","headline":"jkhjkhj","description":"eadarear"},"user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"60ffb13696061c67dd9e86a6","sendBy":"user","introduction":"","assignment":{"status":"pending","_id":"60ffb12296061c67dd9e86a5","headline":"hjhjg","description":"hbhjvvj"},"user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"60ffb21a96061c67dd9e86a9","sendBy":"user","introduction":"","assignment":{"status":"pending","_id":"60ffb21196061c67dd9e86a8","headline":"hjbhjh","description":"bjhjh"},"user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"60ffb2e096061c67dd9e86ac","sendBy":"user","introduction":"","assignment":{"status":"pending","_id":"60ffb2d996061c67dd9e86ab","headline":"gfhgfhfg","description":"gbfffffffffff"},"user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"60ffb36596061c67dd9e86af","sendBy":"user","introduction":"","assignment":{"status":"pending","_id":"60ffb35d96061c67dd9e86ae","headline":"fdjhjkfdhj","description":"jkhljvflvdfj"},"user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"60ffb42996061c67dd9e86b2","sendBy":"user","introduction":"","assignment":{"status":"pending","_id":"60ffb42296061c67dd9e86b1","headline":"juh","description":"jhkjhjkhkh nbjbkj"},"user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"61022c3c73d1a20dd93edb65","sendBy":"user","introduction":"","assignment":{"status":"pending","_id":"61022c3573d1a20dd93edb64","headline":"oktest","description":"okdesc"},"user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"61023bff73d1a20dd93edb6c","sendBy":"user","introduction":"","assignment":{"status":"pending","_id":"60fe66bf8f558370e0c1caac","headline":"ok","description":"ok"},"user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"6102541cc271912a85b56bca","sendBy":"user","introduction":"","assignment":{"status":"pending","_id":"60ffac2396061c67dd9e8695","headline":"hjhhg","description":"mghjg"},"user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"610a45a22a4aeb125929a494","sendBy":"user","introduction":"","assignment":{"status":"pending","_id":"610a45962a4aeb125929a493","headline":"hbhjbh","description":"gcgfgfh ghhccc gvvvvvvvvvvvvvvvv gvvvvvvvvvvvvvvvvv hjvvvvvvvvvvvvvvv gvvvvvvvvvvvvvvvvv"},"user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"610a51df1659b513c58adbbb","sendBy":"user","introduction":"","assignment":{"status":"pending","_id":"610a51d51659b513c58adbba","headline":"jjjkj","description":"kjbhkjhjkhkk"},"user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"610a526e1659b513c58adbbe","sendBy":"user","introduction":"","assignment":{"status":"pending","_id":"610a52651659b513c58adbbd","headline":"hjvhghgh","description":"hjghjghjg hvhjvhjhjvh hbhjbhjbhj"},"user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"accepted","_id":"610b77f9e84a1630019f3aa0","sendBy":"user","introduction":"","assignment":{"status":"pending","_id":"610b77e7e84a1630019f3a9f","headline":"jhjkhkj","description":"jnjkhjkn"},"user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"6114a0919b6a46203521c757","sendBy":"user","introduction":"","assignment":{"status":"pending","_id":"6114a0809b6a46203521c755","headline":"math assignments","description":"welcomes"},"user":{"_id":"610a18856926cd0e3d0798ba","fullName":"rupinder"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"611cc81fb2b2a91efd846309","sendBy":"company","introduction":"ok","assignment":{"status":"pending","_id":"61161ecb610b49619cf7a3aa","headline":"fdsa","description":"fdsa"},"user":{"_id":"60f8806d1399bf4af7335415","fullName":"Deepak"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"611cc828b2b2a91efd84630b","sendBy":"company","introduction":"ok","assignment":{"status":"pending","_id":"610a42f22a4aeb125929a48c","headline":"teeeest","description":"A company can be defined as an \"artificial person\", invisible, intangible, created by or under law, with a discrete legal personality, perpetual succession, and welcome"},"user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}}]}
        // this.totalItems=res.totalItems;
      //  this.serviceAreaAll = res.areas;
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

    ).add(() => { this.isLoading = false; body.classList.remove('loader_active'); });
  }
  isOnline(id: any) {
    if (this.ActiveArtistUsers !== undefined) {
      if (this.ActiveArtistUsers.length > 0) {
        const index = this.ActiveArtistUsers.findIndex((user) => user.userId === id);
        if (index !== -1) {
          return 'online-now';
        } else {
          return 'online-now offline';
        }
      } else {
        return 'online-now offline';
      }
    } else {
      return 'online-now offline';
    }
  }
  ngOnDestroy(): void {
    // this.socketService.disconnectConnection();
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();

  }


  // ngOnInit(): void {
  //   $(document).ready(function(){
  //     $(".message_show").click(function(){
  //       $(".chatbox_show").show();
  //     });
    
  //     $(".message_show").click(function(){
  //       $(".messages_show").hide();
  //     });
    
  //     $("#back_message").click(function(){
  //       $(".messages_show").show();
  //     });
    
  //     $("#back_message").click(function(){
  //       $(".chatbox_show").hide();
  //     });
  //   });
  // }

  changeindex(event){
    console.log(event);
    this.selectedTabIndex=event;
    this.selectedIndex=null;
    this.selectedIndexInv=null;
    this.ischatBoxShow=false;
    this.isSelectedChat=false;
    this.isOutgoingSelected=false;
  }

  engageInconversation(id){
    var data={status:'accepted'}
    this.authenticationService.inviteCompanyAction(id,data).subscribe((res) => {
      if (!res.isError) {
        console.log("inside success");
        // $('#exampleModalCenter_signup').modal('show');

        // $('#exampleModalCenter_share_post').modal({
        //   backdrop: 'static',
        //   keyboard: false,
        //   show: true
        // });
        this.roomUpdated();
        this.recieveMessages();
       this.authenticationService.openSnackBar("Invitation Accepted", 'Done', '5000','blue-snackbar' ,'end','center'
);
       this.selectedTabIndex=0;
 
       this.selectedIndex=null;
        this.selectedIndexInv=null;
        this.ischatBoxShow=false;
        this.isSelectedChat=false;
        this.isOutgoingSelected=false;
        setTimeout(()=>{
          window.location.reload();
        },1000);
    
      }
      else {


        this.authenticationService.openSnackBar("Error while inviting", 'Done', '5000','red-snackbar' ,'end','center'
);
      }
    }
      , (err: any) => {

        this.authenticationService.openSnackBar(err.error.message, 'Done', '5000','red-snackbar' ,'end','center'
);
        return;

      }

    ).add(() => { this.isLoading=false;  });

  }


  declineconversation(id){
    var data={status:'rejected'}
    this.authenticationService.inviteCompanyAction(id,data).subscribe((res) => {
      if (!res.isError) {
        console.log("inside success");
        // $('#exampleModalCenter_signup').modal('show');

        // $('#exampleModalCenter_share_post').modal({
        //   backdrop: 'static',
        //   keyboard: false,
        //   show: true
        // });
        this.roomUpdated();
        this.recieveMessages();
        this.authenticationService.openSnackBar("Invitation Declined", 'Done', '5000','blue-snackbar' ,'end','center'
);

        this.selectedTabIndex=0;
        this.selectedIndex=null;
        this.selectedIndexInv=null;
        this.ischatBoxShow=false;
        this.isSelectedChat=false;
        this.isOutgoingSelected=false;
        setTimeout(()=>{
          window.location.reload();
        },1000);
      }
      else {


        this.authenticationService.openSnackBar("Error while inviting", 'Done', '5000','red-snackbar' ,'end','center'
);
      }
    }
      , (err: any) => {

        this.authenticationService.openSnackBar(err.error.message, 'Done', '5000','red-snackbar' ,'end','center'
);
        return;

      }

    ).add(() => { this.isLoading=false;  });

  }

  setIndexInvitation(index: number, user) {
    console.log("inside pending");
    // if (this.selectedIndexInv !== index) {
      // this.socketService.disconnectConnection();
      this.socketService.onJoinAgency(user._id);
      this.isOutgoingSelected=true;
      this.ischatBoxShow=false;
      this.iscompletedSelected=false;
      this.userSelectedinv=user;
      console.log("this.userSelectedinv"+JSON.stringify(this.userSelectedinv));
      this.isLoading = true;
      this.selectedIndexInv = index;
      this.isSelectedChat = false;
      // this.toUserSend = user.company._id;
      // this.userName = user.company.companyName;


      //this.chatName = user.toName;
      // this.agencyProfileImage = this.baseImgUrlCust + JSON.parse(localStorage.user).profilePic;
      // this.artistProfileImage = user.logo !== undefined ? this.baseImgUrlCust + user.logo : null;
      
      // this.chatRoom = user._id;
      // this.socketService.onJoinAgency(this.chatRoom);
      // this.recieveMessages();
      // this.checkView();
      // this.socketService.roomseen(this.chatRoom);
      // this.screenWidth.subscribe(item => {
      //   // if (item >= 360) {
      //   //   this.mobileView = false;
      //   //   this.webView = true;
      //   //   this.checkView();
      //   // } else {
      //   //   this.mobileView = true;
      //   //   this.webView = false;
      //   //   this.checkView();
      //   // }
      // });
//     } else {
// //      this.scrollToBottom();
//     }
  }


  setIndexInvitationcomp(index: number, user) {
    console.log("inside pending");
    // if (this.selectedIndexInv !== index) {
      // this.socketService.disconnectConnection();
      this.socketService.onJoinAgency(user._id);
      this.isOutgoingSelected=false;
      this.iscompletedSelected=true;
      this.ischatBoxShow=false;
      this.userSelectedinvcomp=user;
      console.log("this.userSelectedinv"+JSON.stringify(this.userSelectedinvcomp));
      this.isLoading = true;
      this.selectedIndexInvcomp = index;
      this.isSelectedChat = false;
      // this.toUserSend = user.company._id;
      // this.userName = user.company.companyName;


      //this.chatName = user.toName;
      // this.agencyProfileImage = this.baseImgUrlCust + JSON.parse(localStorage.user).profilePic;
      // this.artistProfileImage = user.logo !== undefined ? this.baseImgUrlCust + user.logo : null;
      
      // this.chatRoom = user._id;
      // this.socketService.onJoinAgency(this.chatRoom);
      // this.recieveMessages();
      // this.checkView();
      // this.socketService.roomseen(this.chatRoom);
      // this.screenWidth.subscribe(item => {
      //   // if (item >= 360) {
      //   //   this.mobileView = false;
      //   //   this.webView = true;
      //   //   this.checkView();
      //   // } else {
      //   //   this.mobileView = true;
      //   //   this.webView = false;
      //   //   this.checkView();
      //   // }
      // });
//     } else {
// //      this.scrollToBottom();
//     }
  }

  viewProfileCompany(id) {
    // this.showcarsuel=false;
    // const body = document.getElementsByTagName('body')[0];
    // body.classList.add('loader_active');
    // this.isLoading = true;
   // console.log("this.userSelectedinv"+JSON.stringify(this.userSelectedinv));
    this.authenticationService.getCustomersProfile(id).subscribe((res) => {
      if (!res.isError) {

      
        this.companyProfile = res.user;
        console.log(this.companyProfile)
        console.log("this.companyprofile"+JSON.stringify(this.companyProfile));

  //  var abc=     {"loginFailedAttempt":0,"galleryImages":[],"verificationStatus":"verified","signUpStepCompleted":1,"role":"company","isOtpVerified":true,"_id":"60c9d6c360f6ca34375fc710","companyName":"Hjel","companyNumber":"hjlp123","serviceType":null,"serviceNames":[{"_id":"60c9d6c360f6ca34375fc711","name":null}],"serviceAreas":[{"_id":"60c9d6c360f6ca34375fc712","area":null}],"email":"hjel@ex.in","countryCode":"+91","phone":"6201150218","allReviews":[{"_id":"60c9d75160f6ca34375fc715","review":{"isDeleted":false,"_id":"60c9d75160f6ca34375fc714","text":"lorem ipsum","starCount":5,"author":{"defaultSearchItems":{"assignmentArea":"60d3016e60f6ca34375fc722","serviceType":"60d3036260f6ca34375fc728","serviceName":"60d3062260f6ca34375fc734"},"status":"active","loginFailedAttempt":0,"isBlocked":false,"signUpStepCompleted":1,"isOtpVerified":true,"role":"user","_id":"60c9cc8860f6ca34375fc70d","fullName":"Rakesh kr","email":"rakesh@ex.in","phone":"6201150218","countryCode":"+91","tokens":[{"_id":"60c9d0e360f6ca34375fc70f","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGM5Y2M4ODYwZjZjYTM0Mzc1ZmM3MGQiLCJyb2xlIjoidXNlciIsImlhdCI6MTYyMzgzODk0N30.uC1stOFdf8xxllFf8mIt5DbxKVZJODNim_BpxL9Up2s"}],"createdAt":"2021-06-16T10:03:52.343Z","updatedAt":"2021-07-06T07:52:47.554Z","__v":1,"otp":189944,"otpExpiryTime":"2021-06-16T10:31:27.651Z","otpSentTime":"2021-06-16T10:21:27.651Z","otpVerificationTime":"2021-06-16T10:22:27.428Z","languageSelected":"english","profilePic":"profile_pic/1623839261240pexels-andrea-piacquadio-935756.jpg"},"receiver":"60c9d6c360f6ca34375fc710","createdAt":"2021-06-16T10:49:53.225Z","updatedAt":"2021-06-16T10:49:53.225Z","__v":0}}],"createdAt":"2021-06-16T10:47:31.712Z","updatedAt":"2021-06-16T10:49:53.236Z","__v":1,"otpExpiryTime":"2021-06-16T10:58:28.761Z","otpSentTime":"2021-06-16T10:48:28.761Z","otpVerificationTime":"2021-06-16T10:49:19.509Z"}
        $('#exampleModalCenter_view_profile').modal('show');
        // setTimeout(() => {
        //   this.showcarsuel=true;
        // }, 1000);
        //   this.router.navigate(['/verification'])
        // $('#exampleModalCenter_signup').modal('show');






      }
      else {


        this.authenticationService.openSnackBar("Error ", 'Done', '5000','red-snackbar' ,'end','center'
);
      }
    }
      , (err: any) => {

        this.authenticationService.openSnackBar(err.error.message, 'Done', '5000','red-snackbar' ,'end','center'
);
        return;

      }

    ).add(() => { 
      //this.isLoading = false;
      // body.classList.remove('loader_active');
       });
  }

  viewProfileCompanycomp(id) {
    // this.showcarsuel=false;
    // const body = document.getElementsByTagName('body')[0];
    // body.classList.add('loader_active');
    // this.isLoading = true;
    console.log("this.userSelectedinv"+JSON.stringify(this.userSelectedinvcomp));
    this.authenticationService.getCustomersProfile(id).subscribe((res) => {
      if (!res.isError) {

      
        this.companyProfile = res.user;
        console.log("this.companyprofile"+JSON.stringify(this.companyProfile));

  //  var abc=     {"loginFailedAttempt":0,"galleryImages":[],"verificationStatus":"verified","signUpStepCompleted":1,"role":"company","isOtpVerified":true,"_id":"60c9d6c360f6ca34375fc710","companyName":"Hjel","companyNumber":"hjlp123","serviceType":null,"serviceNames":[{"_id":"60c9d6c360f6ca34375fc711","name":null}],"serviceAreas":[{"_id":"60c9d6c360f6ca34375fc712","area":null}],"email":"hjel@ex.in","countryCode":"+91","phone":"6201150218","allReviews":[{"_id":"60c9d75160f6ca34375fc715","review":{"isDeleted":false,"_id":"60c9d75160f6ca34375fc714","text":"lorem ipsum","starCount":5,"author":{"defaultSearchItems":{"assignmentArea":"60d3016e60f6ca34375fc722","serviceType":"60d3036260f6ca34375fc728","serviceName":"60d3062260f6ca34375fc734"},"status":"active","loginFailedAttempt":0,"isBlocked":false,"signUpStepCompleted":1,"isOtpVerified":true,"role":"user","_id":"60c9cc8860f6ca34375fc70d","fullName":"Rakesh kr","email":"rakesh@ex.in","phone":"6201150218","countryCode":"+91","tokens":[{"_id":"60c9d0e360f6ca34375fc70f","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGM5Y2M4ODYwZjZjYTM0Mzc1ZmM3MGQiLCJyb2xlIjoidXNlciIsImlhdCI6MTYyMzgzODk0N30.uC1stOFdf8xxllFf8mIt5DbxKVZJODNim_BpxL9Up2s"}],"createdAt":"2021-06-16T10:03:52.343Z","updatedAt":"2021-07-06T07:52:47.554Z","__v":1,"otp":189944,"otpExpiryTime":"2021-06-16T10:31:27.651Z","otpSentTime":"2021-06-16T10:21:27.651Z","otpVerificationTime":"2021-06-16T10:22:27.428Z","languageSelected":"english","profilePic":"profile_pic/1623839261240pexels-andrea-piacquadio-935756.jpg"},"receiver":"60c9d6c360f6ca34375fc710","createdAt":"2021-06-16T10:49:53.225Z","updatedAt":"2021-06-16T10:49:53.225Z","__v":0}}],"createdAt":"2021-06-16T10:47:31.712Z","updatedAt":"2021-06-16T10:49:53.236Z","__v":1,"otpExpiryTime":"2021-06-16T10:58:28.761Z","otpSentTime":"2021-06-16T10:48:28.761Z","otpVerificationTime":"2021-06-16T10:49:19.509Z"}
        $('#exampleModalCenter_view_profile').modal('show');
        // setTimeout(() => {
        //   this.showcarsuel=true;
        // }, 1000);
        //   this.router.navigate(['/verification'])
        // $('#exampleModalCenter_signup').modal('show');






      }
      else {


        this.authenticationService.openSnackBar("Error ", 'Done', '5000','red-snackbar' ,'end','center'
);
      }
    }
      , (err: any) => {

        this.authenticationService.openSnackBar(err.error.message, 'Done', '5000','red-snackbar' ,'end','center'
);
        return;

      }

    ).add(() => { 
      //this.isLoading = false;
      // body.classList.remove('loader_active');
       });
  }

  videoCall(data){
    let data1 = {
      "invitationId": this.userSelected._id
     
    }
    console.log(data1, "data")
    this.authenticationService.connectCall(data1).subscribe((res: any) => {
      if (!res.isError) { // call send notification api
    this.authenticationService.connectAgora(this.userSelected._id).subscribe((res) => {
      if (!res.isError) {
        console.log("inside success videocall"+JSON.stringify(res));

        this.router.navigate(["videoCall"], { queryParams: { 'id': this.userSelected._id,'token':res.token,'callId':res.callId}});
       
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

    ).add(() => { this.isLoading=false;  });
              }else {


                this.authenticationService.openSnackBar("Error while caliing", 'Done', '5000','red-snackbar' ,'end','center'
);
              }     }, (err: any) => {
    
                this.authenticationService.openSnackBar(err.error.message, 'Done', '5000','red-snackbar' ,'end','center'
);
                return;
        
              })

  }

  transtxt(text){
    this.translateTxt=text.message;
    this.translateMessageItem=text;
  }

  translateText() {
  
      const data = {
        text: this.translateTxt,
        toLanguage: this.languageSelected
      };
      // this.https.httpPostwithHeader(this.apiUrl.agencyrating, data, 
      //   { headers: { Authorization: JSON.parse(localStorage.userDetails).token } })
      //   .pipe(takeUntil(this.unsubscribeAll)).subscribe((response: any) => {
      //   if (response.success) {
      //     this.commonService.presentToast('success', 'top-end', 'Rating Added Successfully');
      //     this.dialogRef.close(true);
      //   } else {
      //     this.commonService.presentToast('error', 'top-end', response.message);
      //     this.dialogRef.close(true);
      //   }
      // }, (error: any) => {
      //   console.log(error);
      // });

      this.authenticationService.translateText(data).subscribe((res) => {
        if (!res.isError) {
          console.log("inside success");
         let currentValue = this.userChatMessages.value;
          let data = currentValue.filter(x => x._id == this.translateMessageItem._id);
          let index = currentValue.indexOf(data[0]);
          currentValue[index].message = res.translatedText;
          // this.AdminDetails.Is_lock = false;

          this.userChatMessages.next(currentValue);
          $('#translate_message').modal('hide');
  
  
          // $('#exampleModalCenter_share_post').modal({
          //   backdrop: 'static',
          //   keyboard: false,
          //   show: true
          // });
         
          
          // this.authenticationService.openSnackBar("Reviewed Successfully", 'Done', '5000','blue-snackbar' ,'end','center'

  
                 }
        else {
  
  
          this.authenticationService.openSnackBar("Error while translating", 'Done', '5000','red-snackbar' ,'end','center'
);
        }
      }
        , (err: any) => {
  
          this.authenticationService.openSnackBar(err.error.message, 'Done', '5000','red-snackbar' ,'end','center'
);
          return;
  
        }
  
      ).add(() => { this.isLoading=false;  });
 
  }
  

    }
