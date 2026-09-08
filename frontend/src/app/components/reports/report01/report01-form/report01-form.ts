import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProtectionModule } from '../../../../modules/protection-module/protection-module';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-report01-form',
  standalone: false,
  templateUrl: './report01-form.html',
  styleUrl: './report01-form.scss'
})

export class Report01Form implements OnInit {


  WorkersID: number = 0;
  WorkersFIOFull: string = '';
  WorkersPositionFull: string = '';

  userRoles: any;
  userEDRPOU: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private protectionModule: ProtectionModule,
    private cookieService: CookieService,
  ) { }

  ngOnInit(): void {
    this.protectionModule.getUserRoles();
    this.userEDRPOU = this.cookieService.get('userEDRPOU');
    this.userRoles = this.cookieService.get('userRoles');

    setTimeout(() => {
      this.getMoveEquipments()
    }, 1000)
  }

  async getMoveEquipments() {
    await this.protectionModule.blockedInformationMessage('ARM1_RPT_01', 'list');
  }

  genToDisplay(){
    this.router.navigate(['/Reports/Report01/Display/', this.WorkersID]);
  }

}
