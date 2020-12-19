import { Component, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'shared/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService) { }



  login() {
    this.authService.login()
  }
}
