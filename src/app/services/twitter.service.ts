import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TwitterService {

  apiUrl = 'http://localhost:5000';

  private urlSearch = this.apiUrl + '/search/';
  private urlFavorite = this.apiUrl + '/favorites/';
  private urlNoFavorite = this.apiUrl + '/nofavorites/';
  private urlretweet = this.apiUrl + '/retweet/';
  private urlunretweet = this.apiUrl + '/unretweet/';


  constructor( private http: HttpClient ) { }

  getSearch( word: string ) {
    return this.http
      .get(this.urlSearch + `${ word }`)
      .pipe(map(data => data));
  }

  postFavorite( id: string ) {
    const body = {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      };
    return this.http
      .post(this.urlFavorite + `${ id }`, body)
      .pipe(map(data => data));
  }

  postNoFavorite( id: string ) {
    const body = {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      };
    return this.http
      .post(this.urlNoFavorite + `${ id }`, body)
      .pipe(map(data => data));
  }

  postRetweet( id: string ) {
    const body = {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      };
    return this.http
      .post(this.urlretweet + `${ id }`, body)
      .pipe(map(data => data));
  }

  postUnretweet( id: string ) {
    const body = {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      };
    return this.http
      .post(this.urlunretweet + `${ id }`, body)
      .pipe(map(data => data));
  }
}
