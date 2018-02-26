import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.css']
})
export class ScoreBoardComponent implements OnInit {

  constructor(public router: Router, private activatedRoute: ActivatedRoute) { }

  userScore: number;
  scores: any[0];



  ngOnInit() {
    this.userScore = this.activatedRoute.snapshot.params.playerscore;
    this.scores = [{name: 'Alexander', score: 5739},{name: 'Viktor', score: 2}, {name: 'TestPlayer', score: this.userScore}]
  }



}
