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
  userName: string;
  scores: any = [{name: 'Alexander', score: 5739},{name: 'Viktor', score: 2}];


  ngOnInit() {
    this.userScore = this.activatedRoute.snapshot.params.playerscore;
    this.userName = this.activatedRoute.snapshot.params.playername;
    this.scores.push({name:this.userName, score: this.userScore});
  }
}
