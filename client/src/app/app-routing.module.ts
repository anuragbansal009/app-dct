import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminRegistrationComponent } from './admin-registration/admin-registration.component';
import { DoctorRegistrationComponent } from './doctor-registration/doctor-registration.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';

const routes: Routes = [
  { path: 'adminregistration', component: AdminRegistrationComponent },
  { path: 'doctorregistration', component: DoctorRegistrationComponent },
  { path: 'adminlogin', component: AdminLoginComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
