import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { element } from 'protractor';
import { ObjectUnsubscribedError, Subject } from 'rxjs';
import { ApilistService } from 'src/app/services/api/apilist.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Bank } from 'src/app/signup/signup.component';
import { SocketService } from 'src/app/socket/socket.service';

@Component({
  selector: 'app-editprofile-company',
  templateUrl: './editprofile-company.component.html',
  styleUrls: ['./editprofile-company.component.scss']
})
export class EditprofileCompanyComponent implements OnInit {

  isLoading: boolean = false;
  userDetails;
  baseImgUrl = "https://api-dev.hjelpsom.app/static/company_files/";
  baseImgUrlComp = "https://api-dev.hjelpsom.app/static/";
  profilePic: string;
  companyProfile: any;
  slideConfig = { slidesToShow: 1, autoplay: true, slidesToScroll: 1, dots: true };
  slideConfig2 = {
    "slidesToShow": 2, "slidesToScroll": 2, "autoplay": true, "autoplay-speed": 3000, "dots": true
  };
  companyName;
  companyNumber;
  serviceTypeAll;
  serviceTypeSelected;
  serviceNamesSelected;
  serviceNamesAll;
  serviceAreasAll;
  serviceAreasSelected;
  email;
  countryCode;
  phone;

  showcarsuel: boolean = false;

  areaArray: any[] = [];
  areaArrayFilter: any[] = [];

  Bank = [];
  Bankcust1 = [];
  Bankcust2 = [];
  Selected_countrycode;
  images = [];


 
  protected banks: Bank[]
  public bankCtrl: FormControl = new FormControl();
  public bankFilterCtrl: FormControl = new FormControl();
  public filteredBanks = [];
  protected _onDestroy = new Subject<void>();
  Selected_countrycodecust1;
 
  protected bankscust1: Bank[]
  public bankCtrlcust1: FormControl = new FormControl();
  public bankFilterCtrlcust1: FormControl = new FormControl();
  public filteredBankscust1 = [];
  protected _onDestroycust1 = new Subject<void>();

  Selected_countrycodecust2;
 
  protected bankscust2: Bank[]
  public bankCtrlcust2: FormControl = new FormControl();
  public bankFilterCtrlcust2: FormControl = new FormControl();
  public filteredBankscust2 = [];
  protected _onDestroycust2 = new Subject<void>();

  file: any;
  file2:string [] = [];
  selectedServicesNamefilter: any[];
  selectedServiceName: any;
  areaIDs: any[];


  uploadedImages:any[]=[];
  messageUnseenVal=0;
  constructor(public socketService: SocketService,private http: HttpClient, private fb: FormBuilder, public apiList: ApilistService, private authenticationService: AuthenticationService, private router: Router) { 

    this.socketService.messageUnseen.subscribe((data)=>{
      console.log("message unread count"+JSON.stringify(data));
      this.messageUnseenVal=data.totalUnSeenCount;
          })
  }

  ngOnInit(): void {
    this.isLoading=false;
    this.getContentJSON();
    this.getAllAreaData();
    // this.createForm();
    this.GetAllServiceType();
    this.getCustomerProfile();
  }
  GetAllServiceType() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('loader_active');
    this.isLoading=true;
    this.authenticationService.getServiceType().subscribe(res => {
      console.log("service data" + JSON.stringify(res));
      this.serviceTypeAll = res.serviceTypes;
      this.serviceTypeAll.forEach(element => {
        element.State = false;
      });

    }).add(() => { this.isLoading=false;body.classList.remove('loader_active'); });

  }

  getServiceListById(id) {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('loader_active');
    this.isLoading=true;
    this.serviceTypeSelected = id;
    this.authenticationService.getServiceListById(id).subscribe(res => {
      console.log("service data list by id" + JSON.stringify(res));
      this.serviceNamesAll = res.services;
      this.serviceNamesAll.forEach(element => {
        element.State = false;
      });

    }).add(() => { this.isLoading=false;body.classList.remove('loader_active'); });;
  }
  onPermissionCheckChanged(event, eventid) {
    var eventid;
    console.log("event check" + event.checked);
    var indexEvent = this.serviceNamesAll.filter(ij => ij._id == eventid)[0];
    if (indexEvent !== undefined) {
      var index22 = this.serviceNamesAll.indexOf(indexEvent);
      this.serviceNamesAll[index22].State = event.checked;
    }

    console.log("selectedservice" + JSON.stringify(this.serviceNamesAll));

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
  getAllAreaData() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('loader_active');
    this.isLoading=true;
    this.authenticationService.getAllArea().subscribe(res => {
      console.log("Area data" + JSON.stringify(res));
      this.serviceAreasAll = res.areas;
      this.serviceAreasAll.forEach(element => {
        element.State = false;
      });

      console.log("all service areas"+JSON.stringify(this.serviceAreasAll));
      

    }).add(() => { this.isLoading=false;body.classList.remove('loader_active'); });
  }
  onPermissionCheckChangedArea(event, eventid) {
    var eventid;
    console.log("event check" + event.checked);
    var indexEvent = this.serviceAreasAll.filter(ij => ij._id == eventid)[0];
    if (indexEvent !== undefined) {
      var index22 = this.serviceAreasAll.indexOf(indexEvent);
      this.serviceAreasAll[index22].State = event.checked;
    }

    console.log("serviceAreasAll" + JSON.stringify(this.serviceAreasAll));

  }
  getCustomerProfile() {
    this.uploadedImages=[];
    this.showcarsuel = false;
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('loader_active');
    this.isLoading = true;

    this.authenticationService.getCompanyProfileAfterLogin().subscribe((res) => {
      if (!res.isError) {

        console.log("response" + JSON.stringify(res));
        // this.totalItems=res.totalItems;
        this.companyProfile = res.company;
        this.authenticationService.changeMemberPhoto(res.company.logo); 
        localStorage.setItem("user",JSON.stringify(res.company));
        this.authenticationService.userData=res.company;
        if (this.companyProfile.logo) {
          this.profilePic = this.baseImgUrlComp + this.companyProfile.logo;
        }
        this.companyName=this.companyProfile.companyName;
        this.companyNumber=this.companyProfile.companyNumber;
        // this.phone=this.companyProfile.phone;
        // this.countryCode=this.companyProfile.countryCode;
        this.email=this.companyProfile.email;
        this.serviceTypeSelected=this.companyProfile.serviceType._id;
        this.getServiceListById(this.serviceTypeSelected);
        this.serviceAreasSelected=this.companyProfile.serviceAreas;
       
      
        this.serviceNamesSelected=this.companyProfile.serviceNames;

        console.log("serviceAreaSelected"+JSON.stringify(this.serviceAreasSelected));
        console.log("serviceNamesSelected"+JSON.stringify(this.serviceNamesSelected));
        
        setTimeout(()=>{
          if(this.serviceAreasSelected){
            if(this.serviceAreasSelected.length>0){
              this.selectedArea();
            }
          }
          
        
          if(this.serviceNamesSelected){
            if(this.serviceNamesSelected.length>0){
              this.selectedName();
            }
          }
        },2000);

if(this.companyProfile.galleryImages){
  if(this.companyProfile.galleryImages.length>0){
    this.uploadedImages=this.companyProfile.galleryImages;
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


  selectedName(){

    if(this.serviceNamesSelected){
      if(this.serviceNamesSelected.length>0){
        this.serviceNamesSelected.forEach(elementselected => {
    this.serviceNamesAll.forEach(elementAll => {
      if(elementAll._id==elementselected.name._id){
        elementAll.State=true
      }
    });
          
          
        });
      }
    }

    console.log("serviceName array"+JSON.stringify(this.serviceNamesAll));

  }

  selectedArea(){
if(this.serviceAreasSelected){
  if(this.serviceAreasSelected.length>0){
    console.log("inside selectedArea");
    this.serviceAreasSelected.forEach((elementselected) => {
      console.log("elementselectedarea");
      console.log(elementselected);
      
this.serviceAreasAll.forEach((elementAll) => {
  console.log("elementAllarea");
      console.log(elementAll);
  if(elementAll._id==elementselected.area._id){
    elementAll.State=true
  }
});
      
      
    });
    console.log("serviceAreasAll array"+JSON.stringify(this.serviceAreasAll));
  }
}

   
  }

  onSubmit(form: NgForm){
   
    console.log("this.profilePic"+this.profilePic);

// if(this.file){


this.updateProfile(form);







  

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
  var servNameArray=[];
  var servAreaArray=[];
 servNameArray= this.serviceNamesAll.filter(i => i.State == true);
  servAreaArray=this.serviceAreasAll.filter(i => i.State == true);

  if(servAreaArray && servNameArray){

    if(servNameArray.length>0){
      if(servAreaArray.length>0){
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('loader_active');
      this.isLoading=true;
      
      this.selectedServicesNamefilter = [];
      this.selectedServiceName = this.serviceNamesAll.filter(i => i.State == true);
      this.selectedServiceName.forEach(element => {
        this.selectedServicesNamefilter.push(element._id);
      
      });
      
      this.areaArrayFilter = [];
      this.areaIDs = this.serviceAreasAll.filter(i => i.State == true);
      this.areaIDs.forEach(element => {
        this.areaArrayFilter.push(element._id);
      
      });
        let formData = new FormData();
        // for (let key in form.value) {
        //   formData.append(`${key}`, form.value[key]);
        //   console.log(formData, `${key}`)
        // }
      
        // console.log("serviceNames", this.selectedServicesNamefilter.toString())
        // console.log('serviceAreas',this.areaArrayFilter.toString())
      
        // console.log('companyName',this.companyName)
        // console.log('companyNumber',this.companyNumber)
        // console.log('serviceType',this.serviceTypeSelected);
        // console.log('images');
        // console.log(this.images.toString());
        
        // console.log(this.file2);
        
      
      
        formData.append('companyName',this.companyName);
        formData.append('companyNumber',this.companyNumber.toString().replace(/\s/g, ""));
        formData.append('serviceType',this.serviceTypeSelected);
        formData.append('serviceNames',this.selectedServicesNamefilter.toString());
        formData.append('serviceAreas',this.areaArrayFilter.toString());
        formData.append('email',this.email);
        if(this.file2){
      
          for (var i = 0; i < this.file2.length; i++) { 
            formData.append("galleryImages", this.file2[i]);
          }
          // for(const key of Object.keys(this.file2)){
          //   formData.append('galleryImages',this.file2[key]);
          // }
          
      
        }
        
        formData.append('updatedGalleryImages',this.uploadedImages.toString());
        if(this.file!==undefined && this.file!==null){
        formData.append('logo',this.file);
        }
      
      
        console.log(formData);
      
      if (form.valid) {
       // console.log("inside formdata"+JSON.stringify(formData));
        this.authenticationService.companyprofileUpdate(formData).subscribe((res: any) => {
      
            if (!res.isError) {
               console.log("inside formdata JSON"+JSON.stringify(res));
               this.getCustomerProfile();
               this.authenticationService.openSnackBar("Profile Updated Successfully!", 'Done', '5000','blue-snackbar' ,'end','center'
);
              //localStorage.setItem("sigUp", JSON.stringify(res.user));
              this.router.navigate(['/company/profilecompany'])
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
      else{
        this.authenticationService.openSnackBar("Please select service area(s) first!", 'Done', '5000','red-snackbar' ,'end','center'
);
      }
    }
    else{
      this.authenticationService.openSnackBar("Please select service name(s) first!", 'Done', '5000','red-snackbar' ,'end','center'
);
    }

  }

  else{
    this.authenticationService.openSnackBar("Please select service name(s) and area(s) first!", 'Done', '5000','red-snackbar' ,'end','center'
);
  }


}

removeImage(image){
  this.uploadedImages.splice(this.uploadedImages.findIndex(i => i == image), 1);

  console.log("images after delete");
  console.log(this.uploadedImages);
  
  
}

onFileChange(event) {
 // this.images=[];
  //this.file2 = event.target.files;
  console.log(this.file2);
  console.log(Object.keys(this.file2));
  if (event.target.files && event.target.files[0]) {

    for (var i = 0; i < event.target.files.length; i++) { 
      this.file2.push(event.target.files[i]);
  }
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
              var reader = new FileReader();
 
              reader.onload = (event:any) => {
                console.log(event.target.result);
                 this.images.push(event.target.result); 
 
                
              }

              reader.readAsDataURL(event.target.files[i]);
      }
  }
}
numberOnly(event): boolean {
  const charCode = (event.which) ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;

}

}
