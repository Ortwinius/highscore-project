import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from './register/register.component';
import { GameComponent } from './game/game.component';
import { HighscoreComponent } from './highscore/highscore.component';
import { HttpClientModule } from '@angular/common/http';
import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,  
    LoginComponent, 
    RegisterComponent,
    GameComponent,
    HighscoreComponent,
    HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'main';
}
