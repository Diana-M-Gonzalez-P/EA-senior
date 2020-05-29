import { Component, OnInit } from '@angular/core';
import { TwitterService } from '../../services/twitter.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  tweets: any[] = [];
  searchForm = new FormControl();

  constructor( private twitter: TwitterService ) { }

  ngOnInit(): void {
  }

  search( word: string ){
    console.log(word);
    this.twitter.getSearch(word)
    .subscribe( (resp: any) => {
      console.log(resp.data.statuses);
      this.tweets = resp.data.statuses;
    });
  }


}
