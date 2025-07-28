import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../../services/movie.service';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { forkJoin, of } from 'rxjs';
@Component({
  selector: 'app-movie-suggester',
  standalone: true,
  imports: [CommonModule, FormsModule, MovieCardComponent],
  templateUrl: './movie-suggester.component.html',
  styleUrls: ['./movie-suggester.component.css'],
})
export class MovieSuggesterComponent implements OnInit {
  genres: any[] = [];
  selectedGenreId: string = '';
  minRating: number = 7;
  minVoteCount: number = 300;
  startYear: number = 2010;
  suggestedMovie: any = null;
  isLoading: boolean = false;
  error: string | null = null;
  sortBy: string = 'popularity.desc';
  exactYear: number | null = null;

  private suggestedMovieIds = new Set<number>();

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadGenres();
  }

  loadGenres(): void {
    this.movieService.getGenres().subscribe((data: any) => {
      this.genres = data.genres;
    });
  }

  findAndSuggestMovie(): void {
    this.isLoading = true;
    this.error = null;
    this.suggestedMovie = null;

    this.movieService
      .discoverMovies(
        this.selectedGenreId,
        this.minRating,
        this.startYear,
        1,
        this.minVoteCount,
        this.sortBy,
        this.exactYear
      )
      .subscribe({
        next: (initialData: any) => {
          if (!initialData.results || initialData.results.length === 0) {
            this.error =
              'Nenhum filme encontrado com os critérios selecionados.';
            this.isLoading = false;
            return;
          }
          const totalPages = Math.min(initialData.total_pages, 500);

          const randomPage1 = Math.floor(Math.random() * totalPages) + 1;
          let randomPage2 = randomPage1;
          if (totalPages > 1) {
            while (randomPage2 === randomPage1) {
              randomPage2 = Math.floor(Math.random() * totalPages) + 1;
            }
          }
          const call1 = this.movieService.discoverMovies(
            this.selectedGenreId,
            this.minRating,
            this.startYear,
            randomPage1,
            this.minVoteCount,
            this.sortBy,
            this.exactYear
          );
          const call2 =
            totalPages > 1
              ? this.movieService.discoverMovies(
                  this.selectedGenreId,
                  this.minRating,
                  this.startYear,
                  randomPage2,
                  this.minVoteCount,
                  this.sortBy,
                  this.exactYear
                )
              : of({ results: [] });

          forkJoin([call1, call2]).subscribe({
            next: (results) => {
              const [Page1Data, Page2Data] = results;

              const combinetdResults = [
                ...Page1Data.results,
                ...Page2Data.results,
              ];
              const newMovies = combinetdResults.filter(
                (movie: any) =>
                  movie &&
                  movie.poster_path &&
                  !this.suggestedMovieIds.has(movie.id)
              );

              if (newMovies.length > 0) {
                const randomIndex = Math.floor(
                  Math.random() * newMovies.length
                );
                this.suggestedMovie = newMovies[randomIndex];
                this.suggestedMovieIds.add(this.suggestedMovie.id);
              } else {
                this.error =
                  'Nenhum filme novo encontrado com os critérios selecionados.';
              }
              this.isLoading = false;
            },
            error: (err) => {
              console.error('Erro ao buscar filmes:', err);
              this.error = 'Ocorreu um erro ao buscar filmes. Tente novamente.';
              this.isLoading = false;
            },
          });
        },
        error: (err) => {
          console.error('Erro ao buscar filmes:', err);
          this.error = 'Ocorreu um erro ao buscar filmes. Tente novamente.';
          this.isLoading = false;
        },
      });
  }

  clearHistory(): void {
    this.suggestedMovieIds.clear();
    this.suggestedMovie = null;
    this.error = 'Histórico de sugestões limpo! Pode sortear de novo.';
  }
}
