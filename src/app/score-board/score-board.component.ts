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
  scores: any = [];

  showClearButton: boolean = true;

  // Cleares the scoreboard
  clearScoreboard() {
      localStorage.removeItem('players');
      let tableBody = document.getElementById("displayPlayers");
      while(tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
      }
      this.showClearButton = false;
  }

  ngOnInit() {
    this.userScore = this.activatedRoute.snapshot.params.playerscore;
    this.userName = this.activatedRoute.snapshot.params.playername;
    let a = localStorage.getItem('players');
    this.scores = JSON.parse(a);
    console.log(this.scores);

    if (this.scores ==  null){
      this.showClearButton = false;
    }

  }
}
