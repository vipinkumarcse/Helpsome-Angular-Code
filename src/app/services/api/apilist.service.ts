import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApilistService {
  baseUrl = environment.baseUrl;

    /*signup Section*/
    GetAllServiceType = this.baseUrl + "serviceType/all";
    GetServiceSubById=this.baseUrl + "service/list";
    signupCompany=this.baseUrl + "company/create";
    signupCustomer=this.baseUrl + "user/signup";
    allArea=this.baseUrl +"area/all";

    /*Login */

    loginCompany=this.baseUrl+"company/login";
    loginCustomer=this.baseUrl+"user/login";
    verifyCompany=this.baseUrl+"company/verify-otp";
    verifyCustomer=this.baseUrl+"user/verify-otp";
    resendotpcompany=this.baseUrl+"company/resend-otp";
    resendotpcustomer=this.baseUrl+"user/resend-otp";


    /* logout */

    logoutCompany=this.baseUrl+"company/logout";
    logoutCustomer=this.baseUrl+"user/logout";


    /* feedback company */

    feedbackCompany=this.baseUrl+"feedback/create";

    /* feedback customer */

    feedbackCustomer=this.baseUrl+"feedback/create";


    /* interested/notinterested */

    interestedNotInterestedCompany=this.baseUrl+"assignment/action";

    /* homepage company */

    companyHomepage=this.baseUrl+"company/home-data"

    companyServiceArea=this.baseUrl+"area/all";
    companyServiceName=this.baseUrl+"service/all";


   /* homepage customer */
   customerHomepage=this.baseUrl+"user/home-data";
   getCompanyProfile=this.baseUrl+"user/get-company-details";
   getCustomersProfile=this.baseUrl+"company/user-profile";

   /* profile customer */
   customerProfile=this.baseUrl+"user/get-profile";
   customerProfileEdit=this.baseUrl+"user/edit";

   /* profile company */
   companyProfile=this.baseUrl+"company/get-profile";
   companyProfileEdit=this.baseUrl+"company/edit";

   /* Company Assignment Data */

   customerAssignmentData=this.baseUrl+"assignment/all"

   deleteCustomerAssignmentUrl=this.baseUrl+"assignment/delete";


   createAssignmentUrl=this.baseUrl+"assignment/create";
   updateAssignmentUrl=this.baseUrl+"assignment/edit";
   getCompanyListAssignmentUrl=this.baseUrl+"assignment/invite/company-list";

   addCompanyListAssignmentUrl=this.baseUrl+"assignment/invite-company";

   assignmentCompletedList=this.baseUrl+"assignment/completed-list";



   addCompanyListAssignmentMultipleUrl=this.baseUrl+"assignment/invite/multiple-assignment";

   /* get aboutus company */

   aboutUsComapnyUrl=this.baseUrl+"aboutus/get";

   GetAssignmentById=this.baseUrl+"assignment/detail";

   GetAssignmentByCompanyId=this.baseUrl+"assignment/invite/assignment-list";

   invitationUser=this.baseUrl+"invitation/users-all"
   invitationCompany=this.baseUrl+"invitation/companies-all"

//action invitation
customerInviteAction=this.baseUrl+"invitation/user-action";
companyInviteAction=this.baseUrl+"invitation/company-action";

sendReminder=this.baseUrl+"invitation/send-reminder";

cancelInvitation=this.baseUrl+"invitation/cancel";

addReview=this.baseUrl+"review/create";




offerAccept=this.baseUrl+"assignment/offer";

offerComplete=this.baseUrl+"assignment/mark-completed";

//agora

agoraConnect=this.baseUrl+"agora/access-token";

connectCall=this.baseUrl+"agora/join-call";
disconnectCall=this.baseUrl+"agora/disconnect-call";

fcmConnect=this.baseUrl+"user/update-fcmToken";

homepageServiceName=this.baseUrl+"service/all/type";

translateText=this.baseUrl+"translate/text";



  constructor() { }
}
