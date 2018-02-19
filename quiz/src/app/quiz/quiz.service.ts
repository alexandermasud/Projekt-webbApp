import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';

@Injectable()
export class HttpService {

  constructor(private httpClient: HttpClient){}

  getQuestions(){

    return this.httpClient.get('https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=boolean')
      .map(
        (data) => {
          return data;
        });
  }
}
