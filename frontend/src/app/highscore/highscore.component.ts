import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink, Router } from '@angular/router';

interface Highscore {
  username: string;
  score: number;
}

@Component({
  selector: 'app-highscore',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, MatButtonModule],
  templateUrl: './highscore.component.html',
  styleUrl: './highscore.component.scss'
})
export class HighscoreComponent {
  highscores: Highscore[] = [];
  infoMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  private getHttpOptions() {
    console.log("authToken: ", sessionStorage.getItem('authToken'));
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('authToken') || ''}`,
      })
    };
  }

  ngOnInit() {
    this.getHighscores();
  }

  getHighscores() {
    this.http.get<Highscore[]>('http://localhost:3000/highscores', this.getHttpOptions())
      .subscribe({
        next: data => {
          this.highscores = data;
        },
        error: () => {
          this.infoMessage = 'Failed to retrieve highscores. Are you logged in?';
        }
      });
  }
  goToGamePage() {
    if(!sessionStorage.getItem('authToken'))
    {
      console.log("Error: not logged in, redirecting to homepage...");
      this.router.navigate(['/login']);
    }
    console.log("Redirecting to game homepage...");
    this.router.navigate(['/game']);
  }
}