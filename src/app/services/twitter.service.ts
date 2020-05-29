import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TwitterService {

  apiUrl = 'http://localhost:5000';

  constructor( private http: HttpClient ) { }

  getSearch( word: string ) {
    return this.http
      .get(this.apiUrl + `/search/${ word }`)
      .pipe(map(data => data));
  }
}
