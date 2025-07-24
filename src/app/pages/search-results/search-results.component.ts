import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { MovieService } from '../../serves/movie.service';

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

  constructor(
    private router: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.router.paramMap.subscribe((params) => {
      this.query = params.get('query') || '';
      if (this.query) {
        this.loadSearchResults();
      }
    });
  }

  loadSearchResults(): void {
    this.movieService.searchMovies(this.query).subscribe((data) => {
      this.searchResults = data.results.filter(
        (movie: any) => movie.poster_path
      );
      console.log('Resultados da pesquisa:', this.searchResults);
    });
  }
}
