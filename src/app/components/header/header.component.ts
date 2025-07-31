import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, SearchBarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  activeProfile$: Observable<'lucas' | 'aline'>;

  constructor(public authService: AuthService) {
    this.activeProfile$ = this.authService.activeProfile$;
  }
  setProfile(profile: 'lucas' | 'aline'): void {
    this.authService.setActiveProfile(profile);
  }
}
