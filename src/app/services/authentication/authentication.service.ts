import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ArgumentOutOfRangeError, BehaviorSubject, of } from 'rxjs';
import Swal from 'sweetalert2';
import { ApilistService } from '../api/apilist.service';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isLoggedIn: any;
  backToHome = 'company';
  userData;
  private photoUrl = new BehaviorSubject<string>('assets/images/noimageavailable.png');
  currentPhotoUrl = this.photoUrl.asObservable();
  constructor(private httpClient:HttpClient,private apiurl:ApilistService,private snackBar: MatSnackBar) { }
  checkLoginStatus() {
    if (localStorage.getItem('loginStatus')) {
      return this.isLoggedIn = (localStorage.getItem('loginStatus') === 'true');
    }
    return this.isLoggedIn  = false;
  }
  changeMemberPhoto(photoUrl: string) {
    this.photoUrl.next(photoUrl);
}
  getBackToHome() {
    if (this.checkLoginStatus() === true) {
      return this.backToHome = (localStorage.getItem('userType') === 'user' ? 'customers/' : 'company/');
    } else {
      return this.backToHome = '';
    }
  }


  //{ headers: { Authorization: JSON.parse(localStorage.userDetails).token } }

  getHomepageServiceType(){
    return this.httpClient.get<any>(this.apiurl.homepageServiceName);
  }

  getServiceType(){
    return this.httpClient.get<any>(this.apiurl.GetAllServiceType);
  }

  getAllArea(){
    return this.httpClient.get<any>(this.apiurl.allArea);
  }

  getCustomerProfile(){
    return this.httpClient.get<any>(this.apiurl.customerProfile);
  }

  getCompanyProfileAfterLogin(){
    return this.httpClient.get<any>(this.apiurl.companyProfile);
  }
  userprofileUpdate(formData)
  {
    
  return this.httpClient.put<any>(this.apiurl.customerProfileEdit,formData);
  }

  companyprofileUpdate(formData)
  {
    
  return this.httpClient.put<any>(this.apiurl.companyProfileEdit,formData);
  }

  getServiceListById(id){
    return this.httpClient.get<any>(this.apiurl.GetServiceSubById+"/"+id);
  }

  getAssignmentDetails(id){
    return this.httpClient.get<any>(this.apiurl.GetAssignmentById+"/"+id);
  }


  getAssignmentListInvite(id){
    return this.httpClient.get<any>(this.apiurl.GetAssignmentByCompanyId+"/"+id);
  }

  getCompanyProfile(id){
    return this.httpClient.get<any>(this.apiurl.getCompanyProfile+"/"+id);
  }

  getCustomersProfile(id){
    return this.httpClient.get<any>(this.apiurl.getCustomersProfile+"/"+id);
  }

  signupCompanyPost(params){
    return this.httpClient.post<any>(this.apiurl.signupCompany,params);
  }

  loginCompanyPost(params){
    return this.httpClient.post<any>(this.apiurl.loginCompany,params);
  }

  loginCustomerPost(params){
    return this.httpClient.post<any>(this.apiurl.loginCustomer,params);
  }

  signupCustomerPost(params){
    return this.httpClient.post<any>(this.apiurl.signupCustomer,params);
  }

  verificationCompany(params){
    return this.httpClient.post<any>(this.apiurl.verifyCompany,params);
  }

  resendOtpCompany(params){
    return this.httpClient.post<any>(this.apiurl.resendotpcompany,params);
  }


  verificationCustomer(params){
    return this.httpClient.post<any>(this.apiurl.verifyCustomer,params);
  }

  resendOtpCustomer(params){
    return this.httpClient.post<any>(this.apiurl.resendotpcustomer,params);
  }

  feedbackCompany(params){
    return this.httpClient.post<any>(this.apiurl.feedbackCompany,params);
  }

  feedbackCustomer(params){
    return this.httpClient.post<any>(this.apiurl.feedbackCustomer,params);
  }


  interestedCompany(id,params){
    return this.httpClient.post<any>(this.apiurl.interestedNotInterestedCompany+"/"+id,params);
  }

  logout(){

   

    return this.httpClient.post<any>(this.apiurl.logoutCompany,{});
    
  }

  logoutcustomer(){

   

    return this.httpClient.post<any>(this.apiurl.logoutCustomer,{});
    
  }

  // get homepageDatacompany


  getCompanyHomepageData(selectedServiceArea,selectedServiceName,page,size){


    return this.httpClient.get<any>(this.apiurl.companyHomepage+"/"+selectedServiceArea+"/"+selectedServiceName+"?page="+page+"&size=" + size );
        //("https://maps.googleapis.com/maps/api/timezone/json?location=" + lat + "," + long + "&timestamp=" + date_timestamp + "&key=AIzaSyA5I34koi9SnHUU6R5Ps7OcdAzkLi1w_I8")
  }


  getCustomerHomepageData(selectedServiceArea,selectedServiceName,page,size){


    return this.httpClient.get<any>(this.apiurl.customerHomepage+"/"+selectedServiceArea+"/"+selectedServiceName+"?page="+page+"&size=" + size );
        //("https://maps.googleapis.com/maps/api/timezone/json?location=" + lat + "," + long + "&timestamp=" + date_timestamp + "&key=AIzaSyA5I34koi9SnHUU6R5Ps7OcdAzkLi1w_I8")
  }


  getComapnyServiceArea(){
    return this.httpClient.get<any>(this.apiurl.companyServiceArea);
  }

  getComapnyServiceName(){
    return this.httpClient.get<any>(this.apiurl.companyServiceName);
  }


  getCustomerAssignmentData(page,size){
    return this.httpClient.get<any>(this.apiurl.customerAssignmentData+"?page="+page+"&size=" + size );
  }


  deleteCustomerAssignment(id){

    return this.httpClient.delete<any>(this.apiurl.deleteCustomerAssignmentUrl+"/"+id);

  }

  createAssignment(formData)
  {
    
  return this.httpClient.post<any>(this.apiurl.createAssignmentUrl,formData);
  }


  updateAssignment(formData,id)
  {
    
  return this.httpClient.post<any>(this.apiurl.updateAssignmentUrl+"/"+id,formData);
  }
  

  openSnackBar(content, action, duration,color,ver,hor) {
    console.log("inside message")
    this.snackBar.open(content, action, {
      duration: 3000,
      verticalPosition: ver, // Allowed values are  'top' | 'bottom'
      horizontalPosition: hor ,
      
      panelClass: [color]// Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
    });
  }

  presentToast( msg: any,type: any, position: any) {
   
    const Toast = Swal.mixin({
      toast: true,
      position: position,//'top-end',
      showCancelButton: false,
      showCloseButton: true,
      showConfirmButton: false,
      timer: 3000
    });
    Toast.fire({
      icon: type,
      title: msg
    })
  }

  ProcessError(error){
    console.log(error)
        // errors9[']]\'] other than our normal API Response/ErrorMessage format
        if (typeof error === 'object' && error.constructor.name === 'Response') {
          error = {
            ErrorMessage: 'Network error',
            Response: 30
          };
        } else if (typeof error === 'string' || error == null) {
          error = {
            ErrorMessage: 'Unexpected error',
            Response: 0
          };
        } else if (error.hasOwnProperty('name') && error.name === 'TimeoutError') {
          error = {
            ErrorMessage: 'Request timed out',
            Response: 3
          };
        }
    
        return error;
      }


      getCompanylistAssignment(area,service){
        return this.httpClient.post<any>(this.apiurl.getCompanyListAssignmentUrl,{area:area,service:service});
      }

      inviteCompanyAssignment(id,params){
        return this.httpClient.post<any>(this.apiurl.addCompanyListAssignmentUrl+"/"+id,params);
      }

      offerAccept(id){
        return this.httpClient.post<any>(this.apiurl.offerAccept+"/"+id,{});
      }

      offerCompleted(id){
        return this.httpClient.post<any>(this.apiurl.offerComplete+"/"+id,{});
      }

      inviteCompanyAssignmentList(params){
        return this.httpClient.post<any>(this.apiurl.addCompanyListAssignmentMultipleUrl,params);
      }
    
      aboutUs(){
        return this.httpClient.get<any>(this.apiurl.aboutUsComapnyUrl);
        
      }

      assignmentCompletedList(){
        return this.httpClient.get<any>(this.apiurl.assignmentCompletedList);
        
      }


      
      invitationUser(){
        return this.httpClient.get<any>(this.apiurl.invitationUser);
      }
      invitationCompany(){
        return this.httpClient.get<any>(this.apiurl.invitationCompany);
      }

      inviteCustomerAction(id,params){
        return this.httpClient.post<any>(this.apiurl.customerInviteAction+"/"+id,params);
      }

      inviteCompanyAction(id,params){
        return this.httpClient.post<any>(this.apiurl.companyInviteAction+"/"+id,params);
      }

      sendReminder(id){
        return this.httpClient.post<any>(this.apiurl.sendReminder+"/"+id,{});
      }

      cancelInv(id){
        return this.httpClient.post<any>(this.apiurl.cancelInvitation+"/"+id,{});
      }

      reviewAdd(param){
        return this.httpClient.post<any>(this.apiurl.addReview,param);
      }

      fcmUpdate(param){
        console.log("params fcmupdate");
        console.log(param);
        
        return this.httpClient.post<any>(this.apiurl.fcmConnect,param);
      }


      connectCall(param){
       
        
        return this.httpClient.post<any>(this.apiurl.connectCall,param);
      }

      disconnectCall(param){
        
        
        return this.httpClient.post<any>(this.apiurl.disconnectCall,param);
      }

      connectAgora(channelName){
        return this.httpClient.get<any>(this.apiurl.agoraConnect+"?channelName="+channelName);
      }

      translateText(param){
        
        
        return this.httpClient.get<any>(this.apiurl.translateText+"?text="+param.text+"&toLanguage="+param.toLanguage);
      }

 
}
