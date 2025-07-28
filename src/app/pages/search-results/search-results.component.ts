import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css',
})
export class SearchResultsComponent implements OnInit {
  searchResults: any[] = [];
  query: string = '';
  currentPage: number = 1;
  totalPages: number = 0;
  private readonly MIN_VOTE_COUNT = 50;

  constructor(
    private router: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.router.paramMap.subscribe((params) => {
      this.query = params.get('query') || '';
      if (this.query) {
        this.loadSearchResults(1);
      }
    });
  }

  loadSearchResults(page: number): void {
    this.movieService.searchMovies(this.query).subscribe((data) => {
      const filteredresults = data.results.filter(
        (movie: any) =>
          movie && movie.poster_path && movie.vote_count >= this.MIN_VOTE_COUNT
      );
      this.searchResults = filteredresults;
      this.currentPage = data.page;
      this.totalPages = data.total_pages;
    });
  }
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.loadSearchResults(this.currentPage + 1);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.loadSearchResults(this.currentPage - 1);
    }
  }
}
