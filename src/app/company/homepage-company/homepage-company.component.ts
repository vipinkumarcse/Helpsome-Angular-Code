import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApilistService } from 'src/app/services/api/apilist.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { SocketService } from 'src/app/socket/socket.service';

declare var $: any;
@Component({
  selector: 'app-homepage-company',
  templateUrl: './homepage-company.component.html',
  styleUrls: ['./homepage-company.component.scss']
})
export class HomepageCompanyComponent implements OnInit {
  @ViewChild('heroForm1', { static: false }) public heroForm1: NgForm
  p: number = 1;
  term:string;
  itemsPerPage:number=3;
  // serviceArea:any=[];
  // serviceName: any=[];
  serviceArea:any;
  serviceName: any;
  assignmentData:any[]=[];

  serviceAreaAll:any[]=[];
  serviceNameAll:any[]=[];
  totalItems=0;
  baseImgUrl="https://api-dev.hjelpsom.app/static/assignment_images/";
  detailsData: any;
  slideConfig = { slidesToShow: 1,  autoplay: true,slidesToScroll: 1,dots:true};
  isLoading: boolean=false;
  actionType: any;
  description: any;
  idAssign: any;
  AlertJobText;
  messageUnseenVal=0;
  showcarsuel: boolean;
  selectedAreas: any;
  srv: any;
  selectedNames: any;
  constructor(public socketService: SocketService,private http: HttpClient, private fb: FormBuilder, public apiList: ApilistService, private authenticationService: AuthenticationService, private router: Router) {
    this.socketService.messageUnseen.subscribe((data)=>{
      console.log("message unread count"+JSON.stringify(data));
      this.messageUnseenVal=data.totalUnSeenCount;
          })

   }

  ngOnInit(): void {
    this.isLoading=false;
    $(document).ready(function(){
      $('.owl-carousel').owlCarousel();
    });
    
    $('.owl-carousel').owlCarousel({
      loop:true,
      margin:10,
      nav:true,
      dots:false,
      responsiveClass:true,
      responsive:{
          0:{
              items:1,
          },
          600:{
              items:1,
              nav:false
          },
          1000:{
              items:1,
              loop:true
          }
      }
  });
  this.HidePopups();

   this.getServiceAreaAll();
   this.getServiceNameAll();
   this.getHomePageData();
}

  HidePopups() {
    $('#exampleModalCenter_apply_job').modal('hide');
    // $("#alert_div").hide();
  }

  getServiceAreaAll(){
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('loader_active');
    this.isLoading=true;

    this.authenticationService.getComapnyServiceArea().subscribe((res) => {
      if (!res.isError) {
        
        console.log("response"+JSON.stringify(res));
       // this.totalItems=res.totalItems;
        this.serviceAreaAll=res.areas;
        // this.getcompanyProfile()

        //   this.router.navigate(['/verification'])
        // $('#exampleModalCenter_signup').modal('show');



       


      }
      else {


            this.authenticationService.openSnackBar("Error while login", 'Done', '5000','red-snackbar' ,'end','center'
);
      }
    }
      , (err: any) => {
        console.log(err)
        this.authenticationService.openSnackBar(err.error.message, 'Done', '5000','red-snackbar' ,'end','center'
);
        return;

      }

    ).add(() => { this.isLoading=false;body.classList.remove('loader_active'); });
  }


  getServiceNameAll(){
    const body = document.getElementsByTagName('body')[0];
body.classList.add('loader_active');
    this.isLoading=true;
    this.authenticationService.getHomepageServiceType().subscribe((res) => {
      if (!res.isError) {
        
       // console.log("response serviceNameAll"+JSON.stringify(res));

      
        this.serviceNameAll=res.services;
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


  getHomePageData(){
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('loader_active');
this.isLoading=true;
    this.authenticationService.getCompanyHomepageData(this.serviceArea,this.serviceName,this.p,this.itemsPerPage).subscribe((res) => {
      if (!res.isError) {
        
        console.log("response"+JSON.stringify(res));
        this.totalItems=res.totalItems;
        this.assignmentData=res.assignments;
        console.log(this.assignmentData)


        // {"message":"Assignment retrieved successfully","isError":false,"totalItems":1,"assignments":[{"_id":"60dd7a0e6724b90ddb099708","status":"pending","isActive":true,"isDeleted":false,"headline":"Assignment One","description":"Assignment is related to cleaning","assignmentArea":{"_id":"60d3015d60f6ca34375fc721","isDeleted":false,"name":"Svalbard","createdAt":"2021-06-23T09:39:41.477Z","updatedAt":"2021-06-23T09:39:41.477Z","__v":0},"serviceType":{"_id":"60d3036260f6ca34375fc728","isDeleted":false,"serviceTypeName":"Cleaning","createdAt":"2021-06-23T09:48:18.129Z","updatedAt":"2021-06-23T09:48:18.129Z","__v":0},"serviceName":{"_id":"60d3062260f6ca34375fc734","isDeleted":false,"serviceName":"Cleaning services","type":"60d3036260f6ca34375fc728","createdAt":"2021-06-23T10:00:02.865Z","updatedAt":"2021-06-23T10:00:02.865Z","__v":0},"assignBy":"60daabcfb8841b2a124c4bdc","medias":[{"_id":"60dd7a0e6724b90ddb099709","media":"1625127435486Screenshot(369).png"},{"_id":"60dd7a0e6724b90ddb09970a","media":"1625127436806Screenshot(368).png"}],"companyList":[],"createdAt":"2021-07-01T08:17:18.705Z","updatedAt":"2021-07-01T08:17:18.705Z","__v":0}]}

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

  getServiceListById(id) {
    this.serviceArea = id;
  }

  getServiceListByName(id) {
    this.serviceName = id;
    
  }

  search(){
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('loader_active');
    this.isLoading=true;
    this.p=1;
    this.authenticationService.getCompanyHomepageData(this.serviceArea,this.serviceName,this.p,this.itemsPerPage).subscribe((res) => {
      if (!res.isError) {
        
        console.log("response"+JSON.stringify(res));
        this.totalItems=res.totalItems;
        this.assignmentData=res.assignments;
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

  openDetails(data){
    this.showcarsuel=false;
    this.detailsData=data;
    setTimeout(() => {
      this.showcarsuel=true;
    }, 1000);
    console.log("this.detailsData"+this.detailsData);
  }

  openInterestedModal(id) {
   
    this.heroForm1.resetForm();
    this.AlertJobText="Apply Job";
    $('#exampleModalCenter_job_details').modal('hide');
    this.idAssign=id;
    console.log("idassign"+this.idAssign);
    this.actionType = "interested";
    this.description = null;
    $('#exampleModalCenter_apply_job').modal({
      backdrop: 'static',
      keyboard: false,
      show: true
    });
    
  }

  openNotInterestedModal(id) {
   
    this.heroForm1.resetForm();
    this.AlertJobText="Reject Job";
    $('#exampleModalCenter_job_details').modal('hide');
    this.idAssign=id;
    console.log("idassign"+this.idAssign);
    this.actionType = "not_interested";
    this.description = null;
    $('#exampleModalCenter_apply_job').modal({
      backdrop: 'static',
      keyboard: false,
      show: true
    });
   
  }

  submitFeedback() {
    const params = {
      "actionType": this.actionType,
      "introduction": this.description
    }

    console.log("params are" + JSON.stringify(params));
    this.authenticationService.interestedCompany(this.idAssign,params).subscribe((res) => {
      if (!res.isError) {
        console.log("inside success");
        // $('#exampleModalCenter_signup').modal('show');

        this.authenticationService.openSnackBar("Action performed successfully", 'Done', '5000','blue-snackbar' ,'end','center'
);
        this.search();
        $('#exampleModalCenter_apply_job').modal('hide');
        
        



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

    )


  }

  // isMatchedCountLessThanTotalCountMessage(){
  //   this.socketService.messageUnseen.subscribe((data)=>{

  //     if(data>0){
  //       return true;
  //     }
  //     else{
  //       return false;
  //     }
      
  //   })
  // }


  // getcompanyProfile(){
  //   this.selectedAreas=JSON.parse(localStorage.getItem('user')).serviceAreas;
  //   this.selectedNames=JSON.parse(localStorage.getItem('user')).serviceNames;

  //   this.selectedAreas.forEach((selectedArea:any) => {
  //     console.log(selectedArea.area._id)
  //    this.serviceArea.push(selectedArea.area._id)
  //   });

  //   this.selectedNames.forEach((selectedName:any) => {
  //    this.serviceName.push(selectedName.name._id)
  //   });
    
  // }



}
