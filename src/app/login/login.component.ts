import { Component } from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule, NgForm} from '@angular/forms';

import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {merge} from 'rxjs';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, 
    ReactiveFormsModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  // declare variables for email, password and confirmPassword
  email:string =  '';
  password:string = '';
  confirmPassword:string = '';

  // if valid email and password=confirmPassword => return email and password else return empty string
  printProperties():string {
    const parts: string[] = [];

    if (this.emailCheck.valid) {
      parts.push(`Email: ${this.email}`);
    }
    if (this.password.length > 0 && this.password === this.confirmPassword) {
      parts.push(`Password: ${this.password}`);
    }

    // add elements to parts array and return them
    return parts.join('   ');
  }

  emailCheck = new FormControl('', [Validators.required, Validators.email]);
  hide:boolean= true;
  hideRepeated:boolean=true;
  errorMessage:string = '';

  constructor() {
    merge(this.emailCheck.statusChanges, this.emailCheck.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.emailCheck.hasError('required')) {
      this.errorMessage = 'You must enter a value';
    } else if (this.emailCheck.hasError('email')) {
      this.errorMessage = 'Not a valid email';
    } else {
      this.errorMessage = '';
    }
  }
}
