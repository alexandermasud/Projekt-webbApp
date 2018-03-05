// Angular moduler
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
// Applikationens komponenter
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LandingComponent } from './landing/landing.component';
import { IntroComponent } from './intro/intro.component';
import { QuizSetupComponent } from './quiz-setup/quiz-setup.component';
import { QuizComponent } from './quiz/quiz.component';
import { ScoreBoardComponent } from './score-board/score-board.component';
import { ResultComponent } from './result/result.component';
import { AboutComponent } from './about/about.component';


// Applikationens API service
import { HttpService } from '../app/quiz/quiz.service';


// Routes för applikationen
const appRoutes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'intro', component: IntroComponent },
  { path: 'quizsetup/:playermode', component: QuizSetupComponent },
  { path: 'quiz/:mode/:category/:difficulty', component: QuizComponent },
  { path: 'scoreboard', component: ScoreBoardComponent},
  { path: 'scoreboard/:playerscore/:playername', component: ScoreBoardComponent},
  { path: 'about', component: AboutComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LandingComponent,
    IntroComponent,
    QuizSetupComponent,
    QuizComponent,
    ScoreBoardComponent,
    ResultComponent,
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
