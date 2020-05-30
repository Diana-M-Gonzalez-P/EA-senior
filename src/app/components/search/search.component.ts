import { Component, OnInit } from '@angular/core';
import { TwitterService } from '../../services/twitter.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../../class/error';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  tweets: any[] = [];
  miniCard: any[] = [];
  searchForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  error = false;
  mensError: string;

  constructor( private twitter: TwitterService, private formBuilder: FormBuilder ) { }

  ngOnInit(): void {
    this.error = false;
    this.searchForm = this.formBuilder.group({
      search: ['', [Validators.required, Validators.pattern('[^\@\#]+')]]
    });
  }

  get formS() { return this.searchForm.controls; }

  search( word: string ){
    this.twitter.getSearch(word)
    .subscribe( (resp: any) => {
      this.tweets = resp.data.statuses;
      this.miniCard = this.tweets.slice(0, 6);
      if ( this.miniCard.length === 0){
        this.error = true;
        this.mensError = 'No se pudo retornar resultados';
      } else {
        this.error = false;
      }
    }, errorService => {
      console.log(errorService);
      this.error = true;
      this.mensError = 'No se pudo retornar resultados';
      this.tweets = [];
      this.miniCard = [];
    });
  }

  validateForm(form){
    if (form.invalid) {
      this.tweets = [];
      this.miniCard = [];
    }
  }

  onScroll() {
    if ( this.miniCard.length < this.tweets.length ){
      const len = this.miniCard.length;
      for (let i = len; i <= len + 1; i++){
        this.miniCard.push(this.tweets[i]);
      }
    }
    // console.log(this.miniCard.length < this.tweets.length);
    // console.log('miniCard', this.miniCard.length);
    // console.log('tweets', this.tweets.length);
  }
}
