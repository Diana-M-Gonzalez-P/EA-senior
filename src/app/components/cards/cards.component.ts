import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { TwitterService } from '../../services/twitter.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  @Input() items: any[] = [];
  @Input() scroll: any;

  classActive = false;
  classFavorites = false;
  classShare = false;
  favorites = [];
  share = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor( private snackBar: MatSnackBar, private twitter: TwitterService  ) { }

  ngOnInit(): void {
  }

  clickView(item){
    item.classActive = !item.classActive;
  }

  clickFavorite( item ) {
    item.classFavorites = !item.classFavorites;
    this.favorites.push(item);
    if (  item.classFavorites === true){
      this.twitter.postFavorite( item.id_str)
      .subscribe( resp => {
          this.openSnackBarFavorities();
      });
    } else {
      this.twitter.postNoFavorite( item.id_str)
      .subscribe( resp => {
        this.favorites.splice(item, 1);
      });
    }
    console.log('Favorites', this.favorites);
  }

  clickShare(item) {
    item.classShare = !item.classShare;
    this.share.push(item);
    if (  item.classShare === true){
      this.twitter.postRetweet( item.id_str)
      .subscribe( resp => {
        this.openSnackBarShare();
      });
    } else {
      this.twitter.postUnretweet( item.id_str)
      .subscribe( resp => {
        this.share.splice(item, 1);
      });
    }
    console.log('Share', this.share);
  }

  openSnackBarFavorities() {
    this.snackBar.open('Agregado a favoritos', 'salir', {
      duration: 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  openSnackBarShare() {
    this.snackBar.open('Retwitte Exitoso', 'salir', {
      duration: 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
