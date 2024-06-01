import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http'; 

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    RouterLink,
    HttpClientModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;

  hide: boolean = true;
  hideRepeated: boolean = true;
  errorMessage: string = '';
  infoMessage: string = '';
  formSubmitted: boolean = false;

  httpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/json'})
  };

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      emailCheck: ['', [Validators.required, Validators.email]],
      passwordCheck: ['', [Validators.required, Validators.minLength(8)]],
      confirmPasswordCheck: ['', [Validators.required]],
      addressStreet: [''],
      addressCity: [''],
      addressZipValidator: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('passwordCheck')!.value === form.get('confirmPasswordCheck')!.value
      ? null : { 'mismatch': true };
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.registerForm.valid) {
      const req = {
        email: this.registerForm.value.emailCheck,
        password: this.registerForm.value.passwordCheck,
      };

      this.http.post<{message: string}>('http://localhost:3000/users', req, this.httpOptions)
        .subscribe({
          next: responseData => {
            this.infoMessage = responseData.message;
          },
          error: err => {
            this.infoMessage = 'Registration failed. Please try again.';
          }
        });
    } else {
      this.errorMessage = 'Error: Please correct the errors in the form.';
    }
  }

  updateEmailBlur(): void {
    const emailControl = this.registerForm.get('emailCheck');
    if (emailControl?.hasError('required')) {
      this.errorMessage = 'You must enter a value';
    } else if (emailControl?.hasError('email')) {
      this.errorMessage = 'Not a valid email';
    } else {
      this.errorMessage = '';
    }
  }

  updateZipBlur(): void {
    const zipControl = this.registerForm.get('addressZipValidator');
    if (zipControl?.hasError('pattern')) {
      this.errorMessage = 'Not a valid zip code';
    } else {
      this.errorMessage = '';
    }
  }
}
