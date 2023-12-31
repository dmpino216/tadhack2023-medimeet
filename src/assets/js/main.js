'use strict';

console.log('Starting');

let isEngageDigitalSdkLoaded = false;

/* const connectBtn = document.getElementById('connectBtn');
connectBtn.addEventListener('click', connectToEngageDigital); */

window.addEventListener("load", connectToEngageDigital);

const disConnectBtn = document.getElementById('disconnectBtn');
disConnectBtn.addEventListener('click', disConnectFromEngageDigital)
disConnectBtn.disabled = true;

const makeCallBtn = document.getElementById('makeCallBtn')
makeCallBtn.addEventListener('click', makeCall);
makeCallBtn.disabled = false;

const endCallBtn = document.getElementById('endCallBtn');
endCallBtn.addEventListener('click', disconnectCall);
endCallBtn.disabled = true;

const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');

const statusDiv = document.getElementById('status');

const sipIdentityDiv = document.getElementById('sipIdentity');
let engageDigitalClient;
let engageDigitalSession;

const remoteDiv = document.getElementById('remoteDiv');
remoteDiv.hidden = false;

const evaGif = document.getElementById('evaGif');

function connectToEngageDigital() {
  
  console.log('userIdentity ', document.getElementById('userIdentity').value)
  console.log('connectToEngageDigital')
  const engageDomain = document.getElementById('engageDomain').value;

  if (isEngageDigitalSdkLoaded) {
    const userIdentity = document.getElementById('userIdentity').value;

    const config = {
      log: {
        console: { enable: true },
      },
      needRegistration: true,
      headers: { apikey: "eyJ4NXQiOiJZamd5TW1GalkyRXpNVEZtWTJNMU9HRmtaalV3TnpnMVpEVmhZVGRtTnpkaU9HUmhNR1kzWmc9PSIsImtpZCI6ImFwaV9rZXlfY2VydGlmaWNhdGVfYWxpYXMiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJyYWRpc3lzQGNhcmJvbi5zdXBlciIsImFwcGxpY2F0aW9uIjp7Im93bmVyIjoicmFkaXN5cyIsInRpZXJRdW90YVR5cGUiOm51bGwsInRpZXIiOiJVbmxpbWl0ZWQiLCJuYW1lIjoicnN5cy0xMDA1Ny10YWRoYWNrMjMuY29tIiwiaWQiOjI1MywidXVpZCI6ImUxODdjOTFjLTgzOWItNDc0YS05MDhjLWVhODNhNjU4MDQ3NSJ9LCJpc3MiOiJodHRwczpcL1wvYXBpbS5lbmdhZ2VkaWdpdGFsLmFpOjQ0M1wvb2F1dGgyXC90b2tlbiIsInRpZXJJbmZvIjp7IlVubGltaXRlZCI6eyJ0aWVyUXVvdGFUeXBlIjoicmVxdWVzdENvdW50Iiwic3RvcE9uUXVvdGFSZWFjaCI6dHJ1ZSwic3Bpa2VBcnJlc3RMaW1pdCI6MCwic3Bpa2VBcnJlc3RVbml0IjpudWxsfX0sImtleXR5cGUiOiJQUk9EVUNUSU9OIiwic3Vic2NyaWJlZEFQSXMiOlt7InN1YnNjcmliZXJUZW5hbnREb21haW4iOiJjYXJib24uc3VwZXIiLCJuYW1lIjoiQ2FsbEFQSVByb2R1Y3QiLCJjb250ZXh0IjoiXC9hcGlcL3YxIiwicHVibGlzaGVyIjoicmFkaXN5cyIsInZlcnNpb24iOiIxLjAuMCIsInN1YnNjcmlwdGlvblRpZXIiOiJVbmxpbWl0ZWQifSx7InN1YnNjcmliZXJUZW5hbnREb21haW4iOiJjYXJib24uc3VwZXIiLCJuYW1lIjoiU2VydmljZUFQSVByb2R1Y3QiLCJjb250ZXh0IjoiXC9hcGkiLCJwdWJsaXNoZXIiOiJyYWRpc3lzIiwidmVyc2lvbiI6IjEuMC4wIiwic3Vic2NyaXB0aW9uVGllciI6IlVubGltaXRlZCJ9XSwiaWF0IjoxNjk3NTM0OTMwLCJqdGkiOiJmMjI4MTA2YS0xMzIyLTRjZTMtYTdjNS0zNzJlYTRhY2M5MDUifQ==.dqEhDqvq356saSwbVfP6XSzpQJeu3oWkLSyXI2hECHIVVpquO-08Cfbqe9i_joEgOe7HUHU5RUx_-cB3HrHzQxL8bbxVL_kCwcGQDqkeHKtqc7vUOl7zYlPVMFqQNB6PQ0ekGgXfBSSQ-4WgO6h-Fnt2l8lFDhH_Or_dFIasZ_hr01eB018Y0HBKyKjX_Y7PsSxkoEeEdmKVOAsKfDgtxbHNFad9LoNQYYRaXsjk9gOAg7lP00T8eRYNhxf4FWEx1LsQem6rL7Mhp02g3LbWXwulV6QFr86FtMJiPY6q0se4UEW078YZtwu4x7VaMQjuAeIkSGXYETr_GMmqOfgsSA==" }
    };
    engageDigitalClient = new window.EngageDigital.EngageDigitalClient(userIdentity, engageDomain, config);
    registerForEngageDigitalClientEvents();
  } else {
    //Only load for the first time
    loadEngageDigitalSDK(engageDomain);
  } 
  console.log(document.getElementById('userIdentity').value)
  console.log('connect')
}

function registerForEngageDigitalClientEvents() {

  /**
   * The Ready event is emitted when the SDK is initialized successfully and is ready
   * for operation. Once this event is received connect() API can be invoked.
   */
  engageDigitalClient.addEventHandler('ready', () => {
    engageDigitalClient.connect();
  });

  engageDigitalClient.addEventHandler('connecting', () => {
    updateStatus('Connecting with doctor...');
  });

  /*
   * This event is being called when connectivity is established for the first time.
   */
  engageDigitalClient.addEventHandler('connected', () => {
    updateStatus('Connected with a doctor, please press the call button.');

    connectBtn.disabled = true;
    disConnectBtn.disabled = false;
    makeCallBtn.disabled = false;
    sipIdentityDiv.innerText = "Your Sip Identity : " + engageDigitalClient.getUri().toString();
    sipIdentityDiv.hidden = true;
  });

  /*
   * This event is emitted when the Connection with the engage domain is lost
   */
  engageDigitalClient.addEventHandler('disconnected', () => {
    updateStatus('Disconnected from Engage Digital');
  });

  /*
   * This event is emitted when the sdk tries to re-connect when the already established connection is lost
   */
  engageDigitalClient.addEventHandler('reconnecting', () => {
    updateStatus('Re-connecting to Engage Digital');
  });

  /**
   * Fired when the connection is re-established
   */
  engageDigitalClient.addEventHandler('reconnected', () => {
    updateStatus('Re-connected with a doctor');
  });

  engageDigitalClient.addEventHandler('failed', (error) => {
    updateStatus(JSON.stringify(error));
  });

  engageDigitalClient.addEventHandler('errorinfo', ({ errorMessage }) => {
    updateStatus(errorMessage);
  });

  /**
   * For an incoming/outgoing call this event will be triggered.
   * This event will carry an instance of EngageDigitalSession, on that call related events can be registered.
   * If the new session is for an incoming call EngageDigitalSession's acceptCall() API can be invoked to accept the call.
   */
  engageDigitalClient.addEventHandler('newRTCSession', onNewEngageSession);
}

function disConnectFromEngageDigital() {

  if (engageDigitalClient) {
    engageDigitalClient.disconnect();
    disConnectBtn.disabled = true;
    connectBtn.disabled = false;
    setCallControlButtonsDisableStatus({ make: true, end: true });
    updateStatus('Disconnected from Engage Digital');
    sipIdentityDiv.innerText = "";
  }
}

function makeCall() {

  //connectToEngageDigital();

  const callToNum = document.getElementById('callTo').value;
  setCallControlButtonsDisableStatus({ make: true });
  
  console.log('callTo ', document.getElementById('callTo').value)
  console.log('call')

  try {    
  evaGif.hidden = false;
  remoteDiv.hidden = true;
    engageDigitalClient.makeCall(callToNum, {
      mediaConstraints: {
        audio: true,
        video: true,
      },
      joinWithVideoMuted: false,
    });
  } catch (error) {
    evaGif.hidden = true;
    remoteDiv.hidden = false;
    updateStatus('Call: Provide valid phone number');
    console.log('Error in make call : ' + error.errorMessage);
    setCallControlButtonsDisableStatus({ make: false });
  }
  console.log(document.getElementById('callTo').value)
  evaGif.hidden = false;
  remoteDiv.hidden = true;
  console.log('call')
}

function onNewEngageSession(session) {

  console.log('Got newRTCSession event direction is %s', session.getDirection());

  engageDigitalSession = session;

  /**
   * Can play some media file indicates call is ringing state
   */
  engageDigitalSession.addEventHandler('ringing', () => {
    updateStatus('Call: Ringing');
  });

  /**
    * Call is connected, can use this event to update the status of call in UI
    */
  engageDigitalSession.addEventHandler('connected', () => {
    updateStatus('Call: Connected');
  });

  /**
    * Call is disconnected by the client, can use this event to update the status of call in UI
    */
  engageDigitalSession.addEventHandler('disconnected', () => {
    updateStatus('Call: Disconnected, please press the call button to reconnect with the doctor.');

    setCallControlButtonsDisableStatus({ make: false });
    clearVideoElements();
  });

  /**
    * Call is disconnected by the remote user, can use this event to update the status of call in UI
    */
  engageDigitalSession.addEventHandler('peerdisconnected', () => {
    updateStatus('Call: Remote party disconnected');
    setCallControlButtonsDisableStatus({ make: false });
    clearVideoElements();
  });

  /**
   * Call is failed 
   */
  engageDigitalSession.addEventHandler('failed', () => {
    //Close the dialog if its an incoming call and user has not accepted the call.
    var $confirm = $("#incomingCallDialog");
    $confirm.modal("hide");

    updateStatus('Call: Failed');
    clearVideoElements();
    setCallControlButtonsDisableStatus({ make: false });
  });

  /**
   * On this event attach your local stream to the local video element
   */
  engageDigitalSession.addEventHandler('localstream', ({ stream }) => {
    handleLocalStream(stream);
  });

  engageDigitalSession.addEventHandler('localvideoadded', ({ stream }) => {
    handleLocalStream(stream);
  });

  engageDigitalSession.addEventHandler('localvideoremoved', ({ stream }) => {
    handleLocalStream(stream);
  });

  /**
    * On this event attach remote party's stream to the remote video element
    */
  engageDigitalSession.addEventHandler('remotestream', ({ stream }) => {
    updateStatus('Call: Got Remote video');
    handleRemoteStream(stream);
  });

  engageDigitalSession.addEventHandler('remotevideoadded', ({ stream }) => {
    console.log('Got remotevideoadded event');

    handleRemoteStream(stream);
  });

  engageDigitalSession.addEventHandler('remotevideoremoved', ({ stream }) => {
    console.log('Got remotevideoremoved event');

    remoteVideoElement.srcObject = null;
    remoteVideoElement.srcObject = stream;
  });

  /**
   * Its an Incoming call, need to invoke acceptCall API on EngageDigitalSession.
   */
  if (engageDigitalSession.getDirection() === 'incoming') {
    handleIncomingCall();
  }

}

function handleLocalStream(stream) {
  updateStatus('Call: Got local Video');
  localVideo.srcObject = null;
  localVideo.srcObject = stream;
}

function handleRemoteStream(remoteStream) {

  const videoTracks = remoteStream.getVideoTracks();

  /**
   * Disabling of video tracks in the beginning is required when local offers video and remote doesn't,
   * so that remote audio is available. Once the remote starts streaming video, onloadedmetadata event
   * handler will be invoked and remote video will also be available.
   */
  //Disabling the video tracks by default.
  if (videoTracks.length > 0) {
    for (let i = 0; i < videoTracks.length; ++i) {
      videoTracks[i].enabled = false;
    }
  }

  //Once video is available, video track will be enabled.
  remoteVideo.onloadedmetadata = function () {
    for (let i = 0; i < videoTracks.length; ++i) {
      videoTracks[i].enabled = true;
    }
  };

  remoteVideo.srcObject = null;
  remoteVideo.srcObject = remoteStream;
}

function handleIncomingCall() {

  setCallControlButtonsDisableStatus({ make: true });
  updateStatus('Incoming call....')
  showIncomingCallDialog(incomingCallAcceptAction, incomingCallRejectAction);
}

function incomingCallAcceptAction() {
  updateStatus('User accepted the call');

  try {
    if (engageDigitalSession) {
      engageDigitalSession.acceptCall({

        mediaConstraints: {
          audio: true,
          video: engageDigitalSession.isIncomingCallWithVideo(),
        },
        joinWithVideoMuted: false,
      });
    }
  } catch (error) {
    console.log("Error in acceptCall : " + error.errorMessage);
  }

};

function incomingCallRejectAction() {
  updateStatus(`User rejected the call`);
  try {
    if (engageDigitalSession) {
      engageDigitalSession.rejectCall();
    }
  } catch (error) {
    console.log("Error in rejectCall : " + error.errorMessage);
  }
};

function disconnectCall() {
  evaGif.hidden = true;
  remoteDiv.hidden = false;
  engageDigitalSession.disconnectCall();
  setCallControlButtonsDisableStatus({ make: false });
}

function setCallControlButtonsDisableStatus({ make, end }) {
  makeCallBtn.disabled = make;
  endCallBtn.disabled = end !== undefined ? end : !make;
}

function clearVideoElements() {
  localVideo.srcObject = null;
  remoteVideo.srcObject = null;
}

function updateStatus(status) {
  statusDiv.innerText = status;
  console.log(status);
}

function loadEngageDigitalSDK(engageDomain) {

  updateStatus('Loading Engage Digital sdk...')

  const sdkScriptElement = document.createElement('script');

  sdkScriptElement.type = 'text/javascript';
  sdkScriptElement.async = false;
  sdkScriptElement.src = `https://${engageDomain}/engageDigital.js`

  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(sdkScriptElement, firstScriptTag);

  sdkScriptElement.addEventListener('load', () => {
    isEngageDigitalSdkLoaded = true;
    updateStatus('Engage Digital sdk is loaded')
    connectToEngageDigital();
  });

  sdkScriptElement.addEventListener('error', () => {
    updateStatus(`Failed to load ${sdkScriptElement.src}. Is the given domain proper?`)
  });

}

function showIncomingCallDialog(incomingCallAcceptAction, incomingCallRejectAction) {

  var $confirm = $("#incomingCallDialog");
  $confirm.modal('show');
  $("#lblMsgConfirmYesNo").html('Do you want to accept the call from ' + engageDigitalSession.getRemoteId().uri.toString());
  $("#acceptCallBtn").off('click').click(function () {
    incomingCallAcceptAction();
    $confirm.modal("hide");
  });
  $("#rejectCallBtn").off('click').click(function () {
    incomingCallRejectAction();
    $confirm.modal("hide");
  });
}