import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../../services/movie.service';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';

@Component({
  selector: 'app-movie-suggester',
  standalone: true, // <<< 1. ESTAVA FALTANDO ESTE PONTO CRÍTICO!
  imports: [CommonModule, FormsModule, MovieCardComponent],
  templateUrl: './movie-suggester.component.html',
  styleUrls: ['./movie-suggester.component.css'], // Padrão é 'styleUrls' (plural)
})
export class MovieSuggesterComponent implements OnInit {
  // Propriedades (estavam corretas)
  genres: any[] = [];
  selectedGenreId: string = '';
  minRating: number = 7;
  startYear: number = 2010;
  suggestedMovie: any = null;
  isLoading: boolean = false;
  error: string | null = null;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadGenres();
  }

  loadGenres(): void {
    this.movieService.getGenres().subscribe((data: any) => {
      this.genres = data.genres;
    });
  }

  // CORREÇÃO 2: Nome da função no singular para bater com o HTML
  findAndSuggestMovie(): void {
    this.isLoading = true;
    this.suggestedMovie = null;
    this.error = null;

    // 1. Primeira chamada para descobrir o total de páginas
    this.movieService
      .discoverMovies(this.selectedGenreId, this.minRating, this.startYear, 1)
      .subscribe({
        next: (initialData: any) => {
          // Se a primeira página já não tem resultados, não há o que fazer.
          if (!initialData.results || initialData.results.length === 0) {
            this.error =
              'Nenhum filme encontrado com esses critérios. Tente filtros mais abertos!';
            this.isLoading = false;
            return; // Encerra a função aqui
          }

          // A API do TMDb limita os resultados a 500 páginas, então usamos o menor valor
          const totalPages = Math.min(initialData.total_pages, 500);
          const randomPage = Math.floor(Math.random() * totalPages) + 1;

          // Se a página aleatória for a 1, já temos os dados! Não precisa de nova chamada.
          if (randomPage === 1) {
            const randomIndex = Math.floor(
              Math.random() * initialData.results.length
            );
            this.suggestedMovie = initialData.results[randomIndex];
            this.isLoading = false;
            return;
          }

          // 2. Segunda chamada, agora para a página aleatória e válida
          this.movieService
            .discoverMovies(
              this.selectedGenreId,
              this.minRating,
              this.startYear,
              randomPage
            )
            .subscribe({
              next: (randomPageData: any) => {
                if (
                  randomPageData.results &&
                  randomPageData.results.length > 0
                ) {
                  const randomIndex = Math.floor(
                    Math.random() * randomPageData.results.length
                  );
                  this.suggestedMovie = randomPageData.results[randomIndex];
                } else {
                  // Caso raro da página aleatória vir vazia, sorteamos da primeira página como fallback
                  const randomIndex = Math.floor(
                    Math.random() * initialData.results.length
                  );
                  this.suggestedMovie = initialData.results[randomIndex];
                }
                this.isLoading = false;
              },
              error: (err) => {
                this.error =
                  'Ocorreu um erro na segunda busca. Tente novamente.';
                this.isLoading = false;
              },
            });
        },
        error: (err) => {
          this.error =
            'Ocorreu um erro ao buscar os filmes. Tente novamente mais tarde.';
          this.isLoading = false;
        },
      });
  }
}
