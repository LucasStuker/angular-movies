import { authGuard } from './guards/auth.gaurd';
import { WatchlistComponent } from './pages/watchlist/watchlist.component';
import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { MovieSuggesterComponent } from './pages/movie-suggester/movie-suggester.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'movie/:id',
    component: MovieDetailsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'search/:query',
    component: SearchResultsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'watch-list',
    component: WatchlistComponent,
    canActivate: [authGuard],
  },
  {
    path: 'suggestions',
    component: MovieSuggesterComponent,
    canActivate: [authGuard],
  },
];
