import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quiz-setup',
  templateUrl: './quiz-setup.component.html',
  styleUrls: ['./quiz-setup.component.css']
})
export class QuizSetupComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  // Specifies if category and difficulty shall be visible on html
  showMode: boolean = true;
  showCategory: boolean = false;
  showDifficulty: boolean = false;
  showMediumButton: boolean = true;

  // Choosen category and difficulty level
  choosenMode: string;
  choosenCategory: string;
  choosenDifficulty: string;

  showHardButton: boolean = true;

  breadPlayer: string;
  breadCategory: string;


  setMode(mode){
    this.choosenMode = mode;
    this.showMode = false;
    this.showCategory = true;

    if(this.choosenMode == '1'){
      this.breadPlayer = 'One player';
    }
    else{
      this.breadPlayer = 'Multiplayer';
    }

  }

  // Removes categories and adds difficultylevels on html
  setCategory(category){
    this.choosenCategory = category;
    this.showCategory = false;
    this.showDifficulty = true;
    if(category == '21' || category == '27' || category == '18' || category == '32'){
      this.showHardButton = false;
    }
    if (category == '32'){
      this.showMediumButton = false;
    }

    if(this.choosenCategory == '9'){
      this.breadCategory = 'General';
    }
    else if(this.choosenCategory == '21'){
      this.breadCategory = 'Sports';
    }
    else if(this.choosenCategory == '23'){
      this.breadCategory = 'History';
    }
    else if(this.choosenCategory == '27'){
      this.breadCategory = 'Animals';
    }
    else if(this.choosenCategory == '18'){
      this.breadCategory = 'Sci-Computers';
    }
    else if(this.choosenCategory == '32'){
      this.breadCategory = 'Starwars';
    }

  }

  setDifficulty(difficulty){
   this.choosenDifficulty = difficulty;

   console.log('MODE: ' + this.choosenMode);
   console.log('CATEGORY: ' + this.choosenCategory);
   console.log('DIFFICULTY: ' + this.choosenDifficulty);


   this.router.navigate(['quiz/' +this.choosenMode + '/' + this.choosenCategory +'/'+ this.choosenDifficulty +'']);

  }

  ngOnInit() {

  }

}
