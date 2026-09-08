import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing-module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { App } from './app';

/*MODULES*/
import { DatesModule } from './modules/dates/dates-module';
import { ProtectionModule } from './modules/protection-module/protection-module';

/*PIPES*/
import { SearchPipe } from './pipes/search.pipe';
import { SortByPipe } from './pipes/sort-by.pipe';
import { TypeOperationPipe } from './pipes/type-operation-pipe';
import { UsersRolesVisiblePipe } from './pipes/users-roles-visible-pipe';
import { RolesForUsersVisiblePipePipe } from './pipes/roles-for-users-visible-pipe-pipe';
import { PasswordViewPipe } from './pipes/password-view-pipe';
import { EdrpouViewPipe } from './pipes/edrpou-view-pipe';

/*VALIDATORS*/
//import { ShouldDoNotMatterValidator } from './should-do-not-matter-validator';

/*NAVIGATION*/
import { Header } from './components/navigation/header/header';
import { LeftNav } from './components/navigation/left-nav/left-nav';
import { Navigation } from './components/navigation/navigation';

/*WORKER*/
import { WorkersForm } from './components/library/workers/workers-form/workers-form';
import { WorkersList } from './components/library/workers/workers-list/workers-list';

/*EQUIPMENTS*/
import { EquipmentsList } from './components/library/equipments/equipments-list/equipments-list';
import { EquipmentsForm } from './components/library/equipments/equipments-form/equipments-form';

/*OPERATIONS*/
import { OperationsList } from './components/library/operations/operations-list/operations-list';
import { OperationsForm } from './components/library/operations/operations-form/operations-form';
import { OperationsDelete } from './components/library/operations/operations-delete/operations-delete';

/*SERVICE ORGANIZATIONS*/
import { ServiceOrganizationsList } from './components/library/serviceOrganizations/service-organizations-list/service-organizations-list';
import { ServiceOrganizationsForm } from './components/library/serviceOrganizations/service-organizations-form/service-organizations-form';

/*SUBLEVELS*/
import { SublevelWorkers } from './components/subLevels/sublevel-workers/sublevel-workers';
import { SublevelEquipments } from './components/subLevels/sublevel-equipments/sublevel-equipments';
import { SublevelServiceOrganizations } from './components/subLevels/sublevel-service-organizations/sublevel-service-organizations';
import { SublevelServiceOrganizationsDelete } from './components/subLevels/sublevel-service-organizations-delete/sublevel-service-organizations-delete';
import { SublevelServiceOrganizationsBuy } from './components/subLevels/sublevel-service-organizations-buy/sublevel-service-organizations-buy';

/*REPORTS*/
import { Reports } from './components/reports/reports';
import { Report01Form } from './components/reports/report01/report01-form/report01-form';
import { Report01Display } from './components/reports/report01/report01-display/report01-display';
import { SublevelWorkersReport01 } from './components/subLevels/sublevel-workers-report01/sublevel-workers-report01';
import { Report02Form } from './components/reports/report02/report02-form/report02-form';
import { Report02Display } from './components/reports/report02/report02-display/report02-display';
import { SublevelEquipmentsReport02 } from './components/subLevels/sublevel-equipments-report02/sublevel-equipments-report02';
import { Report03Display } from './components/reports/report03/report03-display/report03-display';

/*ROLES*/
import { RolesList } from './components/adminPanel/roles/roles-list/roles-list';
import { RolesForm } from './components/adminPanel/roles/roles-form/roles-form';

/*USERS*/
import { UsersList } from './components/adminPanel/users/users-list/users-list';
import { UsersForm } from './components/adminPanel/users/users-form/users-form';

/*AUTH*/
import { UserAuth } from './components/user-auth/user-auth';
import { CreatedReports } from './components/reports/created-reports/created-reports';
import { DateForReportViewPipe } from './pipes/date-for-report-view-pipe';
import { FormRegistration } from './components/user-auth/form-registration/form-registration';

@NgModule({
  declarations: [
    App,
    /*PIPES*/
    SearchPipe,
    SortByPipe,
    TypeOperationPipe,
    UsersRolesVisiblePipe,
    RolesForUsersVisiblePipePipe,
    PasswordViewPipe,
    EdrpouViewPipe,
    /*NAVIGATION*/
    Header,
    LeftNav,
    Navigation,
    /*WORKER*/
    WorkersForm,
    WorkersList,
    /*EQUIPMENTS*/
    EquipmentsList,
    EquipmentsForm,
    /*OPERATIONS*/
    OperationsList,
    OperationsForm,
    OperationsDelete,
    /*SERVICE ORGANIZATIONS*/
    ServiceOrganizationsList,
    ServiceOrganizationsForm,
    /*SUBLEVELS*/
    SublevelWorkers,
    SublevelEquipments,
    SublevelServiceOrganizations,
    SublevelServiceOrganizationsDelete,
    SublevelServiceOrganizationsBuy,
    /*REPORTS*/
    Reports,
    Report01Form,
    Report01Display,
    SublevelWorkersReport01,
    Report02Form,
    Report02Display,
    SublevelEquipmentsReport02,
    Report03Display,
    /*ROLES*/
    RolesList,
    RolesForm,
    /*USERS*/
    UsersList,
    UsersForm,
    /*AUTH*/
    UserAuth,
    CreatedReports,
    DateForReportViewPipe,
    FormRegistration,
    /*VALIDATORS*/
    //ShouldDoNotMatterValidator
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule,
    HttpClientModule,
    /*MY MODULES*/
    DatesModule,
    ProtectionModule,
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})

export class AppModule { }
