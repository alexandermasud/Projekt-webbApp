import { Component, OnInit } from '@angular/core';
import { HttpService } from './quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {


  getData: string;

  allQuestions: any[];
  allAnswers: any[];

  currentRound: number = 0;
  endAtRound: number = 5;
  htmlRound: number = 1;
  currentQuestion: string;
  currentAnswer: string;
  currentPlayerAnswer: string;

  playerScore: number = 0;

  showResult: boolean = false;
  showGame: boolean = true;

  inputCorrect: string = null;


  constructor(private httpService: HttpService, public router: Router) { }


  endGame(){

    console.log('SLUT!');
    this.showGame = false;
    this.showResult = true;



  }

  onGetQuiz(){
    this.httpService.getQuestions()
      .subscribe(
        data => this.getData = JSON.stringify(data),
        error => alert(error),
        () => this.loopQuestions()
      );
    }

  loopQuestions(){


    let data = JSON.parse(this.getData);
    let questions:any[] = [];
    let answers:any[] = [];
    //console.log(data);
    for(let i = 0; i < data.results.length; i++){

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

    clickTrueFalse(buttonAnswer){
      this.currentPlayerAnswer = buttonAnswer
      if(this.currentPlayerAnswer == this.currentAnswer){
        this.playerScore++;
        this.inputCorrect = 'Right!';
        
      }
      else{
          this.inputCorrect = 'Wrong!';
      }

      console.log('SCORE: ' + this.playerScore);

      if(this.endAtRound-1 == this.currentRound){
        this.endGame();
      }
      else{
        this.currentRound++;
        this.playGame();

      }

    }

  playGame(){

    let round: number = this.currentRound;
    this.currentQuestion = this.allQuestions[round];
    console.log(this.currentQuestion);
    this.htmlRound++;

  }
  onPostScoreboard(scoreBoardAnswer){
    if(scoreBoardAnswer){

      this.router.navigate(['scoreboard']);

    }else{
      this.router.navigate(['intro']);
    }
  }

  ngOnInit() {
    this.onGetQuiz();

  }

}
