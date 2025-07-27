import { WatchlistService } from './../../services/watchlist.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-details',
  imports: [CommonModule],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css',
})
export class MovieDetailsComponent implements OnInit {
  movie: any = null;
  isInWatchlist: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private WatchlistService: WatchlistService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.movieService.getMovieDetails(id).subscribe((data) => {
        console.log('Detalhes do filme:', data);
        this.movie = data;

        this.listenToWatchlistChanges();
      });
    }
  }

  listenToWatchlistChanges(): void {
    this.WatchlistService.watchlist$.subscribe((watchlist) => {
      this.isInWatchlist = watchlist.some((item) => item.id === this.movie.id);
    });
  }

  toggleWatchlist(): void {
    if (this.isInWatchlist) {
      this.WatchlistService.removeFromWatchlist(this.movie.id);
    } else {
      this.WatchlistService.addToWatchlist(this.movie);
    }
  }
}
