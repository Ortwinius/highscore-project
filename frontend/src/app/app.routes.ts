import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { GameComponent } from './game/game.component';
import { HighscoreComponent } from './highscore/highscore.component';

export const routes: Routes = [
    // redirect to login page at the begin of the app
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'game', component: GameComponent },
    { path: 'highscore', component: HighscoreComponent },
    { path: '**', redirectTo: '/login' },
  ];
