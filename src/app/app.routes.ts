import {Routes} from '@angular/router';
import {AddReserveComponent} from "./pages/add-reserve/add-reserve.component";
import {ServicePageComponent} from "./pages/service-page/service-page.component";
import {EmergencyPageComponent} from "./pages/emergency-page/emergency-page.component";
import {SpecialtiesPageComponent} from "./pages/specialties-page/specialties-page.component";
import {CalendarComponent} from "./pages/calendar/calendar.component";
import {ListClientsComponent} from "./pages/list-clients/list-clients.component";

export const routes: Routes = [
  {path: '', component: ServicePageComponent},
  {path: 'add-reserve', component: AddReserveComponent},
  {path: 'service-page', component: ServicePageComponent},
  {path: 'emergency-page', component: EmergencyPageComponent},
  {path: 'specialties-page', component: SpecialtiesPageComponent},
  {path: 'calendar', component: CalendarComponent},
  {path: 'list-clients', component: ListClientsComponent},
];
