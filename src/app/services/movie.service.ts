import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiKey = environment.apiKey;
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPopularMovies(page: number): Observable<any> {
    const url = `${this.apiUrl}/movie/popular?api_key=${this.apiKey}&language=pt-BR&page=${page}`;
    console.log('Buscando filmes populares:', url);
    return this.http.get<any>(url);
  }

  getMovieDetails(id: string): Observable<any> {
    const url = `${this.apiUrl}/movie/${id}?api_key=${this.apiKey}&language=pt-BR`;
    console.log('Buscando detalhdos do filme:', url);
    return this.http.get(url);
  }

  searchMovies(query: string): Observable<any> {
    const url = `${this.apiUrl}/search/movie?api_key=${this.apiKey}&language=pt-BR&query=${query}`;
    return this.http.get<any>(url);
  }
  getGenres(): Observable<any> {
    const url = `${this.apiUrl}/genre/movie/list?api_key=${this.apiKey}&language=pt-BR`;
    return this.http.get(url);
  }
  getMoviesByGenre(genreId: number, page: number): Observable<any> {
    const url = `${this.apiUrl}/discover/movie?api_key=${this.apiKey}&language=pt-BR&with_genres=${genreId}&page=${page}`;
    return this.http.get(url);
  }

  getMovieCredits(id: string): Observable<any> {
    const url = `${this.apiUrl}/movie/${id}/credits?api_key=${this.apiKey}&language=pt-BR`;
    return this.http.get(url);
  }

  discoverMovies(
    genreId: string,
    minRating: number,
    startYear: number,
    page: number,
    minVoteCount: number,
    sortBy: string,
    exactYear: number | null = null
  ): Observable<any> {
    let url = `${this.apiUrl}/discover/movie?api_key=${this.apiKey}&language=pt-BR&sort_by=${sortBy}&page=${page}`;

    if (genreId) {
      url += `&with_genres=${genreId}`;
    }
    if (minRating) {
      url += `&vote_average.gte=${minRating}`; // .gte = Greater than or equal (maior ou igual)
    }

    if (exactYear) {
      url += `&primary_release_year=${exactYear}`;
    } else if (startYear) {
      // Só usa o 'a partir de' se um ano exato não for fornecido
      url += `&primary_release_date.gte=${startYear}-01-01`;
    }
    if (startYear) {
      url += `&primary_release_date.gte=${startYear}-01-01`; // .gte = a partir de 01/01 do ano
    }
    if (minVoteCount) {
      url += `&vote_count.gte=${minVoteCount}`;
    }

    return this.http.get(url);
  }
}
