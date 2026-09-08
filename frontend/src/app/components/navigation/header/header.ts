import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from "ngx-cookie-service";
import { App } from '../../../app';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.scss'
})

export class Header implements OnInit{
  userLogin: string = '';
  userPass: string = '';

  allRoles: any;

  user: any = {
    idUser: null,
    userLogin: null,
    userEDRPOU: null,
    userRoles: null
  }

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private app: App
  ) { }

  ngOnInit(): void {
    this.user.idUser = this.cookieService.get('userId');
    this.user.userLogin = this.cookieService.get('userLogin');
    this.user.userEDRPOU = this.cookieService.get('userEDRPOU');
    this.user.userRoles = this.cookieService.get('userRoles');
  }

  async userOutput() {
    this.cookieService.delete( 'userId');
    this.cookieService.delete( 'userLogin');
    this.cookieService.delete( 'userRoles');
    this.cookieService.delete( 'userEDRPOU');
    setTimeout(() => { document.location.href = "/"}, 1000);

    setTimeout(() => {
      document.getElementById("logo")?.click();
    }, 2000)
  }

}
