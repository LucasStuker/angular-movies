import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WatchlistService } from '../../services/watchlist.service';

@Component({
  selector: 'app-movie-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css',
})
export class MovieCardComponent {
  @Input() movie: any;
  isInWatchlist: boolean = false;

  constructor(private watchlistService: WatchlistService) {}

  ngOnInit(): void {
    this.watchlistService.watchlist$.subscribe((watchlist) => {
      this.isInWatchlist = watchlist.some((item) => item.id === this.movie.id);
    });
  }

  toogleWatchlist(event: MouseEvent): void {
    event?.preventDefault();
    event?.stopPropagation();

    if (this.isInWatchlist) {
      this.watchlistService.removeFromWatchlist(this.movie.id);
    } else {
      this.watchlistService.addToWatchlist(this.movie);
    }
  }
}
