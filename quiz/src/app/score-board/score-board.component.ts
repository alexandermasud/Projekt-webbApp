import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.css']
})
export class ScoreBoardComponent implements OnInit {

  constructor() { }


  scores: any[0];



  ngOnInit() {

    this.scores = [{name: 'Alexander', score: 5739},{name: 'Viktor', score: 2}]
  }



}
