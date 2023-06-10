// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


import firebase from "firebase/compat";
import initializeApp = firebase.initializeApp;

export const environment = {
  production: false,
  MOCK_API: 'https://647e149eaf984710854ae9b6.mockapi.io',
  firebaseConfig: {
    apiKey: "AIzaSyB7zW6SOBNO8vaU7fCrZwIzahVVV7oMoz0",
    authDomain: "todoappka.firebaseapp.com",
    projectId: "todoappka",
    storageBucket: "todoappka.appspot.com",
    messagingSenderId: "793622112671",
    appId: "1:793622112671:web:d717501672b8c3776935aa"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
