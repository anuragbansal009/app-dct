// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  title: 'App-DCT | Local',
  apiURL: 'http://localhost:5000/api',
  logoUrl: 'https://www.freepnglogos.com/uploads/real-madrid-logo-png/real-madrid-logo-real-madrid-centenario-logo-png-transparent-svg-vector-bie-supply-16.png',
  adminRegistrationAPI: 'http://localhost:5000/api/admin',
  doctorRegistrationAPI: 'http://localhost:5000/api/doctor',
  getAllDoctors: 'http://localhost:5000/api/getdoctor',
  getOneService: 'http://localhost:5000/api/services/getoneservice',
  adminLogin: 'http://localhost:5000/api/admin/login',
  doctorRegistration: 'http://localhost:4200/doctorregistration',
  patientRegistrationAPI: 'http://localhost:5000/api/patient/create',
  patientRegistration: 'http://localhost:4200/patientregistration',
  login: 'http://localhost:5000/api/login',
  forgot: 'http://localhost:5000/api/forgot',
  doctorLogin: 'http://localhost:4200/doctorlogin',
  doctorHomepage: 'http://localhost:4200/doctorhomepage',
  recaptcha: {
    siteKey: '6LdfWRYgAAAAAO64AMfigSwfKz5-5uxZrNGiBVBK',
  },
  patientlist: 'http://localhost:4200/patientlist',
  servicesAdd: 'http://localhost:5000/api/services/add',
  servicesGet: 'http://localhost:5000/api/services/get',
  labtestAdd: 'http://localhost:5000/api/labtest/add',
  labtestGet: 'http://localhost:5000/api/labtest/get',
  patientsGet: 'http://localhost:5000/api/patient/get',
  patientBillSummary: 'http://localhost:5000/api/patient/billsummary',
  patientGetid: 'http://localhost:5000/api/patient/getid',
  billGetId: 'http://localhost:5000/api/bill/getid',
  patientBill: 'http://localhost:5000/api/patient/bill/',
  getAllocateId: 'http://localhost:5000/api/patient/getallocateid',
  patientFilter: 'http://localhost:5000/api/patient/filter',
  updatePatient: 'http://localhost:5000/api/patient/updatepatient/',
  updateService: 'http://localhost:5000/api/services/updateservice/',
  deleteService: 'http://localhost:5000/api/services/delete',
  doctorDashboard: 'http://localhost:4200/doctordashboard',
  getServicesDoc: 'http://localhost:5000/api/services/getdoc',
  patientBills: 'http://localhost:5000/api/patient/patientbills',
  refundBill: 'http://localhost:5000/api/patient/refund',
  refundBillAmount: 'http://localhost:5000/api/bill/refund'
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
