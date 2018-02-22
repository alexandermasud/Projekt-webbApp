// Angular moduler
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// Applikationens komponenter
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LandingComponent } from './landing/landing.component';
import { QuizComponent } from './quiz/quiz.component';
import { ScoreBoardComponent } from './score-board/score-board.component';
import { ResultComponent } from './result/result.component';
import { AboutComponent } from './about/about.component';
import { IntroComponent } from './intro/intro.component';

// Applikationens API service
import { HttpService } from '../app/quiz/quiz.service';
import { QuizSetupComponent } from './quiz-setup/quiz-setup.component';

// Routes för applikationen
const appRoutes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'quizsetup', component: QuizSetupComponent },
  { path: 'intro', component: IntroComponent},
  { path: 'about', component: AboutComponent},
  { path: 'scoreboard', component: ScoreBoardComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LandingComponent,
    QuizComponent,
    ScoreBoardComponent,
    ResultComponent,
    AboutComponent,
    IntroComponent,
    QuizSetupComponent

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
