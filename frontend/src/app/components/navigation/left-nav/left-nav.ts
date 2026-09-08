import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ProtectionModule } from '../../../modules/protection-module/protection-module';

@Component({
  selector: 'app-left-nav',
  standalone: false,
  templateUrl: './left-nav.html',
  styleUrl: './left-nav.scss'
})

export class LeftNav implements OnInit {
  rolesUser: any;

  /*АРМ Інвентаризація*/
  public ARM1_LIB: boolean | undefined;
  public ARM1_OPL: boolean | undefined;
  public ARM1_RPT: boolean | undefined;

  public ARM1_EQP_LST: boolean | undefined;
  public ARM1_EQP_ADD: boolean | undefined;
  public ARM1_EQP_EDT: boolean | undefined;

  public ARM1_WRK_LST: boolean | undefined;
  public ARM1_WRK_ADD: boolean | undefined;
  public ARM1_WRK_EDT: boolean | undefined;

  public ARM1_SRV_LST: boolean | undefined;
  public ARM1_SRV_ADD: boolean | undefined;
  public ARM1_SRV_EDT: boolean | undefined;

  public ARM1_OPL_LST: boolean | undefined;
  public ARM1_OPL_ADD: boolean | undefined;

  public ARM1_RPT_01: boolean | undefined;
  public ARM1_RPT_02: boolean | undefined;
  public ARM1_RPT_03: boolean | undefined;
  public ARM1_RPT_C: boolean | undefined;
  /*--------------------------------------------*/

  /*Адмінпанель*/
  public ADM_LIB: boolean | undefined;
  public ADM_RLE_LST: boolean | undefined;
  public ADM_USR_LST: boolean | undefined;
  /*-------------------------------------------*/

  userEDRPOU: any;
  userRoles: any;

  constructor(
    private protectionModule: ProtectionModule,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    this.userRoles = JSON.parse(this.cookieService.get('userRoles'));
    this.protectionModule.getUserRoles();
    this.generationPoints()
  }

  generationPoints(){
    /*ARM1*/
    this.ARM1_EQP_LST = this.protectionModule.blockOpp('ARM1_EQP_LST', this.userRoles);
    this.ARM1_EQP_ADD = this.protectionModule.blockOpp('ARM1_EQP_ADD', this.userRoles);
    this.ARM1_EQP_EDT = this.protectionModule.blockOpp('ARM1_EQP_EDT', this.userRoles);

    this.ARM1_WRK_LST = this.protectionModule.blockOpp('ARM1_WRK_LST', this.userRoles);
    this.ARM1_WRK_ADD = this.protectionModule.blockOpp('ARM1_WRK_ADD', this.userRoles);
    this.ARM1_WRK_EDT = this.protectionModule.blockOpp('ARM1_WRK_EDT', this.userRoles);

    this.ARM1_SRV_LST = this.protectionModule.blockOpp('ARM1_SRV_LST', this.userRoles);
    this.ARM1_SRV_ADD = this.protectionModule.blockOpp('ARM1_SRV_ADD', this.userRoles);
    this.ARM1_SRV_EDT = this.protectionModule.blockOpp('ARM1_SRV_EDT', this.userRoles);

    this.ARM1_OPL_LST = this.protectionModule.blockOpp('ARM1_OPL_LST', this.userRoles);
    this.ARM1_OPL_ADD = this.protectionModule.blockOpp('ARM1_OPL_ADD', this.userRoles);

    this.ARM1_RPT_01 = this.protectionModule.blockOpp('ARM1_RPT_A01', this.userRoles);
    this.ARM1_RPT_02 = this.protectionModule.blockOpp('ARM1_RPT_A02', this.userRoles);
    this.ARM1_RPT_03 = this.protectionModule.blockOpp('ARM1_RPT_A03', this.userRoles);
    this.ARM1_RPT_C = this.protectionModule.blockOpp('ARM1_RPT_C', this.userRoles);

    if (this.ARM1_EQP_LST || this.ARM1_WRK_LST || this.ARM1_SRV_LST || this.ARM1_OPL_LST) {
      this.ARM1_LIB = true;
    }

    if (this.ARM1_EQP_ADD || this.ARM1_OPL_LST) {
      this.ARM1_OPL = true;
    }

    if (this.ARM1_RPT_01 || this.ARM1_RPT_02 || this.ARM1_RPT_03 || this.ARM1_RPT_C) {
      this.ARM1_RPT = true;
    }

    /*ADMIN*/
    this.ADM_RLE_LST = this.protectionModule.blockOpp('ADM_RLE_LST', this.userRoles);
    this.ADM_USR_LST = this.protectionModule.blockOpp('ADM_USR_LST', this.userRoles);

    if (this.ADM_RLE_LST || this.ADM_USR_LST) {
      this.ADM_LIB = true;
    }
  }
}
