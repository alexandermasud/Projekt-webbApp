import { Component, OnInit } from '@angular/core';
import { HttpService } from './quiz.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  choosenMode: number;
  choosenCategory: string;
  choosenDifficulty: string;
  choosenAmountOfQuestions: number;

  playerMode: string;

  getData: string;

  allQuestions: any[];
  allAnswers: any[];

  currentRound: number = 0;
  endAtRound: number = 5;
  currentQuestion: string;
  currentAnswer: string;
  currentPlayerAnswer: string;

  playerScore: number = 0;
  playerName: string = 'Test';

  showResult: boolean = false;
  showGame: boolean = true;



  constructor(public httpService: HttpService, public router: Router, private activatedRoute: ActivatedRoute) { }


  endGame() {

    this.showGame = false;
    this.showResult = true;
  }

  onGetQuiz() {

    if (this.choosenMode == 1){
      this.choosenAmountOfQuestions = 5;
    }

    else if (this.choosenMode == 2){
      this.choosenAmountOfQuestions = 10;
    }

    else{
      alert('OGILTIGT!');
    }

    this.httpService.getQuestions(this.choosenAmountOfQuestions,this.choosenCategory, this.choosenDifficulty)
      .subscribe(
      data => this.getData = JSON.stringify(data),
      error => alert(error),
      () => this.loopQuestions()
      );
  }

  loopQuestions() {

    let data = JSON.parse(this.getData);
    let questions: any[] = [];
    let answers: any[] = [];
    //console.log(data);
    for (let i = 0; i < data.results.length; i++) {

      questions.push(data.results[i].question);
      answers.push(data.results[i].correct_answer);
    }
    //console.log("Fråga " + questions);
    //console.log("Svar " + answers);
    this.allQuestions = questions;
    this.allAnswers = answers;

    this.currentQuestion = this.allQuestions[0];
    this.currentAnswer = this.allAnswers[0];
  }

  clickTrueFalse(buttonAnswer) {
    this.currentPlayerAnswer = buttonAnswer
    if (this.currentPlayerAnswer == this.currentAnswer) {
      this.playerScore++;
      console.log('Right!');

    }
    else {
      console.log('WRONG!')
    }

    console.log('SCORE: ' + this.playerScore);

    if (this.endAtRound - 1 == this.currentRound) {
      this.endGame();
    }
    else {
      this.currentRound++;
      this.playGame();
    }
  }

  playGame() {
    let i: number = this.currentRound;
    this.currentQuestion = this.allQuestions[i];
    this.currentAnswer = this.allAnswers[i];

  }
  onPostScoreboard(scoreBoardAnswer) {
    if (scoreBoardAnswer) {

      this.router.navigate(['scoreboard/' + this.playerScore + '/' + this.playerName + '']);
    } else {
      this.router.navigate(['intro']);
    }
  }
  ngOnInit() {
    // Hämtar via URL ut vilken kategori och svårighetsgrad spelaren valde
    this.choosenMode = this.activatedRoute.snapshot.params.mode;
    this.choosenCategory = this.activatedRoute.snapshot.params.category;
    this.choosenDifficulty = this.activatedRoute.snapshot.params.difficulty;

    console.log('QUIZMODE: ' + this.choosenMode);

    this.onGetQuiz();
  }
}
