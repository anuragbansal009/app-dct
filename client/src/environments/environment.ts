// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  title: 'App-DCT | Local',
  apiURL: 'http://localhost:5000/api',
  adminRegistrationAPI: 'http://localhost:5000/api/admin',
  doctorRegistrationAPI: 'http://localhost:5000/api/doctor',
  adminLogin: 'http://localhost:5000/api/admin/login',
  doctorRegistration: 'http://localhost:4200/doctorregistration',
  login: 'http://localhost:5000/api/login',
  forgot: 'http://localhost:5000/api/forgot',
  doctorLogin: 'http://localhost:4200/doctorlogin',
  doctorHomepage: 'http://localhost:4200/doctorhomepage',
  recaptcha: {
    siteKey: '6LdfWRYgAAAAAO64AMfigSwfKz5-5uxZrNGiBVBK',
  },
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
