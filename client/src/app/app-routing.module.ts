import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminRegistrationComponent } from './admin-registration/admin-registration.component';
import { DoctorRegistrationComponent } from './doctor-registration/doctor-registration.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { DoctorLoginComponent } from './doctor-login/doctor-login.component';
import { ForgotComponent } from './forgot/forgot.component'
import { DoctorHomepageComponent } from './doctor-homepage/doctor-homepage.component';
import { PatientRegistrationComponent } from './patient-registration/patient-registration.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { UpdatePatientComponent } from './update-patient/update-patient.component';
import { RefundComponent } from './refund/refund.component';
import { BillComponent } from './bill/bill.component';
import { BilSummaryComponent } from './bil-summary/bil-summary.component';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
//import { UpdateBillComponent } from './update-bill/update-bill.component';
import { BillInvoiceComponent } from './bill-invoice/bill-invoice.component';
import { ServicesComponent } from './services/services.component';
import { LabtestsComponent } from './labtests/labtests.component';
import { PrescriptionComponent } from './prescription/prescription.component';
import { DiscountComponent } from './discount/discount.component';

const routes: Routes = [
  { path: 'adminregistration', component: AdminRegistrationComponent },
  { path: 'doctorregistration', component: DoctorRegistrationComponent },
  { path: 'adminlogin', component: AdminLoginComponent },
  // { path: '', component: HomepageComponent },
  { path: '', component: DoctorLoginComponent },
  { path: 'doctorlogin', component: DoctorLoginComponent },
  { path: 'forgot', component: ForgotComponent },
  { path: 'doctorhomepage', component: DoctorHomepageComponent },
  { path: 'patientregistration', component: PatientRegistrationComponent },
  { path: 'patientlist', component: PatientListComponent },
  { path: 'update-patient/:id', component: UpdatePatientComponent },
  { path: 'refund/:id', component: RefundComponent },
  { path: 'discount/:id', component: DiscountComponent },
  { path: 'services/:id', component: ServicesComponent },
  { path: 'labtests/:id', component: LabtestsComponent },
  { path: 'bill/:id', component: BillComponent },
  //{ path: 'updatebill/:id', component: UpdateBillComponent },
  { path: 'billsummary', component: BilSummaryComponent },
  { path: 'doctordashboard', component: DoctorDashboardComponent },
  { path: 'billinvoice', component: BillInvoiceComponent },
  { path: 'prescription', component: PrescriptionComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
