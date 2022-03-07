import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { ApilistService } from '../services/api/apilist.service';
import { AuthenticationService } from '../services/authentication/authentication.service';
import * as _ from "lodash";
import { JSDocCommentStmt } from '@angular/compiler';
import { Router } from '@angular/router';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';

declare const $;

export interface Bank {
  CountryId: string;
  PhoneCode: string;
}
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  fullname;
  @ViewChild('singleSelect', { static: false }) singleSelect: MatSelect;
  Bank = [];
  Bankcust1 = [];
  Bankcust2 = [];
  signupForm: FormGroup;
  Selected_countrycode="+47";
 
  protected banks: Bank[]
  public bankCtrl: FormControl = new FormControl();
  public bankFilterCtrl: FormControl = new FormControl();
  public filteredBanks = [];
  protected _onDestroy = new Subject<void>();
 
  Selected_countrycodecust1="+47";
 
  protected bankscust1: Bank[]
  public bankCtrlcust1: FormControl = new FormControl();
  public bankFilterCtrlcust1: FormControl = new FormControl();
  public filteredBankscust1 = [];
  protected _onDestroycust1 = new Subject<void>();

  Selected_countrycodecust2="+47";
 
  protected bankscust2: Bank[]
  public bankCtrlcust2: FormControl = new FormControl();
  public bankFilterCtrlcust2: FormControl = new FormControl();
  public filteredBankscust2 = [];
  protected _onDestroycust2 = new Subject<void>();
 
 
 
 
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
  submitSignupCompany:boolean=false;
  submitSignupCustomer:boolean=false;
  isLoading:boolean=false;

  nextScreen=false;

  constructor(private http: HttpClient, private fb: FormBuilder, public apiList: ApilistService, private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.nextScreen=false;
    this.isLoading=false;
    this.keylock = 0


    this.HidePopups();
    this.getContentJSON();
    this.getAllAreaData();
    // this.createForm();
    this.GetAllServiceType();

  }

  HidePopups() {
    $('#exampleModalCenter_signup').modal('hide');
    $('#exampleModalCenter_signup_cust').modal('hide');

    
    $("#alert_div").hide();
  }

  getAllAreaData() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('loader_active');
    this.isLoading=true;
    this.authenticationService.getAllArea().subscribe(res => {
      console.log("Area data" + JSON.stringify(res));
      this.areaArray = res.areas;
      this.areaArray.forEach(element => {
        element.State = false;
      });

    }).add(() => { this.isLoading=false;body.classList.remove('loader_active'); });
  }
  // createForm() {
  //   this.signupForm = this.fb.group({
  //     countrycode: ['', Validators.required],
  //     mobileNumber: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]] ,
  //     email: ['', [Validators.required, Validators.email]],
  //     servicelist: [''],
  //     orgName: ['', Validators.required],
  //     industry: ['', Validators.required], 
  //     compName:['', Validators.required]

  //   });
  // }
  createServiceList(serviceData) {
    const arr = serviceData.map(ser => {
      return new FormControl(ser.selected || false);
    });
    return new FormArray(arr);
  }
  Country_selection(CountryId, PhoneCode) {
    // this.countrycode = "+" + PhoneCode;
  }


  GetAllServiceType() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('loader_active');
    this.isLoading=true;
    this.authenticationService.getServiceType().subscribe(res => {
      console.log("service data" + JSON.stringify(res));
      this.ServicesData = res.serviceTypes;

    }).add(() => { this.isLoading=false;body.classList.remove('loader_active'); });

  }

  getServiceListById(id) {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('loader_active');
    this.isLoading=true;
    this.IndustryData = id;
    this.authenticationService.getServiceListById(id).subscribe(res => {
      console.log("service data list by id" + JSON.stringify(res));
      this.SelectedServiceListData = res.services;
      this.SelectedServiceListData.forEach(element => {
        element.State = false;
      });

    }).add(() => { this.isLoading=false;body.classList.remove('loader_active'); });;
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



  onPermissionCheckChanged(event, eventid) {
    var eventid;
    console.log("event check" + event.checked);
    var indexEvent = this.SelectedServiceListData.filter(ij => ij._id == eventid)[0];
    if (indexEvent !== undefined) {
      var index22 = this.SelectedServiceListData.indexOf(indexEvent);
      this.SelectedServiceListData[index22].State = event.checked;
    }

    console.log("selectedservice" + JSON.stringify(this.SelectedServiceListData));

  }


  onPermissionCheckChangedArea(event, eventid) {
    var eventid;
    console.log("event check" + event.checked);
    var indexEvent = this.areaArray.filter(ij => ij._id == eventid)[0];
    if (indexEvent !== undefined) {
      var index22 = this.areaArray.indexOf(indexEvent);
      this.areaArray[index22].State = event.checked;
    }

    console.log("selectedservice" + JSON.stringify(this.areaArray));

  }


  onKeypressedZip(value) {
    this.Selected_countrycode = null;
    this.filteredBanks = this.searchValueZip(value);
  }

  searchValueZip(value: string) {
    let filter = value.toLowerCase();
    return this.Bank.filter(option => option.PhoneCode.toLowerCase().includes(filter) || option.CountryName.toLowerCase().includes(filter));
  }

  onZipCodeChange(zipValue) {
    if (zipValue) {
      this.Selected_countrycode = zipValue.value;
      console.log("zip val" + this.Selected_countrycode);
    }
  }



  onKeypressedZipcust1(value) {
    this.Selected_countrycodecust1 = null;
    this.filteredBankscust1 = this.searchValueZipcust1(value);
  }

  searchValueZipcust1(value: string) {
    let filter = value.toLowerCase();
    return this.Bankcust1.filter(option => option.PhoneCode.toLowerCase().includes(filter) || option.CountryName.toLowerCase().includes(filter));
  }

  onZipCodeChangecust1(zipValue) {
    if (zipValue) {
      this.Selected_countrycodecust1 = zipValue.value;
      console.log("zip val cust1" + this.Selected_countrycodecust1);
    }
  }

  onKeypressedZipcust2(value) {
    this.Selected_countrycodecust2 = null;
    this.filteredBankscust2 = this.searchValueZipcust2(value);
  }

  searchValueZipcust2(value: string) {
    let filter = value.toLowerCase();
    return this.Bankcust2.filter(option => option.PhoneCode.toLowerCase().includes(filter) || option.CountryName.toLowerCase().includes(filter));
  }

  onZipCodeChangecust2(zipValue) {
    if (zipValue) {
      this.Selected_countrycodecust2 = zipValue.value;
      console.log("zip val cust2" + this.Selected_countrycodecust2);
    }
  }
  

  onSignupComapny() {

    var arraynames=this.areaArray.filter(i => i.State == true);
    if(arraynames){
      if(arraynames.length>0){
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('loader_active');
        this.isLoading=true;
        this.submitSignupCompany=true;
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
        console.log("this.selectedserviceName" + JSON.stringify(this.selectedServiceName));
        const params = {
          "companyName": this.CompanyNameData,
          "companyNumber": this.orgNUmData.replace(/\s/g, "").toString(),
          "countryCode": this.Selected_countrycode,
          "phone": this.phoneEntered.replace(/\s/g, "").toString(),
          "serviceType": this.IndustryData,
          "serviceNames": this.selectedServicesNamefilter,
          "serviceAreas": this.areaArrayFilter,
          "email": this.EmailEntered
        }
        console.log("params are" + JSON.stringify(params));
        this.authenticationService.signupCompanyPost(params).subscribe((res) => {
          if (!res.isError) {
            console.log("inside success");
            // $('#exampleModalCenter_signup').modal('show');
    
            $('#exampleModalCenter_signup').modal({
              backdrop: 'static',
              keyboard: false,
              show: true
            });
    
    
          }
          else {
    
    
            this.authenticationService.openSnackBar("Error while signup", 'Done', '5000','red-snackbar' ,'end','center'
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
      this.authenticationService.openSnackBar("Please select service area(s) first", 'Done', '5000','red-snackbar' ,'end','center'
);
    }
  }
  else{
    this.authenticationService.openSnackBar("Please select service area(s) first", 'Done', '5000','red-snackbar' ,'end','center'
);
  }
   

  }

  onSignupCustomer() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('loader_active');
    this.isLoading=true;
    this.submitSignupCustomer=true;
    var phoneNumber=this.Selected_countrycodecust1+this.phoneEnteredcust1;


  
      const params = {
        "fullName": this.fullname,
        "countryCode": this.Selected_countrycodecust1,
        "phone": this.phoneEnteredcust1.replace(/\s/g, "").toString(),
       
        "email": this.EmailEnteredcust1
      }
      
      console.log("params are" + JSON.stringify(params));
      this.http.post<any>(this.apiList.signupCustomer,params).subscribe((res:any) => {
        if (!res.isError) {
          console.log("inside success");
          // $('#exampleModalCenter_signup').modal('show');
  
          $('#exampleModalCenter_signup_cust').modal({
            backdrop: 'static',
            keyboard: false,
            show: true
          });
  
  
        }
        else {
  
  
          this.authenticationService.openSnackBar("Error while signup", 'Done', '5000','red-snackbar' ,'end','center'
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

  loginback() {
    $('#exampleModalCenter_signup').modal('hide');
    setTimeout(() => {
      this.router.navigate(['login']);
    }, 500);

  }

  loginbackcust() {
    $('#exampleModalCenter_signup_cust').modal('hide');
    setTimeout(() => {
      localStorage.setItem("DisplayCustTab","true");
      this.router.navigate(['login']);
    }, 500);

  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

 next(){

  var arraynames=this.SelectedServiceListData.filter(i => i.State == true);
  if(arraynames){
    if(arraynames.length>0){
      this.nextScreen=true;
      document.getElementById("nextscreencontent").scrollTop = 0;
    }
    else{
      this.authenticationService.openSnackBar("Please select service name(s) first", 'Done', '5000','red-snackbar' ,'end','center'
);
    }
  }
  else{
    this.authenticationService.openSnackBar("Please select service name(s) first", 'Done', '5000','red-snackbar' ,'end','center'
);
  }
  
 }

 previous(){
   this.nextScreen=false
 }
}



