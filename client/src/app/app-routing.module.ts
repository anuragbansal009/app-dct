import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminRegistrationComponent } from './admin-registration/admin-registration.component';
import { DoctorRegistrationComponent } from './doctor-registration/doctor-registration.component';

const routes: Routes = [
  { path: 'adminregistration', component: AdminRegistrationComponent },
  { path: 'doctorregistration', component: DoctorRegistrationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
