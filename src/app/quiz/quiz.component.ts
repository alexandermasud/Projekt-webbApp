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

  rightSound = new Audio('assets/right.mp3');
  wrongSound = new Audio('assets/wrong.mp3');

  showP1P2: boolean = false;//Configures the gamemode to 2 player.
  currentPlayer: string;//The player who is answering the question.
  p1Score: number = 0;
  p2Score: number = 0;
  showResult2Players: boolean = false;//Shows the result div for 2 player mode.
  resultP1P2: string;//Show the winner of the 2 player mode.
  onlyOnWinner: boolean = false;//If there is a winner shows appropriet div.
  onlyOnTie: boolean = false;//If the game is tied show appropriet div.

  buttonActive: boolean = false;//Temporarily disables the answer buttons.
  // -------------------------

  choosenMode: number;//Saves the gamemode.
  choosenCategory: string;//Saves the category
  choosenDifficulty: string;//Saves the difficulty 
  choosenAmountOfQuestions: number;//Saves the questions

  playerMode: string;

  getData: string;//Contains the respnse data from the API.

  allQuestions: any[];//Contains all the questions from the API
  allAnswers: any[];//Contains all the correct answers to the questions.

  currentRound: number = 0;
  // ongetquiz to change player2
  endAtRound: number = 5;
  currentQuestion: string;
  currentAnswer: string;
  currentPlayerAnswer: string;

  playerScore: number = 0;
  playerName: string;

  showResult: boolean = false;//Shows the result for 1 player.
  showGame: boolean = false;//Main game form.
  showGameClass: string = 'jumbotron col-lg-6 animated fadeInLeft';

  starwarsQuestions: any = {"response_code":0,"results":[
    {"category":"Starwars","type":"boolean","difficulty":"easy","question":"Jango Fetts armor is Mandalorian","correct_answer":"True","incorrect_answers":["False"]},
    {"category":"Starwars","type":"boolean","difficulty":"easy","question":"At one point Star Wars: Episode VI - Return of The Jedi was going to be called Revenge of the Jedi.","correct_answer":"True","incorrect_answers":["False"]},
    {"category":"Starwars","type":"boolean","difficulty":"easy","question":"The wookie homeworld i called Naboo","correct_answer":"False","incorrect_answers":["True"]},
    {"category":"Starwars","type":"boolean","difficulty":"easy","question":"The species of Jar Jar Binks is Toydarian","correct_answer":"False","incorrect_answers":["True"]},
    {"category":"Starwars","type":"boolean","difficulty":"easy","question":"Boba Fett is Jango Fetts father","correct_answer":"False","incorrect_answers":["Correct"]},
    {"category":"Starwars","type":"boolean","difficulty":"easy","question":"There are 10 members in the Jedi Council","correct_answer":"False","incorrect_answers":["True"]},
    {"category":"Starwars","type":"boolean","difficulty":"easy","question":"Yodas lightsaber is green","correct_answer":"True","incorrect_answers":["False"]},
    {"category":"Starwars","type":"boolean","difficulty":"easy","question":"The mother of Luke and Leia is Padmé Amidala","correct_answer":"True","incorrect_answers":["False"]},
    {"category":"Starwars","type":"boolean","difficulty":"easy","question":"The Ewoks that appear in Return of the Jedi, inhabits the forest moon of Endor.","correct_answer":"True","incorrect_answers":["False"]},
    {"category":"Starwars","type":"boolean","difficulty":"easy","question":"Chewbacca is the first mate aboard the Millenium Falcon and Han Solo's trusted companion.","correct_answer":"True","incorrect_answers":["False"]}
  ]};


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

    if(this.choosenCategory == '32'){
      this.getData = this.starwarsQuestions;
      this.getData = JSON.stringify(this.getData)
      this.loopQuestions();
    }

    else{
      this.httpService.getQuestions(this.choosenAmountOfQuestions,this.choosenCategory, this.choosenDifficulty)
        .subscribe(
        data => this.getData = JSON.stringify(data),
        error => alert(error),
        () => this.loopQuestions()
        );
    }
  }

  //Loops the result from the api call and adds all the questions and correct answers into arrays.
  //The functions takes the first question in the array when it is run.
  loopQuestions() {

    let data = JSON.parse(this.getData);
    let questions: any[] = [];
    let answers: any[] = [];

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
    this.showGame = true;
  }

  //Checks which answerbutton has been pressed. The function adds +1 if the answer is correct
  //The function handels animations of questions, and plays audio files based on the players answer.
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

      this.rightSound.play();
      setTimeout( () => {this.showGameClass = 'jumbotron col-lg-6 animated fadeOutRight rightAnswer'}, 500);
      setTimeout( () => {this.buttonActive = true}, 10);

      console.log('Right!');
    }

    else {
      this.showGameClass = 'jumbotron col-lg-6 animated pulse wrongAnswer'

      this.wrongSound.play();
      setTimeout( () => {this.showGameClass = 'jumbotron col-lg-6 animated fadeOutRight wrongAnswer'}, 500);
      setTimeout( () => {this.buttonActive = true}, 10);

      console.log('WRONG!')
    }

    // Togglar mellan player 1 och 2 om 2player
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
    this.buttonActive = false;
  }

  //Posts the players result to a scoreboard. The result is saved in localStorage.
  //Sorts the results by the score property from higest to lowest.
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
