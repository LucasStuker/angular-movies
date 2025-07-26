import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie.service';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { GenreListComponent } from '../../components/genre-list/genre-list.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MovieCardComponent, GenreListComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  movies: any[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  selectedGenreId: number | null = null; // <<< Variável chave

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadPopularMovies(1);
  }

  loadPopularMovies(page: number): void {
    this.selectedGenreId = null; // Limpa o filtro
    this.movieService.getPopularMovies(page).subscribe((data) => {
      this.movies = data.results.filter(
        (movie: any) => movie && movie.poster_path
      );
      this.currentPage = data.page;
      this.totalPages = data.total_pages;
    });
  }

  handleGenreSelection(genreId: number | null): void {
    this.selectedGenreId = genreId;
    this.loadMoviesByGenre(1); // Sempre começa da página 1
  }

  loadMoviesByGenre(page: number): void {
    if (this.selectedGenreId === null) {
      this.loadPopularMovies(page);
      return;
    }
    this.movieService
      .getMoviesByGenre(this.selectedGenreId, page)
      .subscribe((data) => {
        this.movies = data.results.filter(
          (movie: any) => movie && movie.poster_path
        );
        this.currentPage = data.page;
        this.totalPages = data.total_pages;
      });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      const nextPage = this.currentPage + 1;
      // Se um gênero estiver selecionado, pagina nos gêneros, senão, nos populares
      this.selectedGenreId
        ? this.loadMoviesByGenre(nextPage)
        : this.loadPopularMovies(nextPage);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      const prevPage = this.currentPage - 1;
      this.selectedGenreId
        ? this.loadMoviesByGenre(prevPage)
        : this.loadPopularMovies(prevPage);
    }
  }
}
