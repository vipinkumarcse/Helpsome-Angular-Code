import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { SignupComponent } from './signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { NgxAgoraModule, AgoraConfig } from 'ngx-agora';
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
import { HomepageCustomerComponent } from './customers/homepage-customer/homepage-customer.component';
import { HeaderCustomerComponent } from './customers/header-customer/header-customer.component';
import { ProfileCustomerComponent } from './customers/profile-customer/profile-customer.component';
import { EditprofileCustomerComponent } from './customers/editprofile-customer/editprofile-customer.component';
import { MessageCenterCustomerComponent } from './customers/message-center-customer/message-center-customer.component';
import { UploadAssignmentCustomerComponent } from './customers/upload-assignment-customer/upload-assignment-customer.component';
import { AddAssignmentCustomerComponent } from './customers/add-assignment-customer/add-assignment-customer.component';
import { EditAssignmentCustomerComponent } from './customers/edit-assignment-customer/edit-assignment-customer.component';
import { FootercustomerComponent } from './customers/footercustomer/footercustomer.component';
import { CustomersComponent } from './customers/customers.component';
import { CompanyContactUsComponent } from './company/company-contact-us/company-contact-us.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgOtpInputModule } from 'ng-otp-input';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthInterceptor } from './services/auth.interceptor';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { RatingModule } from 'ng-starrating';
import { PhoneFormatDirective } from './phone-format.directive';
import { FormatPhonePipe } from './format-phone.pipe';
import { FormatphonenewPipe } from './formatphonenew.pipe';
import { FacebookModule } from 'ngx-facebook';
import { ClipboardModule } from 'ngx-clipboard';
import { CustomeraboutusComponent } from './customers/customeraboutus/customeraboutus.component';
// import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from '../../src/environments/environment';
import { VideoCallComponent } from './video-call/video-call.component';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';
// import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/database';
// import { AngularFireAuthModule } from '@angular/fire/auth';
// import { AngularFireMessagingModule } from '@angular/fire/messaging';
// import { AngularFireModule } from '@angular/fire';
// import { MessagingService } from './messaging.service';
import { CommonheaderComponent } from './commonheader/commonheader.component';
const agoraConfig: AgoraConfig = {
  AppID: '0d3dc82f7d0e421484379849f310f4a3',
};
// const socketConfig: SocketIoConfig =
//   { url: environment.CurrentSocketServer, options: {reconnection:true,reconnectionAttempts:50,reconnectionDelay:500, transports: ['websocket', 'polling']  } };

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SplashScreenComponent,
    SignupComponent,
    OtpVerificationComponent,
    AboutUsComponent,
    CompanyComponent,
    HomepageCompanyComponent,
    HeaderCompanyComponent,
    ProfileCompanyComponent,
    EditprofileCompanyComponent,
    MessageCenterCompanyComponent,
    FootercompanyComponent,
    CompanyAboutUsComponent,
    CustomersComponent,
    HomepageCustomerComponent,
    HeaderCustomerComponent,
    ProfileCustomerComponent,
    EditprofileCustomerComponent,
    MessageCenterCustomerComponent,
    UploadAssignmentCustomerComponent,
    AddAssignmentCustomerComponent,
    EditAssignmentCustomerComponent,
    FootercustomerComponent,
    CompanyContactUsComponent,
    PhoneFormatDirective,
    FormatPhonePipe,
    FormatphonenewPipe,
    CustomeraboutusComponent,
    VideoCallComponent,
    CommonheaderComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatSelectModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMatSelectSearchModule,
    MatSnackBarModule,
    NgOtpInputModule,
    NgxPaginationModule,
    SlickCarouselModule,
    RatingModule,
    NgxAgoraModule.forRoot(agoraConfig),
    // AngularFireDatabaseModule,
    // AngularFireAuthModule,
    // AngularFireMessagingModule,
    // AngularFireModule.initializeApp(environment.firebaseConfig),
    // SocketIoModule.forRoot(socketConfig),
    FacebookModule.forRoot(),
    ClipboardModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    // MessagingService,
    // AngularFireDatabase
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
