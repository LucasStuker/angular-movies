import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class WatchlistService {
  private watchlistSource = new BehaviorSubject<any[]>(
    this.getWatchlistFromStorage()
  );
  watchlist$ = this.watchlistSource.asObservable();
  constructor() {}

  private getWatchlistFromStorage(): any[] {
    const watchlistJson = localStorage.getItem('mozaoFlixWatchlist');
    return watchlistJson ? JSON.parse(watchlistJson) : [];
  }

  private saveWatchlistToStorage(watchlist: any[]): void {
    localStorage.setItem('mozaoFlixWatchlist', JSON.stringify(watchlist));
    this.watchlistSource.next(watchlist); // Emite a nova lista para quem estiver ouvindo
  }

  ddToWatchlist(movie: any): void {
    const currentWatchlist = this.getWatchlistFromStorage();
    // Evita adicionar filmes duplicados
    if (!this.isInWatchlist(movie.id)) {
      const updatedWatchlist = [...currentWatchlist, movie];
      this.saveWatchlistToStorage(updatedWatchlist);
    }
  }

  // Remove um filme da lista
  removeFromWatchlist(movieId: number): void {
    const currentWatchlist = this.getWatchlistFromStorage();
    const updatedWatchlist = currentWatchlist.filter(
      (item) => item.id !== movieId
    );
    this.saveWatchlistToStorage(updatedWatchlist);
  }

  // Verifica se um filme já está na lista (pelo ID)
  isInWatchlist(movieId: number): boolean {
    const currentWatchlist = this.getWatchlistFromStorage();
    return currentWatchlist.some((item) => item.id === movieId);
  }
}
