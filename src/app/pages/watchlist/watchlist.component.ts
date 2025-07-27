import { WatchlistService } from './../../services/watchlist.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-watchlist',
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.css',
})
export class WatchlistComponent implements OnInit {
  watchList$!: Observable<any[]>;

  constructor(private WatchlistService: WatchlistService) {}

  ngOnInit(): void {
    this.watchList$ = this.WatchlistService.watchlist$;
  }
}
