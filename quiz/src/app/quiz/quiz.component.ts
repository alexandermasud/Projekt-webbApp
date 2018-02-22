import { Component, OnInit } from '@angular/core';
import { HttpService } from './quiz.service';

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
  htmlRound: number = 1;
  currentQuestion: string;
  currentAnswer: string;
  currentPlayerAnswer: string;

  playerScore: number = 0;


  constructor(private httpService: HttpService) { }



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
        alert("Du svarade rätt!");
      }
      else{
        alert("Du svarade fel...");
      }

      console.log('SCORE: ' + this.playerScore);

      this.currentRound++;
      this.playGame();
    }

  playGame(){

    let round: number = this.currentRound;
    this.currentQuestion = this.allQuestions[round];
    console.log(this.currentQuestion);
    this.htmlRound++;

  }

  ngOnInit() {
    this.onGetQuiz();

  }

}
