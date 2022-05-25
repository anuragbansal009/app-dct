import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminRegistrationComponent } from './admin-registration/admin-registration.component';
import { DoctorRegistrationComponent } from './doctor-registration/doctor-registration.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { DoctorLoginComponent } from './doctor-login/doctor-login.component';
import { ForgotComponent } from './forgot/forgot.component'
import { DoctorHomepageComponent } from './doctor-homepage/doctor-homepage.component';

const routes: Routes = [
  { path: 'adminregistration', component: AdminRegistrationComponent },
  { path: 'doctorregistration', component: DoctorRegistrationComponent },
  { path: 'adminlogin', component: AdminLoginComponent },
  { path: '', component: HomepageComponent },
  { path: 'doctorlogin', component: DoctorLoginComponent },
  { path: 'forgot', component: ForgotComponent },
  { path: 'doctorhomepage', component: DoctorHomepageComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
