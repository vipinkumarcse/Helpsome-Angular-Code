import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import AgoraRTC from 'agora-rtc-sdk'
import { AgoraClient, ClientEvent, NgxAgoraService, Stream, StreamEvent } from 'ngx-agora';
import { AuthenticationService } from '../services/authentication/authentication.service';
declare var $: any
@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.scss']
})
export class VideoCallComponent implements OnInit {
  remoteCalls: string[] = [];
  private client: AgoraClient;
  private localStream: Stream;
  private uid: number;
  isAdiomute: boolean = true;
  isVdiomute: boolean = true;
  appidv = "0d3dc82f7d0e421484379849f310f4a3";
  // channelv="testingtoken";
  tokenv: any    // For the local client.
  params: any;
  channelId: any;
  localCallId: string = 'agora_local';
  groupId: any;
  localTrackState = {
    videoTrackEnabled: true,
    audioTrackEnabled: true
  }
  constructor(
    private ngxAgoraService: NgxAgoraService, private service: AuthenticationService, private router: Router, private activatedRoute: ActivatedRoute
  ) {
    //     this.rtc.localAudioTrack
    this.activatedRoute.queryParams.subscribe(params => {
      this.params = params
    console.log(this.params, this.params.token, "parasm");
    });
    this.uid = Math.floor(Math.random() * 100);

  }

  ngOnInit(): void {
    this.client = this.ngxAgoraService.createClient({ mode: 'rtc', codec: 'h264' });
    this.joinformsubmit();
  }
  join(onSuccess?: (uid: number | string) => void, onFailure?: (error: Error) => void): void {
    this.client.join(this.params['token'], this.params['id'], this.uid, onSuccess, onFailure);
  }

  /**
   * Attempts to upload the created local A/V stream to a joined chat room.
   */
  publish(): void {
    this.client.publish(this.localStream, err => console.log('Publish local stream error: ' + err));
  }

  private assignClientHandlers(): void {
    this.client.on(ClientEvent.LocalStreamPublished, evt => {
      console.log('Publish local stream successfully');
    });

    this.client.on(ClientEvent.Error, error => {
      console.log('Got error msg:', error.reason);
      if (error.reason === 'DYNAMIC_KEY_TIMEOUT') {
        this.client.renewChannelKey(
          '',
          () => console.log('Renewed the channel key successfully.'),
          renewError => console.error('Renew channel key failed: ', renewError)
        );
      }
    });

    this.client.on(ClientEvent.RemoteStreamAdded, evt => {
      const stream = evt.stream as Stream;
      this.client.subscribe(stream, { audio: true, video: true }, err => {
        console.log('Subscribe stream failed', err);
      });
    });

    this.client.on(ClientEvent.RemoteStreamSubscribed, evt => {
      const stream = evt.stream as Stream;
      const id = this.getRemoteId(stream);
      if (!this.remoteCalls.length) {
        this.remoteCalls.push(id);
        setTimeout(() => stream.play(id), 1000);
      }
    });

    this.client.on(ClientEvent.RemoteStreamRemoved, evt => {
      const stream = evt.stream as Stream;
      if (stream) {
        stream.stop();
        this.remoteCalls = [];
        // this.localStream.stop(); // stop the stream
        // this.localStream.close();
        // // this.remoteCalls=[];
        // $("#remote").html("");

        // // leave the channel

        // $("#local").text("");
        // $("#join").attr("disabled", false);
        // $("#leave").attr("disabled", true);
        // $("#device-wrapper").css("display", "none");
        // this.hideMuteButton();
        // console.log(`Remote stream is removed ${stream.getId()}`);
      }
    });

    this.client.on(ClientEvent.RemoteAudioMuted, evt => {
      const stream = evt.stream as Stream;
      if (stream) {
        stream.muteAudio();
        // this.remoteCalls = [];
        // console.log(`Remote stream is removed ${stream.getId()}`);
      }
    });

    this.client.on(ClientEvent.RemoteAudioUnmuted, evt => {
      const stream = evt.stream as Stream;
      if (stream) {
        stream.unmuteAudio();
        // this.remoteCalls = [];
        // console.log(`Remote stream is removed ${stream.getId()}`);
      }
    });

    this.client.on(ClientEvent.RemoveVideoMuted, evt => {
      const stream = evt.stream as Stream;
      if (stream) {
        stream.muteVideo();
        // this.remoteCalls = [];
        // console.log(`Remote stream is removed ${stream.getId()}`);
      }
    });


    this.client.on(ClientEvent.RemoteVideoUnmuted, evt => {
      const stream = evt.stream as Stream;
      if (stream) {
        stream.unmuteVideo();
        // this.remoteCalls = [];
        // console.log(`Remote stream is removed ${stream.getId()}`);
      }
    });
    this.client.on(ClientEvent.PeerLeave, evt => {
      const stream = evt.stream as Stream;
      if (stream) {
        stream.stop();
        this.remoteCalls = this.remoteCalls.filter(call => call !== `${this.getRemoteId(stream)}`);
        console.log(`${evt.uid} left from this channel`);
      }
    });
  }

  private assignLocalStreamHandlers(): void {
    this.localStream.on(StreamEvent.MediaAccessAllowed, () => {
      // alert('accessAllowed');
    });

    // The user has denied access to the camera and mic.
    this.localStream.on(StreamEvent.MediaAccessDenied, () => {
      // alert('accessDenied');
    });
  }

  private initLocalStream(onSuccess?: () => any): void {

    const constraints = {
      bandwidthProfile: {
        video: {
          dominantSpeakerPriority: 'high',
          mode: 'collaboration',
          renderDimensions: {
            high: { height: 720, width: 1280 },
            standard: { height: 90, width: 160 }
          }
        }
      },
      dominantSpeaker: true,
      logLevel: 'debug',
      maxAudioBitrate: 16000,
      video: { height: 720, frameRate: 24, width: 1280 },
      audio: true
    };
    const supports = navigator.mediaDevices.getSupportedConstraints();

    if (!supports.width || !supports.height || !supports.frameRate || !supports.facingMode) {
      this.service.openSnackBar("Please make sure your microphone and camera are connected!", 'Done', '5000','red-snackbar' ,'end','center'
);
    }
    else {
      if ('mediaDevices' in navigator && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia(constraints)
          .then((stream: any) => {
            this.localStream.init(
              () => {
                // The user has granted access to the camera and mic.
                this.localStream.play(this.localCallId);
                if (onSuccess) {
                  onSuccess();
                }
              },
              err => console.error('getUserMedia failed', err)
            );
          })
          .catch((err: any) => {
         //   this.isError = true;
            // this.commonService.loader(false);
            // this.isGoingStarted = false;
            // this.isCallStarted = false;
            if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
             // this.content = 'required track is missing!';
              this.service.openSnackBar("required track is missing!", 'Done', '5000','red-snackbar' ,'end','center'
);
            } else if (err.name === 'DOMException' || err.name === 'DOMException') {
             // this.content = 'required track is missing!';
              this.service.openSnackBar("required track is missing!", 'Done', '5000','red-snackbar' ,'end','center'
);
             // this.commonService.presentToast('error', 'top-end', this.content);
            } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
            //  this.content = 'webcam or mic are already in use !';
              this.service.openSnackBar("webcam or mic are already in use !", 'Done', '5000','red-snackbar' ,'end','center'
);
             // this.commonService.presentToast('error', 'top-end', this.content);
            } else if (err.name === 'OverconstrainedError' || err.name === 'ConstraintNotSatisfiedError') {
             // this.content = 'constraints can not be satisfied by this devices!';
              this.service.openSnackBar("constraints can not be satisfied by this devices!", 'Done', '5000','red-snackbar' ,'end','center'
);
            //  this.commonService.presentToast('error', 'top-end', this.content);
            } else {
             // this.content = 'Please make sure your microphone and camera are connected!';
              this.service.openSnackBar("Please make sure your microphone and camera are connected!", 'Done', '5000','red-snackbar' ,'end','center'
);
              // this.commonService.presentToast('error', 'top-end', this.content);
            }
          });
      }
    }
 
  }

  private getRemoteId(stream: Stream): string {
    return `agora_remote-${stream.getId()}`;
  }


  hideMuteButton() {
    $("#mute-video").css("display", "none");
    $("#mute-audio").css("display", "none");
  }

  showMuteButton() {
    $("#mute-video").css("display", "inline-block");
    $("#mute-audio").css("display", "inline-block");
  }

  async muteAudio() {
    if (!this.localStream.isAudioOn()) return;
    this.isAdiomute = false
    this.localTrackState.audioTrackEnabled = false;
    await this.localStream.muteAudio();
    
    
    // $("#mute-audio").attr("src",'test.png');


  }

  async muteVideo() {
    console.log("inside video"+this.localStream.isVideoOn());
    //if (!this.localStream.isVideoOn()) return;
    this.isVdiomute=false;
    this.localTrackState.videoTrackEnabled = false;
    await this.localStream?.muteVideo();
    
   
   // $("#mute-video").text("Unmute Video");
  }

  async unmuteAudio() {
    if (this.localStream.isAudioOn()) return;
  this.isAdiomute = true
  this.localTrackState.audioTrackEnabled = true;
  await this.localStream?.unmuteAudio();
 
    // $("#mute-audio").text("Mute Audio");
  }

  async unmuteVideo() {
    if (this.localStream.isVideoOn()) return;
    this.isVdiomute=true;
    this.localTrackState.videoTrackEnabled = true;
   await this.localStream?.unmuteVideo();
    
   // $("#mute-video").text("Mute Video");
  }

  joinformsubmit() {
    // $("#join-form").submit(async  (e:any) => {
    //   console.log(e,"data")
    //   e.preventDefault();
    //   $("#join").attr("disabled", true);
    try {
      this.assignClientHandlers();

      this.localStream = this.ngxAgoraService.createStream({ streamID: this.uid, audio: true, video: true, screen: false });
      this.assignLocalStreamHandlers();
      // Join and publish methods added in this step
      this.initLocalStream(() => this.join(uid => this.publish(), error => console.error(error)));
      this.showMuteButton();

    } catch (error) {
      console.error(error);
    } finally {
      $("#leave").attr("disabled", false);
    }
    // });
  }
  async leave() {
    //var stream = evt.stream;
    this.localStream.stop(); // stop the stream
    this.localStream.close();
    this.remoteCalls = [];
    $("#remote").html("");

    // leave the channel

    $("#local").text("");
    $("#join").attr("disabled", false);
    $("#leave").attr("disabled", true);
    $("#device-wrapper").css("display", "none");
    // var fd = new FormData
    // // token, calltype, receiverIds
    // fd.append('calltype', 'single')
    // fd.append('receiverId', this.params.recieverId);

    var data={
      "invitationId" :  this.params.id,
      "callId" :this.params.callId
    }
    this.service.disconnectCall(data).subscribe((res: any) => {
      if (!res.isError) {
       // this.common.hideSpinner();
        this.router.navigate(['/'])
        // this.getMutualFriend()
      }
      else {  }
    })
    this.hideMuteButton();
    console.log("client leaves channel success");
  }
  leaveform() {
    this.leave();
  }
  muteaudioform() {
    $("#mute-audio").click((e: any) => {
      // if (this.localStream.isAudioOn()) {
      //   // this.isAdiomute=true
      //   console.log(this.localStream.isAudioOn(), "this.localStream.isAudioOn()")
      //   this.muteAudio();
      // } else {
      //   this.unmuteAudio();
      //   // this.isAdiomute=false
      // }

      if (this.localTrackState.audioTrackEnabled) {
        this.muteAudio();
      } else {
        this.unmuteAudio();
      }
    });

  }

  mutevideoform() {
    $("#mute-video").click((e: any) => {
console.log(this.localTrackState.videoTrackEnabled+"insidemute video");
      if (this.localTrackState.videoTrackEnabled) {
        this.muteVideo();
      } else {
        this.unmuteVideo();
      }
      // if (this.localStream.isVideoOn()) {
      //   console.log(this.localStream.isVideoOn(), "this.localStream.isAudioOn()")
      //   this.muteVideo();
      // } else {
      //   this.unmuteVideo();
      // }
    })
  }

  ngOnDestroy(): void {
   this.leave();
    // this.removeRoomArr();
    // this.setCurrentTwilioAlert(false);
  }

}