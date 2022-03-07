import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { SocketService } from 'src/app/socket/socket.service';
import { environment } from 'src/environments/environment';
import 'lodash';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { StarRatingComponent } from 'ng-starrating';
import { SlickCarouselComponent } from 'ngx-slick-carousel';

declare var _:any;
declare var $: any;
@Component({
  selector: 'app-message-center-customer',
  templateUrl: './message-center-customer.component.html',
  styleUrls: ['./message-center-customer.component.scss']
})
export class MessageCenterCustomerComponent implements OnInit, AfterViewInit, AfterContentChecked, OnDestroy {
  selectedIndex: number = null;
  selectedIndexInv: number = null;
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
  baseImgUrlComp="https://api-dev.hjelpsom.app/static/";
  baseImgUrl = "https://api-dev.hjelpsom.app/static/company_files/";
  agencyProfileImage: string;
  artistProfileImage: string;
  userSelected;
  selectedTabIndex: number = 0;
  outGoingInvitations;
  slideConfig = { slidesToShow: 1, autoplay: true, slidesToScroll: 1, dots: true };
  slideConfig2 = {
    "slidesToShow": 2, "slidesToScroll": 2, "autoplay": true, "autoplay-speed": 3000, "dots": true
};


// slideConfig2 ={
//   slidesToShow: 2,
//   slidesToScroll: 1,
//   arrows: false,
//   autoplay: false,
//   autoplaySpeed: 3000,
//   speed: 1500,
//   responsive: [
//     {
//       breakpoint: 1024,
//       settings: {
//         slidesToShow: 3,
//       }
//     },
//     {
//       breakpoint: 600,
//       settings: {
//         slidesToShow: 2,
//       }
//     },
//     {
//       breakpoint: 480,
//       settings: {
//         slidesToShow: 1,
//       }
//     }
//   ]
// };
companyProfile: any;
//@ViewChild('slickModala') slickModala: SlickCarouselComponent;
  showcarsuel:boolean=false;

  isOutgoingSelected:boolean=false;
  userSelectedinv: any;

  starRating = 0;
  comment = '';
  languageSelected="en";
  translateTxt="";
  translateMessageItem: any;
  messageUnseenVal=0;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth.next(window.innerWidth);
  }
  constructor(private authenticationService: AuthenticationService,public socketService: SocketService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,private router: Router) {
      this.socketService.messageUnseen.subscribe((data)=>{
        //console.log("data count"+JSON.stringify(data));
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
      this.roomUpdated();
      this.recieveMessages();
      this.recieveSingleMessage();
      this.socketService.invitationupdated.subscribe((data)=>{
        this.getinvitationCustomer();
      });
      
      this.socketService.OnlineAgencyUsers.subscribe((response: any) => {
        this.ActiveArtistUsers = response.OnlineUsers;
      });
      
     }

     invitationupdate(){
      this.socketService.invitationupdated.subscribe((data)=>{
        this.getinvitationCustomer();
      });
     }
     HidePopups() {
     // $('#exampleModalCenter_apply_job').modal('hide');
      $('#exampleModalCenter_view_profile').modal('hide');
      $('#exampleModalCenter_offer_assigment').modal('hide');
      $('#exampleModalCenter_rating').modal('hide');
      
    //  $('#exampleModalCenter_invite_assignment').modal('hide');
      
  
      // $("#alert_div").hide();
    }
    slickInit(e) {
      console.log('slick initialized');
    }
  
    onRate($event: { oldValue: number, newValue: number, starRating: StarRatingComponent }) {
      // alert(`Old Value:${$event.oldValue}, 
      //   New Value: ${$event.newValue}, 
      //   Checked Color: ${$event.starRating.checkedcolor}, 
      //   Unchecked Color: ${$event.starRating.uncheckedcolor}`);
    }

    roomUpdated(){
      this.socketService.roomIsUpdatedData.subscribe((data)=>{
        this.socketService.refreshRooms();
             });
    }
     recieveMessages(){
      this.socketService.onReciveMessage
      .subscribe((socketResponse: any) => {
        console.log("inside recieved messages",socketResponse);
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
            console.log("inside seletedchat else"+this.isSelectedChat);
            if (this.isSelectedChat) {
              // console.log("inside seletedchat");
              // const currentValue = this.userChatMessages.value;
              // const updatedValue = [...currentValue, socketResponse.messages];
              // console.log(JSON.stringify(updatedValue));
              this.userChatMessages.next(socketResponse.messages);
            //   var arraymsg2=[];
           



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
           
            //   this.isLoading = false;
            }
          
            const artists = this.socketService.agencyUserChatList.getValue();
            
            console.log(artists,"artist")
            const index = artists.findIndex((element) => element._id === socketResponse.messages.room);
            if (index !== -1) {
              artists[index] = {
                unSeenCountByUser: 0 ,
                company: socketResponse.company,
                lastMessageId: socketResponse.lastMessageId,
               
              };
                   setTimeout(() => {
                    socketResponse.messages.user._id === this.currentUserId ? null : this.notificationTone.nativeElement.play();
                  }, 3000);
            }
            this.socketService.agencyUserChatList.next(artists);
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
    this.languageSelected="en";
    localStorage.user !== undefined ?
    this.socketService.joinUser() : null;
    localStorage.user !== undefined ?
    this.socketService.setupSocketConnection() : null;
    this.selectedTabIndex=0;
    this.HidePopups();
    this.getinvitationCustomer();
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
  $('#translate_message').modal('hide');
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

  getinvitationCustomer() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('loader_active');
    this.isLoading = true;

    this.authenticationService.invitationUser().subscribe((res) => {
      if (!res.isError) {

        console.log("response invitation" + JSON.stringify(res));
this.outGoingInvitations=res.invitations;
this.outGoingInvitations.forEach(element => {
  element.EditStatus=false;
});
     //   {"message":"Invitation retrieved successfully","isError":false,"invitations":[{"status":"pending","_id":"60f665ebf2715a20f9200b47","sendBy":"user","introduction":"","user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60e525cc22d4a71ee895a981","companyName":"welcome company"}},{"status":"pending","_id":"60f67d3358b845241b7567a4","sendBy":"user","introduction":"","user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60e525cc22d4a71ee895a981","companyName":"welcome company"}},{"status":"pending","_id":"60f7ea4d1399bf4af733540b","sendBy":"company","introduction":"n","user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":null},{"status":"pending","_id":"60fa48328f558370e0c1ca97","sendBy":"user","introduction":"","user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"60fe66da8f558370e0c1caaf","sendBy":"user","introduction":"","user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60e525cc22d4a71ee895a981","companyName":"welcome company"}},{"status":"pending","_id":"60ff8fac8f558370e0c1cab5","sendBy":"user","introduction":"","user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"60ff94238f558370e0c1cab8","sendBy":"user","introduction":"","user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"60ffa3fa96061c67dd9e8684","sendBy":"user","introduction":"","user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"60ffa77296061c67dd9e8687","sendBy":"user","introduction":"","user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"60ffa7ef96061c67dd9e868a","sendBy":"user","introduction":"","user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"60ffa87b96061c67dd9e868d","sendBy":"user","introduction":"","user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"60ffa95796061c67dd9e8690","sendBy":"user","introduction":"","user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"60ffab2896061c67dd9e8693","sendBy":"user","introduction":"","user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"60ffad4f96061c67dd9e8697","sendBy":"user","introduction":"","user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"60ffadbd96061c67dd9e869a","sendBy":"user","introduction":"","user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"60ffaeab96061c67dd9e869d","sendBy":"user","introduction":"","user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"60ffaf1a96061c67dd9e86a0","sendBy":"user","introduction":"","user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"60ffb02996061c67dd9e86a3","sendBy":"user","introduction":"","user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"60ffb13696061c67dd9e86a6","sendBy":"user","introduction":"","user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"60ffb21a96061c67dd9e86a9","sendBy":"user","introduction":"","user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"60ffb2e096061c67dd9e86ac","sendBy":"user","introduction":"","user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"60ffb36596061c67dd9e86af","sendBy":"user","introduction":"","user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"60ffb42996061c67dd9e86b2","sendBy":"user","introduction":"","user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"61022c3c73d1a20dd93edb65","sendBy":"user","introduction":"","user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"61023bff73d1a20dd93edb6c","sendBy":"user","introduction":"","user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"6102541cc271912a85b56bca","sendBy":"user","introduction":"","user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"accepted","_id":"61097d65f72b5278afaac955","sendBy":"company","introduction":"I am interested in your assignments","user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60e8482980353c0d60f0630f","companyName":"welcom e company","logo":"company_files/1626838899462Koala.jpg"}},{"status":"pending","_id":"610a45a22a4aeb125929a494","sendBy":"user","introduction":"","user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"610a51df1659b513c58adbbb","sendBy":"user","introduction":"","user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"pending","_id":"610a526e1659b513c58adbbe","sendBy":"user","introduction":"","user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}},{"status":"accepted","_id":"610b77f9e84a1630019f3aa0","sendBy":"user","introduction":"","user":{"_id":"60c9bbf9eee03c15321093cd","fullName":"User One","profilePic":"profile_pic/1626862471487noimageavailable.png"},"company":{"_id":"60d30a7660f6ca34375fc737","companyName":"CompName","logo":"company_files/1626856309035noimageavailable.png"}}]}
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
  ngAfterViewInit() {
    setTimeout(() => {
      const toUser = this.chatRoom;
      const artists = this.socketService.agencyUserChatList.getValue();
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
            var arraymsg3=[];
           



          var bar3 = new Promise((resolve, reject) => {
            this.userChatMessages.forEach((c:any) => {
              if (!arraymsg3.includes(c._id)) {
                
                arraymsg3.push(c);
              }
            });
        });
        
        bar3.then(() => {
          console.log("Array message is"+JSON.stringify(arraymsg3))
         
          this.userChatMessages.next(_.uniqBy(arraymsg3,"_id"));
          this.cd.detectChanges();
          this.scrollToBottom();
        });
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
        //   const artists = this.socketService.agencyUserChatList.getValue();
        //   console.log(artists,"artist")
        //   const index = artists.findIndex((element) => element._id === socketResponse.message.room);
        //   if (index !== -1) {
        //     artists[index] = this.userSelected;
        //         //  setTimeout(() => {
        //         //   socketResponse.messages.user._id === this.currentUserId ? null : this.notificationTone.nativeElement.play();
        //         // }, 3000);
        //   }
        //   this.socketService.agencyUserChatList.next(artists);
        // }
      }
    });
  }
  setIndex(index: number, user) {
    // if (this.selectedIndex !== index) {
      this.languageSelected="en";
      this.isOutgoingSelected=false;
      // this.socketService.disconnectConnection();
      this.ischatBoxShow=true;
      this.userSelected=user;
      console.log("userSelected"+JSON.stringify(this.userSelected));
      this.isLoading = true;
      this.selectedIndex = index;
      this.isSelectedChat = true;
      this.toUserSend = user.company._id;
      this.userName = user.company.companyName;


      //this.chatName = user.toName;
      this.agencyProfileImage = this.baseImgUrlCust + JSON.parse(localStorage.user).profilePic;
      this.artistProfileImage = user.logo !== undefined ? this.baseImgUrlCust + user.logo : null;
      
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

  setIndexInvitation(index: number, user) {
    console.log("inside pending");
    // if (this.selectedIndexInv !== index) {

      this.socketService.onJoinAgency(user._id);
      // this.socketService.disconnectConnection();
      this.isOutgoingSelected=true;
      this.ischatBoxShow=false;
      this.userSelectedinv=user;
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

  setIndexInvitationAccepted(index: number, user){
    console.log("inside accepted");
    if (this.selectedIndexInv !== index) {
    this.isOutgoingSelected=false;
    this.ischatBoxShow=false;
    this.userSelectedinv=user;
    this.isLoading = true;
    this.selectedIndexInv = index;
    this.isSelectedChat = false;
  } else {
    //      this.scrollToBottom();
        }
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
   //  this.socketService.disconnectConnection();
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  changeindex(event){
    console.log(event);
    this.selectedTabIndex=event;
    this.selectedIndex=null;
    this.selectedIndexInv=null;
    this.ischatBoxShow=false;
    this.isSelectedChat=false;
    this.isOutgoingSelected=false;
  }

  viewProfileCompany(id) {
    this.showcarsuel=false;
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('loader_active');
    this.isLoading = true;
    this.authenticationService.getCompanyProfile(id).subscribe((res) => {
      if (!res.isError) {

      
        this.companyProfile = res.company;
        console.log("this.companyprofile"+JSON.stringify(this.companyProfile));

  //  var abc=     {"loginFailedAttempt":0,"galleryImages":[],"verificationStatus":"verified","signUpStepCompleted":1,"role":"company","isOtpVerified":true,"_id":"60c9d6c360f6ca34375fc710","companyName":"Hjel","companyNumber":"hjlp123","serviceType":null,"serviceNames":[{"_id":"60c9d6c360f6ca34375fc711","name":null}],"serviceAreas":[{"_id":"60c9d6c360f6ca34375fc712","area":null}],"email":"hjel@ex.in","countryCode":"+91","phone":"6201150218","allReviews":[{"_id":"60c9d75160f6ca34375fc715","review":{"isDeleted":false,"_id":"60c9d75160f6ca34375fc714","text":"lorem ipsum","starCount":5,"author":{"defaultSearchItems":{"assignmentArea":"60d3016e60f6ca34375fc722","serviceType":"60d3036260f6ca34375fc728","serviceName":"60d3062260f6ca34375fc734"},"status":"active","loginFailedAttempt":0,"isBlocked":false,"signUpStepCompleted":1,"isOtpVerified":true,"role":"user","_id":"60c9cc8860f6ca34375fc70d","fullName":"Rakesh kr","email":"rakesh@ex.in","phone":"6201150218","countryCode":"+91","tokens":[{"_id":"60c9d0e360f6ca34375fc70f","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGM5Y2M4ODYwZjZjYTM0Mzc1ZmM3MGQiLCJyb2xlIjoidXNlciIsImlhdCI6MTYyMzgzODk0N30.uC1stOFdf8xxllFf8mIt5DbxKVZJODNim_BpxL9Up2s"}],"createdAt":"2021-06-16T10:03:52.343Z","updatedAt":"2021-07-06T07:52:47.554Z","__v":1,"otp":189944,"otpExpiryTime":"2021-06-16T10:31:27.651Z","otpSentTime":"2021-06-16T10:21:27.651Z","otpVerificationTime":"2021-06-16T10:22:27.428Z","languageSelected":"english","profilePic":"profile_pic/1623839261240pexels-andrea-piacquadio-935756.jpg"},"receiver":"60c9d6c360f6ca34375fc710","createdAt":"2021-06-16T10:49:53.225Z","updatedAt":"2021-06-16T10:49:53.225Z","__v":0}}],"createdAt":"2021-06-16T10:47:31.712Z","updatedAt":"2021-06-16T10:49:53.236Z","__v":1,"otpExpiryTime":"2021-06-16T10:58:28.761Z","otpSentTime":"2021-06-16T10:48:28.761Z","otpVerificationTime":"2021-06-16T10:49:19.509Z"}
        $('#exampleModalCenter_view_profile').modal('show');
        setTimeout(() => {
          this.showcarsuel=true;
        }, 1000);
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

    ).add(() => { this.isLoading = false; body.classList.remove('loader_active'); });
  }
  engageInconversation(id){
    var data={status:'accepted'}
    this.authenticationService.inviteCustomerAction(id,data).subscribe((res) => {
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
    this.authenticationService.inviteCustomerAction(id,data).subscribe((res) => {
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

  offerAccepted(){
    //var data={status:'rejected'}
    this.authenticationService.offerAccept(this.userSelected._id).subscribe((res) => {
      if (!res.isError) {
        console.log("inside success");
        // $('#exampleModalCenter_signup').modal('show');

        // $('#exampleModalCenter_share_post').modal({
        //   backdrop: 'static',
        //   keyboard: false,
        //   show: true
        // });
    

        this.roomUpdated();
        this.socketService.refreshRooms();
        this.recieveMessages();
        $('#exampleModalCenter_offer_assigment').modal('hide');
        this.authenticationService.openSnackBar("Offer Accepted", 'Done', '5000','blue-snackbar' ,'end','center'
);

        this.selectedTabIndex=0;
        this.selectedIndex=null;
        this.selectedIndexInv=null;
        this.ischatBoxShow=false;
        this.isSelectedChat=false;
        this.isOutgoingSelected=false;
        setTimeout(() => {
          const artists = this.socketService.agencyUserChatList.getValue();
              
          console.log(artists,"artist")
          const index = artists.findIndex((element) => element._id === this.userSelected._id);
          if (index !== -1) {
            artists[index].assignment.status = "offered";
                //  setTimeout(() => {
                //   socketResponse.messages.user._id === this.currentUserId ? null : this.notificationTone.nativeElement.play();
                // }, 3000);
          }
          this.socketService.agencyUserChatList.next(artists);
        }, 2200);
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

  offerCompleted(){
    console.log("userselected"+JSON.stringify(this.userSelected));
    //var data={status:'rejected'}
    this.authenticationService.offerCompleted(this.userSelected._id).subscribe((res) => {
      if (!res.isError) {
        console.log("inside success");
        // $('#exampleModalCenter_signup').modal('show');

        $('#exampleModalCenter_rating').modal({
          backdrop: 'static',
          keyboard: false,
          show: true
        });
        this.roomUpdated();
        this.socketService.refreshRooms();
        this.recieveMessages();
      
        this.authenticationService.openSnackBar("Assignment Completed", 'Done', '5000','blue-snackbar' ,'end','center'
);

        // this.selectedTabIndex=0;
        // this.selectedIndex=null;
        // this.selectedIndexInv=null;
        // this.ischatBoxShow=false;
        // this.isSelectedChat=false;
        // this.isOutgoingSelected=false;

        setTimeout(() => {
          const artists = this.socketService.agencyUserChatList.getValue();
              
          console.log(artists,"artist")
          const index = artists.findIndex((element) => element._id === this.userSelected._id);
          if (index !== -1) {
            artists[index].assignment.status = "completed";
                //  setTimeout(() => {
                //   socketResponse.messages.user._id === this.currentUserId ? null : this.notificationTone.nativeElement.play();
                // }, 3000);
          }
          this.socketService.agencyUserChatList.next(artists);
        }, 2200);
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
  enableEdit(event,iditem){
    console.log("inside enableedit"+JSON.stringify(iditem));
    event.stopPropagation();
console.log("this.outGoingInvitations"+JSON.stringify(this.outGoingInvitations));

    for (let cases of this.outGoingInvitations) {
      cases.EditStatus = false;
      //cases.borderBottom = "2px solid #eee";
    }
    var index12 = this.outGoingInvitations.filter(ij => ij._id == iditem._id)[0];
    console.log(index12);
    

   

    if (index12 !== undefined) {
      let index1 = this.outGoingInvitations.indexOf(index12);
      this.outGoingInvitations[index1].EditStatus = true;
    }

    

  }

  sendReminder(event,item){
    event.stopPropagation();
    //console.log("userselected"+JSON.stringify(this.userSelected));
    //var data={status:'rejected'}
    this.authenticationService.sendReminder(item._id).subscribe((res) => {
      if (!res.isError) {
        console.log("inside success");
        // $('#exampleModalCenter_signup').modal('show');

        // $('#exampleModalCenter_share_post').modal({
        //   backdrop: 'static',
        //   keyboard: false,
        //   show: true
        // });
        this.roomUpdated();
        this.socketService.refreshRooms();
        this.recieveMessages();
        for (let cases of this.outGoingInvitations) {
          cases.EditStatus = false;
          //cases.borderBottom = "2px solid #eee";
        } 
        this.authenticationService.openSnackBar("Reminder send successfully", 'Done', '5000','blue-snackbar' ,'end','center'
);

        // this.selectedTabIndex=0;
        // this.selectedIndex=null;
        // this.selectedIndexInv=null;
        // this.ischatBoxShow=false;
        // this.isSelectedChat=false;
        // this.isOutgoingSelected=false;
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


  cancelInv(event,item){
    event.stopPropagation();
    //console.log("userselected"+JSON.stringify(this.userSelected));
    //var data={status:'rejected'}
    this.authenticationService.cancelInv(item._id).subscribe((res) => {
      if (!res.isError) {
        console.log("inside success");
        // $('#exampleModalCenter_signup').modal('show');

        // $('#exampleModalCenter_share_post').modal({
        //   backdrop: 'static',
        //   keyboard: false,
        //   show: true
        // });
        this.roomUpdated();
        this.socketService.refreshRooms();
        this.recieveMessages();
        for (let cases of this.outGoingInvitations) {
          cases.EditStatus = false;
          //cases.borderBottom = "2px solid #eee";
        } 
        this.authenticationService.openSnackBar("Invitation Cancelled", 'Done', '5000','blue-snackbar' ,'end','center'
);

        this.selectedTabIndex=0;
        this.selectedIndex=null;
        this.selectedIndexInv=null;
        this.ischatBoxShow=false;
        this.isSelectedChat=false;
        this.isOutgoingSelected=false;
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


  onRatee($event: { oldValue: number, newValue: number, starRating: StarRatingComponent }) {
    this.starRating = $event.newValue;
  }

  AddRating() {
    if (this.starRating !== 0 &&
      this.starRating !== undefined &&
      this.starRating !== null &&
      this.comment !== null &&
      this.comment !== undefined &&
      this.comment.trim() !== '') {
      const data = {
        text: this.comment,
        starCount: this.starRating,
        companyId: this.userSelected.company._id
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

      this.authenticationService.reviewAdd(data).subscribe((res) => {
        if (!res.isError) {
          console.log("inside success");
           $('#exampleModalCenter_rating').modal('hide');
  
          // $('#exampleModalCenter_share_post').modal({
          //   backdrop: 'static',
          //   keyboard: false,
          //   show: true
          // });
          this.roomUpdated();
          this.socketService.refreshRooms();
          this.recieveMessages();
          
          this.authenticationService.openSnackBar("Reviewed Successfully", 'Done', '5000','blue-snackbar' ,'end','center'
);
  
          this.selectedTabIndex=0;
          this.selectedIndex=null;
          this.selectedIndexInv=null;
          this.ischatBoxShow=false;
          this.isSelectedChat=false;
          this.isOutgoingSelected=false;
          this.starRating=0;
          this.comment='';
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
    } else {
      if (this.starRating === undefined || this.starRating == null || this.starRating === 0) {
        this.authenticationService.openSnackBar('Please add rating first', 'Done', '5000','red-snackbar' ,'end','center'
);
       
      } else {
        this.authenticationService.openSnackBar('Please add comment first', 'Done', '5000','red-snackbar' ,'end','center'
);
       
      }
    }
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
          }  else {


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
      console.log(this.translateTxt)
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
        console.log(res)
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

  // next() {
  //   this.slickModala.slickNext();
  // }
  
  // prev() {
  //   this.slickModala.slickPrev();
  // }

}

