import { WatchlistService } from '../../services/watchlist.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit {
  movie: any = null;
  cast: any[] = [];
  isInWatchlist: boolean = false;
  hasWatchProviders: boolean = false;
  watchProviders: any = null;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,

    private watchlistService: WatchlistService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      forkJoin({
        details: this.movieService.getMovieDetails(id),
        credits: this.movieService.getMovieCredits(id),
        providers: this.movieService.getMovieWatchProviders(id),
      }).subscribe(({ details, credits, providers }) => {
        this.movie = details;
        this.cast = credits.cast
          .filter((member: any) => member.profile_path)
          .slice(0, 10);
        this.watchProviders = providers.results.BR;
        this.hasWatchProviders = !!(
          this.watchProviders?.flatrate ||
          this.watchProviders?.rent ||
          this.watchProviders?.buy
        );
        this.listenToWatchlistChanges();
      });
    }
  }

  listenToWatchlistChanges(): void {
    this.watchlistService.watchlist$.subscribe(() => {
      if (this.movie) {
        this.isInWatchlist = this.watchlistService.isInWatchlist(this.movie.id);
      }
    });
  }

  toggleWatchlist(): void {
    if (this.isInWatchlist) {
      this.watchlistService.removeFromWatchlist(this.movie.id);
    } else {
      this.watchlistService.addToWatchlist(this.movie);
    }
  }
}
