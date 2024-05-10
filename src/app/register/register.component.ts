import { Component } from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule, NgForm} from '@angular/forms';

import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {merge} from 'rxjs';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, 
    ReactiveFormsModule, MatButtonModule, MatIconModule, CommonModule],
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

  // check if the email input is valid
  emailCheck = new FormControl('', [Validators.required, Validators.email]);
  // check if the zip input is a number
  addressZipValidator: FormControl = new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]);

  constructor() {
    merge(this.emailCheck.statusChanges, this.emailCheck.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateEmailBlurMessage());
  }

  updateEmailBlurMessage() : void {
    if (this.emailCheck.hasError('required')) {
      this.errorMessage = 'You must enter a value';
    } else if (this.emailCheck.hasError('email')) {
      this.errorMessage = 'Not a valid email';
    } else {
      this.errorMessage = '';
    }
  }
  updateZipBlurMessage() : void {
    if (this.addressZipValidator.hasError('required')) {
      this.errorMessage = 'You must enter a value';
    } else if (this.addressZipValidator.hasError('pattern')) {
      this.errorMessage = 'Not a valid zip code';
    } else {
      this.errorMessage = '';
    }
  }
}
