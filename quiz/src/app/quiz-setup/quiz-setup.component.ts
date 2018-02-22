import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quiz-setup',
  templateUrl: './quiz-setup.component.html',
  styleUrls: ['./quiz-setup.component.css']
})
export class QuizSetupComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  gameMode: number;
  // Anger om kategorier och svårighetsgrad ska synas på html
  showCategory: boolean = true;
  showDifficulty: boolean = false;

  // Vald kategori och svårighetsgrad
  choosenCategory: string;
  choosenDifficulty: string;

  // Tar bort kategorierna och lägger till svårighetsgraderna på html
  setCategory(category){
    this.choosenCategory = category;
    this.showCategory = false;
    this.showDifficulty = true;
  }

  setDifficulty(difficulty){
   this.choosenDifficulty = difficulty;

   console.log('MODE: ' + this.gameMode);
   console.log('CATEGORY: ' + this.choosenCategory);
   console.log('DIFFICULTY: ' + this.choosenDifficulty);

   if (this.gameMode == 1){
     this.router.navigate(['quiz/' + this.choosenCategory +'/'+ this.choosenDifficulty +'']);
   }
   else if(this.gameMode == 2){
     alert('DU VALDE 2 PLAYER, DEN FUNKTIONEN KOMMER SNART!');
   }
   else{
     alert('INTE GILTIGT VAL!');
   }
  }

  ngOnInit() {
    // Hämtar via URL ut om användaren tryckte 1 eller 2 player
    this.gameMode = this.activatedRoute.snapshot.params.playermode;
    console.log(this.gameMode);
  }

}
