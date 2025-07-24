import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
  searchTerm: string = '';
  constructor(private router: Router) {}

  handleSearch(): void {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/search', this.searchTerm]);
      this.searchTerm = '';
    }
  }
}
