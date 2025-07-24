import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../serves/movie.service';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  movies: any[] = [];
  currentPage: number = 1;
  totalPages: number = 0;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadMovies(this.currentPage);
  }
  loadMovies(page: number): void {
    this.movieService.getPopularMovies(page).subscribe((data) => {
      this.movies = data.results.filter((movie: any) => movie.poster_path);
      this.currentPage = data.page;
      this.totalPages = data.total_pages;
    });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.loadMovies(this.currentPage + 1);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.loadMovies(this.currentPage - 1);
    }
  }
}
