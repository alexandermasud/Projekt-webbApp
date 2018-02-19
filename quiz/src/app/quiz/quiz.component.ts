import { Component, OnInit } from '@angular/core';
import { HttpService } from './quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {


  getData: string;

  constructor(private httpService: HttpService) { }



  onGetQuiz(){
    this.httpService.getQuestions()
      .subscribe(
        data => this.getData = JSON.stringify(data),
        error => alert(error),
        () => this.printData()
      );
    }


  printData(){
    let data = JSON.parse(this.getData);

    console.log('DATA:' + this.getData);

  }

  ngOnInit() {
    this.onGetQuiz();
  }

}
