import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ApilistService } from '../services/api/apilist.service';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { Bank } from '../signup/signup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  Bank = [];
  Bankcust1 = [];
  Bankcust2 = [];
  Selected_countrycode="+47";
  selectedTabIndex: number = 0;
 
  protected banks: Bank[]
  public bankCtrl: FormControl = new FormControl();
  public bankFilterCtrl: FormControl = new FormControl();
  public filteredBanks = [];
  protected _onDestroy = new Subject<void>();
 
  Selected_countrycodecust1="+47";

  isLoading:boolean=false;
 
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
  EmailEntered;
  phoneEntered;
  EmailEnteredcust1;
  phoneEnteredcust1;
  phoneEnteredcust2;

  submitLoginCompany:boolean=false;
  submitLoginCustomer:boolean=false;
  constructor(private http: HttpClient, private fb: FormBuilder, public apiList: ApilistService, private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem("DisplayCustTab")){
      this.selectedTabIndex=1;
    }
    else{
      this.selectedTabIndex=0;
    }
    this.isLoading=false;
    this.getContentJSON();
    
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



  loginComapny() {
    console.log("this.phoneEntered"+this.phoneEntered.replace(/\s/g, ""));
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('loader_active');
    this.isLoading=true;
    this.submitLoginCompany=true;
    
    const params = {
      "countryCode": this.Selected_countrycode,
      "phone": this.phoneEntered.replace(/\s/g, "").toString(),
    }
    console.log("params are" + JSON.stringify(params));
    this.authenticationService.loginCompanyPost(params).subscribe((res) => {
      if (!res.isError) {
        console.log("inside success");
        localStorage.setItem("userType","company");
        localStorage.setItem("operationType","login");
        localStorage.setItem("countryCode",this.Selected_countrycode);
        localStorage.setItem("phone",this.phoneEntered.replace(/\s/g, ""));
        
        this.router.navigate(['/verification'])
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


  loginCustomer() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('loader_active');
    this.isLoading=true;
    this.submitLoginCustomer=true;
    const params = {
      "countryCode": this.Selected_countrycodecust2,
      "phone": this.phoneEnteredcust2.replace(/\s/g, "").toString(),
    }
    console.log("params are" + JSON.stringify(params));
    this.authenticationService.loginCustomerPost(params).subscribe((res) => {
      if (!res.isError) {
        console.log("inside success");
        localStorage.setItem("userType","customer");
        localStorage.setItem("operationType","login");
        localStorage.setItem("countryCode",this.Selected_countrycodecust2);
        localStorage.setItem("phone",this.phoneEnteredcust2.replace(/\s/g, ""));
        
        this.router.navigate(['/verification'])
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
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  ngOnDestroy(): void {
    localStorage.removeItem("DisplayCustTab");
  }


}
