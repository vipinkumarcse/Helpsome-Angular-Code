import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApilistService } from 'src/app/services/api/apilist.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-customeraboutus',
  templateUrl: './customeraboutus.component.html',
  styleUrls: ['./customeraboutus.component.scss']
})
export class CustomeraboutusComponent implements OnInit {

  aboutUs;
  baseImgUrlComp="https://api-dev.hjelpsom.app/static/";
  isLoading:boolean=false;

  constructor(private http: HttpClient, public apiList: ApilistService, private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.getAboutUs();
  }

  getAboutUs(){
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('loader_active');
    this.isLoading=true;
    this.authenticationService.aboutUs().subscribe(res => {
      console.log("service data" + JSON.stringify(res));
      this.aboutUs = res.aboutus;
     

    }).add(() => { this.isLoading=false;body.classList.remove('loader_active'); });
  }

  @HostListener('document:keyup', ['$event'])
  onKeyUp(ev:KeyboardEvent) {
    if(ev.code == "Space") {
      let vid = <HTMLVideoElement>document.getElementById("my_video_1");
      if(vid.paused) {
        vid.play();
      }
      else {
        vid.pause();
      }
    }
  }

}
