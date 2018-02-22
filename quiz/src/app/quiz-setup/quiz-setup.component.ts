import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz-setup',
  templateUrl: './quiz-setup.component.html',
  styleUrls: ['./quiz-setup.component.css']
})
export class QuizSetupComponent implements OnInit {

  constructor() { }


  showCategory: boolean = true;
  showDifficulty: boolean = false;



   showNext(){
     this.showCategory = false;
     this.showDifficulty = true;

   }
  ngOnInit() {
  }




}
