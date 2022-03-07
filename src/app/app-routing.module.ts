import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
// import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CompanyComponent } from './company/company.component';
import { HomepageCompanyComponent } from './company/homepage-company/homepage-company.component';
import { HeaderCompanyComponent } from './company/header-company/header-company.component';
import { ProfileCompanyComponent } from './company/profile-company/profile-company.component';
import { EditprofileCompanyComponent } from './company/editprofile-company/editprofile-company.component';
import { MessageCenterCompanyComponent } from './company/message-center-company/message-center-company.component';
import { FootercompanyComponent } from './company/footercompany/footercompany.component';
import { CompanyAboutUsComponent } from './company/company-about-us/company-about-us.component';
import { CustomersComponent } from './customers/customers.component';
import { HomepageCustomerComponent } from './customers/homepage-customer/homepage-customer.component';
import { HeaderCustomerComponent } from './customers/header-customer/header-customer.component';
import { ProfileCustomerComponent } from './customers/profile-customer/profile-customer.component';
import { EditprofileCustomerComponent } from './customers/editprofile-customer/editprofile-customer.component';
import { MessageCenterCustomerComponent } from './customers/message-center-customer/message-center-customer.component';
import { UploadAssignmentCustomerComponent } from './customers/upload-assignment-customer/upload-assignment-customer.component';
import { AddAssignmentCustomerComponent } from './customers/add-assignment-customer/add-assignment-customer.component';
import { EditAssignmentCustomerComponent } from './customers/edit-assignment-customer/edit-assignment-customer.component';
import { FootercustomerComponent } from './customers/footercustomer/footercustomer.component';
import { CompanyContactUsComponent } from './company/company-contact-us/company-contact-us.component';
import { AuthGuard } from './core/guard/auth.guard';
import { CustomeraboutusComponent } from './customers/customeraboutus/customeraboutus.component';
import { VideoCallComponent } from './video-call/video-call.component';
import { CommonheaderComponent } from './commonheader/commonheader.component';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';


const routes: Routes = [
  { path: 'customers', component:CustomersComponent,
  children:
[
  { path: 'homepagecustomer', component: HomepageCustomerComponent, canActivate: [AuthGuard] },
  { path: 'headercustomer', component: HeaderCustomerComponent , canActivate: [AuthGuard]},
  { path: 'profilecustomer', component: ProfileCustomerComponent, canActivate: [AuthGuard] },
  { path: 'editprofilecustomer', component: EditprofileCustomerComponent, canActivate: [AuthGuard] },
  { path: 'messagecustomer', component: MessageCenterCustomerComponent, canActivate: [AuthGuard] },
  { path: 'uploadassignmentcustomer', component: UploadAssignmentCustomerComponent , canActivate: [AuthGuard]},
  { path: 'addassignmentcustomer', component: AddAssignmentCustomerComponent, canActivate: [AuthGuard] },
  { path: 'editassignmentcustomer', component: EditAssignmentCustomerComponent, canActivate: [AuthGuard] },
  { path: 'customer-about-us', component: CustomeraboutusComponent, canActivate: [AuthGuard] },
  { path: 'footer', component: FootercustomerComponent }
]

},
  { path: 'company', component:CompanyComponent ,
  children: [
    { path: 'homepagecompany', component: HomepageCompanyComponent, canActivate: [AuthGuard] },
    { path: 'headercompany', component: HeaderCompanyComponent , canActivate: [AuthGuard]},
    { path: 'profilecompany', component: ProfileCompanyComponent , canActivate: [AuthGuard]},
    { path: 'editprofilecompany', component: EditprofileCompanyComponent , canActivate: [AuthGuard]},
    { path: 'messagecompany', component: MessageCenterCompanyComponent , canActivate: [AuthGuard]},
    { path: 'footer', component: FootercompanyComponent , canActivate: [AuthGuard]},
    { path: 'company-about-us', component: CompanyAboutUsComponent , canActivate: [AuthGuard]},
    { path: 'company-contact-us', component: CompanyContactUsComponent , canActivate: [AuthGuard]}
  ]
},
  
  { path: '', redirectTo: 'splashscreen', pathMatch: 'full' },
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'splashscreen', component: SplashScreenComponent },
  { path: 'verification', component: OtpVerificationComponent },
  {path: 'headercommon', component:CommonheaderComponent},
  // { path: 'forgetpassword', component: ForgetPasswordComponent },
  { path: 'about-us', component: AboutUsComponent },
  {path: 'videoCall',component:VideoCallComponent},
  // { path: 'resetPassword', component: ResetPasswordComponent },
  
  
  
  
  {
    path: '**',
    redirectTo: 'splashscreen',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
