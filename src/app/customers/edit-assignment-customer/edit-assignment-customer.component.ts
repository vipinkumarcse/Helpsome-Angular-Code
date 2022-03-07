import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { StarRatingComponent } from 'ng-starrating';
import { Subject } from 'rxjs';
import { ApilistService } from 'src/app/services/api/apilist.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { SocketService } from 'src/app/socket/socket.service';

declare var $: any;
export interface Bank {
  CountryId: string;
  PhoneCode: string;
}
@Component({
  selector: 'app-edit-assignment-customer',
  templateUrl: './edit-assignment-customer.component.html',
  styleUrls: ['./edit-assignment-customer.component.scss']
})
export class EditAssignmentCustomerComponent implements OnInit {

  fullname;
  @ViewChild('singleSelect', { static: false }) singleSelect: MatSelect;
  Bank = [];
  Bankcust1 = [];
  Bankcust2 = [];
  signupForm: FormGroup;
  Selected_countrycode = "+47";

  protected banks: Bank[]
  public bankCtrl: FormControl = new FormControl();
  public bankFilterCtrl: FormControl = new FormControl();
  public filteredBanks = [];
  protected _onDestroy = new Subject<void>();

  Selected_countrycodecust1 = "+47";

  protected bankscust1: Bank[]
  public bankCtrlcust1: FormControl = new FormControl();
  public bankFilterCtrlcust1: FormControl = new FormControl();
  public filteredBankscust1 = [];
  protected _onDestroycust1 = new Subject<void>();

  Selected_countrycodecust2 = "+47";

  protected bankscust2: Bank[]
  public bankCtrlcust2: FormControl = new FormControl();
  public bankFilterCtrlcust2: FormControl = new FormControl();
  public filteredBankscust2 = [];
  protected _onDestroycust2 = new Subject<void>();
  images = [];
  headline;
  description;






  ServicesData;
  ServiceTypeListData: any[] = [];
  keylock;

  orgNUmData;
  CompanyNameData;
  IndustryData;
  SelectedServiceType;
  SelectedServiceListData: any[] = [];
  EmailEntered;
  phoneEntered;
  EmailEnteredcust1;
  phoneEnteredcust1;
  phoneEnteredcust2;
  countrycodeEntered;
  selectedServiceName: any[] = [];
  selectedServicesNamefilter: any[] = [];
  areaArray: any[] = [];
  areaArrayFilter: any[] = [];
  areaIDs: any[] = [];
  AlertText: string;
  submitSignupCompany: boolean = false;
  submitSignupCustomer: boolean = false;
  isLoading: boolean = false;

  nextScreen = false;
  baseImgUrlCust="https://api-dev.hjelpsom.app/static/";

  baseImgUrl = "https://api-dev.hjelpsom.app/static/company_files/";

  baseImgUrlAssignment="https://api-dev.hjelpsom.app/static/assignment_images/"
  step = 1;
  file2:string [] = [];
  showcarsuel: boolean;
  slideConfig = { slidesToShow: 1, autoplay: true, slidesToScroll: 1, dots: true };
  slideConfig2 = {
    "slidesToShow": 2, "slidesToScroll": 2, "autoplay": true, "autoplay-speed": 3000, "dots": true
  };
  categoryselected: any;

  assignmentCreated:any;
  assignmentArea;
  assignmentService;

  companylist:any[]=[];
  assignmentId;

  companyIds:any[]=[];
  companyArrayfilters:any[]=[];
  companyProfile: any;

  idassign;

  assignmentDetails;

  selectedservicename;
  selectedservicearea;
  uploadedImages: any;
  selectedNameField: any;
  selectedAreaField: any;
  locationselected: any;
  messageUnseenVal=0;

  constructor(public socketService: SocketService,private http: HttpClient, private fb: FormBuilder, public apiList: ApilistService, private authenticationService: AuthenticationService, private router: Router,private _route : ActivatedRoute) {
    this.socketService.messageUnseen.subscribe((data)=>{
      console.log("message unread count"+JSON.stringify(data));
      this.messageUnseenVal=data.totalUnSeenCount;
          })
   }

  ngOnInit(): void {
    this._route.queryParams.subscribe(params => { this.idassign = params['idassign'] });




    this.step = 1;
    //   $(document).ready(function(){
    //     $("#show").click(function(){
    //       $(".add_assign_show2").show();
    //     });

    //     $("#show").click(function(){
    //       $(".add_assign_show").hide();
    //     });

    //     $("#back_assign2").click(function(){
    //       $(".add_assign_show").show();
    //     });

    //     $("#back_assign2").click(function(){
    //       $(".add_assign_show2").hide();
    //     });


    //     $("#show2").click(function(){
    //       $(".add_assign_show3").show();
    //     });

    //     $("#show2").click(function(){
    //       $(".add_assign_show2").hide();
    //     });

    //     $("#back_assign3").click(function(){
    //       $(".add_assign_show2").show();
    //     });

    //     $("#back_assign3").click(function(){
    //       $(".add_assign_show3").hide();
    //     });


    //     $("#show3").click(function(){
    //       $(".add_assign_show4").show();
    //     });

    //     $("#show3").click(function(){
    //       $(".add_assign_show3").hide();
    //     });

    //     $("#back_assign4").click(function(){
    //       $(".add_assign_show3").show();
    //     });

    //     $("#back_assign4").click(function(){
    //       $(".add_assign_show4").hide();
    //     });



    //     $("#show4").click(function(){
    //       $(".add_assign_show5").show();
    //     });

    //     $("#show4").click(function(){
    //       $(".add_assign_show4").hide();
    //     });

    //     $("#back_assign5").click(function(){
    //       $(".add_assign_show4").show();
    //     });

    //     $("#back_assign5").click(function(){
    //       $(".add_assign_show5").hide();
    //     });

    //   });

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
    this.nextScreen = false;
    this.isLoading = false;
    this.keylock = 0


    this.HidePopups();
    this.getContentJSON();
    this.getAllAreaData();
    // this.createForm();
    this.GetAllServiceType();
    setTimeout(()=>{
      this.getAssignDetails();
    },1600);
 
  }
  getAssignDetails() {

    this.uploadedImages=[];
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('loader_active');
    this.isLoading = true;
    this.authenticationService.getAssignmentDetails(this.idassign).subscribe(res => {
      console.log("service data" + JSON.stringify(res));
      this.assignmentDetails = res.assignment;
      this.headline=this.assignmentDetails.headline;
      this.description=this.assignmentDetails.description;
      this.IndustryData=this.assignmentDetails.serviceType._id;
      this.getServiceListById(this.IndustryData);
      setTimeout(()=>{
        this.selectedservicename=this.assignmentDetails.serviceName;
        this.onPermissionCheckChangedinit(true,this.selectedservicename);
        this.selectedservicearea=this.assignmentDetails.assignmentArea._id;
        this.onPermissionCheckChangedAreainit(true,this.selectedservicearea);
      },1500);
     



      if(this.assignmentDetails.medias){
        if(this.assignmentDetails.medias.length>0){
        //  this.uploadedImages=this.companyProfile.medias;

          this.assignmentDetails.medias.forEach(element => {
            this.uploadedImages.push(element.media);
          });
        //   this.companyProfile.galleryImages.forEach(element => {
        //   this.uploadedImages.push(element);
        // });
        }
        console.log("uploaded iamges");
        console.log(this.uploadedImages);
        
      }
              
              
      
              
      
      
      
            
              setTimeout(() => {
                this.showcarsuel = true;
              }, 1000);
         

    //  {"message":"Assignment retrieved successfully","isError":false,"assignment":{"status":"pending","isActive":true,"isDeleted":false,"_id":"60f67d2c58b845241b7567a1","headline":"ok","description":"kk","assignmentArea":{"isDeleted":false,"_id":"60d301ac60f6ca34375fc725","name":"Viken","createdAt":"2021-06-23T09:41:00.344Z","updatedAt":"2021-06-23T09:41:00.344Z","__v":0},"serviceType":{"isDeleted":false,"_id":"60d3036260f6ca34375fc728","serviceTypeName":"Cleaning","createdAt":"2021-06-23T09:48:18.129Z","updatedAt":"2021-06-23T09:48:18.129Z","__v":0},"serviceName":{"isDeleted":false,"_id":"60d3068760f6ca34375fc735","serviceName":"Facade washing","type":"60d3036260f6ca34375fc728","createdAt":"2021-06-23T10:01:43.795Z","updatedAt":"2021-06-23T10:01:43.795Z","__v":0},"assignBy":{"defaultSearchItems":{"assignmentArea":"60d301ac60f6ca34375fc725","serviceType":"60d3036260f6ca34375fc728","serviceName":"60d306a560f6ca34375fc736"},"status":"active","loginFailedAttempt":0,"isBlocked":false,"signUpStepCompleted":1,"role":"user","_id":"60c9bbf9eee03c15321093cd","fullName":"User One","email":"userone@yopmail.com","phone":"9958136420","countryCode":"+91","createdAt":"2021-06-16T08:53:13.636Z","updatedAt":"2021-07-23T04:39:26.944Z","__v":56,"profilePic":"profile_pic/1626862471487noimageavailable.png"},"serialNo":"11","medias":[{"_id":"60f67d2c58b845241b7567a2","media":"1626766631753hubstaff16july2021.png","mediaType":"image"},{"_id":"60f67d2c58b845241b7567a3","media":"1626766634998hubstaff13july.png","mediaType":"image"}],"companyList":[{"_id":"60f67d3358b845241b7567a5","actionType":"interested","company":"60e525cc22d4a71ee895a981"}],"createdAt":"2021-07-20T07:37:16.331Z","updatedAt":"2021-07-20T07:37:23.709Z","__v":0}}

    }).add(() => { this.isLoading = false; body.classList.remove('loader_active'); });

  }
  onRate($event: { oldValue: number, newValue: number, starRating: StarRatingComponent }) {
    // alert(`Old Value:${$event.oldValue}, 
    //   New Value: ${$event.newValue}, 
    //   Checked Color: ${$event.starRating.checkedcolor}, 
    //   Unchecked Color: ${$event.starRating.uncheckedcolor}`);
  }
  slickInit(e) {
    console.log('slick initialized');
  }
  HidePopups() {
    $('#exampleModalCenter_signup').modal('hide');
    $('#exampleModalCenter_signup_cust').modal('hide');
    $('#exampleModalCenter_share_post').modal('hide');



    $("#alert_div").hide();
  }
  GetAllServiceType() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('loader_active');
    this.isLoading = true;
    this.authenticationService.getServiceType().subscribe(res => {
      console.log("service data" + JSON.stringify(res));
      this.ServicesData = res.serviceTypes;

    }).add(() => { this.isLoading = false; body.classList.remove('loader_active'); });

  }
  getServiceListById(id) {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('loader_active');
    this.isLoading = true;
    this.IndustryData = id;
    var catselected = this.ServicesData.filter((element) => element._id == id)[0];
    this.categoryselected = catselected.serviceTypeName;
    console.log("this.categoryselected" + this.categoryselected);
    this.authenticationService.getServiceListById(id).subscribe(res => {
      console.log("service data list by id" + JSON.stringify(res));
      this.SelectedServiceListData = res.services;
      this.SelectedServiceListData.forEach(element => {
        element.State = false;
      });

    }).add(() => { this.isLoading = false; body.classList.remove('loader_active'); });
  }
  onPermissionCheckChanged(event, eventid) {
    var eventid;

    // this.SelectedServiceListData.forEach(element => {
    //   element.State = false;
    // });

    console.log("event check" + event.checked);
    var indexEvent = this.SelectedServiceListData.filter(ij => ij._id == eventid)[0];
    if (indexEvent !== undefined) {
      var index22 = this.SelectedServiceListData.indexOf(indexEvent);
      this.SelectedServiceListData[index22].State = event.checked;
    }

    console.log("selectedservice" + JSON.stringify(this.SelectedServiceListData));



  }

  onPermissionCheckChangedinit(event, eventid) {
   // var eventid;
  //  console.log("eventidnames"+eventid);
  //  console.log("selectedservice1" + JSON.stringify(this.SelectedServiceListData));

  //   // this.SelectedServiceListData.forEach(element => {
  //   //   element.State = false;
  //   // });

  //   console.log("selectedservice2" + JSON.stringify(this.SelectedServiceListData));

  //  // console.log("event check" + event.checked);
  //   var indexEvent = this.SelectedServiceListData.filter(ij => ij._id == eventid)[0];
  //   if (indexEvent !== undefined) {
  //     var index22 = this.SelectedServiceListData.indexOf(indexEvent);
  //     this.SelectedServiceListData[index22].State = true;
  //   }

  //   console.log("selectedservice" + JSON.stringify(this.SelectedServiceListData));
  if(eventid){
    if(eventid.length>0){
      eventid.forEach(elementselected => {
  this.SelectedServiceListData.forEach(elementAll => {
    if(elementAll._id==elementselected._id){
      elementAll.State=true
    }
  });
        
        
      });
    }
  }


  }



  onPermissionCheckChangedArea(event, eventid) {
    var eventid;

    this.areaArray.forEach(element => {
      element.State = false;
    });
    var locselected = this.areaArray.filter(ij => ij._id == eventid)[0];
    this.locationselected=locselected.name;
    console.log("event check" + event.checked);
    var indexEvent = this.areaArray.filter(ij => ij._id == eventid)[0];
    if (indexEvent !== undefined) {
      var index22 = this.areaArray.indexOf(indexEvent);
      this.areaArray[index22].State = event.checked;
    }

    console.log("selectedservice" + JSON.stringify(this.areaArray));



  }

  onPermissionCheckChangedAreainit(event, eventid) {
    //var eventid;

    console.log("eventidArea"+eventid);

    this.areaArray.forEach(element => {
      element.State = false;
    });

   // console.log("event check" + event.checked);

   var locselected = this.areaArray.filter(ij => ij._id == eventid)[0];
   this.locationselected=locselected.name;
    var indexEvent = this.areaArray.filter(ij => ij._id == eventid)[0];
    if (indexEvent !== undefined) {
      var index22 = this.areaArray.indexOf(indexEvent);
      this.areaArray[index22].State = true;
    }

    console.log("selectedservice" + JSON.stringify(this.areaArray));



  }




  getAllAreaData() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('loader_active');
    this.isLoading = true;
    this.authenticationService.getAllArea().subscribe(res => {
     
      this.areaArray = res.areas;
      this.areaArray.forEach(element => {
        element.State = false;
      });
      console.log("Area data" + JSON.stringify(res));
    }).add(() => { this.isLoading = false; body.classList.remove('loader_active'); });
  }
  getContentJSON() {
    this.http.get('./assets/files/countries.json').subscribe((res: any) => {
      this.Bank = res.List_Countries;

      this.filteredBanks = this.Bank;


      this.Bankcust1 = res.List_Countries;

      this.filteredBankscust1 = this.Bankcust1;

      this.Bankcust2 = res.List_Countries;

      this.filteredBankscust2 = this.Bankcust2;
      // console.log(this.bankFilterCtrl);
    })
  }

  increementStep() {
    this.step = this.step + 1;
    console.log("inc  step" + this.step);

  }

  decreementStep() {
    this.step = this.step - 1;
    console.log("dec  step" + this.step);
  }

  onFileChange(event) {
    this.showcarsuel = false;
    // this.images = [];
    // this.file2 = event.target.files;
    //console.log(this.file2);
   // console.log(Object.keys(this.file2));
    if (event.target.files && event.target.files[0]) {
      for (var i = 0; i < event.target.files.length; i++) { 
        this.file2.push(event.target.files[i]);
    }
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();

        reader.onload = (event: any) => {
          console.log(event.target.result);
          this.images.push(event.target.result);


        }

        reader.readAsDataURL(event.target.files[i]);
      }
    }

    setTimeout(() => {
      this.showcarsuel = true;
    }, 1000);

  }

  checkstep2() {
    var arraynames = this.SelectedServiceListData.filter(i => i.State == true);
    if (arraynames) {
      if (arraynames.length > 0) {
        this.increementStep();
        document.getElementById("step3content").scrollTop = 0;
      }
      else {
        this.authenticationService.openSnackBar("Please select service name first", 'Done', '5000','red-snackbar' ,'end','center'
);
      }
    }
    else {
      this.authenticationService.openSnackBar("Please select service name first", 'Done', '5000','red-snackbar' ,'end','center'
);
    }
  }

  checkstep3() {
    var arraynames = this.areaArray.filter(i => i.State == true);
    if (arraynames) {
      if (arraynames.length > 0) {
        var selectedServiceName = this.SelectedServiceListData.filter(i => i.State == true)[0];
        

        this.selectedNameField=selectedServiceName.serviceName;

       var areaIDs = this.areaArray.filter(i => i.State == true)[0];

       this.selectedAreaField=areaIDs.name;
        this.increementStep();
        document.getElementById("step4content").scrollTop = 0;
      }
      else {
        this.authenticationService.openSnackBar("Please select service area first", 'Done', '5000','red-snackbar' ,'end','center'
);
      }
    }
    else {
      this.authenticationService.openSnackBar("Please select service area first", 'Done', '5000','red-snackbar' ,'end','center'
);
    }
  }

  publishData() {

    const body = document.getElementsByTagName('body')[0];
    body.classList.add('loader_active');
    this.isLoading = true;
    this.submitSignupCompany = true;
    this.selectedServicesNamefilter = [];
    this.selectedServiceName = this.SelectedServiceListData.filter(i => i.State == true);
    this.selectedServiceName.forEach(element => {
      this.selectedServicesNamefilter.push(element._id);

    });

    this.areaArrayFilter = [];
    this.areaIDs = this.areaArray.filter(i => i.State == true);
    this.areaIDs.forEach(element => {
      this.areaArrayFilter.push(element._id);

    });


    let formData = new FormData();




    formData.append('headline', this.headline);
    formData.append('description', this.description);
    formData.append('serviceType', this.IndustryData);
    formData.append('serviceName', this.selectedServicesNamefilter.toString());
    formData.append('assignmentArea', this.areaArrayFilter.toString());

    if (this.file2) {
      for (var i = 0; i < this.file2.length; i++) { 
        formData.append("medias", this.file2[i]);
      }
      // for (const key of Object.keys(this.file2)) {
      //   formData.append('medias', this.file2[key]);
      // }


    }

    formData.append('updatedMedias',this.uploadedImages.toString());


    this.authenticationService.updateAssignment(formData,this.idassign).subscribe((res) => {
      if (!res.isError) {
        console.log("inside success" + JSON.stringify(res));
// this.assignmentCreated=res.assignment;

// this.assignmentArea=this.assignmentCreated.assignmentArea;
// this.assignmentService=this.assignmentCreated.serviceName;
// this.assignmentId=this.assignmentCreated._id;

//this.getCompanyList(this.assignmentArea,this.assignmentService);

        //{"message":"Assignment created successfully","assignment":{"status":"pending","isActive":true,"isDeleted":false,"_id":"60f542061ef01c02efb64966","headline":"hh","description":"ok","assignmentArea":"60d301ac60f6ca34375fc725","serviceType":"60d3036260f6ca34375fc728","serviceName":"60d306a560f6ca34375fc736","assignBy":"60c9bbf9eee03c15321093cd","serialNo":"6","medias":[],"companyList":[],"createdAt":"2021-07-19T09:12:38.385Z","updatedAt":"2021-07-19T09:12:38.385Z","__v":0},"isError":false}
        // $('#exampleModalCenter_signup').modal('show');

        // $('#exampleModalCenter_signup').modal({
        //   backdrop: 'static',
        //   keyboard: false,
        //   show: true
        // });
        this.authenticationService.openSnackBar(res.message, 'Done', '5000','blue-snackbar' ,'end','center'
);
  this.router.navigate(["customers/uploadassignmentcustomer"])
  
        //      this.increementStep();


      }
      else {


        this.authenticationService.openSnackBar("Error while creating", 'Done', '5000','red-snackbar' ,'end','center'
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

  removeImage(image){
    this.uploadedImages.splice(this.uploadedImages.findIndex(i => i == image), 1);
  
    console.log("images after delete");
    console.log(this.uploadedImages);
    
    
  }

  getCompanyList(area,serviceid){

    const body = document.getElementsByTagName('body')[0];
    body.classList.add('loader_active');
    this.isLoading = true;
    
   
    this.authenticationService.getCompanylistAssignment(area,serviceid).subscribe(res => {
      console.log("company data list by id" + JSON.stringify(res));
      this.companylist=res.companies;
      this.companylist.forEach(element => {
        element.State=false;
      });

      // {"message":"Company list retrieved sucessfully","isError":false,"companies":[{"loginFailedAttempt":0,"averageRating":3.6,"galleryImages":["1626166399419hubstaff6jul.png","1626167702249hubstaff12jul.png","1626167795023hubstaff12jul.png"],"verificationStatus":"verified","signUpStepCompleted":1,"role":"company","_id":"60d30a7660f6ca34375fc737","companyName":"CompName","companyNumber":"233455669","serviceType":{"isDeleted":false,"_id":"60d3036260f6ca34375fc728","serviceTypeName":"Cleaning","createdAt":"2021-06-23T09:48:18.129Z","updatedAt":"2021-06-23T09:48:18.129Z","__v":0},"serviceNames":[{"_id":"60f16c78c89a147af83201e2","name":{"isDeleted":false,"_id":"60d306a560f6ca34375fc736","serviceName":"Moving wash","type":"60d3036260f6ca34375fc728","createdAt":"2021-06-23T10:02:13.041Z","updatedAt":"2021-06-23T10:02:13.041Z","__v":0}},{"_id":"60f16c78c89a147af83201e3","name":{"isDeleted":false,"_id":"60d3062260f6ca34375fc734","serviceName":"Cleaning services","type":"60d3036260f6ca34375fc728","createdAt":"2021-06-23T10:00:02.865Z","updatedAt":"2021-06-23T10:00:02.865Z","__v":0}}],"serviceAreas":[{"_id":"60f16c78c89a147af83201dc","area":{"isDeleted":false,"_id":"60d301ac60f6ca34375fc725","name":"Viken","createdAt":"2021-06-23T09:41:00.344Z","updatedAt":"2021-06-23T09:41:00.344Z","__v":0}},{"_id":"60f16c78c89a147af83201dd","area":{"isDeleted":false,"_id":"60d3019e60f6ca34375fc724","name":"Vestland","createdAt":"2021-06-23T09:40:46.774Z","updatedAt":"2021-06-23T09:40:46.774Z","__v":0}},{"_id":"60f16c78c89a147af83201de","area":{"isDeleted":false,"_id":"60d3018060f6ca34375fc723","name":"Trøndelag","createdAt":"2021-06-23T09:40:16.600Z","updatedAt":"2021-06-23T09:40:16.600Z","__v":0}},{"_id":"60f16c78c89a147af83201df","area":{"isDeleted":false,"_id":"60d3016e60f6ca34375fc722","name":"Troms and Finnmark","createdAt":"2021-06-23T09:39:58.394Z","updatedAt":"2021-06-23T09:39:58.394Z","__v":0}},{"_id":"60f16c78c89a147af83201e0","area":{"isDeleted":false,"_id":"60d3015d60f6ca34375fc721","name":"Svalbard","createdAt":"2021-06-23T09:39:41.477Z","updatedAt":"2021-06-23T09:39:41.477Z","__v":0}},{"_id":"60f16c78c89a147af83201e1","area":{"isDeleted":false,"_id":"60d3014a60f6ca34375fc720","name":"Rogaland","createdAt":"2021-06-23T09:39:22.048Z","updatedAt":"2021-06-23T09:39:22.048Z","__v":0}}],"email":"testmail@yopmail.com","countryCode":"+91","phone":"9958136420","allReviews":[{"_id":"60e6932b6bd3685d5ee85c32","review":{"isDeleted":false,"_id":"60e6932b6bd3685d5ee85c31","text":"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi occaecati","starCount":3.5,"author":{"defaultSearchItems":{"assignmentArea":"60d3010960f6ca34375fc71e","serviceType":"60d302b760f6ca34375fc726","serviceName":"60d3042b60f6ca34375fc72a"},"status":"active","loginFailedAttempt":0,"isBlocked":false,"signUpStepCompleted":1,"role":"user","_id":"60e2d7b79872e305b7ffcd13","fullName":"Seema Arora","email":"seema@parastechnologies.com","phone":"9729636748","countryCode":"+91","createdAt":"2021-07-05T09:58:15.580Z","updatedAt":"2021-07-06T04:23:13.561Z","__v":3},"receiver":"60d30a7660f6ca34375fc737","createdAt":"2021-07-08T05:54:51.800Z","updatedAt":"2021-07-08T05:54:51.800Z","__v":0}},{"_id":"60e693726bd3685d5ee85c35","review":{"isDeleted":false,"_id":"60e693726bd3685d5ee85c34","text":"quas molestias excepturi occaecati","starCount":4,"author":{"defaultSearchItems":{"assignmentArea":"60d3015d60f6ca34375fc721","serviceType":"60d3036260f6ca34375fc728","serviceName":"60d3062260f6ca34375fc734"},"status":"active","loginFailedAttempt":0,"isBlocked":false,"signUpStepCompleted":1,"role":"user","_id":"60daabcfb8841b2a124c4bdc","email":"testmailcust@yopmail.com","phone":"9796280332","countryCode":"+91","createdAt":"2021-06-29T05:12:47.655Z","updatedAt":"2021-07-02T07:28:04.089Z","__v":6},"receiver":"60d30a7660f6ca34375fc737","createdAt":"2021-07-08T05:56:02.875Z","updatedAt":"2021-07-08T05:56:02.875Z","__v":0}},{"_id":"60e694516bd3685d5ee85c37","review":{"isDeleted":false,"_id":"60e694516bd3685d5ee85c36","text":"Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placea","starCount":5,"author":{"status":"active","loginFailedAttempt":0,"isBlocked":true,"signUpStepCompleted":1,"role":"user","_id":"60c9cec360f6ca34375fc70e","fullName":"Rahul K","email":"rahu@yopmail.com","phone":"7217766000","countryCode":"+91","createdAt":"2021-06-16T10:13:23.972Z","updatedAt":"2021-07-09T12:09:34.690Z","__v":3},"receiver":"60d30a7660f6ca34375fc737","createdAt":"2021-07-08T05:59:45.310Z","updatedAt":"2021-07-08T05:59:45.310Z","__v":0}},{"_id":"60e694946bd3685d5ee85c39","review":{"isDeleted":false,"_id":"60e694946bd3685d5ee85c38","text":"officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur","starCount":2.5,"author":{"defaultSearchItems":{"assignmentArea":"60d3016e60f6ca34375fc722","serviceType":"60d3036260f6ca34375fc728","serviceName":"60d3062260f6ca34375fc734"},"status":"active","loginFailedAttempt":0,"isBlocked":false,"signUpStepCompleted":1,"role":"user","_id":"60c9cc8860f6ca34375fc70d","fullName":"Rakesh kr","email":"rakesh@ex.in","phone":"6201150218","countryCode":"+91","createdAt":"2021-06-16T10:03:52.343Z","updatedAt":"2021-07-06T07:52:47.554Z","__v":1,"languageSelected":"english","profilePic":"profile_pic/1623839261240pexels-andrea-piacquadio-935756.jpg"},"receiver":"60d30a7660f6ca34375fc737","createdAt":"2021-07-08T06:00:52.542Z","updatedAt":"2021-07-08T06:00:52.542Z","__v":0}},{"_id":"60e6992a0022bb5edb54e010","review":{"isDeleted":false,"_id":"60e6992a0022bb5edb54e00f","text":"rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus","starCount":3,"author":{"defaultSearchItems":{"assignmentArea":"60d3010960f6ca34375fc71e","serviceType":"60d302b760f6ca34375fc726","serviceName":"60d3042b60f6ca34375fc72a"},"status":"active","loginFailedAttempt":0,"isBlocked":false,"signUpStepCompleted":1,"role":"user","_id":"60e2d7b79872e305b7ffcd13","fullName":"Seema Arora","email":"seema@parastechnologies.com","phone":"9729636748","countryCode":"+91","createdAt":"2021-07-05T09:58:15.580Z","updatedAt":"2021-07-06T04:23:13.561Z","__v":3},"receiver":"60d30a7660f6ca34375fc737","createdAt":"2021-07-08T06:20:26.316Z","updatedAt":"2021-07-08T06:20:26.316Z","__v":0}}],"createdAt":"2021-06-23T10:18:30.712Z","updatedAt":"2021-07-20T04:30:21.979Z","__v":134,"logo":"company_files/1625640675277Screenshot(106).png"},{"loginFailedAttempt":0,"averageRating":0,"galleryImages":[],"verificationStatus":"verified","signUpStepCompleted":1,"role":"company","_id":"60d30f5460f6ca34375fc75f","companyName":"testc","companyNumber":"testorr","serviceType":{"isDeleted":false,"_id":"60d3036260f6ca34375fc728","serviceTypeName":"Cleaning","createdAt":"2021-06-23T09:48:18.129Z","updatedAt":"2021-06-23T09:48:18.129Z","__v":0},"serviceNames":[{"_id":"60d30f5460f6ca34375fc760","name":{"isDeleted":false,"_id":"60d306a560f6ca34375fc736","serviceName":"Moving wash","type":"60d3036260f6ca34375fc728","createdAt":"2021-06-23T10:02:13.041Z","updatedAt":"2021-06-23T10:02:13.041Z","__v":0}},{"_id":"60d30f5460f6ca34375fc761","name":{"isDeleted":false,"_id":"60d3062260f6ca34375fc734","serviceName":"Cleaning services","type":"60d3036260f6ca34375fc728","createdAt":"2021-06-23T10:00:02.865Z","updatedAt":"2021-06-23T10:00:02.865Z","__v":0}}],"serviceAreas":[{"_id":"60d30f5460f6ca34375fc762","area":{"isDeleted":false,"_id":"60d301ac60f6ca34375fc725","name":"Viken","createdAt":"2021-06-23T09:41:00.344Z","updatedAt":"2021-06-23T09:41:00.344Z","__v":0}},{"_id":"60d30f5460f6ca34375fc763","area":{"isDeleted":false,"_id":"60d3016e60f6ca34375fc722","name":"Troms and Finnmark","createdAt":"2021-06-23T09:39:58.394Z","updatedAt":"2021-06-23T09:39:58.394Z","__v":0}},{"_id":"60d30f5460f6ca34375fc764","area":{"isDeleted":false,"_id":"60d3010960f6ca34375fc71e","name":"Nordland","createdAt":"2021-06-23T09:38:17.633Z","updatedAt":"2021-06-23T09:38:17.633Z","__v":0}}],"email":"testne@yopmail.com","countryCode":"+91","phone":"7878787878","allReviews":[],"createdAt":"2021-06-23T10:39:16.744Z","updatedAt":"2021-07-08T07:41:37.095Z","__v":0},{"loginFailedAttempt":0,"averageRating":0,"galleryImages":[],"verificationStatus":"verified","signUpStepCompleted":1,"role":"company","_id":"60dc0f32e0a7ac67b828edf3","companyName":"ok","companyNumber":"tok","serviceType":{"isDeleted":false,"_id":"60d3036260f6ca34375fc728","serviceTypeName":"Cleaning","createdAt":"2021-06-23T09:48:18.129Z","updatedAt":"2021-06-23T09:48:18.129Z","__v":0},"serviceNames":[{"_id":"60dc0f32e0a7ac67b828edf4","name":{"isDeleted":false,"_id":"60d306a560f6ca34375fc736","serviceName":"Moving wash","type":"60d3036260f6ca34375fc728","createdAt":"2021-06-23T10:02:13.041Z","updatedAt":"2021-06-23T10:02:13.041Z","__v":0}}],"serviceAreas":[{"_id":"60dc0f32e0a7ac67b828edf5","area":{"isDeleted":false,"_id":"60d301ac60f6ca34375fc725","name":"Viken","createdAt":"2021-06-23T09:41:00.344Z","updatedAt":"2021-06-23T09:41:00.344Z","__v":0}},{"_id":"60dc0f32e0a7ac67b828edf6","area":{"isDeleted":false,"_id":"60d3016e60f6ca34375fc722","name":"Troms and Finnmark","createdAt":"2021-06-23T09:39:58.394Z","updatedAt":"2021-06-23T09:39:58.394Z","__v":0}}],"email":"ok@yopmail.com","countryCode":"+91","phone":"9090911111","allReviews":[],"createdAt":"2021-06-30T06:29:06.671Z","updatedAt":"2021-06-30T06:30:01.529Z","__v":0},{"loginFailedAttempt":0,"averageRating":0,"galleryImages":[],"verificationStatus":"verified","signUpStepCompleted":1,"role":"company","_id":"60e525cc22d4a71ee895a981","companyName":"welcome company","companyNumber":"122","serviceType":{"isDeleted":false,"_id":"60d3036260f6ca34375fc728","serviceTypeName":"Cleaning","createdAt":"2021-06-23T09:48:18.129Z","updatedAt":"2021-06-23T09:48:18.129Z","__v":0},"serviceNames":[{"_id":"60e525cc22d4a71ee895a982","name":{"isDeleted":false,"_id":"60d306a560f6ca34375fc736","serviceName":"Moving wash","type":"60d3036260f6ca34375fc728","createdAt":"2021-06-23T10:02:13.041Z","updatedAt":"2021-06-23T10:02:13.041Z","__v":0}},{"_id":"60e525cc22d4a71ee895a983","name":{"isDeleted":false,"_id":"60d3068760f6ca34375fc735","serviceName":"Facade washing","type":"60d3036260f6ca34375fc728","createdAt":"2021-06-23T10:01:43.795Z","updatedAt":"2021-06-23T10:01:43.795Z","__v":0}},{"_id":"60e525cc22d4a71ee895a984","name":{"isDeleted":false,"_id":"60d3062260f6ca34375fc734","serviceName":"Cleaning services","type":"60d3036260f6ca34375fc728","createdAt":"2021-06-23T10:00:02.865Z","updatedAt":"2021-06-23T10:00:02.865Z","__v":0}}],"serviceAreas":[{"_id":"60e525cc22d4a71ee895a985","area":{"isDeleted":false,"_id":"60d301ac60f6ca34375fc725","name":"Viken","createdAt":"2021-06-23T09:41:00.344Z","updatedAt":"2021-06-23T09:41:00.344Z","__v":0}},{"_id":"60e525cc22d4a71ee895a986","area":{"isDeleted":false,"_id":"60d3016e60f6ca34375fc722","name":"Troms and Finnmark","createdAt":"2021-06-23T09:39:58.394Z","updatedAt":"2021-06-23T09:39:58.394Z","__v":0}}],"email":"7.july@yopmail.com","countryCode":"+91","phone":"9441062083","allReviews":[],"createdAt":"2021-07-07T03:55:56.824Z","updatedAt":"2021-07-10T10:24:10.782Z","__v":2}]}
     

    }).add(() => { this.isLoading = false; body.classList.remove('loader_active'); });

  }

  onPermissionCheckChangedCompany(event, eventid) {
    var eventid;
    console.log("event check" + event.checked);
    var indexEvent = this.companylist.filter(ij => ij._id == eventid)[0];
    if (indexEvent !== undefined) {
      var index22 = this.companylist.indexOf(indexEvent);
      this.companylist[index22].State = event.checked;
    }

    console.log("selectedservice" + JSON.stringify(this.companylist));

  }

  inviteCompany() {
var arrayCompany=this.companylist.filter((i)=>i.State==true);
if(arrayCompany){
  if(arrayCompany.length>0){
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('loader_active');
    this.isLoading=true;
  
    this.companyArrayfilters = [];
    this.companyIds = this.companylist.filter(i => i.State == true);
    this.companyIds.forEach(element => {
      this.companyArrayfilters.push(element._id);

    });


    var postParams={
      introduction:"",
      companyIds:this.companyArrayfilters
    }

    console.log("postpatams"+JSON.stringify(postParams));

    this.authenticationService.inviteCompanyAssignment(this.assignmentId,postParams).subscribe((res) => {
      if (!res.isError) {
        console.log("inside success");
        // $('#exampleModalCenter_signup').modal('show');

        $('#exampleModalCenter_share_post').modal({
          backdrop: 'static',
          keyboard: false,
          show: true
        });


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

    ).add(() => { this.isLoading=false;  body.classList.remove('loader_active'); });



  }
  else{
    this.authenticationService.openSnackBar("Please select company(s) first", 'Done', '5000','red-snackbar' ,'end','center'
);
  }
}
else{
  this.authenticationService.openSnackBar("Please select company(s) first", 'Done', '5000','red-snackbar' ,'end','center'
);
}
    

  }


  viewProfileCompany(id) {
    console.log("inside view profile");
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

}

