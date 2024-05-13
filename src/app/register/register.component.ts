import { Component } from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule, NgForm} from '@angular/forms';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {merge} from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, 
    ReactiveFormsModule, MatButtonModule, MatIconModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  email:string =  '';
  password:string = '';
  confirmPassword:string = '';
  addressStreet:string = '';
  addressCity:string = '';
  addressZip:string = '';
  
  hide:boolean= true;
  hideRepeated:boolean=true;
  errorMessage:string = '';
  formSubmitted:boolean = false;

  // check if the email input is valid and if the password and confirmPassword are not empty
  emailCheck = new FormControl('', [Validators.required, Validators.email]);
  passwordCheck = new FormControl('', [Validators.required]);
  confirmPasswordCheck = new FormControl('', [Validators.required]);

  // check if the zip input is a number
  addressZipValidator: FormControl = new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]);

  constructor() {}

  updateEmailBlur() : void {
    if (this.emailCheck.hasError('required')) {
      this.errorMessage = 'You must enter a value';
    } else if (this.emailCheck.hasError('email')) {
      this.errorMessage = 'Not a valid email';
    } else {
      this.errorMessage = '';
    }
  }
  updateZipBlur() : void {
    if (this.addressZipValidator.hasError('pattern')) {
      this.errorMessage = 'Not a valid zip code';
    } else {
      this.errorMessage = '';
    }
  }

   // verify password and confirmPassword match and meet minimum length requirement
   verifyPassword(): void {
    const password = this.password;
    const confirmPassword = this.confirmPassword;

    if (password !== confirmPassword) {
      this.errorMessage = 'Passwords do not match';
    } else if (!password || password.length < 8) {
      this.errorMessage = 'Password must be at least 8 characters long';
    } else {
      this.errorMessage = '';
    }
  }

  // handle form submission
  onSubmit(): void {
    this.formSubmitted = true;
    // Check if any required field is empty
    if (!this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'All fields are required';
      return;
    }

    // Check if passwords match and meet minimum length requirement
    this.verifyPassword();

    // Check if there are any other errors before proceeding
    if (!this.errorMessage) {
      // Proceed with registration logic here
      console.log('Registration successful!');
    }
  }
}
