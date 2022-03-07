import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApilistService } from 'src/app/services/api/apilist.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { SocketService } from 'src/app/socket/socket.service';

@Component({
  selector: 'app-upload-assignment-customer',
  templateUrl: './upload-assignment-customer.component.html',
  styleUrls: ['./upload-assignment-customer.component.scss']
})
export class UploadAssignmentCustomerComponent implements OnInit {

  @ViewChild('heroForm1', { static: false }) public heroForm1: NgForm
  p: number = 1;
  term: string;
  itemsPerPage: number = 2;
  serviceArea: any;
  serviceName: any;
  postData: any[] = [];

  serviceAreaAll: any[] = [];
  serviceNameAll: any[] = [];
  totalItems = 0;
  baseImgUrl = "https://api-dev.hjelpsom.app/static/assignment_images/";
  baseImgUrlComp="https://api-dev.hjelpsom.app/static/";
  detailsData: any;
  slideConfig = { slidesToShow: 1, autoplay: true, slidesToScroll: 1, dots: true };
  slideConfig2 = {
    "slidesToShow": 2, "slidesToScroll": 2, "autoplay": true, "autoplay-speed": 3000, "dots": true
};
  isLoading: boolean = false;
  actionType: any;
  description: any;
  idAssign: any;
  AlertJobText;
  companyProfile: any;
  showcarsuel:boolean=false;
  messageUnseenVal=0;
  constructor(public socketService: SocketService,private http: HttpClient, private fb: FormBuilder, public apiList: ApilistService, private authenticationService: AuthenticationService, private router: Router) {
    this.socketService.messageUnseen.subscribe((data)=>{
      //console.log("data count"+JSON.stringify(data));
this.messageUnseenVal=data.totalUnSeenCount;
    })
   }

  ngOnInit(): void {
    this.isLoading = false;
    this.getAssignmentData();
  }


  getAssignmentData() {
    this.showcarsuel=false;
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('loader_active');
    this.isLoading = true;
    this.authenticationService.getCustomerAssignmentData( this.p, this.itemsPerPage).subscribe((res) => {
      if (!res.isError) {

        console.log("response" + JSON.stringify(res));
        this.totalItems = res.totalItems;
        this.postData = res.assignments;
        setTimeout(() => {
          this.showcarsuel=true;
        }, 1000);



        // {"message":"Home page data retrieved successfully","isError":false,"totalItems":8,"companies":[{"_id":"60c9c317eee03c15321093d1","galleryImages":[],"verificationStatus":"verified","signUpStepCompleted":1,"role":"company","isOtpVerified":false,"companyName":"Monopoly","companyNumber":"123kj","serviceType":null,"serviceNames":[{"_id":"60c9c317eee03c15321093d2","name":null}],"serviceAreas":[{"_id":"60c9c317eee03c15321093d3","area":null}],"email":"monopoly@ex.in","countryCode":"91","phone":"1010101010","allReviews":[],"createdAt":"2021-06-16T09:23:35.198Z","updatedAt":"2021-06-16T09:30:46.293Z","__v":0},{"_id":"60c9d6c360f6ca34375fc710","galleryImages":[],"verificationStatus":"verified","signUpStepCompleted":1,"role":"company","isOtpVerified":true,"companyName":"Hjel","companyNumber":"hjlp123","serviceType":null,"serviceNames":[{"_id":"60c9d6c360f6ca34375fc711","name":null}],"serviceAreas":[{"_id":"60c9d6c360f6ca34375fc712","area":null}],"email":"hjel@ex.in","countryCode":"+91","phone":"6201150218","allReviews":[{"_id":"60c9d75160f6ca34375fc715","review":{"_id":"60c9d75160f6ca34375fc714","isDeleted":false,"text":"lorem ipsum","starCount":5,"author":{"_id":"60c9cc8860f6ca34375fc70d","status":"active","loginFailedAttempt":0,"isBlocked":false,"signUpStepCompleted":1,"isOtpVerified":true,"role":"user","fullName":"Rakesh kr","email":"rakesh@ex.in","phone":"6201150218","countryCode":"+91","tokens":[{"_id":"60c9d0e360f6ca34375fc70f","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGM5Y2M4ODYwZjZjYTM0Mzc1ZmM3MGQiLCJyb2xlIjoidXNlciIsImlhdCI6MTYyMzgzODk0N30.uC1stOFdf8xxllFf8mIt5DbxKVZJODNim_BpxL9Up2s"}],"createdAt":"2021-06-16T10:03:52.343Z","updatedAt":"2021-07-06T07:52:47.554Z","__v":1,"otp":189944,"otpExpiryTime":"2021-06-16T10:31:27.651Z","otpSentTime":"2021-06-16T10:21:27.651Z","otpVerificationTime":"2021-06-16T10:22:27.428Z","languageSelected":"english","profilePic":"profile_pic/1623839261240pexels-andrea-piacquadio-935756.jpg","defaultSearchItems":{"assignmentArea":"60d3016e60f6ca34375fc722","serviceType":"60d3036260f6ca34375fc728","serviceName":"60d3062260f6ca34375fc734"}},"receiver":"60c9d6c360f6ca34375fc710","createdAt":"2021-06-16T10:49:53.225Z","updatedAt":"2021-06-16T10:49:53.225Z","__v":0}}],"createdAt":"2021-06-16T10:47:31.712Z","updatedAt":"2021-06-16T10:49:53.236Z","__v":1,"otpExpiryTime":"2021-06-16T10:58:28.761Z","otpSentTime":"2021-06-16T10:48:28.761Z","otpVerificationTime":"2021-06-16T10:49:19.509Z"},{"_id":"60d30a7660f6ca34375fc737","galleryImages":[],"verificationStatus":"verified","signUpStepCompleted":1,"role":"company","isOtpVerified":true,"companyName":"CompName","companyNumber":"orgname","serviceType":{"_id":"60d3036260f6ca34375fc728","isDeleted":false,"serviceTypeName":"Cleaning","createdAt":"2021-06-23T09:48:18.129Z","updatedAt":"2021-06-23T09:48:18.129Z","__v":0},"serviceNames":[{"_id":"60d30a7660f6ca34375fc738","name":{"_id":"60d306a560f6ca34375fc736","isDeleted":false,"serviceName":"Moving wash","type":"60d3036260f6ca34375fc728","createdAt":"2021-06-23T10:02:13.041Z","updatedAt":"2021-06-23T10:02:13.041Z","__v":0}},{"_id":"60d30a7660f6ca34375fc739","name":{"_id":"60d3062260f6ca34375fc734","isDeleted":false,"serviceName":"Cleaning services","type":"60d3036260f6ca34375fc728","createdAt":"2021-06-23T10:00:02.865Z","updatedAt":"2021-06-23T10:00:02.865Z","__v":0}}],"serviceAreas":[{"_id":"60d30a7660f6ca34375fc73a","area":{"_id":"60d301ac60f6ca34375fc725","isDeleted":false,"name":"Viken","createdAt":"2021-06-23T09:41:00.344Z","updatedAt":"2021-06-23T09:41:00.344Z","__v":0}},{"_id":"60d30a7660f6ca34375fc73b","area":{"_id":"60d3016e60f6ca34375fc722","isDeleted":false,"name":"Troms and Finnmark","createdAt":"2021-06-23T09:39:58.394Z","updatedAt":"2021-06-23T09:39:58.394Z","__v":0}},{"_id":"60d30a7660f6ca34375fc73c","area":{"_id":"60d3015d60f6ca34375fc721","isDeleted":false,"name":"Svalbard","createdAt":"2021-06-23T09:39:41.477Z","updatedAt":"2021-06-23T09:39:41.477Z","__v":0}}],"email":"testmail@yopmail.com","countryCode":"+91","phone":"9958136420","allReviews":[],"createdAt":"2021-06-23T10:18:30.712Z","updatedAt":"2021-07-07T04:54:35.013Z","__v":39,"otpExpiryTime":"2021-07-07T04:49:05.933Z","otpSentTime":"2021-07-07T04:39:05.933Z","otpVerificationTime":"2021-07-07T04:39:31.699Z","loginFailedAttempt":0}]}

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

    ).add(() => { this.isLoading = false; body.classList.remove('loader_active'); });

  }

  deleteAssignment(id){
   
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('loader_active');
    this.isLoading = true;
    this.authenticationService.deleteCustomerAssignment(id).subscribe((res) => {
      if (!res.isError) {

        console.log("response" + JSON.stringify(res));
      this.getAssignmentDataAfterDelete();
      



        // {"message":"Home page data retrieved successfully","isError":false,"totalItems":8,"companies":[{"_id":"60c9c317eee03c15321093d1","galleryImages":[],"verificationStatus":"verified","signUpStepCompleted":1,"role":"company","isOtpVerified":false,"companyName":"Monopoly","companyNumber":"123kj","serviceType":null,"serviceNames":[{"_id":"60c9c317eee03c15321093d2","name":null}],"serviceAreas":[{"_id":"60c9c317eee03c15321093d3","area":null}],"email":"monopoly@ex.in","countryCode":"91","phone":"1010101010","allReviews":[],"createdAt":"2021-06-16T09:23:35.198Z","updatedAt":"2021-06-16T09:30:46.293Z","__v":0},{"_id":"60c9d6c360f6ca34375fc710","galleryImages":[],"verificationStatus":"verified","signUpStepCompleted":1,"role":"company","isOtpVerified":true,"companyName":"Hjel","companyNumber":"hjlp123","serviceType":null,"serviceNames":[{"_id":"60c9d6c360f6ca34375fc711","name":null}],"serviceAreas":[{"_id":"60c9d6c360f6ca34375fc712","area":null}],"email":"hjel@ex.in","countryCode":"+91","phone":"6201150218","allReviews":[{"_id":"60c9d75160f6ca34375fc715","review":{"_id":"60c9d75160f6ca34375fc714","isDeleted":false,"text":"lorem ipsum","starCount":5,"author":{"_id":"60c9cc8860f6ca34375fc70d","status":"active","loginFailedAttempt":0,"isBlocked":false,"signUpStepCompleted":1,"isOtpVerified":true,"role":"user","fullName":"Rakesh kr","email":"rakesh@ex.in","phone":"6201150218","countryCode":"+91","tokens":[{"_id":"60c9d0e360f6ca34375fc70f","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGM5Y2M4ODYwZjZjYTM0Mzc1ZmM3MGQiLCJyb2xlIjoidXNlciIsImlhdCI6MTYyMzgzODk0N30.uC1stOFdf8xxllFf8mIt5DbxKVZJODNim_BpxL9Up2s"}],"createdAt":"2021-06-16T10:03:52.343Z","updatedAt":"2021-07-06T07:52:47.554Z","__v":1,"otp":189944,"otpExpiryTime":"2021-06-16T10:31:27.651Z","otpSentTime":"2021-06-16T10:21:27.651Z","otpVerificationTime":"2021-06-16T10:22:27.428Z","languageSelected":"english","profilePic":"profile_pic/1623839261240pexels-andrea-piacquadio-935756.jpg","defaultSearchItems":{"assignmentArea":"60d3016e60f6ca34375fc722","serviceType":"60d3036260f6ca34375fc728","serviceName":"60d3062260f6ca34375fc734"}},"receiver":"60c9d6c360f6ca34375fc710","createdAt":"2021-06-16T10:49:53.225Z","updatedAt":"2021-06-16T10:49:53.225Z","__v":0}}],"createdAt":"2021-06-16T10:47:31.712Z","updatedAt":"2021-06-16T10:49:53.236Z","__v":1,"otpExpiryTime":"2021-06-16T10:58:28.761Z","otpSentTime":"2021-06-16T10:48:28.761Z","otpVerificationTime":"2021-06-16T10:49:19.509Z"},{"_id":"60d30a7660f6ca34375fc737","galleryImages":[],"verificationStatus":"verified","signUpStepCompleted":1,"role":"company","isOtpVerified":true,"companyName":"CompName","companyNumber":"orgname","serviceType":{"_id":"60d3036260f6ca34375fc728","isDeleted":false,"serviceTypeName":"Cleaning","createdAt":"2021-06-23T09:48:18.129Z","updatedAt":"2021-06-23T09:48:18.129Z","__v":0},"serviceNames":[{"_id":"60d30a7660f6ca34375fc738","name":{"_id":"60d306a560f6ca34375fc736","isDeleted":false,"serviceName":"Moving wash","type":"60d3036260f6ca34375fc728","createdAt":"2021-06-23T10:02:13.041Z","updatedAt":"2021-06-23T10:02:13.041Z","__v":0}},{"_id":"60d30a7660f6ca34375fc739","name":{"_id":"60d3062260f6ca34375fc734","isDeleted":false,"serviceName":"Cleaning services","type":"60d3036260f6ca34375fc728","createdAt":"2021-06-23T10:00:02.865Z","updatedAt":"2021-06-23T10:00:02.865Z","__v":0}}],"serviceAreas":[{"_id":"60d30a7660f6ca34375fc73a","area":{"_id":"60d301ac60f6ca34375fc725","isDeleted":false,"name":"Viken","createdAt":"2021-06-23T09:41:00.344Z","updatedAt":"2021-06-23T09:41:00.344Z","__v":0}},{"_id":"60d30a7660f6ca34375fc73b","area":{"_id":"60d3016e60f6ca34375fc722","isDeleted":false,"name":"Troms and Finnmark","createdAt":"2021-06-23T09:39:58.394Z","updatedAt":"2021-06-23T09:39:58.394Z","__v":0}},{"_id":"60d30a7660f6ca34375fc73c","area":{"_id":"60d3015d60f6ca34375fc721","isDeleted":false,"name":"Svalbard","createdAt":"2021-06-23T09:39:41.477Z","updatedAt":"2021-06-23T09:39:41.477Z","__v":0}}],"email":"testmail@yopmail.com","countryCode":"+91","phone":"9958136420","allReviews":[],"createdAt":"2021-06-23T10:18:30.712Z","updatedAt":"2021-07-07T04:54:35.013Z","__v":39,"otpExpiryTime":"2021-07-07T04:49:05.933Z","otpSentTime":"2021-07-07T04:39:05.933Z","otpVerificationTime":"2021-07-07T04:39:31.699Z","loginFailedAttempt":0}]}

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

    ).add(() => { this.isLoading = false; body.classList.remove('loader_active'); });

  }

  getAssignmentDataAfterDelete() {
    this.p=1;
    this.showcarsuel=false;
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('loader_active');
    this.isLoading = true;
    this.authenticationService.getCustomerAssignmentData( this.p, this.itemsPerPage).subscribe((res) => {
      if (!res.isError) {

        console.log("response" + JSON.stringify(res));
        this.totalItems = res.totalItems;
        this.postData = res.assignments;
        setTimeout(() => {
          this.showcarsuel=true;
        }, 1000);



        // {"message":"Home page data retrieved successfully","isError":false,"totalItems":8,"companies":[{"_id":"60c9c317eee03c15321093d1","galleryImages":[],"verificationStatus":"verified","signUpStepCompleted":1,"role":"company","isOtpVerified":false,"companyName":"Monopoly","companyNumber":"123kj","serviceType":null,"serviceNames":[{"_id":"60c9c317eee03c15321093d2","name":null}],"serviceAreas":[{"_id":"60c9c317eee03c15321093d3","area":null}],"email":"monopoly@ex.in","countryCode":"91","phone":"1010101010","allReviews":[],"createdAt":"2021-06-16T09:23:35.198Z","updatedAt":"2021-06-16T09:30:46.293Z","__v":0},{"_id":"60c9d6c360f6ca34375fc710","galleryImages":[],"verificationStatus":"verified","signUpStepCompleted":1,"role":"company","isOtpVerified":true,"companyName":"Hjel","companyNumber":"hjlp123","serviceType":null,"serviceNames":[{"_id":"60c9d6c360f6ca34375fc711","name":null}],"serviceAreas":[{"_id":"60c9d6c360f6ca34375fc712","area":null}],"email":"hjel@ex.in","countryCode":"+91","phone":"6201150218","allReviews":[{"_id":"60c9d75160f6ca34375fc715","review":{"_id":"60c9d75160f6ca34375fc714","isDeleted":false,"text":"lorem ipsum","starCount":5,"author":{"_id":"60c9cc8860f6ca34375fc70d","status":"active","loginFailedAttempt":0,"isBlocked":false,"signUpStepCompleted":1,"isOtpVerified":true,"role":"user","fullName":"Rakesh kr","email":"rakesh@ex.in","phone":"6201150218","countryCode":"+91","tokens":[{"_id":"60c9d0e360f6ca34375fc70f","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGM5Y2M4ODYwZjZjYTM0Mzc1ZmM3MGQiLCJyb2xlIjoidXNlciIsImlhdCI6MTYyMzgzODk0N30.uC1stOFdf8xxllFf8mIt5DbxKVZJODNim_BpxL9Up2s"}],"createdAt":"2021-06-16T10:03:52.343Z","updatedAt":"2021-07-06T07:52:47.554Z","__v":1,"otp":189944,"otpExpiryTime":"2021-06-16T10:31:27.651Z","otpSentTime":"2021-06-16T10:21:27.651Z","otpVerificationTime":"2021-06-16T10:22:27.428Z","languageSelected":"english","profilePic":"profile_pic/1623839261240pexels-andrea-piacquadio-935756.jpg","defaultSearchItems":{"assignmentArea":"60d3016e60f6ca34375fc722","serviceType":"60d3036260f6ca34375fc728","serviceName":"60d3062260f6ca34375fc734"}},"receiver":"60c9d6c360f6ca34375fc710","createdAt":"2021-06-16T10:49:53.225Z","updatedAt":"2021-06-16T10:49:53.225Z","__v":0}}],"createdAt":"2021-06-16T10:47:31.712Z","updatedAt":"2021-06-16T10:49:53.236Z","__v":1,"otpExpiryTime":"2021-06-16T10:58:28.761Z","otpSentTime":"2021-06-16T10:48:28.761Z","otpVerificationTime":"2021-06-16T10:49:19.509Z"},{"_id":"60d30a7660f6ca34375fc737","galleryImages":[],"verificationStatus":"verified","signUpStepCompleted":1,"role":"company","isOtpVerified":true,"companyName":"CompName","companyNumber":"orgname","serviceType":{"_id":"60d3036260f6ca34375fc728","isDeleted":false,"serviceTypeName":"Cleaning","createdAt":"2021-06-23T09:48:18.129Z","updatedAt":"2021-06-23T09:48:18.129Z","__v":0},"serviceNames":[{"_id":"60d30a7660f6ca34375fc738","name":{"_id":"60d306a560f6ca34375fc736","isDeleted":false,"serviceName":"Moving wash","type":"60d3036260f6ca34375fc728","createdAt":"2021-06-23T10:02:13.041Z","updatedAt":"2021-06-23T10:02:13.041Z","__v":0}},{"_id":"60d30a7660f6ca34375fc739","name":{"_id":"60d3062260f6ca34375fc734","isDeleted":false,"serviceName":"Cleaning services","type":"60d3036260f6ca34375fc728","createdAt":"2021-06-23T10:00:02.865Z","updatedAt":"2021-06-23T10:00:02.865Z","__v":0}}],"serviceAreas":[{"_id":"60d30a7660f6ca34375fc73a","area":{"_id":"60d301ac60f6ca34375fc725","isDeleted":false,"name":"Viken","createdAt":"2021-06-23T09:41:00.344Z","updatedAt":"2021-06-23T09:41:00.344Z","__v":0}},{"_id":"60d30a7660f6ca34375fc73b","area":{"_id":"60d3016e60f6ca34375fc722","isDeleted":false,"name":"Troms and Finnmark","createdAt":"2021-06-23T09:39:58.394Z","updatedAt":"2021-06-23T09:39:58.394Z","__v":0}},{"_id":"60d30a7660f6ca34375fc73c","area":{"_id":"60d3015d60f6ca34375fc721","isDeleted":false,"name":"Svalbard","createdAt":"2021-06-23T09:39:41.477Z","updatedAt":"2021-06-23T09:39:41.477Z","__v":0}}],"email":"testmail@yopmail.com","countryCode":"+91","phone":"9958136420","allReviews":[],"createdAt":"2021-06-23T10:18:30.712Z","updatedAt":"2021-07-07T04:54:35.013Z","__v":39,"otpExpiryTime":"2021-07-07T04:49:05.933Z","otpSentTime":"2021-07-07T04:39:05.933Z","otpVerificationTime":"2021-07-07T04:39:31.699Z","loginFailedAttempt":0}]}

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

    ).add(() => { this.isLoading = false; body.classList.remove('loader_active'); });

  }

  editassignment(id){
    this.router.navigate(["customers/editassignmentcustomer"], { queryParams: { 'idassign': id}});
  }

}
