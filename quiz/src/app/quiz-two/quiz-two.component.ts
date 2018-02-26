import { Component, OnInit } from '@angular/core';
import { HttpService } from '../quiz/quiz.service';

@Component({
  selector: 'app-quiz-two',
  templateUrl: './quiz-two.component.html',
  styleUrls: ['./quiz-two.component.css']
})
export class QuizTwoComponent implements OnInit {

  constructor(public httpService: HttpService) { }

  onGetQuiz() {
    this.httpService.getQuestions(this.choosenCategory, this.choosenDifficulty)
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

  ngOnInit() {
  }

}
