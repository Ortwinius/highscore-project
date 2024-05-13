import { Component } from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule, NgForm} from '@angular/forms';

import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {MatInputModule} from '@angular/material/input';
import {MatMenu, MatMenuModule} from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material/form-field';
import {merge} from 'rxjs';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, 
    ReactiveFormsModule, MatButtonModule, MatIconModule, CommonModule, MatMenuModule, MatMenu, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  // declare variables for email, password and confirmPassword
  email:string =  '';
  password:string = '';

  // if valid email and password=confirmPassword => return email and password else return empty string
  verifyLogin() : void {
    // email must be "test@test.at"
    // password must be "12345678
    if (this.email === 'test@test.at' 
      && this.password === '12345678'){
      console.log('Login successful');
    } else {
      console.log('Login failed');
    }
  }

  emailCheck = new FormControl('', [Validators.required, Validators.email]);
  passwordCheck = new FormControl('', [Validators.required]);

  hide:boolean= true;
  errorMessage:string = '';

  constructor() {}

  updateEmailBlurMessage() : void {
    if (this.emailCheck.hasError('required')) {
      this.errorMessage = 'You must enter a value';
    } else if (this.emailCheck.hasError('email')) {
      this.errorMessage = 'Not a valid email';
    } else {
      this.errorMessage = '';
    }
  }

  updatePasswordBlurMessage(): void {
    this.errorMessage = this.passwordCheck.hasError('required') ? 'You must enter a value' : '';
  }
}