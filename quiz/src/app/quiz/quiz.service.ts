import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';

@Injectable()
export class HttpService {

  constructor(private httpClient: HttpClient){}

  getQuestions(amount,category,difficulty){

    return this.httpClient.get('https://opentdb.com/api.php?amount=' + amount +'&category='+ category +'&difficulty='+ difficulty +'&type=boolean')
      .map(
        (data) => {
          return data;
        });
  }
}
