import { Component, signal, OnInit } from '@angular/core';
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})

export class App implements OnInit {
  auth: boolean = false;
  protected readonly title = signal('frontend');

  constructor(
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    if (this.cookieService.get('userEDRPOU')){
      this.auth = true
    }
  }

}
