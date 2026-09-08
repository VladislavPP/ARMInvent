import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProtectionModule } from '../../../../modules/protection-module/protection-module';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-report02-form',
  standalone: false,
  templateUrl: './report02-form.html',
  styleUrl: './report02-form.scss'
})

export class Report02Form implements OnInit {

  EquipmentsID: number = 0;
  EquipmentsValue: string = '';
  EquipmentsInventN: string = '';
  EquipmentsSerialN: string = '';

  userRoles: any;
  userEDRPOU: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private protectionModule: ProtectionModule,
    private cookieService: CookieService,
  ) { }

  ngOnInit() {
    this.protectionModule.getUserRoles();
    this.userEDRPOU = this.cookieService.get('userEDRPOU');
    this.userRoles = this.cookieService.get('userRoles');

    setTimeout(() => {
      this.getMoveEquipments()
    }, 1000)
  }

  async getMoveEquipments() {
    await this.protectionModule.blockedInformationMessage('ARM1_RPT_02', 'list');
  }

  genToDisplay(){
    this.router.navigate(['/Reports/Report02/Display/', this.EquipmentsID]);
  }

}
