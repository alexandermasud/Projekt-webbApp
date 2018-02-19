import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LandingComponent } from './landing/landing.component';
import { QuizComponent } from './quiz/quiz.component';
import { ScoreBoardComponent } from './score-board/score-board.component';
import { AboutComponent } from './about/about.component';


const appRoutes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'quiz', component: QuizComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LandingComponent,
    QuizComponent,
    ScoreBoardComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
