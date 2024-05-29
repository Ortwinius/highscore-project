  import { Component } from '@angular/core';
  import {FormBuilder, FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule, NgForm} from '@angular/forms';

  import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
  import {MatInputModule} from '@angular/material/input';
  import {MatMenu, MatMenuModule} from '@angular/material/menu';
  import {MatFormFieldModule} from '@angular/material/form-field';
  import {merge} from 'rxjs';
  import {MatIconModule} from '@angular/material/icon';
  import {MatButtonModule} from '@angular/material/button';
  import { CommonModule } from '@angular/common';
  import { RouterLink, Router } from '@angular/router';
  import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http'; 

  @Component({
    selector: 'app-login',
    standalone: true,
    imports: [
      MatFormFieldModule, 
      MatInputModule, 
      FormsModule, 
      ReactiveFormsModule, 
      MatButtonModule, 
      MatIconModule, 
      CommonModule, 
      MatMenuModule, 
      MatMenu, 
      RouterLink, 
      HttpClientModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
  })
  export class LoginComponent {
    // declare variables for email, password and confirmPassword
    email:string =  '';
    password:string = '';  
    infoMessage: string = '';

    loginForm: FormGroup;

    httpOptions = {
      headers: new HttpHeaders({'Content-Type' : 'application/json'})
    };
    // constructor injection to get a private httpClient object
    constructor(private http: HttpClient, private formBuilder: FormBuilder, private router: Router) {
      this.loginForm = this.formBuilder.group({
        emailCheck: ['', [Validators.required, Validators.email]],
        passwordCheck: ['', [Validators.required]]
      });
    }

    // if valid email and password=confirmPassword => return email and password else return empty string
    onSubmit() {
      console.log("Logging in...");
      console.log(this.loginForm.value); 

      if(this.loginForm.valid){
        const req = {
          email: this.loginForm.value.emailCheck,
          password: this.loginForm.value.passwordCheck
        };

        this.http.post<{message:string, token:string}>('http://localhost:3000/sessions', req , this.httpOptions)
        .subscribe({
          next: responseData => {
            this.infoMessage = responseData.message;
            sessionStorage.setItem('authToken',responseData.token);
            this.router.navigate(['/game']); // Change this line
            console.log("Session token set to : " + responseData.token);
          },
          error: () => {
            this.infoMessage = 'Login failed. Please try again.';
          }
        });
      }
    }

    hide:boolean= true;
    errorMessage:string = '';

    updateEmailBlurMessage(): void {
      const emailControl = this.loginForm.get('emailCheck');
      if (emailControl?.hasError('required')) {
        this.errorMessage = 'You must enter a value';
      } else if (emailControl?.hasError('email')) {
        this.errorMessage = 'Not a valid email';
      } else {
        this.errorMessage = '';
      }
    }

    updatePasswordBlurMessage(): void {
      const passwordControl = this.loginForm.get('passwordCheck');
      this.errorMessage = passwordControl?.hasError('required') ? 'You must enter a value' : '';
    }
  }