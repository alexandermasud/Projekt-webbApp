// Angular modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// The Application components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LandingComponent } from './landing/landing.component';
import { QuizSetupComponent } from './quiz-setup/quiz-setup.component';
import { QuizComponent } from './quiz/quiz.component';
import { ScoreBoardComponent } from './score-board/score-board.component';
import { AboutComponent } from './about/about.component';


// The Applications API service
import { HttpService } from '../app/quiz/quiz.service';


// Routes for the Application
const appRoutes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'quizsetup', component: QuizSetupComponent },
  { path: 'quiz/:mode/:category/:difficulty', component: QuizComponent },
  { path: 'scoreboard', component: ScoreBoardComponent},
  { path: 'scoreboard/:playerscore/:playername', component: ScoreBoardComponent},
  { path: 'about', component: AboutComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingComponent,
    QuizSetupComponent,
    QuizComponent,
    ScoreBoardComponent,
    AboutComponent

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
