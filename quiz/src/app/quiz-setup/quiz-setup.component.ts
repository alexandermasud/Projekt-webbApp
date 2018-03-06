import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quiz-setup',
  templateUrl: './quiz-setup.component.html',
  styleUrls: ['./quiz-setup.component.css']
})
export class QuizSetupComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  // Anger om kategorier och svårighetsgrad ska synas på html
  showMode: boolean = true;
  showCategory: boolean = false;
  showDifficulty: boolean = false;

  // Vald kategori och svårighetsgrad
  choosenMode: string;
  choosenCategory: string;
  choosenDifficulty: string;

  showHardButton: boolean = true;


  setMode(mode){
    this.choosenMode = mode;
    this.showMode = false;
    this.showCategory = true;

  }

  // Tar bort kategorierna och lägger till svårighetsgraderna på html
  setCategory(category){
    this.choosenCategory = category;
    this.showCategory = false;
    this.showDifficulty = true;
    if(category == '21' || category == '27' || category == '18' || category == '32'){
      this.showHardButton = false;
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
