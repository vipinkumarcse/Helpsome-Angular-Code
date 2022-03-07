import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { StarRatingComponent } from 'ng-starrating';
import { ApilistService } from 'src/app/services/api/apilist.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { SocketService } from 'src/app/socket/socket.service';

declare var $: any;
@Component({
  selector: 'app-profile-company',
  templateUrl: './profile-company.component.html',
  styleUrls: ['./profile-company.component.scss']
})
export class ProfileCompanyComponent implements OnInit {



  isLoading: boolean = false;
  messageUnseenVal=0;
  userDetails;
  baseImgUrl = "https://api-dev.hjelpsom.app/static/company_files/";
  baseImgUrlComp = "https://api-dev.hjelpsom.app/static/";
  profilePic: string;
  companyProfile: any;
  slideConfig = { slidesToShow: 1, autoplay: true, slidesToScroll: 1, dots: true };
  slideConfig2 = {
    "slidesToShow": 2, "slidesToScroll": 2, "autoplay": true, "autoplay-speed": 3000, "dots": true
  };
  showcarsuel: boolean = false;
  constructor(public socketService: SocketService,private http: HttpClient, private fb: FormBuilder, public apiList: ApilistService, private authenticationService: AuthenticationService, private router: Router) {
    this.socketService.messageUnseen.subscribe((data)=>{
      console.log("message unread count"+JSON.stringify(data));
      this.messageUnseenVal=data.totalUnSeenCount;
          })
   }

  ngOnInit(): void {
    this.isLoading=false;
    this.showcarsuel=false;
    $(document).ready(function () {
      $('.owl-carousel').owlCarousel();
    });

    $('.owl-carousel').owlCarousel({
      loop: true,
      margin: 10,
      nav: true,
      dots: false,
      responsiveClass: true,
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 2,
          nav: false
        },
        1000: {
          items: 2,
          loop: true
        }
      }
    })

    this.getCustomerProfile();
  }
  slickInit(e) {
    console.log('slick initialized');
  }
  onRate($event: { oldValue: number, newValue: number, starRating: StarRatingComponent }) {
   
  }
  getCustomerProfile() {
    this.showcarsuel = false;
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('loader_active');
    this.isLoading = true;

    this.authenticationService.getCompanyProfileAfterLogin().subscribe((res) => {
      if (!res.isError) {

        console.log("response" + JSON.stringify(res));
        // this.totalItems=res.totalItems;
        this.companyProfile = res.company;
this.authenticationService.userData=res.company;
        localStorage.setItem("user",JSON.stringify(res.company));
        this.authenticationService.changeMemberPhoto(res.company.logo); 

        if (this.companyProfile.profilePic) {
          this.profilePic = this.baseImgUrl + this.companyProfile.profilePic;
        }
        setTimeout(() => {
          this.showcarsuel = true;
        }, 1000);
   

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

}
