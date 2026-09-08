import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/*Auth*/
import { UserAuth } from './components/user-auth/user-auth';
import { FormRegistration } from './components/user-auth/form-registration/form-registration';

/*Workers*/
import { WorkersList } from './components/library/workers/workers-list/workers-list';
import { WorkersForm } from './components/library/workers/workers-form/workers-form';
/*Equipments*/
import { EquipmentsList } from './components/library/equipments/equipments-list/equipments-list';
import { EquipmentsForm } from './components/library/equipments/equipments-form/equipments-form';
/*Service Organizations*/
import { ServiceOrganizationsList } from './components/library/serviceOrganizations/service-organizations-list/service-organizations-list';
import { ServiceOrganizationsForm } from './components/library/serviceOrganizations/service-organizations-form/service-organizations-form';
/*OperationsList*/
import { OperationsList } from './components/library/operations/operations-list/operations-list';
import { OperationsForm } from './components/library/operations/operations-form/operations-form';
import { OperationsDelete } from './components/library/operations/operations-delete/operations-delete';

/*Reports*/
import { Reports } from './components/reports/reports';
/*Report 01*/
import { Report01Form } from './components/reports/report01/report01-form/report01-form';
import { Report01Display } from './components/reports/report01/report01-display/report01-display';
/*Report 02*/
import { Report02Form } from './components/reports/report02/report02-form/report02-form';
import { Report02Display } from './components/reports/report02/report02-display/report02-display';
/*Report 03*/
import { Report03Display } from './components/reports/report03/report03-display/report03-display';
/*Report Create*/
import { CreatedReports } from './components/reports/created-reports/created-reports';

/*Roles*/
import { RolesList } from './components/adminPanel/roles/roles-list/roles-list';
import { RolesForm } from './components/adminPanel/roles/roles-form/roles-form';

/*Users*/
import { UsersList } from './components/adminPanel/users/users-list/users-list';
import { UsersForm } from './components/adminPanel/users/users-form/users-form';

const routes: Routes = [

  //AUTH
  { path: 'Auth', component: UserAuth },
  { path: 'Registration', component: FormRegistration },

  //WORKERS
  { path: 'Workers/List', component: WorkersList },
  { path: 'Workers/Add', component: WorkersForm },
  { path: 'Workers/Edit/:id', component: WorkersForm },

  //EQUIPMENTS
  { path: 'Equipments/List', component: EquipmentsList },
  { path: 'Equipments/Add/:status', component: EquipmentsForm },
  { path: 'Equipments/Edit/:id', component: EquipmentsForm },

  /*SERVICE ORGANIZATIONS*/
  { path: 'ServiceOrganizations/List', component: ServiceOrganizationsList },
  { path: 'ServiceOrganizations/Add', component: ServiceOrganizationsForm },
  { path: 'ServiceOrganizations/Edit/:id', component: ServiceOrganizationsForm },

  //OPERATIONS LIST
  { path: 'OperationsList/List', component: OperationsList },
  { path: 'OperationsList/Add', component: OperationsForm },
  { path: 'OperationsList/Move/:id', component: OperationsForm },
  { path: 'OperationsList/Delete/:id', component: OperationsDelete },

  //REPORTS
  { path: 'Reports/List', component: Reports },
  /*REPORT 01*/
  { path: 'Reports/Report01', component: Report01Form },
  { path: 'Reports/Report01/Display/:idWorker', component: Report01Display },
  /*REPORT 02*/
  { path: 'Reports/Report02', component: Report02Form },
  { path: 'Reports/Report02/Display/:idEquipment', component: Report02Display },
  /*REPORT 03*/
  { path: 'Reports/Report03', component: Report03Display },
  /*Creating Reports*/
  {path: 'Reports/Created', component: CreatedReports},

  /*ROLES*/
  { path: 'Roles/List', component: RolesList },
  { path: 'Roles/Add', component: RolesForm },
  { path: 'Roles/Edit/:id', component: RolesForm },

  /*USERS*/
  { path: 'Users/List', component: UsersList },
  { path: 'Users/Add', component: UsersForm },
  { path: 'Users/Edit/:id', component: UsersForm },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
