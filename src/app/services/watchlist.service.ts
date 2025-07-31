import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  docData,
} from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class WatchlistService {
  public watchlist$: Observable<any[]>;
  private currentUser: User | null = null;
  private currentWatchlist: any[] = []; // 1. NOVA PROPRIEDADE PARA A CÓPIA LOCAL

  constructor(private firestore: Firestore, private authService: AuthService) {
    this.authService.user$.subscribe((user) => {
      this.currentUser = user;
    });

    this.watchlist$ = this.authService.user$.pipe(
      switchMap((user) => {
        if (user) {
          const watchlistCollection = collection(
            this.firestore,
            `users/${user.uid}/watchlist`
          );
          return collectionData(watchlistCollection, { idField: 'id' });
        } else {
          return of([]);
        }
      })
    );

    // 2. "OUVIMOS" A WATCHLIST DO FIREBASE E ATUALIZAMOS NOSSA CÓPIA LOCAL
    this.watchlist$.subscribe((list) => {
      this.currentWatchlist = list;
    });
  }

  // 3. O MÉTODO QUE FALTAVA, AGORA USANDO A CÓPIA LOCAL
  isInWatchlist(movieId: number): boolean {
    if (!movieId) return false;
    // Ele checa rapidamente na nossa cópia em memória, sem precisar ir ao banco de dados
    return this.currentWatchlist.some((item) => item.id === movieId);
  }

  // O resto dos métodos continua igual
  addToWatchlist(movie: any): void {
    if (!this.currentUser) return;
    const movieDocRef = doc(
      this.firestore,
      `users/${this.currentUser.uid}/watchlist/${movie.id}`
    );
    setDoc(
      movieDocRef,
      {
        title: movie.title,
        poster_path: movie.poster_path,
        vote_average: movie.vote_average,
      },
      { merge: true }
    );
  }

  removeFromWatchlist(movieId: number): void {
    if (!this.currentUser) return;
    const movieDocRef = doc(
      this.firestore,
      `users/${this.currentUser.uid}/watchlist/${movieId}`
    );
    deleteDoc(movieDocRef);
  }

  getMovieFromWatchlist(movieId: number): Observable<any> {
    if (!this.currentUser) return of(null);
    const movieDocRef = doc(
      this.firestore,
      `users/${this.currentUser.uid}/watchlist/${movieId}`
    );
    return docData(movieDocRef, { idField: 'id' });
  }

  rateMovie(movieId: number, who: 'lucas' | 'aline', rating: number): void {
    if (!this.currentUser) return;
    const movieDocRef = doc(
      this.firestore,
      `users/${this.currentUser.uid}/watchlist/${movieId}`
    );
    const updateData = { [`notas.${who}`]: rating };
    setDoc(movieDocRef, updateData, { merge: true });
  }

  markAsWatched(movieId: number, who: 'lucas' | 'aline'): void {
    if (!this.currentUser) return;
    const movieDocRef = doc(
      this.firestore,
      `users/${this.currentUser.uid}/watchlist/${movieId}`
    );
    const updateData = { [`assistido_por.${who}`]: true };
    setDoc(movieDocRef, updateData, { merge: true });
  }
}
