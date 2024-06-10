import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http'; 
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('authToken') || ''}`
    })
  };

  infoMessage:string = '';

  constructor(private http: HttpClient, private router: Router) {}

  sendHighscore(){
    // fake highscore
    const highscore = {
      username: 'testuser', // Example username
      score: Math.floor(Math.random() * 100) // Example score
    };

    this.http.post('http://localhost:3000/highscores', highscore, this.httpOptions)
      .subscribe({
        next: () => {
          this.infoMessage = 'Highscore submitted successfully!';
        },
        error: () => {
          this.infoMessage = 'Failed to submit highscore.';
        }
      });
  }

  // Method to get highscore list from backend
  goToHighscorePage() {
    console.log("Redirecting to Highscore list page...");
    this.router.navigate(['/highscore']);
  }

  // Method to logout
  logout() {
    const authToken = sessionStorage.getItem('authToken');
    
    console.log("authToken:", authToken);

    if (authToken) {
      const logoutHttpOptions = {
        headers: new HttpHeaders({
          'Content-Type' : 'application/json',
          'Authorization': `Bearer ${authToken}`
        })
      };

      this.http.delete('http://localhost:3000/sessions', logoutHttpOptions)
        .subscribe({
          next: response => {
            sessionStorage.removeItem('authToken');
            this.infoMessage = 'Logged out successfully!';
            console.log('Logged out successfully and deleted "authToken"! Redirecting to homepage');
            this.router.navigate(['/login']); // Redirect to login page
          },
          error: err => {
            if(err.status==400){
              this.infoMessage="There is no user logged in";
            }
            else{
              this.infoMessage = 'Error logging out: ' + err.message;
            }
          }
        });
    } else {
      console.error('No auth token found');
    }
  }
  
}
