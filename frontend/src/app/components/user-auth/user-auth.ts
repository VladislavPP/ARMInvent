import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from "../../services/users-service"
import { CookieService } from "ngx-cookie-service";
import { App } from '../../app';

@Component({
  selector: 'app-user-auth',
  standalone: false,
  templateUrl: './user-auth.html',
  styleUrl: './user-auth.scss'
})

export class UserAuth implements OnInit {

  userLogin: any;
  userPass: any;
  users: any;
  passInputType: any = 'password';

  constructor(
    private usersService: UsersService,
    private cookieService: CookieService,
    private app:App,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getUser();
  }

  getUser(){
    this.usersService.getAll().subscribe(
      res => {
        this.users = res;
      },
      err => console.error(err)
    )
  }

  login(){
    let filteredUser: any;

    filteredUser = this.users.filter((tUser: any) => {
      return tUser.login == this.userLogin && tUser.pass == this.userPass;
    })

    if (filteredUser.length >= 1){
      this.cookieService.set('userId', filteredUser[0].id);
      this.cookieService.set('userLogin', filteredUser[0].login);
      this.cookieService.set('userRoles', filteredUser[0].roles);
      this.cookieService.set('userEDRPOU', filteredUser[0].edrpou);
      this.app.auth = true;
      setTimeout(() => { document.getElementById("logo")?.click()}, 2000);
    } else {
      alert("Введено не вірні дані");
      location.reload();
    }
  }

  changeTypeInputPass(){
    switch (this.passInputType) {
      case 'password': this.passInputType = 'text'; break;
      case 'text': this.passInputType = 'password'; break;
    }
  }

  auth(){
    this.router.navigate(['/Registration']);
  }

}
