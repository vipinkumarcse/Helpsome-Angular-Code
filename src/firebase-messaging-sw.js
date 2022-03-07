
// // Give the service worker access to Firebase Messaging.
// // Note that you can only use Firebase Messaging here, other Firebase libraries
// // are not available in the service worker.
// importScripts('https://www.gstatic.com/firebasejs/8.7.1/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/8.7.1/firebase-messaging.js');

// // importScripts('https://www.gstatic.com/firebasejs/8.8.1/firebase-app.js');
// // importScripts('https://www.gstatic.com/firebasejs/8.8.1/firebase-messaging.js')

// // Initialize the Firebase app in the service worker by passing in the
// // messagingSenderId.
// firebase.initializeApp({
//   apiKey: "AIzaSyBwQ24llmRtgo9DWM2rtYL5AdAJl0hPNvw",
//   authDomain: "hjelpsom-test.firebaseapp.com",
//   projectId: "hjelpsom-test",
//   storageBucket: "hjelpsom-test.appspot.com",
//   messagingSenderId: "211509009499",
//   appId: "1:211509009499:web:cc7e2338b975e359e9737e",
//   measurementId: "G-LRVNBCNBHJ"
// })


// const messaging = firebase.messaging();


// self.addEventListener('notificationclick', function(event) {

//     console.log("=============================heleo i ama clicjed");
//     const clickedNotification = event.notification;
//     clickedNotification.close();
  
//     // Do something as the result of the notification click
//     // const promiseChain = doSomething();
//     // event.waitUntil(promiseChain);
//   });


// // firebase.initializeApp({
// //     'messagingSenderId': '139909969068'
// //   });

// // Retrieve an instance of Firebase Messaging so that it can handle background
// // messages.
// messaging.onMessage((payload) => {
//     console.log('Message received. ', payload);
//   });
  
//   messaging.onBackgroundMessage((payload) => {
//     console.log('[firebase-messaging-sw.js] Received background message ', payload);
//     const notificationTitle = 'Background Message Title';
//     const notificationOptions = {
//       body: 'Background Message body.',
//       icon: '/firebase-logo.png'
//     };
// })
  
// messaging.setBackgroundMessageHandler(function(payload) {
//     console.log("message firbase js payload"+JSON.stringify(payload));
// })
