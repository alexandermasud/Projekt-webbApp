import { Component, OnInit } from '@angular/core';
import { HttpService } from './quiz.service';
import { Router, ActivatedRoute } from '@angular/router';

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
  // ongetquiz för att ändra 2player
  endAtRound: number = 5;
  currentQuestion: string;
  currentAnswer: string;
  currentPlayerAnswer: string;

  playerScore: number = 0;
  playerName: string;

  showResult: boolean = false;
  showGame: boolean = true;



  constructor(public httpService: HttpService, public router: Router, private activatedRoute: ActivatedRoute) { }


  endGame() {
    // Körs vi 2player
    if (this.showP1P2 == true){
      this.showP1P2 = false;
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
      }

      this.showResult2Players = true;
    }
    // Körs vid 1player
    else if (this.showP1P2 == false){
      this.showGame = false;
      this.showResult = true;
    }

  }

  onGetQuiz() {

    if (this.choosenMode == 1){
      this.choosenAmountOfQuestions = 5;
    }

    else if (this.choosenMode == 2){
      this.endAtRound = 10;
      this.choosenAmountOfQuestions = 10;
      this.showP1P2 = true;
      this.currentPlayer = 'Player1'
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

      // Ger p1 eller p2 poäng om rätt svar
      if(this.currentPlayer == 'Player1'){
        this.p1Score++;
      }
      else if (this.currentPlayer == 'Player2'){
        this.p2Score++;
      }

      this.playerScore++;
      console.log('Right!');

    }
    else {
      console.log('WRONG!')
    }

    // Togglar mellan player 1 och 2 om 2player
    if(this.showP1P2){

      if(this.currentPlayer == 'Player1'){
         this.currentPlayer = 'Player2';
      }
      else if ( this.currentPlayer = 'Player2'){
        this.currentPlayer = 'Player1'
      }
    }



    console.log('SCORE: ' + this.playerScore);
    // Avsultar spel om frågor är slut
    if (this.endAtRound - 1 == this.currentRound) {
      this.endGame();
    }
    else {
      this.currentRound++;
      this.playGame();
    }
  }

  playGame() {
    let i: number = this.currentRound;
    this.currentQuestion = this.allQuestions[i];
    this.currentAnswer = this.allAnswers[i];

  }
  onPostScoreboard(scoreBoardAnswer) {
    if (scoreBoardAnswer) {
      this.playerName = prompt("Enter name my man/woman/nonbinary/owlkin/dragonkin: ");
      this.router.navigate(['scoreboard/' + this.playerScore + '/' + this.playerName + '']);
      


      let oldItems = JSON.parse(localStorage.getItem('players')) || [];

      let newItem =
      {
        'playerName': this.playerName , 'playerScore': this.playerScore
      };

      oldItems.push(newItem);

      localStorage.setItem('players', JSON.stringify(oldItems));
        //localStorage.setItem('result', '');
      //localStorage.setItem('result', JSON.stringify(sendToLocal));





    } else {
      this.router.navigate(['intro']);
    }
  }


  ngOnInit() {
    // Hämtar via URL ut vilken kategori och svårighetsgrad spelaren valde
    this.choosenMode = this.activatedRoute.snapshot.params.mode;
    this.choosenCategory = this.activatedRoute.snapshot.params.category;
    this.choosenDifficulty = this.activatedRoute.snapshot.params.difficulty;

    console.log('QUIZMODE: ' + this.choosenMode);

    this.onGetQuiz();
  }
}
