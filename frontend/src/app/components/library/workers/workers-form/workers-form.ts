import {Component, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { WorkersService } from '../../../../services/workers-service';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { ProtectionModule } from '../../../../modules/protection-module/protection-module';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-workers-form',
  standalone: false,
  templateUrl: './workers-form.html',
  styleUrl: './workers-form.scss'
})

export class WorkersForm implements OnInit{

  public edit: boolean = false;
  public tWorker: any;
  public idWorker: any;

  form = this.fb.group({
    fio_full: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    fio_small: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
    position_full: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    position_small: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
    edrpou: ['']
  });

  userEDRPOU: any;
  userRoles: any;

  constructor(
    private fb: FormBuilder,
    private workersService:WorkersService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private protectionModule: ProtectionModule,
    private cookieService: CookieService
  ) {}

  get fio_full() {
    return this.form.controls['fio_full'];
  }

  get fio_small() {
    return this.form.controls['fio_small'];
  }

  get position_full() {
    return this.form.controls['position_full'];
  }

  get position_small() {
    return this.form.controls['position_small'];
  }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    this.userEDRPOU = this.cookieService.get('userEDRPOU');
    this.userRoles = this.cookieService.get('userRoles');

    if (params['id']) {
      this.workersService.get(params['id'])
        .subscribe(
          res => {
            this.tWorker = res;
            this.idWorker = this.tWorker.id;
            this.form.setValue({
              fio_full: this.tWorker.fio_full,
              fio_small: this.tWorker.fio_small,
              position_full: this.tWorker.position_full,
              position_small: this.tWorker.position_small,
              edrpou:  this.tWorker.edrpou
            });

            this.edit = true;
          },
          err => console.error(err)
        )
    }
  }

  async saveWorker() {
    let blocked: boolean;

    this.form.patchValue(
      {edrpou: this.userEDRPOU},
      {emitEvent: false}
    );

    blocked = await this.protectionModule.blockOpp('ARM1_WRK_ADD', this.userRoles);
    await this.protectionModule.blockedInformationMessage('ARM1_WRK_ADD', 'save');

    if (blocked) {
      this.workersService.create(this.form.value)
        .subscribe(
          res => {
            this.router.navigate(['/Workers/List']);
          },
          err => console.log(err)
        )
    }
  }

    async updateWorker() {
      let blocked: boolean;

      blocked = await this.protectionModule.blockOpp('ARM1_WRK_EDT', this.userRoles);
      await this.protectionModule.blockedInformationMessage('ARM1_WRK_EDT', 'edit');

      if (blocked) {
        this.workersService.update(this.idWorker, this.form.value)
          .subscribe(
            res => {
              this.router.navigate(['/Workers/List']);
            },
            err => console.log(err)
          )
        }
      }
    }
