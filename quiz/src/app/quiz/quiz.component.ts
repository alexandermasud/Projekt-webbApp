import { Component, OnInit } from '@angular/core';
import { HttpService } from './quiz.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  showP1P2: boolean = false;
  currentPlayer: string;
  p1Score: number = 0;
  p2Score: number = 0;
  showResult2Players: boolean = false;
  resultP1P2: string;
  onlyOnWinner: boolean = false;
  onlyOnTie: boolean = false;

  // -------------------------

  choosenMode: number;
  choosenCategory: string;
  choosenDifficulty: string;
  choosenAmountOfQuestions: number;

  playerMode: string;

  getData: string;

  allQuestions: any[];
  allAnswers: any[];

  currentRound: number = 0;
  // ongetquiz to change player2
  endAtRound: number = 5;
  currentQuestion: string;
  currentAnswer: string;
  currentPlayerAnswer: string;

  playerScore: number = 0;
  playerName: string;

  showResult: boolean = false;
  showGame: boolean = true;
  showGameClass: string = 'jumbotron col-lg-6 animated fadeInLeft';



  constructor(public httpService: HttpService, public router: Router, private activatedRoute: ActivatedRoute) { }


  endGame() {


    // Runs at 2 players
    if (this.showP1P2 == true){

      this.showResult2Players = true;

      if (this.p1Score > this.p2Score){

        this.playerScore = this.p1Score;
        this.resultP1P2 = 'PLAYER 1 WON!';
        this.onlyOnWinner = true;
      }

      else if(this.p1Score < this.p2Score){
        this.playerScore = this.p2Score;
        this.resultP1P2 = 'PLAYER 2 WON!';
        this.onlyOnWinner = true;
      }

      else{
        this.resultP1P2 = 'TIE!';
        this.onlyOnTie = true;
      }
      this.showGame = false;
      this.showResult2Players = true;

    }
    // Runs at 1 player
    else if (this.showP1P2 == false){
      this.showGame = false;
      this.showResult = true;
    }

  }

  onGetQuiz() {
    // If mode = 1, gets 5 questions from the API
    if (this.choosenMode == 1){
      this.choosenAmountOfQuestions = 5;
    }
    // If mode = 2, gets 10 questions from the API
    else if (this.choosenMode == 2){
      this.endAtRound = 10;
      this.choosenAmountOfQuestions = 10;
      this.showP1P2 = true;
      this.currentPlayer = 'Player 1'
    }

    else{
      alert('OGILTIGT!');
    }

    this.httpService.getQuestions(this.choosenAmountOfQuestions,this.choosenCategory, this.choosenDifficulty)
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

  clickTrueFalse(buttonAnswer) {
    this.currentPlayerAnswer = buttonAnswer
    if (this.currentPlayerAnswer == this.currentAnswer) {


      // Gives P1 or P2 points if given correct answer
      if(this.currentPlayer == 'Player 1'){
        this.p1Score++;
      }
      else if (this.currentPlayer == 'Player 2'){
        this.p2Score++;
      }

      this.playerScore++;
      this.showGameClass = 'jumbotron col-lg-6 animated pulse rightAnswer';
      let audio = new Audio();
      audio.src = "../../assets/right.wav";
      audio.load();
      audio.play();
      setTimeout( () => {this.showGameClass = 'jumbotron col-lg-6 animated fadeOutRight rightAnswer'}, 500);
      console.log('Right!');

    }
    else {
      this.showGameClass = 'jumbotron col-lg-6 animated pulse wrongAnswer'
      let audio = new Audio();
      audio.src = "../../assets/wrong.wav";
      audio.load();
      audio.play();
      setTimeout( () => {this.showGameClass = 'jumbotron col-lg-6 animated fadeOutRight wrongAnswer'}, 500);
      console.log('WRONG!')
    }

    // Toggles between player 1 and 2 if 2player
    if(this.showP1P2){

      if(this.currentPlayer == 'Player 1'){

        setTimeout( () => {this.currentPlayer = 'Player 2'}, 1000);

      }
      else if ( this.currentPlayer = 'Player 2'){
        setTimeout( () => {this.currentPlayer = 'Player 1'}, 1000);
      }
    }



    console.log('SCORE: ' + this.playerScore);
    // Ends game if questions are finished
    if (this.endAtRound - 1 == this.currentRound) {
      setTimeout( () => {this.endGame()}, 1000);
    }
    else {
      setTimeout( () => {this.currentRound++}, 1000);
      setTimeout( () => {this.playGame()}, 1000);
      setTimeout( () => {this.showGameClass = 'jumbotron col-lg-6 animated fadeInLeft'}, 1000);
    }
  }

  playGame() {
    let i: number = this.currentRound;
    this.currentQuestion = this.allQuestions[i];
    this.currentAnswer = this.allAnswers[i];

  }
  onPostScoreboard() {

    this.router.navigate(['scoreboard/' + this.playerScore + '/' + this.playerName + '']);



    let oldItems = JSON.parse(localStorage.getItem('players')) || [];

    let newItem =
    {
      'playerName': this.playerName , 'playerScore': this.playerScore
    };

    oldItems.push(newItem);
    oldItems.sort(function(obj1, obj2){
      return obj2.playerScore - obj1.playerScore;
    });
    localStorage.setItem('players', JSON.stringify(oldItems));

  }
  // Gets via HTML form users username
  onSubmit(value: any){
    this.playerName = value.username;
    this.onPostScoreboard();
  }



  ngOnInit() {
    // Fetches via URL the category and difficulty level the user choose
    this.choosenMode = this.activatedRoute.snapshot.params.mode;
    this.choosenCategory = this.activatedRoute.snapshot.params.category;
    this.choosenDifficulty = this.activatedRoute.snapshot.params.difficulty;

    console.log('QUIZMODE: ' + this.choosenMode);

    this.onGetQuiz();
  }
}
