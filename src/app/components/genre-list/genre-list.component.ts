import { CommonModule } from '@angular/common';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-genre-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './genre-list.component.html',
  styleUrl: './genre-list.component.css',
})
export class GenreListComponent implements OnInit {
  genres: any = [];
  selectedGenreId: number | null = null;

  @Output() genreSelected = new EventEmitter<number | null>();

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadGenres();
  }

  loadGenres(): void {
    this.movieService.getGenres().subscribe((data) => {
      this.genres = data.genres;
    });
  }

  onSelectGenre(genreId: number | null): void {
    // CORREÇÃO: Usando o nome correto da variável
    this.selectedGenreId = genreId;
    // CORREÇÃO: Usando o nome correto da variável (com 's' minúsculo)
    this.genreSelected.emit(this.selectedGenreId);
  }
}
