// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'https://api-dev.hjelpsom.app/v1/',
  clientBaseurl:'https://api-dev.hjelpsom.app/#/splashscreen',
  CurrentSocketServer: 'https://api-dev.hjelpsom.app',
LocalSocketServer: 'http://localhost:3030/',

 firebaseConfig:{
  apiKey: "AIzaSyBwQ24llmRtgo9DWM2rtYL5AdAJl0hPNvw",
  authDomain: "hjelpsom-test.firebaseapp.com",
  projectId: "hjelpsom-test",
  storageBucket: "hjelpsom-test.appspot.com",
  messagingSenderId: "211509009499",
  appId: "1:211509009499:web:cc7e2338b975e359e9737e",
  measurementId: "G-LRVNBCNBHJ"
}
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
