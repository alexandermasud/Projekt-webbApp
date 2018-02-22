import { Component, OnInit } from '@angular/core';
import { HttpService } from './quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {


  getData: string;
  currentQuestion: string;
  currentAnswer: string;
  currentPlayerAnswer: string;

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
    console.log(data);
    for(let i = 0; i < data.results.length; i++){

      questions.push(data.results[i].question);
      answers.push(data.results[i].correct_answer);
    }
    console.log("Fråga " + questions);
    console.log("Svar " + answers);
    this.currentQuestion = questions[0];
    this.currentAnswer = answers[0];

  }
    clickTrueFalse(buttonAnswer){
      this.currentPlayerAnswer = buttonAnswer
      if(this.currentPlayerAnswer == this.currentAnswer){
        alert("Du svarade rätt!");
      }
      else{
        alert("Du svarade fel...");
      }
    }

  playGame(){

  }

  ngOnInit() {
    this.onGetQuiz();
  }

}
