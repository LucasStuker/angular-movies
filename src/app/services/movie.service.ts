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
}
